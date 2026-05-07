import { useState, useEffect } from "react";
import { Sparkles, Loader2, CheckCircle2, BookOpen, ExternalLink, Lock, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import ResourceCard from "./ResourceCard";
import { openPresentation, shouldOpenInModal } from "@/components/PresentationModal";

interface SiteTool {
  path: string;
  label: string;
  reason: string;
  isPaid?: boolean;
}

interface MatchedScenario {
  id: string;
  title: string;
  urgency_level: string;
}

interface AdvisorResult {
  summary: string;
  actions: string[];
  relevant_resources: any[];
  site_tools?: SiteTool[];
  matched_scenarios?: MatchedScenario[];
}

const SmartAdvisor = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const [progressMsg, setProgressMsg] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      setProgressMsg("");
      return;
    }
    const stages: { delay: number; msg: string }[] = [
      { delay: 0, msg: "מנתחים את המצב..." },
      { delay: 2500, msg: "מחפשים משאבים ותרחישים רלוונטיים..." },
      { delay: 6000, msg: "מסכמים לכם תשובה יסודית — עוד רגע..." },
      { delay: 12000, msg: "כמעט סיימנו, מרכיבים את ההמלצות..." },
    ];
    const timers = stages.map((s) => setTimeout(() => setProgressMsg(s.msg), s.delay));
    return () => timers.forEach(clearTimeout);
  }, [loading]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("smart-advisor", {
        body: { message: input },
      });

      if (error) throw error;
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
              {progressMsg || "מנתחים את המצב..."}
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

          {result.matched_scenarios && result.matched_scenarios.length > 0 && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-5 space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-primary">
                  <AlertTriangle className="h-5 w-5" />
                  תרחיש מפורט מתאים למצב שלכם
                </h4>
                <p className="text-xs text-muted-foreground">לחצו כדי לקבל תוכנית פעולה מפורטת עם פעולות לפי זמנים, מה להכין ועם מי לדבר</p>
                <div className="space-y-2">
                  {result.matched_scenarios.map((sc) => (
                    <Link
                      key={sc.id}
                      to={`/knowledge-center?scenario=${sc.id}`}
                      className="flex items-center justify-between p-3 rounded-md border bg-background hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{sc.title}</span>
                      </div>
                      {sc.urgency_level === "high" && (
                        <Badge variant="destructive" className="text-[10px]">דחוף</Badge>
                      )}
                    </Link>
                  ))}
                </div>
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
                      <div className="flex items-center gap-2 shrink-0">
                        {shouldOpenInModal(tool.path) ? (
                          <button
                            type="button"
                            onClick={() => openPresentation(tool.path, tool.label)}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {tool.label} ←
                          </button>
                        ) : tool.path.startsWith("http") ? (
                          <a
                            href={tool.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {tool.label} ←
                          </a>
                        ) : (
                          <Link
                            to={tool.path}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {tool.label} ←
                          </Link>
                        )}
                        {tool.isPaid && (
                          <Badge variant="secondary" className="gap-1 text-[10px] px-1.5 py-0">
                            <Lock className="h-2.5 w-2.5" />
                            בתשלום
                          </Badge>
                        )}
                        {(tool.path.startsWith("http") || shouldOpenInModal(tool.path)) && (
                          <Badge variant="outline" className="gap-1 text-[10px] px-1.5 py-0">
                            {shouldOpenInModal(tool.path) ? "מדריך" : "כלי חיצוני"}
                          </Badge>
                        )}
                      </div>
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
