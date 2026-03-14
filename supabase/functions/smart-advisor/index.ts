import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { message } = await req.json();
    if (!message) throw new Error("Missing message");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all published resources
    const { data: resources } = await supabase
      .from("knowledge_resources")
      .select("id, category, title, description, url, subcategory, scenario_tags")
      .eq("is_published", true);

    const resourcesList = (resources || [])
      .map((r: any) => `- [${r.id}] ${r.title} (${r.category}${r.subcategory ? " / " + r.subcategory : ""}): ${r.description || ""}`)
      .join("\n");

    // Fetch active donation listings
    const { data: donations } = await supabase
      .from("donation_listings")
      .select("id, type, title, category, other_category, description, region, shipping_available")
      .eq("status", "active")
      .limit(50);

    const donationsList = (donations || [])
      .map((d: any) => `- [${d.type === "donate" ? "תרומה" : "בקשה"}] ${d.title} (${d.category}${d.other_category ? " / " + d.other_category : ""}) — אזור: ${d.region}${d.shipping_available ? " | משלוח אפשרי" : ""}`)
      .join("\n");

    const systemPrompt = `אתה יועץ מומחה לבני משפחה המטפלים בהורים קשישים בישראל.
המשתמש יתאר מצב או בעיה. תפקידך:
1. לזהות את הצרכים המרכזיים
2. להמליץ על 3-5 פעולות מיידיות ברורות
3. לבחור מתוך רשימת המשאבים שמצורפת רק את אלה שרלוונטיים למצב
4. אם המשתמש מחפש ציוד (חיתולים, כסא גלגלים, ציוד רפואי וכו'), הפנה אותו ללוח "קח ותן" בכתובת /give-take ואם יש תרומות רלוונטיות ברשימה — ציין אותן

רשימת המשאבים הזמינים:
${resourcesList}

לוח "קח ותן" — תרומות ובקשות פעילות:
${donationsList || "אין מודעות פעילות כרגע"}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "provide_advice",
              description: "Return structured advice with summary, actions, and relevant resource IDs",
              parameters: {
                type: "object",
                properties: {
                  summary: { type: "string", description: "תיאור קצר של המצב שזיהית" },
                  actions: {
                    type: "array",
                    items: { type: "string" },
                    description: "3-5 פעולות מיידיות מומלצות",
                  },
                  relevant_resource_ids: {
                    type: "array",
                    items: { type: "string" },
                    description: "IDs of relevant resources from the list",
                  },
                },
                required: ["summary", "actions", "relevant_resource_ids"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "provide_advice" } },
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "יותר מדי בקשות, נסו שוב בעוד כמה שניות" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "נדרש טעינת קרדיטים" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", status, errText);
      throw new Error("AI gateway error");
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const parsed = JSON.parse(toolCall.function.arguments);

    // Fetch full resource objects for the relevant IDs
    let relevantResources: any[] = [];
    if (parsed.relevant_resource_ids?.length > 0) {
      const { data } = await supabase
        .from("knowledge_resources")
        .select("*")
        .in("id", parsed.relevant_resource_ids);
      relevantResources = data || [];
    }

    return new Response(
      JSON.stringify({
        summary: parsed.summary,
        actions: parsed.actions,
        relevant_resources: relevantResources,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("smart-advisor error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
