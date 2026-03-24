import { useState, useEffect, useMemo, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, HelpCircle, CheckCircle2, BookOpen, Wrench, Lock,
  ThumbsUp, ThumbsDown, Lightbulb, AlertTriangle, Clock, CalendarDays,
  ClipboardList, Phone, Printer, Store
} from "lucide-react";
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
  { path: "/ad-elai", label: "ספקי ציוד ושירותים", description: "מאגר ספקים — ציוד רפואי, פיזיותרפיה, סיעוד ועוד", matchTags: ["בטיחות_בית", "ניידות", "ציוד_רפואי", "נפילות", "עובד_זר", "אשפוז", "שחרור", "שיקום"] },
];

// ─── Conditional Rules Engine ───
interface ConditionalRule {
  questionKeywords: string[];
  triggerOnAnswer: "yes" | "no";
  actions: string[];
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
  return rule.questionKeywords.some(kw => questionText.includes(kw));
}

const URGENCY_CONFIG = {
  high: { label: "דחיפות גבוהה", color: "bg-red-100 text-red-700 border-red-300", icon: AlertTriangle },
  medium: { label: "דחיפות בינונית", color: "bg-amber-100 text-amber-700 border-amber-300", icon: Clock },
  low: { label: "דחיפות נמוכה", color: "bg-green-100 text-green-700 border-green-300", icon: CheckCircle2 },
};

// ─── Sub-components ───

