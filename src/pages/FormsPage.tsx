import { useState, useEffect } from "react";
import { Download, Printer, X } from "lucide-react";
import PdfViewerComponent, { downloadPdf, printPdf } from "@/components/PdfViewer";

interface Form {
  id: string;
  title: string;
  filename: string;
  category: string;
}

const ALL_FORMS: Form[] = [
  // העסקת עובד זר
  { id: "1", title: "בקשה לביצוע הערכת תלות להיתר לעובד זר", filename: "form-01-dependency-assessment.pdf", category: "העסקת עובד זר" },
  { id: "2", title: "בקשה להארכת היתר העסקת עובדים זרים – תצהיר", filename: "form-02-permit-extension.pdf", category: "העסקת עובד זר" },
  { id: "3", title: "בקשה להיתר העסקת עובד זר", filename: "form-03-permit-request.pdf", category: "העסקת עובד זר" },
  { id: "4", title: "דף מידע למעסיק עובד זר בסיעוד", filename: "form-05-employer-info-sheet.pdf", category: "העסקת עובד זר" },
  { id: "9", title: "התחייבות מעסיק – עובד", filename: "form-09-employer-commitment-worker.pdf", category: "העסקת עובד זר" },
  { id: "10", title: "התחייבות מעסיק – רשות", filename: "form-10-employer-commitment-authority.pdf", category: "העסקת עובד זר" },
  { id: "33", title: "נספח היתר קטין", filename: "form-33-minor-permit-appendix.pdf", category: "העסקת עובד זר" },
  // ייפוי כוח
  { id: "5", title: "דוגמה לטופס ייפוי כוח מתמשך", filename: "form-04-power-of-attorney-example.pdf", category: "ייפוי כוח" },
  { id: "27", title: "ייפוי כוח מתמשך", filename: "form-27-lasting-power-of-attorney.pdf", category: "ייפוי כוח" },
  // ביטוח וקופות חולים
  { id: "6", title: "תביעת הראל – כללית", filename: "form-06-harel-clalit-claim.pdf", category: "ביטוח וקופות חולים" },
  { id: "8", title: "תנאים מזכים – הראל", filename: "form-08-harel-qualifying-conditions.pdf", category: "ביטוח וקופות חולים" },
  { id: "16", title: "הערכה תפקודית – הראל", filename: "form-16-functional-assessment-harel.pdf", category: "ביטוח וקופות חולים" },
  { id: "22", title: "תביעת סיעוד – הראל", filename: "form-22-nursing-claim-harel.pdf", category: "ביטוח וקופות חולים" },
  { id: "23", title: "תביעת סיעוד – ביטוח לאומי", filename: "form-23-nursing-claim-bituach-leumi.pdf", category: "ביטוח וקופות חולים" },
  { id: "29", title: "כללי תביעה – הראל", filename: "form-29-harel-claim-rules.pdf", category: "ביטוח וקופות חולים" },
  { id: "34", title: "גמלת סיעוד 2600", filename: "form-34-nursing-benefit-2600.pdf", category: "ביטוח וקופות חולים" },
  // סודיות והרשאות
  { id: "7", title: "סודיות – מרשם אוכלוסין", filename: "form-07-confidentiality-population-auth.pdf", category: "סודיות והרשאות" },
  { id: "11", title: "סודיות – ביטוח לאומי", filename: "form-11-confidentiality-bituach-leumi.pdf", category: "סודיות והרשאות" },
  { id: "17", title: "סודיות – עובד זר", filename: "form-17-confidentiality-foreign-worker.pdf", category: "סודיות והרשאות" },
  { id: "18", title: "סודיות – תביעת הראל", filename: "form-18-confidentiality-harel-claim.pdf", category: "סודיות והרשאות" },
  // חוזי העסקה
  { id: "12", title: "חוזה העסקה 1", filename: "form-12-employment-contract-1.pdf", category: "חוזי העסקה" },
  { id: "13", title: "חוזה העסקה 2", filename: "form-13-employment-contract-2.pdf", category: "חוזי העסקה" },
  { id: "14", title: "חוזה – לא מטופל", filename: "form-14-contract-non-patient.pdf", category: "חוזי העסקה" },
  { id: "15", title: "חוזה סטנדרטי", filename: "form-15-standard-contract.pdf", category: "חוזי העסקה" },
  { id: "32", title: "נספח חוזה", filename: "form-32-contract-appendix.pdf", category: "חוזי העסקה" },
  // פרוטוקולים ותוכניות
  { id: "19", title: "פרוטוקול שימוע – עברית", filename: "form-19-hearing-protocol-hebrew.pdf", category: "פרוטוקולים ותוכניות" },
  { id: "24", title: "פרוטוקול שימוע – אנגלית", filename: "form-24-hearing-protocol-english.pdf", category: "פרוטוקולים ותוכניות" },
  { id: "25", title: "תוכנית יומית – עברית", filename: "form-25-daily-plan-hebrew.pdf", category: "פרוטוקולים ותוכניות" },
  { id: "26", title: "תוכנית יומית – אנגלית", filename: "form-26-daily-plan-english.pdf", category: "פרוטוקולים ותוכניות" },
  // ציפיות וזכויות
  { id: "20", title: "ציפיות – אנגלית", filename: "form-20-expectations-english.pdf", category: "ציפיות וזכויות" },
  { id: "21", title: "ציפיות – עברית", filename: "form-21-expectations-hebrew.pdf", category: "ציפיות וזכויות" },
  { id: "30", title: "ניכויים חובה", filename: "form-30-mandatory-deductions.pdf", category: "שכר וניכויים" },
  { id: "31", title: "ניכויי שכר", filename: "form-31-salary-deductions.pdf", category: "שכר וניכויים" },
  { id: "35", title: "אישור שכר חודשי", filename: "form-35-monthly-salary-confirmation.pdf", category: "שכר וניכויים" },
  // אחר
  { id: "28", title: "בקשה לטיפול מוסדי", filename: "form-28-institutional-care-request.pdf", category: "אחר" },
];

