import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, CheckCircle2, BookOpen, Wrench, Lock, ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import ResourceCard from "./ResourceCard";

interface SiteTool {
  path: string;
  label: string;
  description: string;
  matchTags: string[];
  isPaid?: boolean;
  isExternal?: boolean;
}

const SITE_TOOLS: SiteTool[] = [
  { path: "/tools#will-template", label: "כתיבת צוואה", description: "תבנית מובנית לעריכת צוואה עם הנחיות מפורטות", matchTags: ["צוואה", "ירושה", "משפטי"], isPaid: true },
  { path: "/tools#poa-guide", label: "מדריך לייפוי כוח מתמשך", description: "מדריך אינטראקטיבי לעריכת ייפוי כוח מתמשך", matchTags: ["ייפוי_כוח", "אפוטרופסות", "משפטי", "דמנציה", "אלצהיימר", "צוואה", "ירושה"], isPaid: true },
  { path: "/tools#family-sync", label: "כלי סנכרון הטיפול המשפחתי", description: "חלוקת תפקידים ותיאום בין בני המשפחה", matchTags: ["משפחה", "קונפליקט", "חלוקת_תפקידים", "שחיקה", "מטפל_משפחתי", "ייפוי_כוח", "אפוטרופסות", "משפטי", "צוואה", "ירושה", "מסמכים"], isPaid: true },
  { path: "/tools#salary-calculator", label: "מחשבון שכר עובד זר", description: "חישוב שכר מדויק כולל זכויות סוציאליות", matchTags: ["עובד_זר", "העסקה", "גמלת_סיעוד"], isPaid: true },
  { path: "/tools#contract-explanation", label: "הסבר על חוזה העסקה", description: "פירוט והסבר סעיפי החוזה לעובד זר", matchTags: ["עובד_זר", "העסקה", "חוזה"], isPaid: true },
  { path: "/tools#expectations-alignment", label: "תאום ציפיות עם עובד זר", description: "הגדרת תפקידים, שעות ומשימות עם המטפל", matchTags: ["עובד_זר", "העסקה"], isPaid: true },
  { path: "/tools#nursing-claim-guide", label: "מדריך להגשת תביעת סיעוד", description: "מדריך שלב אחר שלב להגשת תביעה לביטוח לאומי", matchTags: ["גמלת_סיעוד", "ביטוח_לאומי", "זכויות"], isPaid: true },
  { path: "/tasks-list", label: "רשימת משימות אישית", description: "ניהול מטלות הטיפול היומיומיות", matchTags: ["שחיקה", "מטפל_משפחתי", "חלוקת_תפקידים", "אשפוז", "שחרור", "משפטי", "מסמכים", "צוואה", "ייפוי_כוח"] },
  { path: "/give-take", label: 'לוח "קח ותן"', description: "תרומה ובקשה של ציוד סיעודי", matchTags: ["ציוד_רפואי", "חיתולים", "ניידות", "קח_ותן", "בטיחות_בית"] },
  { path: "/foreign-worker-search", label: "חיפוש עובד זר", description: "מנוע חיפוש לעובדי סיעוד זרים", matchTags: ["עובד_זר", "העסקה", "חוזה", "גמלת_סיעוד"] },
  { path: "/cognitive-training", label: "אימון קוגניטיבי", description: "תרגילים לשימור כושר מנטלי", matchTags: ["דמנציה", "אלצהיימר", "קוגניטיבי"] },
  { path: "/services", label: "מפת שירותים", description: "גורמי טיפול, עמותות וגופים ציבוריים", matchTags: ["גמלת_סיעוד", "ביטוח_לאומי", "זכויות", "דיור_מוגן", "בית_אבות", "שחיקה", "בריאות_נפשית"] },
  { path: "/knowledge-center", label: "מרכז הידע", description: "מצגות, סרטונים, טפסים ומדריכים", matchTags: ["ייפוי_כוח", "אפוטרופסות", "משפטי", "צוואה", "ירושה", "דמנציה", "גמלת_סיעוד", "זכויות"] },
  { path: "/contact", label: "יצירת קשר", description: "פנייה אישית לצוות האתר", matchTags: ["סירוב_טיפול", "אפוטרופסות", "משפטי"] },
  { path: "https://me.health.gov.il/nursing-calculator/", label: "מחשבון קוד סיעודי", description: "כלי של משרד הבריאות להערכת רמת הסיעוד וגובה ההשתתפות העצמית", matchTags: ["אשפוז", "דיור_מוגן", "בית_אבות", "מוסד_סיעודי", "גמלת_סיעוד"], isExternal: true },
];