const UrgencyBadge = ({ level }: { level: string }) => {
  const config = URGENCY_CONFIG[level as keyof typeof URGENCY_CONFIG] || URGENCY_CONFIG.medium;
  const Icon = config.icon;
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold ${config.color}`}>
      <Icon className="h-4 w-4" />
      {config.label}
    </div>
  );
};

const TimedActionsBlock = ({ icon: Icon, title, items, className = "" }: {
  icon: React.ElementType; title: string; items: string[]; className?: string;
}) => {
  if (!items || items.length === 0) return null;
  return (
    <Card className={className}>
      <CardContent className="p-5 space-y-3">
        <h4 className="font-semibold flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </h4>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const InfoListBlock = ({ icon: Icon, title, items, iconColor = "text-primary" }: {
  icon: React.ElementType; title: string; items: string[]; iconColor?: string;
}) => {
  if (!items || items.length === 0) return null;
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <h4 className="font-semibold flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          {title}
        </h4>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const ScenarioExplorer = () => {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [relatedResources, setRelatedResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, "yes" | "no">>({});
  const printRef = useRef<HTMLDivElement>(null);

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
    setAnswers({});
    const { data } = await supabase
      .from("knowledge_resources")
      .select("*")
      .eq("is_published", true)
      .overlaps("scenario_tags", scenario.tags);
    setRelatedResources(data || []);
  };

  const conditionalResults = useMemo(() => {
    if (!selected) return { actions: [] as string[], toolPaths: new Set<string>() };
    const questions = (selected.questions as string[]) || [];
    const extraActions: string[] = [];
    const extraToolPaths = new Set<string>();

    questions.forEach((q, idx) => {
      const answer = answers[idx];
      if (!answer) return;
      CONDITIONAL_RULES.forEach(rule => {
        if (matchRule(q, rule) && answer === rule.triggerOnAnswer) {
          extraActions.push(...rule.actions);
          rule.tools?.forEach(t => { if (t.path) extraToolPaths.add(t.path); });
        }
      });
    });

    return { actions: extraActions, toolPaths: extraToolPaths };
  }, [selected, answers]);

  const toggleAnswer = (idx: number, value: "yes" | "no") => {
    setAnswers(prev => {
      if (prev[idx] === value) {
        const next = { ...prev };
        delete next[idx];
        return next;
      }
      return { ...prev, [idx]: value };
    });
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html dir="rtl"><head><title>${selected?.title || "דוח תרחיש"}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; direction: rtl; }
            h1 { font-size: 22px; border-bottom: 2px solid #333; padding-bottom: 8px; }
            h2 { font-size: 16px; margin-top: 20px; color: #1a56db; }
            ul { padding-right: 20px; }
            li { margin-bottom: 6px; }
            .urgency { display: inline-block; padding: 4px 12px; border-radius: 20px; font-weight: bold; margin-bottom: 16px; }
            .urgency-high { background: #fee2e2; color: #b91c1c; }
            .urgency-medium { background: #fef3c7; color: #b45309; }
            .urgency-low { background: #dcfce7; color: #15803d; }
            .date { color: #666; font-size: 13px; }
            .notes { border: 1px dashed #ccc; padding: 20px; margin-top: 20px; min-height: 100px; }
            .notes-title { color: #666; font-size: 14px; }
            @media print { body { padding: 15px; } }
          </style></head><body>
          <p class="date">תאריך: ${new Date().toLocaleDateString("he-IL")}</p>
          ${printRef.current.innerHTML}
          <div class="notes"><p class="notes-title">הערות אישיות:</p></div>
          </body></html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  if (loading) return <div className="text-center py-6 text-muted-foreground">טוען תרחישים...</div>;

  if (selected) {
    const tags = (selected.tags as string[]) || [];
    const questions = (selected.questions as string[]) || [];
    const actionsNow = (selected.actions_now as string[]) || [];
    const actions24h = (selected.actions_24h as string[]) || [];
    const actionsWeek = (selected.actions_week as string[]) || [];
    const whatToPrepare = (selected.what_to_prepare as string[]) || [];
    const whoToContact = (selected.who_to_contact as string[]) || [];
    const legacyActions = (selected.recommended_actions as string[]) || [];
    const urgency = (selected.urgency_level as string) || "medium";

    // Use new timed actions if available, otherwise fall back to legacy
    const hasTimedActions = actionsNow.length > 0 || actions24h.length > 0 || actionsWeek.length > 0;

    const matchedTools = SITE_TOOLS.filter(tool =>
      tool.matchTags.some(mt => tags.includes(mt)) || conditionalResults.toolPaths.has(tool.path)
    );
    const uniqueTools = matchedTools.filter((tool, i, arr) =>
      arr.findIndex(t => t.path === tool.path) === i
    );

    return (
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => { setSelected(null); setAnswers({}); }}>
              <ArrowRight className="h-4 w-4 ml-1" />
              חזרה לתרחישים
            </Button>
            <h3 className="text-xl font-bold">{selected.title}</h3>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            הדפסת דוח
          </Button>
        </div>

        {/* Urgency Badge */}
        <UrgencyBadge level={urgency} />

        {/* Print-friendly hidden content */}
        <div ref={printRef} className="hidden">
          <h1>{selected.title}</h1>
          <div className={`urgency urgency-${urgency}`}>
            {URGENCY_CONFIG[urgency as keyof typeof URGENCY_CONFIG]?.label || "דחיפות בינונית"}
          </div>

          {questions.length > 0 && (
            <>
              <h2>שאלות בירור</h2>
              <ul>{questions.map((q, i) => <li key={i}>{q} {answers[i] ? `— ${answers[i] === "yes" ? "כן" : "לא"}` : ""}</li>)}</ul>
            </>
          )}
          {actionsNow.length > 0 && (<><h2>⚡ פעולות — עכשיו</h2><ul>{actionsNow.map((a, i) => <li key={i}>{a}</li>)}</ul></>)}
          {actions24h.length > 0 && (<><h2>🕐 פעולות — 24 שעות</h2><ul>{actions24h.map((a, i) => <li key={i}>{a}</li>)}</ul></>)}
          {actionsWeek.length > 0 && (<><h2>📅 פעולות — שבוע קרוב</h2><ul>{actionsWeek.map((a, i) => <li key={i}>{a}</li>)}</ul></>)}
          {conditionalResults.actions.length > 0 && (<><h2>💡 המלצות על בסיס תשובותיכם</h2><ul>{conditionalResults.actions.map((a, i) => <li key={i}>{a}</li>)}</ul></>)}
          {whatToPrepare.length > 0 && (<><h2>📋 מה להכין</h2><ul>{whatToPrepare.map((a, i) => <li key={i}>{a}</li>)}</ul></>)}
          {whoToContact.length > 0 && (<><h2>📞 עם מי לדבר</h2><ul>{whoToContact.map((a, i) => <li key={i}>{a}</li>)}</ul></>)}
          {uniqueTools.length > 0 && (<><h2>🔧 כלים רלוונטיים באתר</h2><ul>{uniqueTools.map((t, i) => <li key={i}>{t.label} — {t.description}</li>)}</ul></>)}
        </div>

        {/* Questions */}
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
                          <Button size="sm" variant={answer === "yes" ? "default" : "outline"} className="h-7 px-2.5 text-xs" onClick={() => toggleAnswer(i, "yes")}>
                            <ThumbsUp className="h-3 w-3 ml-1" />כן
                          </Button>
                          <Button size="sm" variant={answer === "no" ? "destructive" : "outline"} className="h-7 px-2.5 text-xs" onClick={() => toggleAnswer(i, "no")}>
                            <ThumbsDown className="h-3 w-3 ml-1" />לא
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

        {/* Timed Actions */}
        {hasTimedActions ? (
          <>
            <TimedActionsBlock icon={AlertTriangle} title="⚡ פעולות — עכשיו" items={actionsNow} className="border-r-4 border-r-red-400" />
            <TimedActionsBlock icon={Clock} title="🕐 פעולות — 24 שעות הקרובות" items={actions24h} className="border-r-4 border-r-amber-400" />
            <TimedActionsBlock icon={CalendarDays} title="📅 פעולות — שבוע קרוב" items={actionsWeek} className="border-r-4 border-r-blue-400" />
          </>
        ) : legacyActions.length > 0 ? (
          <Card>
            <CardContent className="p-5 space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                פעולות מומלצות
              </h4>
              <ul className="space-y-2">
                {legacyActions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />{a}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : null}

        {/* Conditional actions from answers */}
        {conditionalResults.actions.length > 0 && (
          <Card>
            <CardContent className="p-5 space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-amber-600">
                <Lightbulb className="h-5 w-5" />
                המלצות על בסיס תשובותיכם
              </h4>
              <ul className="space-y-2">
                {conditionalResults.actions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                    <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />{a}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* What to Prepare */}
        <InfoListBlock icon={ClipboardList} title="📋 מה להכין" items={whatToPrepare} />

        {/* Who to Contact */}
        <InfoListBlock icon={Phone} title="📞 עם מי לדבר" items={whoToContact} iconColor="text-green-600" />

        {/* Site Tools */}
        {uniqueTools.length > 0 && (
          <Card>
            <CardContent className="p-5 space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-primary">
                <Wrench className="h-5 w-5" />
                כלים ומשאבים רלוונטיים באתר
              </h4>
              <ul className="space-y-3">
                {uniqueTools.map((tool, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex items-center gap-2 shrink-0">
                      {tool.isExternal ? (
                        <a href={tool.path} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                          {tool.label} ←
                        </a>
                      ) : (
                        <Link to={tool.path} state={{ returnTo: "/knowledge-center", returnLabel: "חזרה לתרחיש" }} className="text-sm font-medium text-primary hover:underline">
                          {tool.label} ←
                        </Link>
                      )}
                      {tool.isPaid && (
                        <Badge variant="secondary" className="gap-1 text-[10px] px-1.5 py-0">
                          <Lock className="h-2.5 w-2.5" />בתשלום
                        </Badge>
                      )}
                      {tool.isExternal && (
                        <Badge variant="outline" className="gap-1 text-[10px] px-1.5 py-0">כלי חיצוני</Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{tool.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Related Resources from DB */}
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

        {/* Bottom print button */}
        <div className="flex justify-center pt-2">
          <Button variant="outline" className="gap-2" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            הפקת דוח להדפסה
          </Button>
        </div>
      </div>
    );
  }

  // ─── Scenario List ───
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">תרחישים נפוצים</h3>
      <p className="text-sm text-muted-foreground">בחרו תרחיש שמתאר את המצב שלכם כדי לקבל מידע ממוקד</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenarios.map((s) => {
          const urgency = (s.urgency_level as string) || "medium";
          const config = URGENCY_CONFIG[urgency as keyof typeof URGENCY_CONFIG];
          return (
            <Card
              key={s.id}
              className="cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
              onClick={() => selectScenario(s)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold">{s.title}</h4>
                  {urgency === "high" && (
                    <Badge variant="destructive" className="text-[10px] shrink-0">דחוף</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {(s.tags as string[])?.slice(0, 3).map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ScenarioExplorer;
