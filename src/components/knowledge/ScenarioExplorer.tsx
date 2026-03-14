import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, CheckCircle2, BookOpen, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import ResourceCard from "./ResourceCard";

interface SiteTool {
  path: string;
  label: string;
  description: string;
  matchTags: string[];
}

const SITE_TOOLS: SiteTool[] = [
  { path: "/tools", label: "כלי סנכרון הטיפול המשפחתי", description: "חלוקת תפקידים ותיאום בין בני המשפחה", matchTags: ["משפחה", "קונפליקט", "חלוקת_תפקידים", "שחיקה", "מטפל_משפחתי"] },
  { path: "/tasks-list", label: "רשימת משימות אישית", description: "ניהול מטלות הטיפול היומיומיות", matchTags: ["שחיקה", "מטפל_משפחתי", "חלוקת_תפקידים", "אשפוז", "שחרור"] },
  { path: "/give-take", label: 'לוח "קח ותן"', description: "תרומה ובקשה של ציוד סיעודי", matchTags: ["ציוד_רפואי", "חיתולים", "ניידות", "קח_ותן", "בטיחות_בית"] },
  { path: "/foreign-worker-search", label: "חיפוש עובד זר", description: "מנוע חיפוש לעובדי סיעוד זרים", matchTags: ["עובד_זר", "העסקה", "חוזה", "גמלת_סיעוד"] },
  { path: "/cognitive-training", label: "אימון קוגניטיבי", description: "תרגילים לשימור כושר מנטלי", matchTags: ["דמנציה", "אלצהיימר", "קוגניטיבי"] },
  { path: "/services", label: "מפת שירותים", description: "גורמי טיפול, עמותות וגופים ציבוריים", matchTags: ["גמלת_סיעוד", "ביטוח_לאומי", "זכויות", "דיור_מוגן", "בית_אבות", "שחיקה", "בריאות_נפשית"] },
  { path: "/contact", label: "יצירת קשר", description: "פנייה אישית לצוות האתר", matchTags: ["סירוב_טיפול", "אפוטרופסות", "משפטי"] },
];

const ScenarioExplorer = () => {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [relatedResources, setRelatedResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("scenarios")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
      .then(({ data }) => {
        setScenarios(data || []);
        setLoading(false);
      });
  }, []);

  const selectScenario = async (scenario: any) => {
    setSelected(scenario);
    // Fetch resources whose scenario_tags overlap with scenario tags
    const { data } = await supabase
      .from("knowledge_resources")
      .select("*")
      .eq("is_published", true)
      .overlaps("scenario_tags", scenario.tags);
    setRelatedResources(data || []);
  };

  if (loading) return <div className="text-center py-6 text-muted-foreground">טוען תרחישים...</div>;

  if (selected) {
    const tags = (selected.tags as string[]) || [];
    const questions = (selected.questions as string[]) || [];
    const actions = (selected.recommended_actions as string[]) || [];
    const matchedTools = SITE_TOOLS.filter(tool =>
      tool.matchTags.some(mt => tags.includes(mt))
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
            <ArrowRight className="h-4 w-4 ml-1" />
            חזרה לתרחישים
          </Button>
          <h3 className="text-xl font-bold">{selected.title}</h3>
        </div>

        {questions.length > 0 && (
          <Card>
            <CardContent className="p-5 space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-primary">
                <HelpCircle className="h-5 w-5" />
                שאלות לבירור
              </h4>
              <ul className="space-y-2">
                {questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {actions.length > 0 && (
          <Card>
            <CardContent className="p-5 space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                פעולות מומלצות
              </h4>
              <ul className="space-y-2">
                {actions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {relatedResources.length > 0 && (
          <div>
            <h4 className="font-semibold flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              משאבים רלוונטיים
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {relatedResources.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">תרחישים נפוצים</h3>
      <p className="text-sm text-muted-foreground">בחרו תרחיש שמתאר את המצב שלכם כדי לקבל מידע ממוקד</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((s) => (
          <Card
            key={s.id}
            className="cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
            onClick={() => selectScenario(s)}
          >
            <CardContent className="p-5">
              <h4 className="font-bold mb-2">{s.title}</h4>
              <div className="flex flex-wrap gap-1">
                {(s.tags as string[])?.slice(0, 3).map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-[10px]">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScenarioExplorer;
