import { useState } from "react";
import { Sparkles, Loader2, CheckCircle2, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import ResourceCard from "./ResourceCard";

interface SiteTool {
  path: string;
  label: string;
  reason: string;
}

interface AdvisorResult {
  summary: string;
  actions: string[];
  relevant_resources: any[];
  site_tools?: SiteTool[];
}

const SmartAdvisor = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("smart-advisor", {
        body: { message: input },
      });

      if (error) throw error;
      
      // data should contain { summary, actions, relevant_resources }
      setResult(data);
    } catch (err: any) {
      console.error("SmartAdvisor error:", err);
      toast({
        title: "שגיאה",
        description: err.message || "לא הצלחנו לנתח את המצב. נסו שוב.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-warm" />
          תארו את המצב שלכם ונדע להכווין
        </h3>
        <p className="text-sm text-muted-foreground">כתבו בחופשיות על המצב, ונמליץ על צעדים ומשאבים רלוונטיים</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="לדוגמה: אמא נופלת לאחרונה ואנחנו לא יודעים מאיפה להתחיל..."
          className="min-h-[100px] text-base"
          dir="rtl"
        />
        <Button onClick={handleSubmit} disabled={loading || !input.trim()} className="w-full">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin ml-2" />
              מנתחים את המצב...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 ml-2" />
              קבלו המלצות
            </>
          )}
        </Button>
      </div>

      {result && (
        <div className="max-w-3xl mx-auto space-y-6">
          {result.summary && (
            <Card>
              <CardContent className="p-5">
                <p className="text-sm leading-relaxed">{result.summary}</p>
              </CardContent>
            </Card>
          )}

          {result.actions?.length > 0 && (
            <Card>
              <CardContent className="p-5 space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-success">
                  <CheckCircle2 className="h-5 w-5" />
                  פעולות מומלצות
                </h4>
                <ul className="space-y-2">
                  {result.actions.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      {a}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {result.site_tools && result.site_tools.length > 0 && (
            <Card>
              <CardContent className="p-5 space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-primary">
                  <ExternalLink className="h-5 w-5" />
                  כלים רלוונטיים באתר
                </h4>
                <ul className="space-y-3">
                  {result.site_tools.map((tool, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Link
                        to={tool.path}
                        className="text-sm font-medium text-primary hover:underline shrink-0"
                      >
                        {tool.label} ←
                      </Link>
                      <span className="text-sm text-muted-foreground">{tool.reason}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {result.relevant_resources?.length > 0 && (
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                משאבים רלוונטיים
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {result.relevant_resources.map((r: any) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartAdvisor;
