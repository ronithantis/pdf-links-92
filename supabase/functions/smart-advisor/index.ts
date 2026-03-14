import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ==================== RULES ENGINE ====================
interface MandatoryTool {
  path: string;
  label: string;
  reason: string;
  isPaid?: boolean;
}

interface KeywordRule {
  keywords: string[];
  tools: MandatoryTool[];
}

const KEYWORD_RULES: KeywordRule[] = [
  {
    keywords: ["צוואה", "ירושה", "צוואות"],
    tools: [
      { path: "/tools#will-template", label: "כתיבת צוואה", reason: "תבנית מובנית לעריכת צוואה עם הנחיות מפורטות", isPaid: true },
      { path: "/tools#poa-guide", label: "מדריך לייפוי כוח מתמשך", reason: "חשוב להסדיר ייפוי כוח לצד הצוואה", isPaid: true },
      { path: "/tools#family-sync", label: "כלי סנכרון הטיפול המשפחתי", reason: "תיאום בין בני משפחה סביב נושאים משפטיים", isPaid: true },
      { path: "/knowledge-center", label: "מרכז הידע", reason: "מצגות ומדריכים על תכנון משפטי וצוואות" },
    ],
  },
  {
    keywords: ["ייפוי כוח", "יפוי כוח", "אפוטרופסות", "אפוטרופוס"],
    tools: [
      { path: "/tools#poa-guide", label: "מדריך לייפוי כוח מתמשך", reason: "מדריך אינטראקטיבי לעריכת ייפוי כוח מתמשך", isPaid: true },
      { path: "/tools#will-template", label: "כתיבת צוואה", reason: "מומלץ להסדיר צוואה במקביל לייפוי כוח", isPaid: true },
      { path: "/tools#family-sync", label: "כלי סנכרון הטיפול המשפחתי", reason: "תיאום בין בני משפחה סביב החלטות משפטיות", isPaid: true },
      { path: "/knowledge-center", label: "מרכז הידע", reason: "מצגות ומדריכים על ייפוי כוח ואפוטרופסות" },
    ],
  },
  {
    keywords: ["דמנציה", "דמנטית", "דמנט", "אלצהיימר", "שכחה", "ירידה קוגניטיבית", "שיטיון"],
    tools: [
      { path: "/cognitive-training", label: "אימון קוגניטיבי", reason: "תרגילים לשימור כושר מנטלי" },
      { path: "/knowledge-center", label: "מרכז הידע", reason: "מצגות וסרטונים על התמודדות עם דמנציה" },
      { path: "/tools", label: "שאלון הערכת מצב", reason: "הערכה מקיפה של צרכי המשפחה המטפלת" },
      { path: "/tools#poa-guide", label: "מדריך לייפוי כוח מתמשך", reason: "חשוב להסדיר ייפוי כוח בשלבים מוקדמים של דמנציה", isPaid: true },
      { path: "/tools#will-template", label: "כתיבת צוואה", reason: "חשוב להסדיר צוואה לפני שהמצב הקוגניטיבי מתדרדר", isPaid: true },
    ],
  },
  {
    keywords: ["עובד זר", "מטפל צמוד", "מטפלת צמודה", "עובדת זרה"],
    tools: [
      { path: "/foreign-worker-search", label: "חיפוש עובד זר", reason: "מנוע חיפוש לעובדי סיעוד זרים" },
      { path: "/tools#salary-calculator", label: "מחשבון שכר עובד זר", reason: "חישוב שכר מדויק כולל זכויות סוציאליות", isPaid: true },
      { path: "/tools#contract-explanation", label: "הסבר על חוזה העסקה", reason: "פירוט והסבר סעיפי החוזה", isPaid: true },
      { path: "/tools#expectations-alignment", label: "תאום ציפיות עם עובד זר", reason: "הגדרת תפקידים, שעות ומשימות", isPaid: true },
    ],
  },
  {
    keywords: ["ציוד", "חיתולים", "כסא גלגלים", "ציוד רפואי", "הליכון", "מיטה סיעודית"],
    tools: [
      { path: "/give-take", label: 'לוח "קח ותן"', reason: "תרומה ובקשה של ציוד סיעודי" },
    ],
  },
  {
    keywords: ["שחיקה", "עייפות", "לחץ", "מותש", "מותשת", "שחוק", "שחוקה", "תשישות"],
    tools: [
      { path: "/tools", label: "שאלון הערכת מצב", reason: "הערכה מקיפה של רמת השחיקה והצרכים" },
      { path: "/services", label: "מפת שירותים", reason: "גורמי תמיכה, עמותות וקבוצות סיוע" },
    ],
  },
  {
    keywords: ["חוזה העסקה", "חוזה עבודה"],
    tools: [
      { path: "/tools#contract-explanation", label: "הסבר על חוזה העסקה", reason: "פירוט והסבר סעיפי החוזה לעובד זר", isPaid: true },
      { path: "/tools#expectations-alignment", label: "תאום ציפיות עם עובד זר", reason: "הגדרת תפקידים ומשימות", isPaid: true },
    ],
  },
  {
    keywords: ["זכויות", "גמלת סיעוד", "ביטוח לאומי", "גמלה", "קצבה"],
    tools: [
      { path: "/knowledge-center", label: "מרכז הידע", reason: "מדריכים על זכויות וגמלאות" },
      { path: "/services", label: "מפת שירותים", reason: "גופים ציבוריים ועמותות שיכולים לסייע" },
      { path: "/tools#nursing-claim-guide", label: "מדריך להגשת תביעת סיעוד", reason: "מדריך שלב אחר שלב להגשת תביעה", isPaid: true },
    ],
  },
  {
    keywords: ["קוד סיעודי", "אשפוז", "מוסד סיעודי", "בית אבות", "דיור מוגן", "חלופות מגורים", "השתתפות עצמית", "מוסד"],
    tools: [
      { path: "https://me.health.gov.il/nursing-calculator/", label: "מחשבון קוד סיעודי", reason: "כלי של משרד הבריאות להערכת רמת הסיעוד וגובה ההשתתפות העצמית" },
      { path: "/knowledge-center", label: "מרכז הידע", reason: "מדריכים על חלופות מגורים ואשפוז" },
      { path: "/services", label: "מפת שירותים", reason: "מוסדות סיעודיים ודיור מוגן באזורך" },
    ],
  },
];

