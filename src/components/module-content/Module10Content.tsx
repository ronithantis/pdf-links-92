import { CheckCircle, AlertTriangle, Phone, Heart, Clock, Users, Shield, Brain } from "lucide-react";

interface Module10ContentProps {
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

export const Module10Content = ({ subId }: Module10ContentProps) => {
  switch (subId) {
    case "10.1":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">תסמונת השחיקה (Burnout) אצל מטפלים</h3>

          <InfoBox title="מסר מרכזי" variant="info">
            <p>טיפול בבן/בת משפחה הוא ״מרתון״ ולא ״ספרינט.״ שמירה על הבריאות שלך אינה מותרות – היא תנאי לטיפול טוב, לקבלת החלטות שקולה ולמניעת קריסה משפחתית.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">סימנים שכיחים (כדאי לזהות בזמן):</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4 bg-card">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-destructive" />
                  סימנים פיזיים
                </h5>
                <BulletList items={[
                  "עייפות כרונית",
                  "כאבי ראש/שרירים",
                  "הפרעות שינה",
                  "ירידה בחיסוניות",
                ]} />
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-amber-500" />
                  סימנים רגשיים/קוגניטיביים
                </h5>
                <BulletList items={[
                  "עצבנות, קוצר רוח",
                  "תחושת הצפה, דכדוך/ייאוש",
                  "אשמה (״אני לא עושה מספיק״)",
                  "קושי להתרכז",
                ]} />
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  סימנים התנהגותיים
                </h5>
                <BulletList items={[
                  "התרחקות מאנשים ומפעילויות",
                  "ירידה בטיפול בעצמך",
                  "שימוש מוגבר בקפה/אלכוהול/עישון",
                  "״אפס סבלנות בבית״",
                ]} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">גורמי סיכון (מי נמצא בסיכון גבוה יותר?):</h4>
            <BulletList items={[
              "דרישות טיפול גבוהות (דמנציה עם התנהגויות מאתגרות, לילות ללא שינה, נפילות/אשפוזים חוזרים)",
              "חוסר תמיכה משפחתית/קהילתית (״רק אני עושה הכול״) – ניהול יחידני",
              "חוסר ודאות (אין אבחנה / אין תוכנית / אין חלוקת תפקידים)",
              "קונפליקטים משפחתיים סביב כסף/אחים/החלטות",
            ]} />
          </div>

          <InfoBox title="🚨 ״קו אדום״ – מתי חייבים לפנות לעזרה מקצועית" variant="warning">
            <BulletList items={[
              "מחשבות אובדניות / תחושת חוסר ערך קיצונית",
              "התקפי חרדה קשים או חוסר תפקוד מתמשך",
              "שימוש מסוכן בחומרים",
              "אלימות (מילולית/פיזית) כלפי עצמך או אחרים",
            ]} />
            <p className="mt-2 font-semibold">מומלץ לשמור את עמוד מוקדי העזרה הראשונה הנפשית של משרד הבריאות למצבי מצוקה/משבר.</p>
          </InfoBox>
        </div>
      );

    case "10.2":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">קבוצות תמיכה למטפלים – לא להישאר לבד</h3>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                א. ״יד לתומך״ – מרכז תמיכה לבני משפחה מטפלים
              </h4>
              <p className="text-sm mb-2">שירות שמציע תמיכה לבני משפחה מטפלים, כולל אפשרות לפנייה טלפונית וטופס מקוון.</p>
              <BulletList items={[
                "פנייה בטלפון *6444 (בחירה 2) או דרך טופס מקוון של יד שרה",
                "כולל אינטייק, קבוצות תמיכה, ליווי אישי (בהתאם למקום)",
                "תחנת ״עצירה רשמית״ שמורידה עומס רגשי ומעשי",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                ב. CareGivers Israel – מידע, זכויות וליווי
              </h4>
              <p className="text-sm">מרכז ידע וכלים לבני משפחה מטפלים, כולל הכוונה וחיבור לשירותים באתר ההתאחדות.</p>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                ג. קבוצות/סדנאות בקהילה וביטוח לאומי
              </h4>
              <p className="text-sm">המוסד לביטוח לאומי מפרסם על סדנאות/קבוצות תמיכה לבני משפחה מטפלים שמתקיימות בסניפים/ברשויות (משתנה לפי אזור וזמן). לדוגמה: סדנה שבועית במספר מפגשים.</p>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">ד. קבוצות ברשת (לא פורמלי, אך מועיל)</h4>
              <p className="text-sm">קבוצות פייסבוק כמו ״מטפלים בהורים״ עשויות לתת תחושת שייכות וטיפים.</p>
              <InfoBox title="הערה חשובה" variant="warning">
                <p>לא להסתמך על מידע רפואי/משפטי לא מאומת מקבוצות רשת.</p>
              </InfoBox>
            </div>
          </div>
        </div>
      );

    case "10.3":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">זכויות המטפל בעבודה</h3>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">ימי מחלה לצורך טיפול בהורה</h4>
              <p className="text-sm mb-2">העובד/ת יכול/ה לנצל עד 6 ימים בשנה מתוך ימי המחלה הצבורים, בכפוף לתנאים המפורטים, להיעדרות בשל מחלת הורה (שלו/של בן הזוג).</p>
              <InfoBox title="מצבים נוספים" variant="info">
                <p>אתר ״כל זכות״ מרכז את מצבי הזכאות להיעדרות על חשבון ימי מחלה עבור הורה/בן זוג/ילד, כולל הפניות לערכים המרחיבים ומקרים מיוחדים (כגון מחלה ממארת).</p>
              </InfoBox>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">זכויות נוספות שכדאי להכיר</h4>
              <BulletList items={[
                "אפשרות לפיצויי פיטורין במקרים מסוימים של התפטרות על רקע טיפול בהורה",
                "היבטי מס הקשורים למימון אשפוז סיעודי",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2">איך לבקש התאמות בעבודה בלי ״להישבר״</h4>
              <p className="text-sm mb-2">המלצה פרקטית: לפנות למעסיק/ת עם בקשה ממוסגרת ומוגדרת, למשל:</p>
              <BulletList items={[
                "גמישות שעת התחלה/סיום",
                "יום עבודה קבוע מהבית בשבוע",
                "חלון קבוע לתורים רפואיים",
                "חלוקת עומס זמנית (3 חודשים) ובדיקה מחדש",
              ]} />
              <p className="text-xs mt-2 text-muted-foreground">להפנות לייעוץ פרטני לפי הצורך.</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">צ׳ק-ליסט זכויות בעבודה (לבדיקה עצמית):</h4>
            <div className="space-y-2 text-sm">
              {[
                "יש לי יתרת ימי מחלה?",
                "אני נדרשת להיעדר לצורך טיפול בהורה?",
                "אני יודעת על הזכות להיעדר עד 6 ימים בשנה במקרה מתאים?",
                "יש צורך בהתאמות שעות/עבודה מהבית?",
                "קבעתי שיחה עם המעסיק עם בקשה מוגדרת בכתב?",
              ].map((q, i) => (
                <div key={i} className="flex items-center gap-2 border rounded-md p-2 bg-card">
                  <span className="text-muted-foreground">☐</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "10.4":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">טיפול עצמי (Self-care) – פרקטי, קצר, עקבי</h3>

          <InfoBox title="עקרון עבודה" variant="tip">
            <p>במקום לחפש ״שעתיים ביום״ שלא קיימות, בונים: <strong>מינימום יומי</strong> (10–20 דקות תנועה/נשימה/מקלחת שקטה) + <strong>רזרבה שבועית</strong> (שעה אחת קבועה שמישהו אחר מחליף אותך).</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">עוגנים מוכחים להפחתת עומס:</h4>
            <BulletList items={[
              "פעילות גופנית קצרה (NIA – המכון הלאומי להזדקנות בארה״ב מדגיש צעדים פשוטים)",
              "תזונה, שתייה ושינה סדירות",
              "גבולות – משפטים שימושיים (ללא אשמה):",
            ]} />
            <div className="mt-3 space-y-2">
              {[
                "״אני יכולה לעשות X, אני לא יכולה לעשות Y.״",
                "״אני זמינה לשיחה מ-___ ל-___. מעבר, לא.״",
                "״אני צריכה שמישהו יחליף אותי ביום ___.״",
              ].map((s, i) => (
                <div key={i} className="border rounded-md p-3 bg-muted/30 text-sm font-medium">{s}</div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">צורך בטיפול מקצועי (כשהעומס מתמשך):</h4>
            <BulletList items={[
              "טיפול פסיכולוגי / CBT, הדרכת משפחות, ולעיתים פסיכיאטר/ית",
              "מומלץ במיוחד כשיש טיפול בדמנציה עם BPSD – כי העומס הרגשי מצטבר",
            ]} />
          </div>
        </div>
      );

    case "10.5":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">מרכזי ייעוץ ומוקדים חשובים</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                מוקד *8840
              </h4>
              <p className="text-sm">מוקד מידע וסיוע לאזרחים ותיקים. נותן מידע וסיוע בנושאי זכויות ושירותים, ומסייע בבירור זכויות ובהסרת חסמים.</p>
            </div>
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                מרכזי ייעוץ למשפחות (משרד הבריאות)
              </h4>
              <p className="text-sm">אפשר לפנות למרכזי ייעוץ למשפחות בפריסה ארצית ולקבל מידע והכוונה. מידע נוסף בעמוד ״בנפש בריאה.״</p>
            </div>
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                עזרה ראשונה נפשית
              </h4>
              <p className="text-sm">מוקדי העזרה הראשונה הנפשית של משרד הבריאות למצבי מצוקה/משבר. מומלץ לשמור את הפרטים נגישים.</p>
            </div>
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                יד לתומך – *6444
              </h4>
              <p className="text-sm">מרכז תמיכה לבני משפחה מטפלים. בחירה 2 בתפריט. כולל אינטייק, קבוצות תמיכה וליווי אישי.</p>
            </div>
          </div>
        </div>
      );

    case "10.6":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">שגרה מומלצת למטפל/ת</h3>

          <InfoBox title="עיקרון" variant="info">
            <p>המטרה: ליצור עוגנים מינימליים, לא שליטה מושלמת. <strong>ההצלחה היא עקביות, לא שלמות.</strong></p>
          </InfoBox>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                רמה 1 – עומס מאוד גבוה (אין כמעט זמן פנוי)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="bg-muted"><th className="border p-2 text-right">זמן</th><th className="border p-2 text-right">פעולה</th><th className="border p-2 text-right">משך</th></tr></thead>
                  <tbody>
                    <tr><td className="border p-2">בוקר</td><td className="border p-2">נשימה / מתיחות</td><td className="border p-2">5 דקות</td></tr>
                    <tr><td className="border p-2">במהלך היום</td><td className="border p-2">הליכה בחוץ</td><td className="border p-2">5 דקות</td></tr>
                    <tr><td className="border p-2">אחרי ארוחה</td><td className="border p-2">2 כוסות מים + תרופות מתוזמנות</td><td className="border p-2">2 דקות</td></tr>
                    <tr><td className="border p-2">עכשיו</td><td className="border p-2">בדיקת מצב עצמי</td><td className="border p-2">30 שניות</td></tr>
                    <tr><td className="border p-2">שבועי</td><td className="border p-2">עוגן אחד לטיפול עצמי</td><td className="border p-2">30–60 דקות</td></tr>
                    <tr><td className="border p-2">פעם בשבוע</td><td className="border p-2">מישהו מחליף</td><td className="border p-2">—</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-2 text-muted-foreground">אם אין עוגן שבועי – זה סימן שאין זמן, וצריך לגייס עזרה.</p>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                רמה 2 – עומס בינוני
              </h4>
              <BulletList items={[
                "יומיום: הליכה/תנועה קלה 10–15 דקות",
                "שיחה עם חברה 10 דקות",
                "פעילות גופנית קבועה 30 דקות",
                "מפגש חברתי / טיפול רגשי × 2 בשבוע",
                "שגרה לפני שינה: כיבוי מסכים 30 דקות",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                רמה 3 – עומס בינוני-נמוך (יש יכולת)
              </h4>
              <BulletList items={[
                "מינימום יומי 30–45 דקות (פעילות גופנית 20–30 + רגיעה/מדיטציה/יומן 10–15)",
                "שבועי: קבוצת תמיכה/מפגש חברתי קבוע",
                "זמן זוגיות/משפחה/תחביב",
                "שעת ניהול שבועית (טפסים/תיאומים/תקציב) – כדי שלא ייגלוש לכל השבוע",
              ]} />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">לו״ז שבועי לדוגמה:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-muted"><th className="border p-2 text-right">יום</th><th className="border p-2 text-right">פעילות</th></tr></thead>
                <tbody>
                  <tr><td className="border p-2 font-semibold">א׳</td><td className="border p-2">בוקר: 10 דק׳ תנועה | ערב: 10 דק׳ זמן עצמי</td></tr>
                  <tr><td className="border p-2 font-semibold">ב׳</td><td className="border p-2">״שעת ניהול״ (20–40 דק׳) – תיאומים/תרופות/בדיקות</td></tr>
                  <tr><td className="border p-2 font-semibold">ג׳</td><td className="border p-2">החלפה קבועה (30–60 דק׳) – המטפל יוצא/ישן/טיפול</td></tr>
                  <tr><td className="border p-2 font-semibold">ד׳</td><td className="border p-2">שיחת עדכון קצרה עם אח/ות/בן משפחה (10 דק׳) – סטטוס בלבד</td></tr>
                  <tr><td className="border p-2 font-semibold">ה׳</td><td className="border p-2">פעילות חברתית קצרה (שיחה/הליכה עם חברה)</td></tr>
                  <tr><td className="border p-2 font-semibold">ו׳–שבת</td><td className="border p-2">פעילות ״מטעינה״ אחת + תכנון שבוע חדש (10 דק׳)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

    case "10.7":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">תכנית גיבוי (Plan B) – כשאין כוח / כשיש משבר</h3>

          <InfoBox title="עיקרון" variant="info">
            <p>משברים הם חלק מהמסע. תכנית גיבוי מורידה חרדה כי ״כבר יודעים מה עושים.״</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">מתי מפעילים Plan B?</h4>
            <BulletList items={[
              "2 לילות ברצף בלי שינה",
              "תחושת הצפה קשה / בכי יומי / קוצר רוח קיצוני",
              "כאבים/חולשה אצל המטפל",
              "אירועי חירום – מצב רפואי מתדרדר אצל ההורה",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">Plan B בשלוש דרגות:</h4>
            <div className="space-y-3">
              <div className="border rounded-lg p-4 bg-card">
                <h5 className="font-semibold text-sm mb-2">דרגה 1 – הקלה מיידית (24 שעות)</h5>
                <BulletList items={[
                  "לבטל כל מה שלא דחוף",
                  "״רק טיפול בסיסי היום״: אוכל, תרופות, בטיחות, שינה",
                  "להזמין תגבור: בן משפחה / מטפל/שירות החלפה",
                ]} />
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <h5 className="font-semibold text-sm mb-2">דרגה 2 – תגבור לשבוע</h5>
                <BulletList items={[
                  "לקבוע 2–3 חלונות החלפה בשבוע מראש",
                  "לחלק משימות בין אחים (רפואי/כספי/לוגיסטי)",
                  "לשקול מרכז יום / סיוע קהילתי זמני",
                ]} />
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <h5 className="font-semibold text-sm mb-2">דרגה 3 – שינוי מודל טיפול (חודש+)</h5>
                <BulletList items={[
                  "להעריך מחדש: האם הבית עדיין בטוח?",
                  "לבדוק תוספת שעות, עובד נוסף, מעבר למסגרת (פרק 9)",
                ]} />
              </div>
            </div>
          </div>
        </div>
      );

    case "10.8":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">חלוקת תפקידים וטפסים מעשיים</h3>

          <InfoBox title="מטרה" variant="info">
            <p>שמטפל/ת אחד/ת לא יהיה ״מוקד יחיד.״ מחלקים אחריות – גם אם אין שוויון מלא.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">תחומי אחריות (להקצאה):</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-right">תחום</th>
                    <th className="border p-2 text-right">כולל</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2 font-semibold">רפואי/תרופות</td><td className="border p-2">תיאום רופא, מרשמים, בדיקות, סיכומים</td></tr>
                  <tr><td className="border p-2 font-semibold">לוגיסטיקה</td><td className="border p-2">תיאום תורים, ציוד, הסעות</td></tr>
                  <tr><td className="border p-2 font-semibold">כספים</td><td className="border p-2">תשלומים, קבלות, ניהול תקציב, קשר עם גמלאות/גופים</td></tr>
                  <tr><td className="border p-2 font-semibold">עובד/ת זר/מסגרת</td><td className="border p-2">קשר יומיומי, פתרון בעיות</td></tr>
                  <tr><td className="border p-2 font-semibold">רווחה/חברה</td><td className="border p-2">ביקורים, מוזיקה, תמונות, שגרה נעימה</td></tr>
                  <tr><td className="border p-2 font-semibold">״שעת החלפה״</td><td className="border p-2">מי אחראי לייצר זמן מנוחה למטפל/ת הראשי/ת (הכי חשוב!)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">שאלון שחיקה שבועי (2 דקות):</h4>
            <p className="text-sm text-muted-foreground mb-2">סמני לכל משפט: 0=בכלל לא, 3=מאוד</p>
            <div className="space-y-2">
              {[
                "אני עייפה הזמן רוב",
                "אני עצבנית/קצרת רוח",
                "קשה לי להירדם / אני מתעוררת הרבה",
                "אני מרגישה אשמה שאני לא עושה מספיק",
                "ויתרתי על קשרים/תחביבים",
                "אני מרגישה שאני מתפקדת על ״אוטומט״",
              ].map((q, i) => (
                <div key={i} className="flex items-center justify-between border rounded-md p-2 bg-card text-sm">
                  <span>{q}</span>
                  <span className="text-muted-foreground text-xs">0 1 2 3</span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm space-y-1">
              <p><strong>0–5:</strong> מעקב עצמי</p>
              <p><strong>6–10:</strong> להוסיף הפסקות/תמיכה קבועות</p>
              <p><strong>11+:</strong> לפנות לעזרה (קבוצה/ייעוץ/רופא)</p>
              <p className="text-destructive font-semibold">(אם יש סעיף חמור/מחשבות מסוכנות – פנייה דחופה לעזרה)</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">משפטי ״גבולות״ מוכנים (לשימוש ללא אשמה):</h4>
            <div className="space-y-2">
              {[
                "״אני יכולה לעזור, אבל לא לבד. אני צריכה חלוקה.״",
                "״אני זמינה רק עד שעה ___. אחרי זה אני נחה.״",
                "״היום אני עושה רק טיפול בסיסי – מחר נמשיך.״",
                "״אני צריכה שמישהו שייקח את הנושא של ___.״",
              ].map((s, i) => (
                <div key={i} className="border rounded-md p-3 bg-muted/30 text-sm font-medium">{s}</div>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
