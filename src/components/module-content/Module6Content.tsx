import { AlertTriangle, CheckCircle, Droplets, Eye, Ear, SmilePlus } from "lucide-react";

interface Module6ContentProps {
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

export const Module6Content = ({ subId }: Module6ContentProps) => {
  switch (subId) {
    case "7.1":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">מניעת פצעי לחץ</h3>
          
          <InfoBox title="מהם פצעי לחץ?" variant="warning">
            <p>פצעי לחץ נוצרים כשיש לחץ מתמשך על אזור גרמי (מרפקים, עקבים, אגן, שכמות) הגורם לפגיעה בזרימת הדם וברקמות. מניעה היא "טיפול בסיסי" – זולה ויעילה.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">גורמי סיכון מרכזיים:</h4>
            <BulletList items={[
              "חוסר ניידות / שכיבה ממושכת (מיטה / כיסא גלגלים)",
              "תת-תזונה, חסר חלבון והתייבשות",
              "עור דק ושביר בגיל המבוגר",
              "לחות מתמשכת (הזעה, דליפת שתן/צואה)",
              "ירידה בתחושת כאב ולחץ",
              "מחלות כלי דם, סוכרת",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">פרוטוקול מניעה בבית:</h4>
            <div className="space-y-4">
              <InfoBox title="1. הערכת מצב" variant="info">
                <BulletList items={[
                  "האם המטופל מרותק למיטה/כיסא?",
                  "האם יש בריחת שתן/צואה?",
                  "האם אוכלים/שותים פחות מהרגיל?",
                  "האם הופיעו אדמומיות/כאבים באזורי לחץ?",
                ]} />
              </InfoBox>

              <InfoBox title="2. שינוי תנוחה והפחתת סיכון" variant="info">
                <BulletList items={[
                  "תכנון שינוי תנוחה במחזוריות קבועה (כל 2–4 שעות)",
                  "עידוד הטיית גוף, קימה בכיסא/כורסה",
                  "שימוש בסדין להחלקה – לא למשוך את הגוף",
                ]} />
              </InfoBox>

              <InfoBox title="3. משטחי תמיכה" variant="info">
                <p>מזרן צפיפות גבוהה / מזרן מתחלף – מתאים למטופלים בסיכון, לפי הנחיית אחות/רופא. כריות/הגבהת עקבים (Offloading) בעיקר למניעת פצעי עקב.</p>
              </InfoBox>

              <InfoBox title="4. עור נקי ויבש + קרם מחסום" variant="info">
                <p>ניקוי עדין אחרי דליפה/לחות, ייבוש בטפיחות. מריחת קרם מחסום (Barrier cream) באזורים חשופים ללחות.</p>
              </InfoBox>

              <InfoBox title="5. תזונה וחלבון כחלק ממניעה" variant="tip">
                <p>תת-תזונה והתייבשות מעלים סיכון לפצעי לחץ ופוגעים בריפוי. חשוב למעקב אכילה/שתייה (ראו 6.2).</p>
              </InfoBox>
            </div>
          </div>

          <InfoBox title="⚠️ ׳חלון הזהב׳ – זיהוי מוקדם" variant="warning">
            <p>פצע לחץ מתחיל לעיתים באדמומיות שאינה נעלמת לאחר הורדת לחץ, שינוי בטמפרטורה (חם/קר), כאב/אי-נוחות, קשיחות/שינוי מרקם.</p>
            <p className="mt-2 font-semibold">כלל אצבע: אם יש אדמומיות שלא משתפרת תוך 30–60 דקות לאחר הורדת לחץ – יש להתייחס כסימן אזהרה משמעותי.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">טיפול בפצע – מי עוזר ומה עושים:</h4>
            <BulletList items={[
              "פנייה לרופא משפחה + הפניה לאחות פצעים / מרפאת פצעים (אחות קהילה)",
              "במקרים מורכבים: גריאטר / כירורג / רופא עור",
              "לא לעשות לבד בבית: לא ׳לפתוח׳ שלפוחיות/פצע",
              "לא להדביק תחבושות אקראיות ללא הנחיית אחות פצע",
              "לא לשים חומרים צורבים / ׳תרופות סבתא׳",
              "כן לעשות מיד: שמירה על ניקיון/יובש, הורדת לחץ מלאה מאותו אזור, תיעוד (תמונה + תאריך + מדידה)",
            ]} />
          </div>
        </div>
      );

    case "7.2":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">תזונה והידרציה</h3>

          <InfoBox title="למה זה נושא ׳קליני׳ ולא רק ׳אוכל׳?" variant="info">
            <p>בגיל המבוגר שכיחים ירידה בתיאבון, קושי בלעיסה/בליעה, דיכאון, תרופות שמפחיתות תיאבון ומייבשות, וירידה בתחושת צמא. מעקב אחר תזונה ושתייה הוא כלי מרכזי למניעת תת-תזונה והתייבשות.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">צרכים בסיסיים – מטרה יומית:</h4>
            <BulletList items={[
              "שתייה מסודרת לאורך היום – לא ׳להשלים׳ בערב",
              "טיפ יישומי: במקום לדבר על ׳ליטרים׳, לנהל ׳כוסות׳ – יעד של X כוסות ביום (כוס ≈ 200–250 מ״ל), לפי הנחיית רופא",
              "הכמויות המדויקות תלויות מצב לב/כליות/תרופות – תמיד לבדוק אם יש הגבלת נוזלים",
            ]} />
          </div>

          <InfoBox title="דיספגיה (קושי בבליעה) – זיהוי וטיפול" variant="warning">
            <p className="font-semibold mb-2">דיספגיה נפוצה בדמנציה, שבץ, פרקינסון ומצבים נוירולוגיים. סימנים אופייניים:</p>
            <BulletList items={[
              "שיעול/חנק בזמן אכילה או שתייה",
              "קול ׳רטוב/מגרגר׳ אחרי בליעה",
              "אוכל שנשאר בפה (׳כיסים׳), ריור, קושי ליזום בליעה",
              "ירידה במשקל, זיהומי חזה חוזרים",
            ]} />
            <p className="mt-2">חשוב לדעת: קיימת גם אספירציה שקטה (חדירת מזון/נוזלים לריאות ללא שיעול ברור) – שינוי נשימתי/זיהומים חוזרים הם דגל אדום.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">כללים בטיחותיים באכילה:</h4>
            <BulletList items={[
              "אוכלים רק כשערניים, לא כשעייפים/ישנוניים",
              "ישיבה זקופה (כ-90°), ראש מעט קדימה, רגליים יציבות",
              "ביסים קטנים, קצב איטי, להמתין לבליעה לפני הביס הבא",
              "לא להאכיל ׳מלמעלה׳ – לשבת בגובה העיניים",
              "התאמת מרקם מזון/נוזלים לפי המלצת קלינאי/ת תקשורת",
            ]} />
          </div>

          <InfoBox title="סימני התייבשות" variant="warning">
            <p>התייבשות בגיל מבוגר יכולה להתבטא בעייפות, חולשה, בלבול, סחרחורת, עצירות ומניעת התייבשות והחמרה תפקודית. מודגש שסימני שתן/צבע שתן אינם תמיד מדד אמין בגיל מבוגר – מעקב שתייה חשוב יותר.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">פתרונות יומיומיים:</h4>
            <BulletList items={[
              "׳טקסי׳ שתייה קבועים: אחרי תרופות, בין ארוחות, לפני יציאה מהבית, לפני שינה",
              "כוס/בקבוק אישי ליד המטופל עם סימון ׳יעד׳",
              "שילוב נוזלים ממזון: מרק, יוגורט, פירות (אם אין מגבלת סוכר/בליעה)",
            ]} />
          </div>
        </div>
      );

    case "7.3":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">ניהול הפרשות (Incontinence)</h3>

          <InfoBox title="למה זה קורה (וזה לא רק ׳גיל׳)" variant="info">
            <p>בריחת שתן/צואה יכולה לנבוע משילוב גורמים:</p>
            <BulletList items={[
              "זיהום בדרכי השתן (UTI) – אצל קשישים עלול להופיע גם כבלבול חריף/דליריום",
              "עצירות, ירידה בניידות, ירידה קוגניטיבית",
              "תרופות (משתנים, תרופות שינה, חלק מהתרופות הפסיכיאטריות/אנטיכולינרגיות)",
              "מחלות נוירולוגיות (שבץ/פרקינסון) – מחייבות הערכה מסודרת",
            ]} />
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">עזרים – איך בוחרים נכון:</h4>
            <BulletList items={[
              "חיתולים/ספוגים: התאמה לפי מידת ספיגה + מידת גוף, החלפה יזומה למנוע לחות ממושכת ופצעי עור",
              "סדיניות/מגני מזרן: להגנה על המיטה",
              "קטטרים: לא ׳פתרון נוחות׳ ברוב המקרים – קטטר מעלה סיכון לזיהומים, צריך הצדקה רפואית והדרכת אחות",
              "אם כבר יש קטטר: מעקב סימנים לזיהום/חסימה",
            ]} />
          </div>

          <InfoBox title="מתי חייבים לפנות לרופא?" variant="warning">
            <BulletList items={[
              "בלבול חריף / שינוי התנהגות פתאומי (חשד לדליריום/זיהום)",
              "חום, כאב, צמרמורות",
              "דם בשתן, כאב/אי-יכולת לתת שתן, בטן תפוחה/חשד לאצירת שתן",
              "החמרה מהירה בבריחה ללא סיבה ברורה",
            ]} />
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">פרוטוקול ביתי מכבד ויעיל:</h4>
            <BulletList items={[
              "שגרת הליכה קבועה לשירותים (כל X שעות, לפני יציאה מהבית, לפני שינה)",
              "היגיינה עדינה אחרי כל אירוע + ייבוש בטפיחות + קרם מחסום",
              "שיח מכבד: לא לדבר ׳עליו׳ לידו, לשמור על פרטיות וסגירת דלת, להסביר לפני כל פעולה",
              "תיעוד קצר: כמה פעמים ביום, האם היה כאב/ריח/דם – מקצר בירור רפואי",
            ]} />
          </div>
        </div>
      );

    case "7.4":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">רפואת שיניים, שמיעה וראייה</h3>

          <InfoBox title="למה זה מודול ׳קליני׳?" variant="info">
            <p>שלושת התחומים הללו משפיעים ישירות על: תזונה, תקשורת, מצב רוח, בטיחות (מניפות) וגם מניעת סיבוכים ולעיתים גם על סיכון לירידה קוגניטיבית.</p>
          </InfoBox>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-3">
                <SmilePlus className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">א. רפואת שיניים</h4>
              </div>
              <BulletList items={[
                "היגיינת פה ירודה בקשישים תלויי-טיפול קשורה לעלייה בסיכון לדלקות ריאה (כולל אספירציה)",
                "שיפור היגיינת פה מפחית תחלואה",
                "בדיקת פה שבועית: פצעים, ריח חריג, כאב בזמן לעיסה, תותבת לא מתאימה",
                "צחצוח עדין פעמיים ביום (גם עם שיניים תותבות – ניקוי יומי)",
                "הימנעות משינה עם תותבות כשאפשר",
                "מימון: טיפולי שיניים לבני 72+ כלולים בסל הבריאות (באמצעות הקופות), בהשתתפות נמוכה או חינם",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-3">
                <Ear className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">ב. שמיעה</h4>
              </div>
              <BulletList items={[
                "דו״חות ועדת Lancet מציינים ירידה בשמיעה כגורם סיכון בר-השפעה לדמנציה",
                "ירידה בשמיעה גורמת להימנעות משיחה, עייפות, בלבול חברתי ובדידות",
                "בדיקת שמיעה תקופתית + התאמת מכשיר שמיעה + הדרכה לשימוש (כולל ניקוי סוללות/טעינה)",
                "׳התאמות תקשורת׳: לדבר לאט, פנים מול פנים, תאורה טובה, להפחית רעשי רקע",
                "מימון: יש מסלולי סיוע ממשלתיים/סל תקשורת דרך הקופות",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">ג. ראייה</h4>
              </div>
              <BulletList items={[
                "ראייה ירודה מעלה סיכון לנפילות. מחקרים מצאו שניתוח קטרקט (בפרט הראשון) מפחית תדירות נפילות",
                "ועדת Lancet 2024 הדגישה אובדן ראייה לא מטופל כאחד מגורמי הסיכון לדמנציה",
                "בדיקת ראייה תקופתית + עדכון משקפיים",
                "התאמות ביתיות למניעת נפילות: תאורה טובה, סימון מדרגות, הסרת שטיחים מחליקים",
                "מימון: שירותי עיניים מרכזיים כלולים במערכת הציבורית (כולל ניתוח קטרקט בסיסי) עם השתתפויות עצמיות",
              ]} />
            </div>
          </div>

          <InfoBox title="׳ארגז כלים׳ קצר למטפל/ת בבית" variant="tip">
            <BulletList items={[
              "עור ותנוחות: תכנית קבועה + בדיקת עור יומית + משטח מתאים",
              "אוכל ושתייה: מעקב יומי פשוט, חשד לבליעה → קלינאי תקשורת",
              "בריחה: תיעוד, היגיינה, קרם מחסום, שינוי חריף/בלבול/דם בשתן → רופא",
              "שיניים-שמיעה-ראייה: זה לא ׳מותרות׳ – טיפול מונע שמונע סיבוכים",
            ]} />
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">בדיקות שנתיות מומלצות:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-right">תחום</th>
                    <th className="border p-2 text-right">בדיקה</th>
                    <th className="border p-2 text-right">תדירות</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">שיניים</td><td className="border p-2">בדיקה + התאמת תותבת / ניקוי אבנית</td><td className="border p-2">לפי צורך</td></tr>
                  <tr><td className="border p-2">שמיעה</td><td className="border p-2">בדיקה / כיוון מכשיר</td><td className="border p-2">שנתית</td></tr>
                  <tr><td className="border p-2">ראייה</td><td className="border p-2">בדיקה / עדכון משקפיים</td><td className="border p-2">שנתית</td></tr>
                  <tr><td className="border p-2">נפילות</td><td className="border p-2">הערכת נפילות / פיזיותרפיה</td><td className="border p-2">לפי צורך</td></tr>
                  <tr><td className="border p-2">תרופות</td><td className="border p-2">סקירת תרופות</td><td className="border p-2">פעם בשנה לפחות</td></tr>
                </tbody>
              </table>
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
