import { Shield, ClipboardList, Clock, Wallet, FileText, AlertTriangle, Star } from "lucide-react";

interface SubModuleContentProps {
  subId: string;
}

const InfoBox = ({ children, variant = "info" }: { children: React.ReactNode; variant?: "info" | "warning" | "tip" | "highlight" }) => {
  const styles = {
    info: "bg-primary/5 border-primary/20 text-foreground",
    warning: "bg-destructive/10 border-destructive/20",
    tip: "bg-accent/10 border-accent/30 text-foreground",
    highlight: "bg-secondary border-secondary-foreground/10",
  };
  return <div className={`rounded-lg p-4 border ${styles[variant]}`}>{children}</div>;
};

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="list-disc list-inside space-y-1.5 text-sm leading-relaxed">
    {items.map((item, i) => <li key={i}>{item}</li>)}
  </ul>
);

const SectionTitle = ({ icon: Icon, children }: { icon?: React.ElementType; children: React.ReactNode }) => (
  <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
    {Icon && <Icon className="h-4 w-4 text-primary shrink-0" />}
    {children}
  </h3>
);

export const Module4Content = ({ subId }: SubModuleContentProps) => {
  switch (subId) {
    case "5.1":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Shield}>5 תנאים לזכאות</SectionTitle>
          <p>כדי להיות זכאי/ת לגמלת סיעוד, צריך לעמוד ב-5 תנאים:</p>

          <div className="space-y-2">
            {[
              { num: "1", title: "גיל ותושבות", desc: "הגעה לגיל פרישה (67 לגברים, 65 ומעלה לנשים לפי שנת לידה) + תושבות ישראל" },
              { num: "2", title: "מבחן הכנסות", desc: "נבדקות ההכנסות של המבקש/ת ובן/בת הזוג ב-3 החודשים שקדמו להגשה. יש מדרגות: גמלה מלאה / מופחתת / אין זכאות" },
              { num: "3", title: "צורך בעזרה משמעותית", desc: "צורך בעזרה בפעולות יומיומיות או צורך בהשגחה/פיקוח צמוד עקב סכנה מיידית" },
              { num: "4", title: "מגורים בקהילה", desc: "בבית או בדיור מוגן. מי שגר/ה במחלקות סיעודיות/תשושי נפש – לרוב אין זכאות" },
              { num: "5", title: "אין כפל גמלה", desc: "לא ניתן לקבל גמלת סיעוד ממשלתית ממקור אחר במקביל (חריגים קיימים)" },
            ].map((item) => (
              <div key={item.num} className="flex gap-3 bg-muted/50 rounded-md p-3 border">
                <span className="bg-primary/10 text-primary rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">{item.num}</span>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <InfoBox variant="tip">
            <p className="font-medium mb-1">💡 טיפ פרקטי</p>
            <p className="text-muted-foreground text-xs">
              הכינו מראש תיק הכנסות מסודר: פנסיות, שכר, קצבאות מביטוח לאומי, רנטות – כדי למנוע עיכובים בהגשה.
            </p>
          </InfoBox>
        </div>
      );

    case "5.2":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={ClipboardList}>מבחן התלות – מה באמת בודקים?</SectionTitle>
          <p>קביעת הזכאות נעשית באמצעות "הערכת תלות" – הדגש על פעולות יומיומיות:</p>

          <div className="grid gap-2 sm:grid-cols-3">
            {["לבישה / התלבשות", "רחצה", "אכילה", "שליטה בהפרשות", "ניידות בבית", "צורך בהשגחה צמודה"].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-2.5 text-xs text-center border font-medium">{item}</div>
            ))}
          </div>

          <SectionTitle>ביקור מעריך – איך מתכוננים?</SectionTitle>
          <p>מגיע מעריך/ה מוסמך/ת מטעם ביטוח לאומי. <strong>המטרה: להבין את התפקוד כמו שהוא ביום-יום</strong>, לא ביום "מוצלח" במיוחד ולא בהצגה דרמטית.</p>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">📋 הכנה מומלצת (מונעת טעויות והחמצות):</p>
            <BulletList items={[
              "סיכומים רפואיים עדכניים (אבחנות, אשפוזים אחרונים)",
              "רשימת תרופות עדכנית + מי נותן ומתי",
              "רשימת קשיים יומיומיים קונקרטיים",
              "תיעוד מצבים מסוכנים שקרו (נפילות, שכחת גז וכו')",
            ]} />
          </InfoBox>

          <InfoBox variant="warning">
            <p className="font-medium mb-1">⚠️ שימו לב</p>
            <p className="text-muted-foreground text-xs">
              משפחות מדברות לעיתים על "6 פעולות ADL" כולל "העברה ממיטה לכיסא". בפועל בביטוח לאומי, "העברה" נבלעת בתוך ניידות/תפקוד בבית. הרכיב הקריטי הנוסף הוא <strong>צורך בהשגחה/פיקוח צמוד עקב סכנה</strong>.
            </p>
          </InfoBox>
        </div>
      );

    case "5.3":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Clock}>רמות הגמלה – כמה שעות בפועל</SectionTitle>
          <p>הרמות נקבעות לפי תוצאות הערכת התלות:</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2.5 text-start font-medium">רמה</th>
                  <th className="border p-2.5 text-start font-medium">תיאור</th>
                  <th className="border p-2.5 text-start font-medium">שעות/שבוע (בקירוב)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="border p-2.5 font-medium text-foreground">1</td><td className="border p-2.5">השגחה</td><td className="border p-2.5">~5.5</td></tr>
                <tr><td className="border p-2.5 font-medium text-foreground">2</td><td className="border p-2.5">סיעוד קל</td><td className="border p-2.5">~10</td></tr>
                <tr><td className="border p-2.5 font-medium text-foreground">3</td><td className="border p-2.5">סיעוד בינוני</td><td className="border p-2.5">~17</td></tr>
                <tr><td className="border p-2.5 font-medium text-foreground">4</td><td className="border p-2.5">סיעוד כבד</td><td className="border p-2.5">~21</td></tr>
                <tr><td className="border p-2.5 font-medium text-foreground">5</td><td className="border p-2.5">סיעוד כבד מאוד</td><td className="border p-2.5">~26</td></tr>
                <tr><td className="border p-2.5 font-medium text-foreground">6</td><td className="border p-2.5">תלות מוחלטת</td><td className="border p-2.5">~30</td></tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2.5 text-start font-medium">רמת זכאות</th>
                  <th className="border p-2.5 text-start font-medium">סכום הקצבה המקסימלי למעסיק מטפל (החל מ-01.04.2026)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="border p-2.5 font-medium text-foreground">1</td><td className="border p-2.5">1,705 ש״ח</td></tr>
                <tr><td className="border p-2.5 font-medium text-foreground">2</td><td className="border p-2.5">2,480 ש״ח</td></tr>
                <tr><td className="border p-2.5 font-medium text-foreground">3</td><td className="border p-2.5">3,472 ש״ח</td></tr>
                <tr><td className="border p-2.5 font-medium text-foreground">4</td><td className="border p-2.5">4,464 ש״ח</td></tr>
                <tr><td className="border p-2.5 font-medium text-foreground">5</td><td className="border p-2.5">5,456 ש״ח</td></tr>
              </tbody>
            </table>
          </div>


            <p className="font-medium mb-1">⚠️ חשוב לדעת</p>
            <p className="text-muted-foreground text-xs">
              ברשת מסתובבות טבלאות ישנות (למשל 34.5 שעות ברמה 6). הנתונים הקובעים הם מה שמופיע באתר ביטוח לאומי, כולל התאמות והחרגות.
            </p>
          </InfoBox>
        </div>
      );

    case "5.4":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Wallet}>שלוש דרכים לקבל את הגמלה</SectionTitle>
          <div className="space-y-2">
            <InfoBox variant="highlight">
              <p className="font-semibold">1. גמלה בעין</p>
              <p className="text-muted-foreground text-xs mt-1">שירותי סיעוד בפועל דרך חברות שירות / נותני הסדר</p>
            </InfoBox>
            <InfoBox>
              <p className="font-semibold">2. גמלה בכסף</p>
              <p className="text-muted-foreground text-xs mt-1">תשלום חודשי במקום חלק מהשעות/השירותים (כ-₪1,659 נכון ל-1.4.2025)</p>
            </InfoBox>
            <InfoBox variant="tip">
              <p className="font-semibold">3. שילוב</p>
              <p className="text-muted-foreground text-xs mt-1">חלק בכסף וחלק שירותים – בהתאם לצורך ולבחירה</p>
            </InfoBox>
          </div>

          <InfoBox variant="info">
            <p className="text-xs text-muted-foreground">
              📌 סכומים מתעדכנים מעת לעת. תמיד כדאי לבדוק את העדכון האחרון באתר ביטוח לאומי.
            </p>
          </InfoBox>

          <SectionTitle>סל השירותים – מה מקבלים בפועל?</SectionTitle>
          <p className="text-muted-foreground">הסל אינו רק "מטפל/ת בבית" – הוא יכול לכלול רכיבים שונים:</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { title: "טיפול אישי", desc: "רחצה, הלבשה, עזרה בסיסית" },
              { title: "עזרה במשק הבית", desc: "ניקיון, כביסה, סדר (קל)" },
              { title: "ליווי לקהילה", desc: "ליווי לרופא/סידורים לעיתים" },
              { title: "מרכזי יום", desc: "פעילות/השגחה חלקית במקומות מתאימים" },
              { title: "ארוחות", desc: "שירותי ארוחות בהתאם לתוכנית" },
              { title: "שיקום", desc: "שירותי שיקום לפי הצורך" },
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-3 border">
                <p className="font-medium text-xs">{item.title}</p>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "5.5":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={FileText}>הגשת התביעה – מסלול "מינימום טעויות"</SectionTitle>

          <SectionTitle>מה מגישים?</SectionTitle>
          <BulletList items={[
            "טופס תביעה לגמלת סיעוד (בל/2600)",
            "מסמכים רפואיים עדכניים (תמצית תיק, אבחנות, תרופות, סיכום אשפוז אחרון)",
            "אישורי הכנסות שלך ושל בן/בת הזוג (לפי ההנחיות)",
            "אם מגיש/ה אפוטרופוס/ית – לצרף צו",
          ]} />

          <SectionTitle>איפה מגישים?</SectionTitle>
          <InfoBox variant="highlight">
            <BulletList items={[
              "אפשרויות מקוונות באתר ביטוח לאומי",
              "בסניף ביטוח לאומי",
              "סיוע טלפוני מוקד מתנדבים (*9696)",
              "ניתן לקבל סיוע מעובד/ת סוציאלי/ת",
            ]} />
          </InfoBox>

          <InfoBox>
            <p className="font-medium mb-1">⏱️ זמן טיפול</p>
            <p className="text-muted-foreground text-xs">כ-60 יום מרגע ההגשה</p>
          </InfoBox>

          <InfoBox variant="tip">
            <p className="font-medium mb-2">💡 טיפ לקורס: "רכז/ת מסמכים"</p>
            <p className="text-muted-foreground text-xs">
              בכל משפחה כדאי למנות אחד/ת שמרכז/ת: תעודת זהות, סיכומים רפואיים, רשימת תרופות, אישורי הכנסה, פרטי חשבון ו"תמונת תפקוד יומית" קצרה. זה מקצר תהליכים משמעותית.
            </p>
          </InfoBox>
        </div>
      );

    case "5.6":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Star}>זכויות מיוחדות</SectionTitle>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">🕯️ ניצולי שואה – תוספת שעות סיעוד</p>
            <BulletList items={[
              "מסלול ייעודי לתוספת שעות סיעוד לניצולים",
              "החזרי הוצאות רפואיות מיוחדות",
              "טיפולים משלימים ותמיכה רגשית",
              "התביעות מוגשות גם דרך Claims Conference",
            ]} />
            <p className="text-muted-foreground text-xs mt-2">
              ⚠️ זה לא "אוטומטי" – צריך לזהות סטטוס ניצול/ת ולבדוק זכאות לפי הקריטריונים.
            </p>
          </InfoBox>

          <InfoBox>
            <p className="font-semibold mb-2">🎖️ נכי צה"ל ומשפחות חיילים</p>
            <p className="text-muted-foreground text-xs">
              עולם זכויות מקביל דרך אגף השיקום במשרד הביטחון. במקרים מסוימים צריך לבחור בין גמלת סיעוד להטבות מסוימות של משרד הביטחון ("עזרת הזולת" / "ליווי"). יש גם חריגים כמו "תוספת למימון צרכים מיוחדים" שיכולה להיות בנוסף.
            </p>
          </InfoBox>

          <InfoBox variant="tip">
            <p className="font-semibold mb-2">🏥 ביטוח סיעודי פרטי</p>
            <p className="text-muted-foreground text-xs">
              לא שואלים "יש ביטוח?" – מוציאים מסמך: פוליסה/נספחים, שם מוצר, תקופת המתנה, החרגות, סכום תגמול, והאם קיימת אופציית סילוק.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              <strong>ביטוח לאומי = שירותי "בסיס". ביטוח פרטי = לצמצום פערים (שעות/כיסוי כספי/העסקה).</strong>
            </p>
          </InfoBox>

          <SectionTitle icon={AlertTriangle}>מנגנון ערעור</SectionTitle>
          <InfoBox variant="warning">
            <p className="text-sm">
              אם התקבלה החלטה שאינה משקפת את המצב:
            </p>
            <BulletList items={[
              "ערעור מוגש תוך 60 יום מקבלת ההודעה, עם נימוקים",
              "באמצעות טופס ייעודי (בל/2620)",
              "הערעור מגיע לוועדה מייעצת עם דיון בנוכחות",
              "קיימת גם אפשרות לבדיקה מחדש עקב החמרה",
            ]} />
          </InfoBox>
        </div>
      );

    case "5.7":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Wallet}>הוצאות רפואיות וזיכוי מס</SectionTitle>
          <p>מימוש זכויות כלכליות יכול להקל משמעותית על הנטל הכספי של הטיפול בהורה.</p>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">📋 טופס 17 – התחייבות קופת חולים</p>
            <p className="text-sm">טופס 17 הוא התחייבות של קופת החולים לשלם עבור שירות/בדיקה/טיפול שניתנים אצל ספק חיצוני (בית חולים/מכון/מרפאה שאינה של הקופה), כאשר השירות כלול בסל/בזכאות.</p>
          </InfoBox>

          <SectionTitle>איך מקבלים בפועל?</SectionTitle>
          <div className="space-y-2">
            {[
              { step: "1", text: "רופא/ת משפחה או מומחה נותן/ת הפניה או המלצה לשירות" },
              { step: "2", text: "פונים לקופה (מוקד/סניף/אונליין) ומבקשים התחייבות (טופס 17)" },
              { step: "3", text: "הקופה מנפיקה התחייבות בהתאם לזכאות ולבחירת מוסד/ספק מרשימה" },
              { step: "4", text: "אם הייתה סירוב – קיימת אפשרות לערעור/פנייה לנציבות קבילות הציבור" },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 bg-muted/50 rounded-md p-2.5 border">
                <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{item.step}</span>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          <InfoBox variant="warning">
            <p className="font-semibold mb-1">⚠️ חשוב להבחין:</p>
            <BulletList items={[
              "יש לבקש טופס 17 לפני הטיפול/הבדיקה",
              "לשמור העתק דיגיטלי/מודפס של ההתחייבות + ההפניה הרפואית",
              "לעיתים קיימת השתתפות עצמית גם כשיש טופס 17",
              "טופס 17 הוא כלי מימון – לא מסמך מס. ניהול מס הוא מסלול אחר",
            ]} />
          </InfoBox>

          <SectionTitle icon={FileText}>זיכוי מס בגין החזקת קרוב במוסד</SectionTitle>
          <p>כאשר משלמים בפועל על החזקת הורה/בן-בת זוג במוסד, ניתן להיות זכאים לזיכוי מס (הפחתה מהמס).</p>
          
          <InfoBox>
            <p className="font-semibold mb-2">💰 נוסחת הזיכוי (כלל אצבע):</p>
            <p className="text-sm">הזיכוי הוא 35% מההפרש בין מה ששילמתם עבור ההחזקה במוסד לבין 12.5% מההכנסה החייבת</p>
            <p className="text-muted-foreground text-xs mt-2">* כשיש הכנסה חייבת גבוהה יחסית, הזיכוי "יוצא לא גבוה"</p>
          </InfoBox>

          <SectionTitle>איך ממשים בפועל?</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            <InfoBox>
              <p className="font-medium text-xs mb-1">👔 שכירים/ות</p>
              <p className="text-muted-foreground text-xs">באמצעות טופס 116א והגשה להחזר/תיאום מס מול מס הכנסה</p>
            </InfoBox>
            <InfoBox>
              <p className="font-medium text-xs mb-1">🏢 עצמאים/ות</p>
              <p className="text-muted-foreground text-xs">דרך הדוח השנתי, בצירוף המסמכים הנדרשים</p>
            </InfoBox>
          </div>

          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📁 מסמכים להכנה מראש:</p>
            <BulletList items={[
              "אישור מקור/חשבוניות על סכומים ששולמו למוסד",
              "אישור מהרשות/מחלקת רווחה (אם יש השתתפות)",
              "מסמכים רפואיים/הגדרות לפי טופס/קריטריונים ספציפיים",
            ]} />
          </InfoBox>

          <SectionTitle icon={Star}>נקודות זיכוי בגין מוגבלות/תלות</SectionTitle>
          <InfoBox variant="highlight">
            <p className="text-sm">
              במקרים מסוימים, בני משפחה מטפלים עשויים להיות זכאים לנקודות זיכוי (ולעיתים יותר), בהתאם למצב התפקודי/הרפואי של המטופל ותנאי הזכאות. משרד הבריאות מפנה לכך.
            </p>
          </InfoBox>

          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📊 יומן הוצאות רפואיות שנתי – כלי מומלץ:</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-xs border-collapse">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="border p-2 text-right">חודש</th>
                    <th className="border p-2 text-right">סוג הוצאה</th>
                    <th className="border p-2 text-right">ספק/מוסד</th>
                    <th className="border p-2 text-right">סכום</th>
                    <th className="border p-2 text-right">קבלה נשמרה?</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr><td className="border p-2">ינואר</td><td className="border p-2">תרופות/ציוד/ביקור</td><td className="border p-2">_______</td><td className="border p-2">₪____</td><td className="border p-2">כן/לא</td></tr>
                  <tr><td className="border p-2">פברואר</td><td className="border p-2">בדיקה/הסעה/מוסד</td><td className="border p-2">_______</td><td className="border p-2">₪____</td><td className="border p-2">כן/לא</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-xs mt-2">מטרה: לתפוס את הכולל בזמן אמת ולמנוע מצב ש"אין לנו קבלות/שכחנו מה שילמנו"</p>
          </InfoBox>
        </div>
      );

    case "5.8":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Shield}>ביטוח סיעוד – לאומי vs פרטי</SectionTitle>
          <p>שני מסלולים שונים, עם "שפות" שונות – חשוב להבין את ההבדלים.</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox variant="highlight">
              <p className="font-semibold mb-2">🏛️ גמלת סיעוד – ביטוח לאומי</p>
              <BulletList items={[
                "מיועדת למי שהגיע/ה לגיל פרישה וגר/ה בבית (קהילה)",
                "זקוק/ה לעזרה בפעולות היום-יום ו/או להשגחה בשל סכנה",
                "הזכאות נקבעת לפי מבחנים ותנאים (כולל מבחן הכנסות)",
                "משולמת לפי רמות (6 רמות)",
              ]} />
            </InfoBox>
            <InfoBox>
              <p className="font-semibold mb-2">🏢 ביטוח סיעודי פרטי/קבוצתי</p>
              <BulletList items={[
                "ביטוח חוזי – תגמול חודשי/שיפוי",
                "בהתאם לפוליסה ול\"הגדרת מקרה ביטוח\"",
                "כולל דרך קופות החולים (קבוצתי)",
                "הביטוח הפרטי הוא בנוסף לגמלה מהביטוח הלאומי",
              ]} />
            </InfoBox>
          </div>

          <SectionTitle icon={AlertTriangle}>הגדרות "מצב סיעודי" – לא תמיד זהות</SectionTitle>
          <InfoBox variant="warning">
            <p className="font-semibold mb-2">⚠️ קריטי ללמידה:</p>
            <p className="text-sm mb-2">ייתכן מצב שאדם "נראה לנו סיעודי", אך בפוליסה/מסלול מסוים טרם עומד בהגדרה – ולהפך.</p>
            <div className="grid gap-2 sm:grid-cols-2 mt-3">
              <div className="bg-muted/30 rounded p-2">
                <p className="font-medium text-xs">בביטוח לאומי:</p>
                <p className="text-muted-foreground text-xs">הדגש על צורך בעזרה והשגחה כפי שמוגדר בתקנות ובנהלים</p>
              </div>
              <div className="bg-muted/30 rounded p-2">
                <p className="font-medium text-xs">בביטוח סיעודי פרטי:</p>
                <p className="text-muted-foreground text-xs">ההגדרה יכולה להיות לפי מספר פעולות ADL (למשל: 4 מתוך 6, או 3 פעולות כשאחת מהן "שליטה") או "תשוש נפש"</p>
              </div>
            </div>
          </InfoBox>

          <SectionTitle icon={Wallet}>סכומי גמלה ומבנה תשלום</SectionTitle>
          <div className="space-y-3">
            <InfoBox>
              <p className="font-semibold mb-2">🏛️ בביטוח לאומי:</p>
              <p className="text-sm">הקצבה נועדה לסייע בקבלת עזרה, והיא לפי 6 רמות. ניתן לבחור שילוב של כסף ושירותים.</p>
            </InfoBox>
            <InfoBox>
              <p className="font-semibold mb-2">🏢 בביטוח סיעודי של קופות החולים (הרובד הבסיסי האחיד):</p>
              <p className="text-sm">"כל זכות" מפרטת טבלאות תגמול חודשיות לפי גיל הצטרפות, מקום שהייה ומשך תשלום מוגדר (למשל: עד 60 חודשים ברובד בסיסי).</p>
            </InfoBox>
          </div>

          <SectionTitle icon={ClipboardList}>מתי "כדאי" תביעה כפולה?</SectionTitle>
          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">💡 העיקרון: פעמים רבות יש היגיון להגיש לשניהם</p>
            <div className="grid gap-2 sm:grid-cols-2 mt-2">
              <div className="bg-muted/30 rounded p-2">
                <p className="font-medium text-xs">תביעת ביטוח לאומי:</p>
                <p className="text-muted-foreground text-xs">כדי לקבל שעות/סיוע בסיסי ומסגרת זכאות</p>
              </div>
              <div className="bg-muted/30 rounded p-2">
                <p className="font-medium text-xs">תביעת ביטוח סיעודי (קופה/פרטי):</p>
                <p className="text-muted-foreground text-xs">כדי לכסות פערים משמעותיים (מטפל/ת נוסף/ת, הוצאות טיפול, מוסד)</p>
              </div>
            </div>
          </InfoBox>

          <InfoBox variant="warning">
            <p className="font-semibold mb-1">⚠️ אבל בפועל – יש לבדוק בכל פוליסה:</p>
            <BulletList items={[
              "האם קיימים תנאי קיזוז/סייגים/מגבלות?",
              "האם יש תקרת שיפוי או מגבלת אחוז מהעלות?",
              "מה קורה במקרה של מגורים במוסד?",
            ]} />
          </InfoBox>

          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📁 טפסים/כלים למודול 5.8:</p>
            <BulletList items={[
              "דף ביטוח לאומי – גמלת סיעוד (עקרונות זכאות)",
              "דף \"כל זכות\" – ביטוח סיעודי קבוצתי אחיד של קופות החולים",
              "דף \"כל זכות\" – ביטוח סיעודי פרטי (רקע והבהרות)",
            ]} />
          </InfoBox>
        </div>
      );

    case "5.9":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Wallet}>מימון הטיפול ממקורות נוספים</SectionTitle>
          <p>מעבר לזכויות וגמלאות, יש מקורות מימון נוספים שכדאי להכיר ולשקול באחריות.</p>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">א. חסכונות אישיים</p>
            <div className="grid gap-2 sm:grid-cols-2 mt-2">
              <div className="bg-muted/30 rounded p-2">
                <p className="font-medium text-xs">✅ יתרון:</p>
                <p className="text-muted-foreground text-xs">הכי מהיר, ללא התחייבות לגורם חיצוני</p>
              </div>
              <div className="bg-muted/30 rounded p-2">
                <p className="font-medium text-xs">⚠️ סיכון:</p>
                <p className="text-muted-foreground text-xs">"שחיקה שקטה" של כספים בלי בקרה</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs mt-2">💡 המלצה: להטמיע "תקציב חודשי טיפול" קבוע + מעקב: מה ההוצאה הבסיסית, מה המשתנה, ומה צפוי לעלות בעתיד</p>
          </InfoBox>

          <InfoBox>
            <p className="font-semibold mb-2">ב. מכירת נכסים</p>
            <div className="grid gap-2 sm:grid-cols-2 mt-2">
              <div className="bg-muted/30 rounded p-2">
                <p className="font-medium text-xs">✅ יתרון:</p>
                <p className="text-muted-foreground text-xs">מקור כסף משמעותי לטיפול ממושך</p>
              </div>
              <div className="bg-muted/30 rounded p-2">
                <p className="font-medium text-xs">⚠️ סיכון:</p>
                <p className="text-muted-foreground text-xs">החלטה משפחתית טעונה רגשית, לעיתים יש השלכות משפטיות/מס</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs mt-2">💡 נכון להדגיש: לפני מהלך כזה, מקובל לבצע בדיקת חלופות (תגבור זכויות, ביטוחים, הלוואות, סיוע במימון)</p>
          </InfoBox>

          <InfoBox>
            <p className="font-semibold mb-2">ג. הלוואות, סיוע במימון, בדיקת זכאות</p>
            <div className="grid gap-2 sm:grid-cols-2 mt-2">
              <div className="bg-muted/30 rounded p-2">
                <p className="font-medium text-xs">✅ יתרון:</p>
                <p className="text-muted-foreground text-xs">מאפשרות "גשר" לתקופה קצרה (למשל עד קבלת תגמולים/קצבה)</p>
              </div>
              <div className="bg-muted/30 rounded p-2">
                <p className="font-medium text-xs">⚠️ סיכון:</p>
                <p className="text-muted-foreground text-xs">ריבית, עומס חודשי, קבלת החלטות מתוך לחץ</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs mt-2">💡 כלל לימודי טוב: הלוואה היא פתרון טוב כשיש יעד/תאריך ברור להחזר (למשל תשלום רטרואקטיבי צפוי או ודאות), ולא כשאין</p>
          </InfoBox>

          <InfoBox variant="tip">
            <p className="font-semibold mb-2">ד. קרנות צדקה ועמותות (סיוע קהילתי)</p>
            <BulletList items={[
              "יש משפחות שמצליחות לקבל סיוע נקודתי דרך עמותות/קרנות",
              "\"כל זכות\" מרכזת כללי זכאות ותנאים",
            ]} />
            <div className="bg-muted/50 rounded p-3 mt-3 border">
              <p className="font-medium text-xs">💰 זיכוי מס בגין תרומות (סעיף 46):</p>
              <p className="text-muted-foreground text-xs mt-1">
                למי שתורם – ניתן לקבל זיכוי מס. שינוי מ-1.1.2026: רשות המסים פרסמה לגבי זיכוי תרומות דרך תיאום מס. 
                סכום מינימלי לתרומה מזכה, והאפשרות לקבל החזר עד 6 שנים אחורה.
              </p>
            </div>
          </InfoBox>

          <InfoBox variant="warning">
            <p className="font-semibold mb-2">🎯 עיקרון מנחה:</p>
            <p className="text-sm">
              אם אתם נעזרים בקהילה – זה לגיטימי. ואם אתם תורמים – יש גם כלים למימוש זיכוי מס כחוק.
            </p>
          </InfoBox>

          <SectionTitle icon={FileText}>סיכום טפסים ומסמכים למודול 5.7-5.9</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead className="bg-muted/50">
                <tr>
                  <th className="border p-2 text-right">נושא</th>
                  <th className="border p-2 text-right">טופס/מסמך</th>
                  <th className="border p-2 text-right">מטרה</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border p-2 font-medium text-foreground">טופס 17</td>
                  <td className="border p-2">בקשה/התחייבות</td>
                  <td className="border p-2">מימון שירותים רפואיים מחוץ לקופה</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium text-foreground">טופס 116א / בקשה לזיכוי</td>
                  <td className="border p-2">בקשה עבור החזקת קרוב במוסד</td>
                  <td className="border p-2">הפחתת מס בהתאם לתנאים</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium text-foreground">יומן הוצאות רפואיות שנתי</td>
                  <td className="border p-2">תבנית פנימית</td>
                  <td className="border p-2">סדר, קבלות, מניעת "פספוס" זכויות</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium text-foreground">מגבלות ביטוחים</td>
                  <td className="border p-2">דוח תנאי פוליסה/כיסוי</td>
                  <td className="border p-2">להבין הגדרה, תקופת תגמול, ניהול</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    default:
      return null;
  }
};
