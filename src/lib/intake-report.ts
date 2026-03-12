import type { IntakeSection } from "@/lib/intake-questionnaire";
import { adlActivities, caregiverBurdenItems } from "@/lib/intake-questionnaire";
import { modules } from "@/lib/modules-data";

export type IntakeAnswers = Record<string, unknown>;

const asString = (v: unknown) => (typeof v === "string" ? v : "");
const asStringArray = (v: unknown) => (Array.isArray(v) ? (v.filter((x) => typeof x === "string") as string[]) : []);

export interface IntakeReportData {
  createdAt: string;
  familyName: string;
  elderName: string;
  urgencyLevel: "נמוך" | "בינוני" | "גבוה" | "קריטי";
  missingDocuments: string[];
  recommendedModuleIds: string[];
  nextSteps: string[];
  notes: string[];
}

export function buildIntakeReport(sections: IntakeSection[], answers: IntakeAnswers): IntakeReportData {
  const createdAt = new Date().toLocaleString("he-IL");
  const familyName = asString(answers["q2_filler_name"]) || "";
  const elderName = asString(answers["q8_elder_full_name"]) || "";

  // Missing documents
  const docsSection = sections.find((s) => s.id === "docs");
  const missingDocuments: string[] = [];
  (docsSection?.questions ?? []).forEach((q) => {
    const v = asString(answers[q.id]);
    if (v === "missing" || v === "later" || v === "unsure") missingDocuments.push(q.label);
  });

  // Urgency heuristic
  const warningSigns = asStringArray(answers["q48_warning_signs"]);
  const dangerAlone = asString(answers["q45_danger_alone"]);
  const needs247 = asString(answers["q47_needs_24_7"]);
  const financial = asString(answers["q78_financial_state"]);

  let urgencyScore = 0;
  if (warningSigns.includes("falls") || warningSigns.includes("wandering") || warningSigns.includes("delirium")) urgencyScore += 2;
  if (dangerAlone === "yes") urgencyScore += 2;
  if (needs247 === "yes") urgencyScore += 2;
  if (financial === "critical") urgencyScore += 1;

  const urgencyLevel: IntakeReportData["urgencyLevel"] =
    urgencyScore >= 5 ? "קריטי" : urgencyScore >= 3 ? "גבוה" : urgencyScore >= 1 ? "בינוני" : "נמוך";

  // Module recommendations (lightweight routing)
  const recommended = new Set<string>();

  // Legal
  const poa = asString(answers["q7_poa_or_guardianship"]);
  const legalDocs = asStringArray(answers["q85_legal_docs"]);
  if (poa === "no" || poa === "unsure" || legalDocs.includes("none")) recommended.add("chapter-4");

  // Rights / claims
  const niClaim = asString(answers["q67_national_insurance_claim"]);
  const bureaucracy = asStringArray(answers["q70_bureaucracy_difficulties"]);
  if (niClaim.startsWith("not_submitted") || niClaim === "rejected" || bureaucracy.length > 0) recommended.add("chapter-5");

  // Medical / cognition
  const medicalStatus = asString(answers["q24_medical_status"]);
  const cognitionLevel = asString(answers["q50_cognition_level"]);
  if (medicalStatus && medicalStatus !== "stable" && medicalStatus !== "unknown") recommended.add("chapter-2");
  if (cognitionLevel === "dx" || cognitionLevel === "significant" || cognitionLevel === "confusion") recommended.add("chapter-2");

  // Safety / home
  if (warningSigns.length > 0 && !warningSigns.includes("none")) recommended.add("chapter-1");

  // Care arrangement
  const careType = asString(answers["q55_has_caregiver_type"]);
  const workerIssues = asStringArray(answers["q56_foreign_worker_issues"]);
  if (careType === "searching" || careType === "family_only" || workerIssues.length > 0) recommended.add("chapter-6");

  // Burnout
  const burdenScores = (answers["q60_burden_scale"] as Record<string, string> | undefined) ?? {};
  const burdenSum = caregiverBurdenItems.reduce((sum, item) => sum + (Number(burdenScores[item.id] ?? 0) || 0), 0);
  if (burdenSum >= 10 || asString(answers["q61_need_help_now"]) === "yes") recommended.add("chapter-10");

  // Housing transition
  const consider = asString(answers["q90_consider_institution"]);
  if (consider === "serious" || consider === "maybe") recommended.add("chapter-9");

  // End-of-life
  const eolTalk = asString(answers["q94_end_of_life_talk"]);
  if (eolTalk && eolTalk !== "clear") recommended.add("chapter-11");

  // ADL dependency => daily care module
  const adl = (answers["adl_table"] as Record<string, string> | undefined) ?? {};
  const dependentCount = adlActivities.reduce(
    (acc, a) => acc + (adl[a.id] === "dependent" || adl[a.id] === "partial" ? 1 : 0),
    0,
  );
  if (dependentCount >= 3) recommended.add("chapter-7");

  const recommendedModuleIds = Array.from(recommended);

  const nextSteps: string[] = [];
  if (urgencyLevel === "קריטי" || urgencyLevel === "גבוה") {
    nextSteps.push("אם יש סכנה מיידית — פנו לגורם רפואי/חירום בהתאם לצורך.");
  }
  if (missingDocuments.length > 0) {
    nextSteps.push("השלימו מסמכים חסרים כדי להאיץ תהליכים ולמנוע עיכובים.");
  }
  if (recommended.has("chapter-5")) {
    nextSteps.push("מומלץ למפות זכויות ולוודא סטטוס תביעה/הגשה לביטוח לאומי.");
  }
  if (recommended.has("chapter-4")) {
    nextSteps.push("מומלץ לבדוק תשתית משפטית (ייפוי כוח מתמשך/אפוטרופסות) לפי הצורך.");
  }

  const notes: string[] = [];
  if (asString(answers["q98_help_type"])) notes.push("סוגי עזרה שסומנו: " + asStringArray(answers["q98_help_type"]).join(", "));

  return {
    createdAt,
    familyName,
    elderName,
    urgencyLevel,
    missingDocuments,
    recommendedModuleIds,
    nextSteps,
    notes,
  };
}

