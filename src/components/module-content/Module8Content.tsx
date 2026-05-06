import { CheckCircle, AlertTriangle, Home, Building, DollarSign, ClipboardList, MessageCircle, Users, Presentation, ExternalLink, FileText, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const ResourcesPanel = () => (
  <div className="border rounded-lg p-4 bg-primary/5 border-primary/30 space-y-2">
    <h4 className="font-bold text-base md:text-lg flex items-center gap-2 text-foreground">
      <Presentation className="h-5 w-5 text-primary" />
      לרשותכם בפרק זה מצגות וכלים מלווים:
    </h4>
    <ul className="space-y-1.5 text-sm">
      <li>
        <a href="https://drive.google.com/file/d/1GwqCAPfS2-dkLTqJ9PXd63KNWJEkTRts/preview" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
          <ExternalLink className="h-3.5 w-3.5" />
          מצגת: מדריך לקוד סיעודי – אשפוז במוסד
        </a>
        <span className="text-muted-foreground"> — זכאות, מבחן הכנסות, תהליך הקבלה ומימון</span>
      </li>
      <li>
        <a href="https://drive.google.com/file/d/1k_kfvnmM5M1lJA_SapxOmjs4bnKNN_ud/preview" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
          <ExternalLink className="h-3.5 w-3.5" />
          מצגת: מדריך למשפחה – דיור מוגן, בתי אבות ואשפוז
        </a>
      </li>
      <li>
        <a href="https://cjtnsspg.gensparkspace.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
          <ExternalLink className="h-3.5 w-3.5" />
          מצגת: מדריך למשפחה – דיור מוגן
        </a>
        <span className="text-muted-foreground"> — בחירת דיור מוגן והתאמה למשפחה</span>
      </li>
      <li>
        <a href="https://drive.google.com/file/d/1pHX6tf6vWZrduScute9yUBVCy49U23yV/preview" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
          <ExternalLink className="h-3.5 w-3.5" />
          מצגת: תפקיד העובדת הסוציאלית (עו"ס)
        </a>
        <span className="text-muted-foreground"> — תסקיר סוציאלי, סידור מוסדי וליווי המשפחה</span>
      </li>
      <li>
        <a href="https://me.health.gov.il/nursing-calculator/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
          <Calculator className="h-3.5 w-3.5" />
          מחשבון קוד סיעודי (משרד הבריאות)
        </a>
      </li>
      <li>
        <a href="/forms/form-28-institutional-care-request.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
          <FileText className="h-3.5 w-3.5" />
          טופס: בקשה למסגרת מוסדית – שחרור מבית חולים
        </a>
      </li>
      <li>
        <Link to="/tools#emergency-protocol" className="text-primary hover:underline inline-flex items-center gap-1">
          <ExternalLink className="h-3.5 w-3.5" />
          כלי: פרוטוקול חירום – כרטיס מטופל לקליטה במוסד
        </Link>
      </li>
      <li>
        <Link to="/tools#blue-folder" className="text-primary hover:underline inline-flex items-center gap-1">
          <ExternalLink className="h-3.5 w-3.5" />
          כלי: תיק כחול – ריכוז מסמכים לקראת מעבר
        </Link>
      </li>
    </ul>
  </div>
);

interface Module8ContentProps {
  subId: string;
}

const InfoBox = ({ title, children, variant = "info" }: { title: string; children: React.ReactNode; variant?: "info" | "warning" | "tip" }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800",
    warning: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
    tip: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800",
  };
  return (
    <div className={`border rounded-lg p-4 ${styles[variant]}`}>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
};

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 pr-4">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const Module8Content = ({ subId }: Module8ContentProps) => {
  switch (subId) {
    case "9.1":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">מתי לשקול מעבר מהבית למסגרת?</h3>

          <ResourcesPanel />

          <InfoBox title="עיקרון מנחה" variant="info">
            <p>המטרה אינה לוותר על הבית, אלא לבחור במסגרת שמספקת בטיחות, טיפול ואיכות חיים – כשהבית כבר לא מצליח לעשות זאת.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">סימנים מרכזיים שהגיע הזמן לשקול חלופה:</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-4 bg-card">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  ירידה תפקודית משמעותית
                </h5>
                <BulletList items={[
                  "תלות גוברת ברחצה/הלבשה/שירותים/ניידות",
                  "קושי לשמור על תזונה, היגיינה, נטילת תרופות",
                  "נפילות תכופות",
                ]} />
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  צורך בטיפול רפואי/סיעודי
                </h5>
                <BulletList items={[
                  "צורך בהשגחה 24/7, ניטור מצב רפואי",
                  "טיפול בפצעי לחץ/בליעה/קטטר",
                  "אשפוזים חוזרים שמובילים לסיכון בבית",
                ]} />
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Home className="h-4 w-4 text-amber-500" />
                  סיכון בטיחותי בבית
                </h5>
                <BulletList items={[
                  "יציאה מהבית ללא התמצאות",
                  "שכחת גז/כיריים, נפילות",
                  "קושי להשתמש בלחצן מצוקה",
                ]} />
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-500" />
                  עומס על המטפלים (Caregiver burnout)
                </h5>
                <BulletList items={[
                  "כשבן/בת משפחה ״מחזיקים הכול״ וזה פוגע בבריאותם",
                  "בדידות קשה / הסתגרות / דיכאון של המטופל",
                  "שיקול קליני לגיטימי – לא רק ״רגשי״",
                ]} />
              </div>
            </div>
          </div>

          <InfoBox title="כלל אצבע ניהולי" variant="tip">
            <p>לבדוק חלופות מוקדם ולא תחת משבר. אם נדרשים ״תיקוני חירום״ של שבועיים/יומיים כדי שהבית יהיה בטוח – עדיף לשקול מעבר מסודר.</p>
          </InfoBox>
        </div>
      );

    case "9.2":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">סוגי מסגרות מגורים</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-right">סוג מסגרת</th>
                  <th className="border p-2 text-right">מתאים למי</th>
                  <th className="border p-2 text-right">מאפיינים</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">דיור מוגן</td>
                  <td className="border p-2">עצמאי ברובו, אבל צריך סביבה מותאמת ובטוחה</td>
                  <td className="border p-2">חיי קהילה, שירותים זמינים (אחזקה, מוקד). לא תחליף למסגרת סיעודית מלאה</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">בית אבות (תשושים)</td>
                  <td className="border p-2">ירידה תפקודית אך לא סיעודי מלא</td>
                  <td className="border p-2">ליווי ותמיכה יומיומית. חייבים רישיון ופיקוח משרד הרווחה</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">מוסד סיעודי / תשושי נפש</td>
                  <td className="border p-2">תלות גבוהה ב-ADL, דמנציה מתקדמת, סיכון גבוה</td>
                  <td className="border p-2">טיפול צמוד 24/7, צוות רפואי וסיעודי. אפשרות סיוע במימון דרך ״קוד״ (משרד הבריאות)</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">מחלקה גריאטרית חריפה</td>
                  <td className="border p-2">אירועים רפואיים חריפים</td>
                  <td className="border p-2">אשפוז קצר לאבחון וטיפול. לא פתרון מגורים</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">אשפוז שיקומי</td>
                  <td className="border p-2">לאחר שבר/שבץ/ירידה תפקודית</td>
                  <td className="border p-2">שיקום אינטנסיבי רב-מקצועי. ההפניה מגיעה מבית חולים/קופה</td>
                </tr>
              </tbody>
            </table>
          </div>

          <InfoBox title="📌 הערה חשובה" variant="warning">
            <p>משפחות רבות מתבלבלות בין ״בית אבות לעצמאים/תשושים״ לבין ״סידור מוסדי סיעודי בקוד״ – הגוף המטפל, ההפניה והמסמכים שונים!</p>
          </InfoBox>
        </div>
      );

    case "9.3":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">זכאות ומימון</h3>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                א. אשפוז סיעודי במימון משרד הבריאות (״קוד״)
              </h4>
              <p className="text-sm mb-3">מיועד לקשישים סיעודיים או תשושי נפש שאין באפשרותם לממן לבד.</p>
              <BulletList items={[
                "קביעה רפואית-תפקודית להתאמה למסגרת",
                "פתיחת בקשה לסיוע במימון",
                "בדיקת השתתפות עצמית (מבחן הכנסות/מסמכים)",
                "הפניה למוסד מורשה ובחירת מקום לפי זמינות",
              ]} />
              <p className="text-xs mt-2 text-muted-foreground">מידע רשמי: אתר gov.il – סיוע במימון אשפוז סיעודי</p>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                ב. בית אבות לעצמאיים/תשושים – משרד הרווחה
              </h4>
              <p className="text-sm mb-3">כאשר מדובר באבות בית שאינו סיעוד מלא, ומתאימים להגדרות עצמאים/תשושים.</p>
              <BulletList items={[
                "המדינה מסייעת למי שאינם יכולים לממן לבד (בכפוף לתנאים)",
                "מבחן הכנסות ומסמכים כלכליים",
              ]} />
              <p className="text-xs mt-2 text-muted-foreground">מידע: kolzchut.org.il – סיוע במימון בית אבות</p>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                ג. מענק חד-פעמי – משרד הביטחון
              </h4>
              <p className="text-sm">מענק חד-פעמי עד ₪42,365 (נכון ל-7.1.2025) למעבר לדיור מוגן / מחלקת עצמאיים בבית אבות – כפוף לתנאי הזכאות.</p>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                ד. גמלת סיעוד במוסד
              </h4>
              <p className="text-sm">לפני מעבר – חשוב לבדוק ״מה קורה לגמלה״. הזכאות משתנה לפי מקום מגורים ומסגרת. במוסד סיעודי הגמלה מופחתת משמעותית. בבית/דיור מוגן ייתכן שינוי בהיקף.</p>
            </div>
          </div>

          <InfoBox title="טיפ ניהולי" variant="tip">
            <p>לפתוח את תיק המימון מוקדם – תהליך בירוקרטי בזמן משבר מקשה מאוד על המשפחה.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">מסמכים שכדאי להכין מראש:</h4>
            <BulletList items={[
              "ת״ז + ספח",
              "סיכומים רפואיים עדכניים כולל תפקוד וקוגניציה",
              "פירוט תרופות",
              "מסמכי הכנסות/קצבאות",
              "מסמכי בנק/חסכונות לפי דרישה",
              "פרטי בני משפחה/כוח/ייפוי כוח/אפוטרופוס",
            ]} />
          </div>
        </div>
      );

    case "9.4":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">תהליך הבחירה וביקורים</h3>

          <div>
            <h4 className="font-semibold mb-3">שלבי התהליך:</h4>
            <div className="space-y-3">
              <InfoBox title="שלב 1: הגדרה קלינית-תפקודית" variant="info">
                <BulletList items={[
                  "רופא משפחה + הערכה גריאטרית/סיעודית",
                  "מיפוי ADL, קוגניציה, סיכון נפילות, בליעה, פצעי לחץ, BPSD",
                  "החלטה: עצמאי / תשוש / סיעודי / תשוש נפש / שיקומי",
                ]} />
              </InfoBox>

              <InfoBox title="שלב 2: קיצור רשימה (3–5 מסגרות)" variant="info">
                <BulletList items={[
                  "להתחיל ממאגרים רשמיים: מאגר מורשים של משרד הרווחה (עצמאים/תשושים), מאגר מוסדות משרד הבריאות (סיעודיים)",
                  "בדיקת זמינות, רשימות המתנה, מימון במקביל",
                ]} />
              </InfoBox>

              <InfoBox title="שלב 3: ביקור איכות (לא רק ׳סיור יפה׳)" variant="info">
                <p className="mb-2">ביקור נכון כולל:</p>
                <BulletList items={[
                  "צפייה בשגרת יום (לא רק קבלת פנים) – ביקור בוקר/צהריים",
                  "שיחה עם דיירים/משפחות (בכבוד ובדיסקרטיות)",
                  "בקשה לראות: תפריט יומי, לוח פעילויות",
                  "נהלי נפילות/פצעי לחץ/העברת מידע",
                  "מדיניות ביקורים ויציאות",
                  "נהלים בשימוש בתרופות/אחסון/תיעוד",
                ]} />
              </InfoBox>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">קריטריונים מומלצים להשוואה:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-right">קריטריון</th>
                    <th className="border p-2 text-right">מה לבדוק</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2 font-semibold">התאמה קלינית</td><td className="border p-2">מחלקה מתאימה לדמנציה/BPSD? אפשרות מעבר בין מחלקות בהחמרה?</td></tr>
                  <tr><td className="border p-2 font-semibold">צוות ונוכחות</td><td className="border p-2">אחות 24/7? רופא בתדירות ביקורים? פיזיותרפיה/עו״ס?</td></tr>
                  <tr><td className="border p-2 font-semibold">בטיחות</td><td className="border p-2">מניעת נפילות, מאחזים, תאורה, לחצן מצוקה, חדרי רחצה בטוחים</td></tr>
                  <tr><td className="border p-2 font-semibold">טיפול מכבד</td><td className="border p-2">פרטיות, לבוש, מקלחת, שיח מכבד</td></tr>
                  <tr><td className="border p-2 font-semibold">קרבה למשפחה</td><td className="border p-2">מגדילה ביקורים ומפחיתה בדידות</td></tr>
                  <tr><td className="border p-2 font-semibold">עלות וחוזה</td><td className="border p-2">שקיפות מלאה – מה כלול ומה בתוספת</td></tr>
                  <tr><td className="border p-2 font-semibold">תחושת כבוד/יחס</td><td className="border p-2">ריח, ניקיון, אווירה, יחס צוות בזמן אמת</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <InfoBox title="רישום מוקדם" variant="tip">
            <p>רשימות המתנה עלולות להיות ארוכות, במיוחד למסגרות טובות/מיקום מבוקש. כדאי להתחיל תהליך בזמן יציב ולא בעת משבר.</p>
          </InfoBox>
        </div>
      );

    case "9.5":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">התמודדות עם התנגדות ההורה</h3>

          <InfoBox title="עיקרון בסיס" variant="info">
            <p>ברוב המקרים ההתנגדות נובעת מפחד: אובדן בית/עצמאות/כבוד, בושה, או בלבול (בדמנציה). השיחה צריכה להחזיר תחושת שליטה וביטחון – לא ״לנצח בוויכוח״.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">מבנה שיחה מומלץ (5 שלבים):</h4>
            <div className="space-y-3">
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm">שלב 1 – פתיחה רכה</h5>
                <p className="text-sm mt-1">״אמא, אנחנו רוצים שתהיי יותר בטוחה ושיהיה לך טוב. לא מחליטים היום – רק בודקים יחד.״</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm">שלב 2 – תיקוף הרגש</h5>
                <p className="text-sm mt-1">״אני מבינה שזה מפחיד... הבית הוא חלק ממך.״ (לא להתווכח על עובדות)</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm">שלב 3 – סיבה אחת בלבד (ברורה וקונקרטית)</h5>
                <p className="text-sm mt-1">״בלילה קשה לך לבד״ או ״אנחנו דואגים בגלל הנפילות.״ לא לומר: ״את כבר לא יכולה / אין ברירה.״</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm">שלב 4 – הצעת פתרון עם בחירה</h5>
                <p className="text-sm mt-1">״בואי נלך רק לראות מקום אחד, ואת תגידי מה דעתך.״</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm">שלב 5 – סגירה מרגיעה</h5>
                <p className="text-sm mt-1">״אנחנו איתך. שום דבר לא ייעשה נגדך. נבחר ביחד מה להביא לחדר.״</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">תגובות מוכנות להתנגדויות נפוצות:</h4>
            <div className="space-y-2">
              {[
                { resist: "״אתם זורקים אותי!״", response: "״ממש לא. אנחנו נשארים המשפחה שלך. אנחנו מחפשים מקום שייתן לך יותר בטיחות ופחות לבד.״" },
                { resist: "״לא רוצה למות שם!״", response: "״אני שומעת שזה מפחיד. המטרה היא שתרגישי יותר בטוחה ופחות לבד. בואי נלך לראות מקום שמכבד אותך.״" },
                { resist: "״זה מקום של אנשים זקנים/חולים״", response: "״נכון, שם יש אנשים בגיל שלך, וגם צוות שעוזר, ויש פעילויות וחברה. אנחנו בוחרים מקום נעים, נקי, עם כבוד.״" },
                { resist: "״אני בסדר בבית!״", response: "״ביום את מצליחה, אבל בלילה... אנחנו דואגים. בואי ננסה שבוע ניסיון – לא החלטה לכל החיים.״" },
                { resist: "״לא רוצה זרים בחדר שלי!״", response: "״את שולטת בזה. נכין יחד רשימת גבולות: מה מתאים ומה לא. ונבחר מקום ששומר על פרטיות.״" },
              ].map((item, i) => (
                <div key={i} className="border rounded-lg p-3 bg-card">
                  <p className="font-semibold text-sm text-foreground">{item.resist}</p>
                  <p className="text-sm mt-1">{item.response}</p>
                </div>
              ))}
            </div>
          </div>

          <InfoBox title="משפטי זהב שמורידים התנגדות" variant="tip">
            <BulletList items={[
              "״הבטיחות שלך היא האחריות שלנו.״",
              "״את תבחרי מה חשוב לך.״",
              "״הולכים לראות, לא לעבור.״",
              "״אנחנו לא מחליטים היום.״",
              "״את לא לבד בזה.״",
            ]} />
          </InfoBox>

          <InfoBox title="דמנציה: ׳אמת טיפולית׳" variant="warning">
            <p>כשיש דמנציה: פחות ״לשכנע בהיגיון״, יותר ״אמת טיפולית.״ ״אני איתך, הולכים למקום נעים.״ לא להעמיס מידע. אם נוצרת הסלמה – מחליפים נושא וחוזרים מאוחר יותר.</p>
          </InfoBox>
        </div>
      );

    case "9.6":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">מסלול מעבר מעשי וקליטה</h3>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              צ׳ק-ליסט כרונולוגי – מה עושים ובאיזה סדר
            </h4>
            <div className="space-y-3">
              <InfoBox title="שלב 1: הגדרה רפואית-תפקודית (שבוע–שבועיים)" variant="info">
                <BulletList items={[
                  "סיכום רפואי עדכני (רופא משפחה/גריאטר)",
                  "רשימת תרופות מסודרת",
                  "מיפוי ADL, קוגניציה: איפה צריך השגחה, איפה תלות מלאה",
                  "החלטה תפקודית: מתאים לדיור מוגן / תשושים / סיעודי / תשושי נפש",
                ]} />
              </InfoBox>
              <InfoBox title="שלב 2: בחירת סוג מסגרת + פתיחת מסלולי מימון במקביל" variant="info">
                <p>לא מחכים ״להחליט על מקום״ לפני שמתחילים מסמכי מימון (כי זה לוקח זמן). במקביל: בדיקת זמינות, רשימות המתנה, ביקורים.</p>
              </InfoBox>
              <InfoBox title="שלב 3: 2–3 ביקורי עומק + בדיקת חוזה" variant="info">
                <p>ביקור בוקר/צהריים (שגרה), לא רק ״סיור יפה.״ איסוף מסמכי מדיניות: תרופות, נפילות, דמנציה, ביקורים, יציאות.</p>
              </InfoBox>
              <InfoBox title="שלב 4: החלטה + תיאום קליטה" variant="info">
                <p>קובעים תאריך קליטה. מעבירים ״תיק מידע״ לצוות (כדי למנוע הפתעות).</p>
              </InfoBox>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">חוזה ועלויות – מה חייבים לבדוק:</h4>
            <BulletList items={[
              "פירוט עלויות ב״שקיפות מלאה״ בכתב: מה כולל המחיר הבסיסי (לינה/אוכל/כביסה/ניקיון/פעילות/השגחה)",
              "תוספות אפשריות (נפוצות מאוד): חיתולים/מוצרי ספיגה, תרופות (מי מנהל? מי קונה?), ליווי לבדיקות מחוץ למוסד, פיזיותרפיה/ריפוי בעיסוק, שירותי שיניים/פדיקור/תספורת, השגחה פרטית (אם נדרש)",
              "תשלום חד-פעמי/פיקדון/דמי כניסה (בעיקר בדיור מוגן) ותנאי החזר",
              "שאלה קריטית: ׳מה קורה כשהמצב מחמיר?׳ – האם יש מעבר למחלקה אחרת? בכמה משתנה המחיר?",
              "מדיניות יציאה וחופשות, נוהל ׳חופשה רפואית׳, תנאי סיום התקשרות",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">״תיק מידע״ לצוות – מונע טעויות אנוש:</h4>
            <BulletList items={[
              "מידע רפואי: אבחנות, אלרגיות, רגישויות, תרופות, סיכון נפילות/בליעה/פצעי לחץ",
              "מידע תפקודי-רגשי: מה מפעיל טריגר? מה מרגיע? שגרת שינה, סאנדאונינג",
              "מפת קשרים: איש קשר ראשי, ייפוי כוח, מי מקבל החלטות, מי בדרך כלל מבקר",
              "העדפות אישיות: דת/כשרות, אוכל מועדף/אסור, רגישות למגע/צניעות, תחביבים, מוזיקה אהובה",
            ]} />
          </div>

          <InfoBox title="הסתגלות – מה לצפות מהחודש הראשון" variant="warning">
            <BulletList items={[
              "תגובות נפוצות: כעס, הסתגרות, בלבול – לא בהכרח סימן שהמסגרת לא טובה",
              "ירידה זמנית בשינה או בתיאבון – צפוי בשבועות הראשונים",
              "ביקורים קצרים, קבועים, עם אנשים מוכרים",
              "ליצור ריטואל: שיר/חפץ/שיחה באותה שעה",
              "לעדכן צוות בשינויים בתיאבון, שינה, מצב",
            ]} />
          </InfoBox>
        </div>
      );

    case "9.7":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">שיחת משפחה וחלוקת תפקידים</h3>

          <InfoBox title="למה דווקא כאן נוצרים קונפליקטים?" variant="info">
            <p>מעבר למסגרת הוא לא רק החלטה רפואית – הוא נוגע באשמה (״אני לא עושה מספיק״), תפקידים ישנים במשפחה, כסף וירושה, פחד מהסוף, ופרשנות שונה למציאות.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">חוקת שיחה – כללים שמונעים פיצוץ:</h4>
            <BulletList items={[
              "מומלץ לפתוח כל פגישה ב-60 שניות של הצגת הכללים",
              "מדברים על צרכי ההורה, לא על מי אשם",
              "שפה מכבדת בלבד (אין צעקות/כינויים/חזרה על טענות)",
              "אדם אחד מנחה, אחד/ת מסכם/ת בכתב",
              "כל החלטה מבוססת על עובדות קליניות + יכולת כלכלית",
              "אם עולה כעס – עוצרים 2 דקות וחוזרים",
              "אם חשד שהשיחה תתפוצץ – עדיף לשלב גורם מקצועי ניטרלי (עו״ס/גריאטר/מגשר משפחתי)",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">פרוטוקול פגישת החלטה משפחתית (45 דקות):</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-right">זמן</th>
                    <th className="border p-2 text-right">נושא</th>
                    <th className="border p-2 text-right">מה עושים</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">0–5 דק׳</td><td className="border p-2">פתיחה וכללים</td><td className="border p-2">מזכירים ״חוקת שיחה״, מגדירים מטרה</td></tr>
                  <tr><td className="border p-2">5–15 דק׳</td><td className="border p-2">עובדות (לא דעות)</td><td className="border p-2">ADL, קוגניציה, סיכון בטיחות, עומס טיפול – 3 נתונים קצרים בלבד</td></tr>
                  <tr><td className="border p-2">15–25 דק׳</td><td className="border p-2">חלופות</td><td className="border p-2">3 אפשרויות קצרות. ניקוד: בטיחות, איכות חיים, יכולת משפחה, תקציב, התאמה לדמנציה</td></tr>
                  <tr><td className="border p-2">35–42 דק׳</td><td className="border p-2">החלטה + חלוקת תפקידים</td><td className="border p-2">החלטה זמנית/סופית. מי עושה מה (שמות, תאריכים, דדליינים)</td></tr>
                  <tr><td className="border p-2">42–45 דק׳</td><td className="border p-2">תיעוד וסיכום</td><td className="border p-2">מסכמים בכתב ושולחים לכולם באותו יום</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">חלוקת תפקידים הוגנת:</h4>
            <InfoBox title="עיקרון: שוויון ≠ הוגנות" variant="info">
              <p>שוויון = כולם עושים אותו דבר. הוגנות = כל אחד תורם לפי יכולת (מרחק, עבודה, ילדים, כסף, כוחות).</p>
            </InfoBox>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-right">תחום אחריות</th>
                    <th className="border p-2 text-right">כולל</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">רפואי/קליני</td><td className="border p-2">קשר עם רופא/גריאטר, תרופות, מעקב בדיקות</td></tr>
                  <tr><td className="border p-2">תפעול/לוגיסטיקה</td><td className="border p-2">תיאומי תורים, הסעות, ציוד, טפסים</td></tr>
                  <tr><td className="border p-2">כספי/חשבונאי</td><td className="border p-2">תשלומים, קבלות, ניהול תקציב, ביטוח לאומי/משרד הבריאות</td></tr>
                  <tr><td className="border p-2">קשר עם המסגרת/צוות</td><td className="border p-2">עדכון צוות, ביקורות, טיפול בתלונות</td></tr>
                  <tr><td className="border p-2">רגשי/חברתי</td><td className="border p-2">ביקורים, שיחות, פעילויות, תמונות/מוזיקה</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-2">טיפ: להחליט מראש ״איש קשר ראשי״ מול המסגרת – אבל לא להפיל עליו הכול. לקבוע מנגנון גיבוי.</p>
          </div>

          <InfoBox title="3 כללי זהירות שמונעים ריבים" variant="tip">
            <BulletList items={[
              "שקיפות מלאה: כל תשלום מתועד",
              "חשבון/אקסל אחד: לא ״אחד משלם קצת בלי רישום״",
              "הפרדה מירושה: החלטות טיפול ≠ החלטות ירושה (כדי שלא ייכנסו שיקולים לא ענייניים)",
            ]} />
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">משפטים שמונעים הסלמה בין אחים:</h4>
            <div className="space-y-2 text-sm">
              <p>במקום ״את אף פעם לא שם!״ → <span className="font-semibold">״אני מרגיש/ה שאני לבד בזה, בואו נחלק תפקידים.״</span></p>
              <p>במקום ״את מגזימה!״ → <span className="font-semibold">״אני רואה את זה אחרת, בואו נבדוק עובדות קליניות.״</span></p>
              <p>במקום ״זה בגלל כסף!״ → <span className="font-semibold">״בואו נפריד החלטות טיפול מהסדרי ירושה.״</span></p>
            </div>
          </div>
        </div>
      );

    case "9.8":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">תרחישים נפוצים: אשפוז, שיקום וחזרה</h3>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                א. אשפוז חריף בבית חולים
              </h4>
              <p className="text-sm mb-3">הרבה החלטות מתקבלות סביב אירוע רפואי חריף. חשוב להבין מה המשפחה צריכה לעשות:</p>
              <BulletList items={[
                "לבקש סיכום אשפוז כבר ביום השחרור (מפורט)",
                "לוודא שיש עדכון תרופות ותוכנית שחרור ברורה",
                "לשאול: האם נדרש שיקום? שיקום בבית? במוסד שיקומי?",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                ב. שיקום באשפוז – מה בודקים לפני שמחליטים
              </h4>
              <BulletList items={[
                "מטרות שיקום: הליכה? קימה מכיסא? בליעה? תפקוד יד?",
                "תדירות טיפולים ביום והאם יש צוות רב-מקצועי",
                "מדדים להתקדמות: מה מצופה אחרי שבוע? אחרי שבועיים?",
                "תוכנית שחרור: לא ״כשיהיה טוב״ – אלא יעדים ברורים",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                ג. ״שחרור הביתה״ מול ״שחרור למסגרת״
              </h4>
              <InfoBox title="שאלת המפתח" variant="warning">
                <p>האם הבית מסוגל לעמוד בתוכנית הטיפול? אם צריך השגחה 24/7, ציוד, הימנעות מנפילות – לעיתים מסגרת ביניים בטוחה עדיפה.</p>
              </InfoBox>
            </div>
          </div>

          <InfoBox title="הטעות הנפוצה" variant="warning">
            <p>להגיע עם מסמכים רפואיים בלבד, בלי ״מי האדם״ – העדפות, טריגרים, שגרה, קשרים. תיק מידע אישי מפחית טעויות אנוש בקליטה.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">שאלות שחובה לשאול לפני החמרה / מעבר מחלקה:</h4>
            <BulletList items={[
              "מה המדיניות אם נדרש טיפול סיעודי/תשושי נפש? האם יש מעבר באותו מקום?",
              "האם המחיר משתנה? בכמה?",
              "מדיניות יציאה וחופשות – האם אפשר לצאת לסופ״ש אצל המשפחה?",
              "האם יש זיכוי על ימים מחוץ למסגרת?",
              "נוהל ״חופשה רפואית״ (אשפוז בבית חולים)?",
              "תנאי סיום התקשרות – כמה זמן הודעה מראש נדרש?",
            ]} />
          </div>
        </div>
      );

    case "9.9":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">מימון מפורט – 3 מסלולים עיקריים</h3>

          <InfoBox title="כלל חשוב" variant="info">
            <p>כדי לא ללכת לאיבוד, יש להבדיל בין 3 ״עולמות מימון״ שונים – כל אחד עם גוף מטפל, טפסים ותנאים שונים.</p>
          </InfoBox>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">1. מסגרות פרטיות (דיור מוגן, כניסה פרטית)</h4>
              <p className="text-sm">מימון עצמי / ביטוח סיעודי פרטי / סיוע ייעודי לגופים מסוימים. לרוב דמי כניסה + שכירות חודשית.</p>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">2. בתי אבות לעצמאיים/תשושים – משרד הרווחה</h4>
              <p className="text-sm mb-2">סיוע אפשרי דרך משרד הרווחה (בהתאם לתנאים). מבחן הכנסות.</p>
              <p className="text-xs text-muted-foreground">מידע: kolzchut.org.il – סיוע במימון בית אבות</p>
              <p className="text-xs text-muted-foreground">מאגר בתי אבות מורשים של משרד הרווחה – gov.il</p>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">3. מוסד סיעודי/תשושי נפש – ״קוד״ משרד הבריאות</h4>
              <p className="text-sm mb-2">כאשר האדם מוגדר סיעודי או תשוש נפש ונדרש מוסד עם טיפול 24/7.</p>
              <BulletList items={[
                "קביעה רפואית-תפקודית להתאמה למסגרת",
                "פתיחת בקשה לסיוע במימון",
                "בדיקת השתתפות עצמית (מבחן הכנסות/מסמכים)",
                "הפניה למוסד מורשה ובחירת מקום לפי זמינות",
              ]} />
              <p className="text-xs mt-2 text-muted-foreground">מידע רשמי: gov.il – סיוע במימון אשפוז סיעודי</p>
              <p className="text-xs text-muted-foreground">מאגר מוסדות מורשים: me.health.gov.il</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-card">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              מענק חד-פעמי – משרד הביטחון
            </h4>
            <p className="text-sm">מענק עד ₪42,365 (נכון ל-7.1.2025) למעבר לדיור מוגן/מחלקת עצמאיים בבית אבות – כפוף לתנאי זכאות.</p>
            <p className="text-xs mt-1 text-muted-foreground">אתר: mishpahot-hantzaha.mod.gov.il</p>
          </div>

          <InfoBox title="גמלת סיעוד במעבר למסגרת" variant="warning">
            <p>לפני מעבר – חובה לבדוק ״מה קורה לגמלה.״ ביטוח לאומי מפרט את כללי הזכאות והמצבים שבהם הגמלה משתנה לפי מקום מגורים ומסגרת. בבית/דיור מוגן ייתכן שינוי בהיקף. במוסד סיעודי – הגמלה מופחתת משמעותית או קיימת בתנאים מסוימים בלבד.</p>
          </InfoBox>
        </div>
      );

    case "9.10":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">טפסים וכלי עבודה</h3>

          <p className="text-muted-foreground">טפסים מעשיים להדפסה ולשימוש בתהליך הבחירה, המעבר וניהול הקשר עם המסגרת.</p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                א. שאלות חובה בביקור/חוזה (10 שאלות)
              </h4>
              <ol className="space-y-2 pr-4 text-sm list-decimal list-inside">
                <li>מה כלול במחיר ומה בתוספת?</li>
                <li>מי מנהל תרופות? מי אחראי להזמנות?</li>
                <li>האם יש אחות 24/7? רופא בתדירות?</li>
                <li>מה נוהל נפילות?</li>
                <li>מה נוהל דמנציה/BPSD (נדודים, תוקפנות)?</li>
                <li>מה קורה בהחמרה (מעבר מחלקה/עלויות)?</li>
                <li>תנאי סיום התקשרות/יציאה/החזרים?</li>
                <li>מדיניות ביקורים ויציאה לסופ״ש?</li>
                <li>האם קיימת תוכנית פעילויות מותאמת?</li>
                <li>למי פונים בתלונה ומה לוחות הזמנים למענה?</li>
              </ol>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                ב. ״תיק מידע לצוות״ – תבנית
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    <tr><td className="border p-2 font-semibold bg-muted w-1/3">שם הדייר/ת</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">גיל, ת״ז</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">איש קשר ראשי + טלפון</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">ייפוי כוח / אפוטרופוס</td><td className="border p-2">כן / לא + פרטים</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">אבחנות ואלרגיות</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">תרופות (רשימה מצורפת)</td><td className="border p-2">☐</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">סיכון נפילות</td><td className="border p-2">נמוך / בינוני / גבוה</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">בליעה</td><td className="border p-2">תקין / חשד / מותאם מרקם לדיספגיה</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">פצעי לחץ</td><td className="border p-2">אין / יש / בסיכון</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">טריגרים / מה מרגיע</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">שגרת שינה / סאנדאונינג</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">העדפות: דת/כשרות/אוכל</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">רגישות למגע/צניעות</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2 font-semibold bg-muted">תחביבים / מוזיקה אהובה</td><td className="border p-2">___</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                ג. תקציב חודשי למסגרת
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-right">סעיף</th>
                      <th className="border p-2 text-right">סכום ₪</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border p-2">עלות בסיסית חודשית</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2">חיתולים / מוצרי ספיגה</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2">תרופות</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2">כביסה / ניקיון</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2">ליווי / השגחה</td><td className="border p-2">___</td></tr>
                    <tr><td className="border p-2">טיפולים (פיזיו/עו״ס/שיניים)</td><td className="border p-2">___</td></tr>
                    <tr className="bg-muted font-semibold"><td className="border p-2">סה״כ חודשי</td><td className="border p-2">___</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-2 text-muted-foreground">מקורות מימון: ☐ קצבה ☐ חסכונות ☐ השתתפות ילדים ☐ אחר</p>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3">ד. דף ״תכנון החלטה״ למשפחה</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold">למה אנחנו שוקלים מעבר? (סמן)</p>
                  <p className="text-muted-foreground">☐ בטיחות ☐ טיפול רפואי ☐ בדידות ☐ עומס מטפלים ☐ אחר</p>
                </div>
                <div>
                  <p className="font-semibold">מה חשוב לנו במקום?</p>
                  <p className="text-muted-foreground">☐ קרבה ☐ צוות 24/7 ☐ מחלקת דמנציה ☐ פעילויות ☐ כשרות ☐ תקציב</p>
                </div>
                <div>
                  <p className="font-semibold">שלושת הקריטריונים שלא מתפשרים עליהם:</p>
                  <p className="text-muted-foreground">1. ___ 2. ___ 3. ___</p>
                </div>
                <div>
                  <p className="font-semibold">מי איש קשר משפחתי מול המקום? ___</p>
                  <p className="font-semibold">תאריך יעד להחלטה: ___</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div>
          <p>תוכן מפורט עבור נושא זה יתווסף בקרוב.</p>
        </div>
      );
  }
};