// ─── Conditional Rules Engine ───
// Maps question keywords to conditional actions that appear when the user answers "no"
interface ConditionalRule {
  /** Keywords to match in the question text */
  questionKeywords: string[];
  /** Which answer triggers the conditional actions: "no" means actions appear when user says No */
  triggerOnAnswer: "yes" | "no";
  /** Actions to inject */
  actions: string[];
  /** Optional: additional tools to surface */
  tools?: Partial<SiteTool>[];
}

const CONDITIONAL_RULES: ConditionalRule[] = [
  {
    questionKeywords: ["גמלת סיעוד מאושרת", "גמלת סיעוד"],
    triggerOnAnswer: "no",
    actions: [
      "הגשת תביעת סיעוד לביטוח לאומי",
      "בדקו בקופת החולים אם יש לכם זכאות לגמלת סיעוד (חייגו *2700)",
    ],
    tools: [
      { path: "/tools#nursing-claim-guide", label: "מדריך להגשת תביעת סיעוד", description: "מדריך שלב אחר שלב להגשת תביעה לביטוח לאומי" },
    ],
  },
  {
    questionKeywords: ["ייפוי כוח", "ייפוי כח"],
    triggerOnAnswer: "no",
    actions: [
      "פנו לעורך דין מוסמך לעריכת ייפוי כוח מתמשך בהקדם",
      "בדקו אם ההורה כשיר עדיין מבחינה קוגניטיבית — תנאי לחתימה",
    ],
    tools: [
      { path: "/tools#poa-guide", label: "מדריך לייפוי כוח מתמשך", description: "מדריך אינטראקטיבי לעריכת ייפוי כוח מתמשך" },
    ],
  },
  {
    questionKeywords: ["צוואה"],
    triggerOnAnswer: "no",
    actions: [
      "מומלץ לערוך צוואה בהקדם לפני שהמצב הקוגניטיבי מידרדר",
      "פנו לעורך דין המתמחה בדיני ירושה",
    ],
  },
  {
    questionKeywords: ["חברת סיעוד", "העסקה ישירה"],
    triggerOnAnswer: "no",
    actions: [
      "בדקו מהם היתרונות והחסרונות של כל מסלול לפני ההחלטה",
      "השוו בין עלות חברת סיעוד לעלות העסקה ישירה כולל זכויות סוציאליות",
    ],
  },
  {
    questionKeywords: ["החזר", "ביטוח לאומי"],
    triggerOnAnswer: "no",
    actions: [
      "בדקו זכאות להחזר חלקי מביטוח לאומי — ייתכן שמגיע לכם",
      "פנו לסניף ביטוח לאומי הקרוב או חייגו *6050",
    ],
  },
];

function matchRule(questionText: string, rule: ConditionalRule): boolean {
  return rule.questionKeywords.some(kw =>
    questionText.includes(kw)
  );
}