function applyRulesEngine(message: string, aiTools: any[]): any[] {
  const lowerMessage = message;
  const merged = [...aiTools];
  const existingPaths = new Set(merged.map((t: any) => t.path));

  for (const rule of KEYWORD_RULES) {
    const matched = rule.keywords.some((kw) => lowerMessage.includes(kw));
    if (!matched) continue;

    for (const tool of rule.tools) {
      if (!existingPaths.has(tool.path)) {
        merged.push(tool);
        existingPaths.add(tool.path);
      }
    }
  }

  return merged;
}
// ==================== END RULES ENGINE ====================

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
3. לבחור מתוך רשימת המשאבים שמצורפת רק את אלה שרלוונטיים למצב — היה נדיב בהפניות, אם משאב קשור אפילו בעקיפין, כלול אותו
4. להפנות לכלים ודפים רלוונטיים באתר שלנו (ראה רשימה למטה) — חובה להפנות לפחות ל-2 כלים רלוונטיים
5. אם המשתמש מחפש ציוד (חיתולים, כסא גלגלים, ציוד רפואי וכו'), הפנה אותו ללוח "קח ותן" ואם יש תרומות רלוונטיות ברשימה — ציין אותן

כלים ודפים באתר שלנו — הפנה אליהם כשרלוונטי:
- כלי לסנכרון הטיפול המשפחתי (/tools#family-sync) — חלוקת תפקידים, תיאום בין אחים, רשימות משימות משותפות. רלוונטי גם כשצריך לתאם בין בני משפחה סביב נושאים כמו צוואה, ייפוי כוח, החלטות רפואיות, ועוד (בתשלום)
- רשימת משימות אישית (/tasks-list) — ניהול מטלות הטיפול. רלוונטי כשיש רשימה של דברים לעשות, כמו טפסים, פגישות, מסמכים
- לוח "קח ותן" (/give-take) — תרומה ובקשה של ציוד סיעודי
- חיפוש עובד זר (/foreign-worker-search) — מנוע חיפוש לעובדי סיעוד זרים
- אימון קוגניטיבי (/cognitive-training) — תרגילים לשימור כושר מנטלי של ההורה
- מרכז הידע (/knowledge-center) — מצגות, סרטונים, טפסים ומדריכים. יש בו מצגות על תכנון משפטי, צוואות, ייפוי כוח, דמנציה, זכויות, ועוד
- מפת שירותים (/services) — גורמי טיפול, עמותות, גופים ציבוריים
- שאלון הערכת מצב (/tools) — שאלון מקיף להערכת הצרכים של המשפחה המטפלת. רלוונטי כמעט תמיד
- יצירת קשר (/contact) — לפניות אישיות
- כתיבת צוואה (/tools#will-template) — תבנית מובנית לעריכת צוואה (בתשלום)
- מדריך לייפוי כוח מתמשך (/tools#poa-guide) — מדריך אינטראקטיבי לעריכת ייפוי כוח (בתשלום)
- מחשבון שכר עובד זר (/tools#salary-calculator) — חישוב שכר מדויק (בתשלום)
- הסבר על חוזה העסקה (/tools#contract-explanation) — פירוט סעיפי החוזה (בתשלום)
- תאום ציפיות עם עובד זר (/tools#expectations-alignment) — הגדרת תפקידים ומשימות (בתשלום)
- מדריך להגשת תביעת סיעוד (/tools#nursing-claim-guide) — שלב אחר שלב (בתשלום)
- מחשבון קוד סיעודי (https://me.health.gov.il/nursing-calculator/) — כלי חיצוני של משרד הבריאות להערכת רמת הסיעוד וגובה ההשתתפות העצמית (חינמי)

מיפוי נושאים לכלים — חובה להפנות כשהנושא עולה:
- צוואה, ירושה, ייפוי כוח, אפוטרופסות, תכנון משפטי → כתיבת צוואה (/tools#will-template, בתשלום) + מדריך ייפוי כוח (/tools#poa-guide, בתשלום) + כלי סנכרון (/tools#family-sync, בתשלום) + מרכז הידע (/knowledge-center) + שאלון הערכה (/tools)
- חלוקת נטל, קונפליקט משפחתי, תיאום טיפול → כלי סנכרון (/tools#family-sync, בתשלום) + רשימת משימות (/tasks-list)
- דמנציה, ירידה קוגניטיבית, שכחה → אימון קוגניטיבי (/cognitive-training) + מרכז הידע (/knowledge-center) + מדריך ייפוי כוח (/tools#poa-guide, בתשלום) + כתיבת צוואה (/tools#will-template, בתשלום)
- עובד זר, מטפל צמוד, סיעוד → חיפוש עובד זר (/foreign-worker-search) + מחשבון שכר (/tools#salary-calculator, בתשלום)
- ציוד רפואי, חיתולים, כסא גלגלים → קח ותן (/give-take)
- שחיקה, עייפות, לחץ → שאלון הערכה (/tools) + מפת שירותים (/services)
- זכויות, גמלאות, ביטוח לאומי → מרכז הידע (/knowledge-center) + מפת שירותים (/services) + מדריך תביעת סיעוד (/tools#nursing-claim-guide, בתשלום)
- אשפוז, מוסד סיעודי, בית אבות, דיור מוגן, חלופות מגורים → מחשבון קוד סיעודי (https://me.health.gov.il/nursing-calculator/, חיצוני) + מרכז הידע (/knowledge-center) + מפת שירותים (/services)

כשמציין כלי בתשלום, סמן אותו עם isPaid: true בתוצאה.

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
                  site_tools: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        path: { type: "string", description: "נתיב הדף באתר, למשל /tools#will-template" },
                        label: { type: "string", description: "שם הכלי בעברית" },
                        reason: { type: "string", description: "למה זה רלוונטי למצב" },
                        isPaid: { type: "boolean", description: "האם הכלי בתשלום" },
                      },
                      required: ["path", "label", "reason"],
                      additionalProperties: false,
                    },
                    description: "כלים ודפים רלוונטיים באתר שלנו",
                  },
                },
                required: ["summary", "actions", "relevant_resource_ids", "site_tools"],
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

    // ===== RULES ENGINE: merge mandatory tools =====
    const aiSiteTools = parsed.site_tools || [];
    const finalSiteTools = applyRulesEngine(message, aiSiteTools);

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
        site_tools: finalSiteTools,
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