export function buildPrintableHtml(report: IntakeReportData, sections: IntakeSection[], answers: IntakeAnswers) {
  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const recommendedList =
    report.recommendedModuleIds.length === 0
      ? `<p style="margin: 0; color: #555;">לא זוהו המלצות חד-משמעיות — אפשר לעיין בכל הפרקים לפי הצורך.</p>`
      : `<ol style="margin: 0; padding-inline-start: 20px;">${report.recommendedModuleIds
          .map((modId) => {
            const mod = modules.find((m) => m.id === modId);
            if (!mod) return "";
            return `<li style="margin: 0 0 8px 0;">
              <div style="font-weight: 700;">${escapeHtml(mod.title)}</div>
              <div style="font-size: 12px; color: #555;">${escapeHtml(mod.description)}</div>
            </li>`;
          })
          .join("")}</ol>`;

  const missingDocsHtml =
    report.missingDocuments.length === 0
      ? `<p style="margin: 0; color: #555;">אין מסמכים חסרים שסומנו.</p>`
      : `<ul style="margin: 0; padding-inline-start: 18px;">${report.missingDocuments
          .map((d) => `<li style="margin: 0 0 6px 0;">${escapeHtml(d)}</li>`)
          .join("")}</ul>`;

  const answersHtml = sections
    .map((section) => {
      const items = section.questions
        .map((q) => {
          const v = answers[q.id];
          if (v === undefined || v === null || v === "") return null;
          const val = Array.isArray(v) ? v.join(", ") : typeof v === "object" ? "(נתונים מובנים)" : String(v);
          return `<div style="margin: 0 0 10px 0;">
            <div style="font-weight: 700;">${escapeHtml(q.label)}</div>
            <div style="color: #333;">${escapeHtml(val)}</div>
          </div>`;
        })
        .filter(Boolean)
        .join("");

      if (!items) return "";
      return `<div style="page-break-inside: avoid; margin-top: 16px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px;">${escapeHtml(section.title)}</h3>
        ${items}
      </div>`;
    })
    .join("");

  return `<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>דוח אבחון והכוונה</title>
    <style>
      @page { margin: 16mm; }
      body { font-family: Arial, sans-serif; direction: rtl; padding: 0; color: #111; }
      h1 { font-size: 20px; margin: 0 0 4px 0; }
      h2 { font-size: 14px; margin: 18px 0 10px 0; }
      .meta { font-size: 12px; color: #555; margin-bottom: 12px; }
      .box { border: 1px solid #ddd; border-radius: 10px; padding: 14px; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .pill { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #f3f3f3; font-size: 12px; }
      .divider { height: 1px; background: #eee; margin: 14px 0; }
      .muted { color: #555; font-size: 12px; }
      @media print { .no-print { display: none !important; } }
    </style>
  </head>
  <body>
    <div class="no-print" style="margin-bottom: 12px;">
      <button onclick="window.print()" style="padding: 10px 12px; border-radius: 10px; border: 1px solid #ccc; background: #fff; cursor: pointer;">הדפסה / שמירה כ‑PDF</button>
    </div>

    <h1>דוח אבחון והכוונה למשפחות מטפלות</h1>
    <div class="meta">נוצר בתאריך: ${escapeHtml(report.createdAt)}${report.elderName ? ` | קשיש/ה: ${escapeHtml(report.elderName)}` : ""}${report.familyName ? ` | איש קשר: ${escapeHtml(report.familyName)}` : ""}</div>

    <div class="box">
      <div class="grid">
        <div>
          <h2 style="margin-top: 0;">רמת דחיפות</h2>
          <div class="pill">${escapeHtml(report.urgencyLevel)}</div>
        </div>
        <div>
          <h2 style="margin-top: 0;">צעדים מומלצים עכשיו</h2>
          <ul style="margin: 0; padding-inline-start: 18px;">
            ${report.nextSteps.map((s) => `<li style="margin: 0 0 6px 0;">${escapeHtml(s)}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="divider"></div>

      <h2>מסמכים חסרים</h2>
      ${missingDocsHtml}

      <div class="divider"></div>

      <h2>פרקים מומלצים להתחלה</h2>
      ${recommendedList}

      <div class="divider"></div>

      <h2>תשובות שנמסרו (לסיכום)</h2>
      ${answersHtml}

      <div class="divider"></div>
      <div class="muted">הבהרה: המידע בדוח אינו אבחון רפואי ואינו ייעוץ משפטי — מטרתו הכוונה, סדר וצעדים פרקטיים.</div>
    </div>
  </body>
</html>`;
}