const CATEGORIES = [...new Set(ALL_FORMS.map((f) => f.category))];


export default function FormsPage() {
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState<Form | null>(null);

  const filtered = ALL_FORMS.filter(
    (f) => f.title.includes(search) || f.category.includes(search)
  );

  const groupedByCategory = CATEGORIES.reduce<Record<string, Form[]>>(
    (acc, cat) => {
      const items = filtered.filter((f) => f.category === cat);
      if (items.length > 0) acc[cat] = items;
      return acc;
    },
    {}
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenForm(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const pdfUrl = openForm ? `/forms/${openForm.filename}` : "";

  const handlePrint = () => {
    if (!openForm) return;
    printPdf(pdfUrl);
  };

  const handleDownload = () => {
    if (!openForm) return;
    downloadPdf(pdfUrl, openForm.title + ".pdf");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-muted/30 p-0">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 bg-background border-b">
        <h1 className="text-2xl font-bold text-foreground">טפסים</h1>
        <a href="/knowledge-center" className="flex items-center gap-1.5 text-foreground no-underline text-sm">
          חזרה ←
        </a>
      </div>

      {/* Content */}
      <div className="px-8 py-7 max-w-[1100px] mx-auto">
        {/* Search */}
        <div className="relative mb-8 max-w-[300px]">
          <input
            type="text"
            placeholder="חיפוש..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2.5 px-10 pr-10 rounded-lg border border-input bg-background text-sm outline-none"
            style={{ direction: "rtl" }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-base pointer-events-none">
            🔍
          </span>
        </div>

        {/* Categories */}
        {Object.keys(groupedByCategory).length === 0 ? (
          <p className="text-muted-foreground text-center mt-16">לא נמצאו טפסים תואמים</p>
        ) : (
          Object.entries(groupedByCategory).map(([category, forms]) => (
            <div key={category} className="mb-9">
              <h2 className="text-base font-bold text-primary mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {forms.map((form) => (
                  <button
                    key={form.id}
                    onClick={() => setOpenForm(form)}
                    className="flex items-center gap-3 p-3.5 bg-background border border-border rounded-lg cursor-pointer text-right transition-all hover:border-primary hover:shadow-md text-sm text-foreground"
                    style={{ direction: "rtl" }}
                  >
                    <span className="text-xl shrink-0">📄</span>
                    <span className="leading-snug">{form.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {openForm && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenForm(null);
          }}
          className="fixed inset-0 bg-black/55 flex items-center justify-center z-50 p-5"
        >
          <div className="bg-background rounded-xl w-full max-w-[900px] h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b shrink-0" style={{ direction: "rtl" }}>
              <span className="font-bold text-sm text-foreground">{openForm.title}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-primary-foreground border-none rounded-md cursor-pointer text-xs font-medium"
                >
                  <Download className="h-3.5 w-3.5" />
                  הורד
                </button>
                <button
                  onClick={handlePrint}
                  title="הדפס"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-muted text-foreground border border-border rounded-md cursor-pointer text-xs"
                >
                  <Printer className="h-3.5 w-3.5" />
                  הדפסה
                </button>
                <button
                  onClick={() => setOpenForm(null)}
                  title="סגור"
                  className="flex items-center justify-center w-8 h-8 bg-transparent border border-border rounded-md cursor-pointer text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden relative">
              <PdfViewerComponent key={openForm.id} url={pdfUrl} title={openForm.title} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
