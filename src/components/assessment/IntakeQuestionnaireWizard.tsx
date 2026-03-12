import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, Printer, RotateCcw, Download, Shield, ExternalLink } from "lucide-react";
import {
  intakeSections,
  adlActivities,
  adlOptions,
  caregiverBurdenItems,
  burdenScaleOptions,
  type IntakeQuestion,
} from "@/lib/intake-questionnaire";
import { buildIntakeReport, buildPrintableHtml, type IntakeAnswers } from "@/lib/intake-report";
import { modules } from "@/lib/modules-data";
import { useNavigate } from "react-router-dom";

const yesNoLabel = (v: string) => (v === "yes" ? "כן" : v === "no" ? "לא" : v === "unsure" ? "לא בטוח/ה" : v);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidIsraeliMobile(phone: string) {
  // loose validation: 05Xxxxxxxx with optional hyphen/spaces
  const normalized = phone.replace(/\s|-/g, "");
  return /^05\d{8}$/.test(normalized);
}

const IntakeQuestionnaireWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<IntakeAnswers>({
    adl_table: {},
    q60_burden_scale: {},
    children_table: [],
  });
  const [showReport, setShowReport] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const sections = intakeSections;
  const current = sections[step];

  const progress = useMemo(() => {
    const pct = Math.round(((step + (showReport ? 1 : 0)) / (sections.length + 1)) * 100);
    return Math.min(100, Math.max(0, pct));
  }, [step, showReport, sections.length]);

  const requiredUnansweredCount = useMemo(() => {
    const unanswered = current.questions.filter((q) => {
      if (!q.required) return false;
      const v = answers[q.id];
      if (q.type === "adl_table") {
        const table = (answers["adl_table"] as Record<string, string> | undefined) ?? {};
        return adlActivities.some((a) => !table[a.id]);
      }
      if (q.type === "scale_matrix") {
        const m = (answers["q60_burden_scale"] as Record<string, string> | undefined) ?? {};
        return caregiverBurdenItems.some((i) => m[i.id] === undefined);
      }
      if (q.type === "children_table") return false;
      if (Array.isArray(v)) return v.length === 0;
      return v === undefined || v === null || v === "";
    });
    return unanswered.length;
  }, [answers, current.questions]);

  const validationErrors = useMemo(() => {
    const errs: string[] = [];
    if (current.id === "filler") {
      const email = String(answers["q6_email"] ?? "");
      const phone = String(answers["q4_mobile"] ?? "");
      if (email && !isValidEmail(email)) errs.push("כתובת אימייל לא תקינה");
      if (phone && !isValidIsraeliMobile(phone)) errs.push("מספר נייד לא תקין (צפוּי: 05XXXXXXXX)");
    }
    if (current.id === "consent") {
      if (answers["consent_text"] === "disagree") errs.push("כדי להפיק דוח, נדרשת הסכמה להצהרה.");
    }
    return errs;
  }, [answers, current.id]);

  const setValue = (id: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const toggleMulti = (id: string, value: string) => {
    setAnswers((prev) => {
      const currentVal = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      const exists = currentVal.includes(value);
      const nextVal = exists ? currentVal.filter((x) => x !== value) : [...currentVal, value];
      return { ...prev, [id]: nextVal };
    });
  };

  const canContinue = requiredUnansweredCount === 0 && validationErrors.length === 0;

  const next = () => {
    if (!canContinue) return;
    if (step < sections.length - 1) {
      setStep((s) => s + 1);
    } else {
      setShowReport(true);
    }
  };

  const prev = () => {
    if (showReport) {
      setShowReport(false);
      return;
    }
    if (step > 0) setStep((s) => s - 1);
  };

  const report = useMemo(() => {
    if (!showReport) return null;
    return buildIntakeReport(sections, answers);
  }, [answers, sections, showReport]);

  const handlePrint = () => {
    if (!report) return;
    const html = buildPrintableHtml(report, sections, answers);
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
    } else {
      // Fallback: open in same window using iframe
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.zIndex = "9999";
      iframe.style.border = "none";
      iframe.style.background = "#fff";
      document.body.appendChild(iframe);
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
      }
    }
  };

  const handleDownload = () => {
    if (!report) return;
    const html = buildPrintableHtml(report, sections, answers);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `דוח-אבחון-${new Date().toLocaleDateString("he-IL").replace(/\//g, "-")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setAnswers({ adl_table: {}, q60_burden_scale: {}, children_table: [] });
    setStep(0);
    setShowReport(false);
    setAcceptedPrivacy(false);
  };

  const renderSingle = (q: IntakeQuestion) => (
    <div className="space-y-2">
      {(q.options ?? []).map((opt) => (
        <Button
          key={opt.value}
          variant={answers[q.id] === opt.value ? "default" : "outline"}
          className="w-full justify-start text-start h-auto py-3"
          onClick={() => setValue(q.id, opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );

  const renderMulti = (q: IntakeQuestion) => {
    const selected = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
    return (
      <div className="space-y-2">
        {(q.options ?? []).map((opt) => (
          <label
            key={opt.value}
            className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <Checkbox checked={selected.includes(opt.value)} onCheckedChange={() => toggleMulti(q.id, opt.value)} />
            <span className="text-sm leading-6">{opt.label}</span>
          </label>
        ))}
      </div>
    );
  };

  const renderText = (q: IntakeQuestion) => (
    <Input
      value={String(answers[q.id] ?? "")}
      onChange={(e) => setValue(q.id, e.target.value)}
      placeholder={q.placeholder}
    />
  );

  const renderTextarea = (q: IntakeQuestion) => (
    <Textarea
      value={String(answers[q.id] ?? "")}
      onChange={(e) => setValue(q.id, e.target.value)}
      placeholder={q.placeholder}
      className="min-h-28"
    />
  );

  const renderDate = (q: IntakeQuestion) => (
    <Input type="date" value={String(answers[q.id] ?? "")} onChange={(e) => setValue(q.id, e.target.value)} />
  );

  const renderAdlTable = () => {
    const table = ((answers["adl_table"] as Record<string, string>) ?? {}) as Record<string, string>;
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">לכל פעולה בחרו את רמת התלות.</div>
        <div className="space-y-2">
          {adlActivities.map((a) => (
            <div key={a.id} className="rounded-lg border p-3">
              <div className="font-medium mb-2">{a.label}</div>
              <div className="grid gap-2 md:grid-cols-3">
                {adlOptions.map((opt) => (
                  <Button
                    key={opt.value}
                    variant={table[a.id] === opt.value ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setValue("adl_table", { ...table, [a.id]: opt.value })}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBurdenMatrix = () => {
    const m = ((answers["q60_burden_scale"] as Record<string, string>) ?? {}) as Record<string, string>;
    return (
      <div className="space-y-3">
        <div className="text-sm text-muted-foreground">0 = בכלל לא, 4 = מאוד</div>
        <div className="space-y-2">
          {caregiverBurdenItems.map((item) => (
            <div key={item.id} className="rounded-lg border p-3">
              <div className="font-medium mb-2">{item.label}</div>
              <div className="grid grid-cols-5 gap-2">
                {burdenScaleOptions.map((opt) => (
                  <Button
                    key={opt.value}
                    variant={m[item.id] === opt.value ? "default" : "outline"}
                    className="h-10"
                    onClick={() => setValue("q60_burden_scale", { ...m, [item.id]: opt.value })}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChildrenTable = () => {
    const rows = (answers["children_table"] as Array<Record<string, string>>) ?? [];
    const updateRow = (idx: number, patch: Record<string, string>) => {
      const nextRows = rows.map((r, i) => (i === idx ? { ...r, ...patch } : r));
      setValue("children_table", nextRows);
    };

    const addRow = () => setValue("children_table", [...rows, { name: "", id: "", birth_year: "", address: "", relation: "" }]);
    const removeRow = (idx: number) => setValue("children_table", rows.filter((_, i) => i !== idx));

    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">מלאו רק אם זה נדרש לטפסים (אפשר לדלג).</p>
        <div className="space-y-2">
          {rows.map((row, idx) => (
            <Card key={idx} className="border">
              <CardHeader className="py-4">
                <CardTitle className="text-base flex items-center justify-between">
                  ילד/ה #{idx + 1}
                  <Button variant="ghost" size="sm" onClick={() => removeRow(idx)}>
                    הסר
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                <Input placeholder="שם מלא" value={row.name} onChange={(e) => updateRow(idx, { name: e.target.value })} />
                <Input placeholder="תעודת זהות" value={row.id} onChange={(e) => updateRow(idx, { id: e.target.value })} />
                <Input placeholder="שנת לידה" value={row.birth_year} onChange={(e) => updateRow(idx, { birth_year: e.target.value })} />
                <Input placeholder="קרבה (בן/בת)" value={row.relation} onChange={(e) => updateRow(idx, { relation: e.target.value })} />
                <div className="md:col-span-2">
                  <Input placeholder="כתובת" value={row.address} onChange={(e) => updateRow(idx, { address: e.target.value })} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="outline" onClick={addRow}>
          הוסף ילד/ה
        </Button>
      </div>
    );
  };

  const renderQuestion = (q: IntakeQuestion) => {
    if (q.type === "adl_table") return renderAdlTable();
    if (q.type === "scale_matrix") return renderBurdenMatrix();
    if (q.type === "children_table") return renderChildrenTable();

    switch (q.type) {
      case "single":
      case "yes_no_unsure":
        return renderSingle(q);
      case "multi":
        return renderMulti(q);
      case "tel":
      case "email":
      case "number":
      case "text":
        return renderText(q);
      case "date":
        return renderDate(q);
      case "textarea":
        return renderTextarea(q);
      default:
        return null;
    }
  };

  if (showReport && report) {
    const recommendedModules = report.recommendedModuleIds
      .map((id) => modules.find((m) => m.id === id))
      .filter(Boolean);

    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="space-y-3">
            <Progress value={100} />
            <CardTitle className="text-center text-xl flex items-center justify-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-success" />
              הדוח שלך
            </CardTitle>
            <p className="text-center text-muted-foreground">
              זהו דוח הכוונה (לא אבחון רפואי ולא ייעוץ משפטי) המבוסס על התשובות שסימנת.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">רמת דחיפות</div>
              <div className="text-lg font-bold">{report.urgencyLevel}</div>
              <div className="text-xs text-muted-foreground mt-1">{report.createdAt}</div>
            </div>
            <div className="rounded-lg border p-4 md:col-span-2">
              <div className="text-xs text-muted-foreground">צעדים מומלצים עכשיו</div>
              <ul className="mt-2 list-disc pr-5 space-y-1 text-sm">
                {report.nextSteps.length === 0 ? (
                  <li className="text-muted-foreground">לא זוהו צעדים דחופים — ניתן להתחיל מהמודולים המומלצים.</li>
                ) : (
                  report.nextSteps.map((s, i) => (
                    <li key={i} className="text-foreground">
                      {s}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="font-semibold mb-2">מסמכים חסרים</div>
              {report.missingDocuments.length === 0 ? (
                <p className="text-sm text-muted-foreground">לא סומנו מסמכים חסרים.</p>
              ) : (
                <ul className="list-disc pr-5 space-y-1 text-sm">
                  {report.missingDocuments.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-lg border p-4">
              <div className="font-semibold mb-2">מודולים מומלצים להתחלה</div>
              {recommendedModules.length === 0 ? (
                <p className="text-sm text-muted-foreground">לא זוהו המלצות חד-משמעיות.</p>
              ) : (
                <div className="space-y-2">
                  {recommendedModules.map((m) => (
                    <Button
                      key={m!.id}
                      variant="outline"
                      className="w-full justify-start text-start h-auto py-3"
                      onClick={() => navigate(`/module/${m!.id}`)}
                    >
                      <div>
                        <div className="font-semibold">{m!.title}</div>
                        <div className="text-xs text-muted-foreground">{m!.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1" onClick={handlePrint}>
              <ExternalLink className="h-4 w-4 ml-1" />
              פתח בדפדפן / הדפס
            </Button>
            <Button className="flex-1" variant="secondary" onClick={handleDownload}>
              <Download className="h-4 w-4 ml-1" />
              שמור במחשב (HTML)
            </Button>
            <Button variant="outline" className="flex-1" onClick={reset}>
              <RotateCcw className="h-4 w-4 ml-1" />
              התחל מחדש
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Privacy notice screen before starting
  if (!acceptedPrivacy) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            הצהרת פרטיות ושמירת נתונים
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-4">
            <h3 className="font-semibold text-lg">הגנת הפרטיות שלכם חשובה לנו</h3>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                <strong>בהתאם לתיקון 13 לחוק הגנת הפרטיות, התשמ"א-1981</strong>, אנו מודיעים כי:
              </p>
              <ul className="list-disc pr-5 space-y-2">
                <li>
                  <strong>הנתונים נשמרים אך ורק בדפדפן שלכם (Local Storage)</strong> — המידע לא נשלח לשרתים חיצוניים ולא נאגר במאגרי מידע.
                </li>
                <li>
                  <strong>אין רישום או זיהוי</strong> — אין צורך בהתחברות או מסירת פרטים מזהים לשימוש בשאלון.
                </li>
                <li>
                  <strong>מחיקת הנתונים</strong> — ניקוי נתוני הדפדפן (Clear Browsing Data) ימחק את כל המידע שנשמר.
                </li>
                <li>
                  <strong>הדוח המופק</strong> — ניתן להדפיסו או לשמור אותו כקובץ במחשבכם. הוא לא נשמר באתר.
                </li>
              </ul>
              <p className="text-muted-foreground">
                המידע בשאלון ובדוח מיועד להכוונה בלבד ואינו מהווה ייעוץ רפואי, משפטי או מקצועי.
              </p>
            </div>
          </div>

          <label className="flex items-start gap-3 p-4 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer">
            <Checkbox
              checked={false}
              onCheckedChange={() => setAcceptedPrivacy(true)}
              className="mt-0.5"
            />
            <span className="text-sm leading-6">
              קראתי והבנתי את הצהרת הפרטיות ואני מאשר/ת להמשיך לשאלון
            </span>
          </label>

          <Button onClick={() => setAcceptedPrivacy(true)} className="w-full" size="lg">
            <ArrowLeft className="h-4 w-4 mr-1" />
            התחל בשאלון
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="space-y-3">
          <Progress value={progress} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-muted-foreground">שלב {step + 1} מתוך {sections.length}</div>
              <CardTitle className="text-lg">{current.title}</CardTitle>
              {current.description && <p className="text-sm text-muted-foreground mt-1">{current.description}</p>}
            </div>
            <div className="hidden md:block text-xs text-muted-foreground text-left">
              {requiredUnansweredCount > 0 ? `נותרו ${requiredUnansweredCount} שדות חובה` : "כל שדות החובה מולאו"}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {validationErrors.length > 0 && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
            <div className="font-semibold">יש לשים לב:</div>
            <ul className="list-disc pr-5 mt-1 space-y-1">
              {validationErrors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-6">
          {current.questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium">
                  {q.label}
                  {q.required && <span className="text-destructive"> *</span>}
                </div>
              </div>
              {q.helpText && <div className="text-xs text-muted-foreground">{q.helpText}</div>}
              {renderQuestion(q)}
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="ghost" onClick={prev} disabled={step === 0 && !showReport}>
            <ArrowRight className="h-4 w-4 ml-1" />
            הקודם
          </Button>
          <Button onClick={next} disabled={!canContinue}>
            {step === sections.length - 1 ? "הצג דוח" : "הבא"}
            {step < sections.length - 1 && <ArrowLeft className="h-4 w-4 mr-1" />}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          טיפ: אפשר למלא בקצב שלכם; הדוח מופק בסוף, וכולל כפתור הדפסה/שמירה כ‑PDF.
        </p>
      </CardContent>
    </Card>
  );
};

export default IntakeQuestionnaireWizard;
