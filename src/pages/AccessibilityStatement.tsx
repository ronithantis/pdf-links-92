import { Link } from "react-router-dom";

const AccessibilityStatement = () => {
  return (
    <div className="container py-10 max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-6">הצהרת נגישות</h1>

      <section className="space-y-4 text-foreground leading-relaxed">
        <p>
          אתר hub2care רואה חשיבות עליונה במתן שירות נגיש ושוויוני לכלל המשתמשים, לרבות אנשים עם מוגבלות,
          בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998 ולתקנות שוויון זכויות לאנשים עם מוגבלות
          (התאמות נגישות לשירות), התשע"ג-2013.
        </p>

        <h2 className="text-xl font-bold text-primary mt-6">רמת הנגישות באתר</h2>
        <p>
          האתר נמצא בתהליך התאמה לדרישות תקן ישראלי 5568, המבוסס על הנחיות WCAG 2.0 ברמה AA.
          חלק מההתאמות בוצעו, וחלק נוספות נמצאות בתהליך מתמשך.
        </p>

        <h2 className="text-xl font-bold text-primary mt-6">התאמות שבוצעו באתר</h2>
        <ul className="list-disc pr-6 space-y-1">
          <li>תפריט נגישות ייעודי בכל עמוד (סמל בפינה השמאלית התחתונה)</li>
          <li>שינוי גודל טקסט (הגדלה/הקטנה)</li>
          <li>מצב ניגודיות גבוהה</li>
          <li>היפוך צבעים</li>
          <li>הדגשת קישורים</li>
          <li>גופן קריא ידידותי לדיסלקציה</li>
          <li>סמן עכבר מוגדל</li>
          <li>עצירת אנימציות</li>
          <li>הדגשת מצב פוקוס מוגברת</li>
          <li>קישור "דלג לתוכן הראשי" לניווט מקלדת</li>
          <li>תמיכה בניווט מלא באמצעות מקלדת (Tab / Enter)</li>
          <li>תיוגי ARIA וקריאות עבור קוראי מסך</li>
          <li>מבנה סמנטי תקין (HTML5) ושפת ממשק עברית (lang="he")</li>
          <li>טקסט חלופי לתמונות</li>
        </ul>

        <h2 className="text-xl font-bold text-primary mt-6">חלקים שאינם נגישים במלואם</h2>
        <p>
          על אף מאמצינו להנגיש את כל דפי האתר, ייתכן שיימצאו חלקים שטרם הונגשו במלואם, ובהם:
        </p>
        <ul className="list-disc pr-6 space-y-1">
          <li>חלק ממסמכי ה-PDF המוטמעים</li>
          <li>סרטוני וידאו ממקורות חיצוניים (ללא כתוביות)</li>
          <li>תכנים אינטראקטיביים מסוימים שנוצרו בעזרת בינה מלאכותית</li>
        </ul>
        <p>אנו פועלים באופן שוטף לשיפור הנגישות בחלקים אלו.</p>

        <h2 className="text-xl font-bold text-primary mt-6">פנייה בנושא נגישות</h2>
        <p>
          אם נתקלתם בבעיית נגישות באתר, או יש לכם הצעות לשיפור, נשמח שתפנו אלינו ונעשה כל מאמץ לטפל בפנייתכם
          במהירות האפשרית.
        </p>
        <ul className="list-none space-y-1">
          <li><strong>רכז/ת נגישות:</strong> צוות hub2care</li>
          <li><strong>דוא"ל:</strong> mekuvanim@gmail.com</li>
          <li><strong>טופס יצירת קשר:</strong> <Link to="/contact" className="text-primary underline">לחצו כאן</Link></li>
        </ul>

        <h2 className="text-xl font-bold text-primary mt-6">זמן מענה</h2>
        <p>נשתדל להשיב לכל פנייה בנושא נגישות בתוך 7 ימי עסקים.</p>

        <h2 className="text-xl font-bold text-primary mt-6">עדכון אחרון</h2>
        <p className="text-sm text-muted-foreground">הצהרה זו עודכנה לאחרונה בתאריך: 12 במאי 2026.</p>
      </section>
    </div>
  );
};

export default AccessibilityStatement;