const ScenarioExplorer = () => {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [relatedResources, setRelatedResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Track user answers: question index → "yes" | "no" | undefined (unanswered)
  const [answers, setAnswers] = useState<Record<number, "yes" | "no">>({});

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
    setAnswers({}); // reset answers
    const { data } = await supabase
      .from("knowledge_resources")
      .select("*")
      .eq("is_published", true)
      .overlaps("scenario_tags", scenario.tags);
    setRelatedResources(data || []);
  };

  // Compute conditional actions based on answers
  const conditionalResults = useMemo(() => {
    if (!selected) return { actions: [] as string[], toolPaths: new Set<string>() };
    const questions = (selected.questions as string[]) || [];
    const extraActions: string[] = [];
    const extraToolPaths = new Set<string>();

    questions.forEach((q, idx) => {
      const answer = answers[idx];
      if (!answer) return; // unanswered, skip

      CONDITIONAL_RULES.forEach(rule => {
        if (matchRule(q, rule) && answer === rule.triggerOnAnswer) {
          extraActions.push(...rule.actions);
          rule.tools?.forEach(t => {
            if (t.path) extraToolPaths.add(t.path);
          });
        }
      });
    });

    return { actions: extraActions, toolPaths: extraToolPaths };
  }, [selected, answers]);

  const toggleAnswer = (idx: number, value: "yes" | "no") => {
    setAnswers(prev => {
      if (prev[idx] === value) {
        // toggle off
        const next = { ...prev };
        delete next[idx];
        return next;
      }
      return { ...prev, [idx]: value };
    });
  };

  if (loading) return <div className="text-center py-6 text-muted-foreground">טוען תרחישים...</div>;

  if (selected) {
    const tags = (selected.tags as string[]) || [];
    const questions = (selected.questions as string[]) || [];
    const actions = (selected.recommended_actions as string[]) || [];
    const allActions = [...actions, ...conditionalResults.actions];

    const matchedTools = SITE_TOOLS.filter(tool =>
      tool.matchTags.some(mt => tags.includes(mt)) || conditionalResults.toolPaths.has(tool.path)
    );

    // Deduplicate tools by path
    const uniqueTools = matchedTools.filter((tool, i, arr) =>
      arr.findIndex(t => t.path === tool.path) === i
    );

    const hasAnyAnswer = Object.keys(answers).length > 0;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => { setSelected(null); setAnswers({}); }}>
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
              <p className="text-xs text-muted-foreground">ענו על השאלות כדי לקבל המלצות מותאמות אישית</p>
              <ul className="space-y-3">
                {questions.map((q, i) => {
                  const answer = answers[i];
                  const hasRule = CONDITIONAL_RULES.some(r => matchRule(q, r));
                  return (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm flex-1">{q}</span>
                      {hasRule && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Button
                            size="sm"
                            variant={answer === "yes" ? "default" : "outline"}
                            className={`h-7 px-2.5 text-xs ${answer === "yes" ? "" : ""}`}
                            onClick={() => toggleAnswer(i, "yes")}
                          >
                            <ThumbsUp className="h-3 w-3 ml-1" />
                            כן
                          </Button>
                          <Button
                            size="sm"
                            variant={answer === "no" ? "destructive" : "outline"}
                            className="h-7 px-2.5 text-xs"
                            onClick={() => toggleAnswer(i, "no")}
                          >
                            <ThumbsDown className="h-3 w-3 ml-1" />
                            לא
                          </Button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        )}

        {allActions.length > 0 && (
          <Card>
            <CardContent className="p-5 space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                פעולות מומלצות
              </h4>
              <ul className="space-y-2">
                {actions.map((a, i) => (
                  <li key={`base-${i}`} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
                {conditionalResults.actions.map((a, i) => (
                  <li key={`cond-${i}`} className="flex items-start gap-2 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      {a}
                      <Badge variant="outline" className="mr-2 text-[10px] px-1.5 py-0 text-amber-600 border-amber-300">
                        המלצה על בסיס תשובותיכם
                      </Badge>
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {uniqueTools.length > 0 && (
          <Card>
            <CardContent className="p-5 space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-primary">
                <Wrench className="h-5 w-5" />
                כלים רלוונטיים באתר
              </h4>
              <ul className="space-y-3">
                {uniqueTools.map((tool, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex items-center gap-2 shrink-0">
                      {tool.isExternal ? (
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
                      {tool.isExternal && (
                        <Badge variant="outline" className="gap-1 text-[10px] px-1.5 py-0">
                          כלי חיצוני
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{tool.description}</span>
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
