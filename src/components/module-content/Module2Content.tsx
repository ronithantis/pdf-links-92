import { AlertTriangle, Pill, Stethoscope, Brain, Activity, Heart } from "lucide-react";

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

export const Module2Content = ({ subId }: SubModuleContentProps) => {
  switch (subId) {
    case "2.1":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Stethoscope}>מסלול אבחון טיפוסי</SectionTitle>
          <p>
            המטרה אינה רק "לתת שם לבעיה", אלא <strong>להבין מה גורם לקושי</strong>, מה אפשר לטפל/לשפר, ולבנות תכנית טיפול ותמיכה מתאימה למשפחה.
          </p>

          <div className="space-y-3">
            <InfoBox variant="highlight">
              <p className="font-semibold mb-2">🏥 שלב 1: רופא משפחה / אחות קהילה</p>
              <BulletList items={[
                "איסוף תיאור התפקוד והשינויים לאורך זמן",
                "סקירת תרופות מלאה (כולל תוספים ותרופות ללא מרשם)",
                "בדיקות בסיס לשלילת גורמים הפיכים (זיהום, התייבשות, תופעות לוואי)",
              ]} />
            </InfoBox>

            <InfoBox>
              <p className="font-semibold mb-2">🧠 שלב 2: סקר קוגניטיבי + תפקודי</p>
              <BulletList items={[
                "מבחנים קצרים (MMSE / MoCA) – \"מד חום\" ראשוני, לא אבחנה סופית",
                "הערכת תפקוד יומיומי: תרופות, כסף, קניות, בישול, ניידות",
                "בדיקה נוירולוגית: הליכה, רעד, שיווי משקל, רפלקסים",
              ]} />
            </InfoBox>

            <InfoBox variant="tip">
              <p className="font-semibold mb-2">🔬 שלב 3: הפניה למומחה</p>
              <BulletList items={[
                "גריאטר / נוירולוג / פסיכוגריאטר / מרפאת זיכרון",
                "הערכה נוירו-פסיכולוגית מעמיקה (זיכרון, קשב, שפה, תכנון)",
                "הדמיה מוחית (CT/MRI) – לזיהוי אירועים וסקולריים, גידול, הידרוצפלוס",
              ]} />
            </InfoBox>

            <InfoBox>
              <p className="font-semibold mb-2">📋 שלב 4: סיכום ותכנית</p>
              <p className="text-muted-foreground text-xs">מה האבחנה הסבירה? מידת הסיכון? מה לשנות בבית? איזה מעקב? איזו תמיכה למשפחה?</p>
            </InfoBox>
          </div>

          <SectionTitle icon={Brain}>הערכה גריאטרית מקיפה (CGA) – למה זה "שובר שוויון"</SectionTitle>
          <p>
            גישה רב-תחומית שמסתכלת על המבוגר <strong>באופן הוליסטי</strong> – רפואי, תפקודי, רגשי, חברתי וסביבתי – ובונה תכנית טיפול משולבת.
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {["מצב רפואי + סקירת תרופות", "תפקוד יום-יומי (ADL/IADL)", "קוגניציה ומצב רוח", "ניידות ונפילות", "בטיחות בבית", "תמיכה משפחתית ועומס מטפל"].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-2.5 text-xs text-center border font-medium">{item}</div>
            ))}
          </div>
          <p className="text-muted-foreground">
            <strong>למה זה שווה זהב למשפחה?</strong> הופך "כאוס" למפת דרכים – מי אחראי על מה, מה בודקים מחדש ובאיזו תדירות.
          </p>
        </div>
      );

    case "2.2":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Brain}>סוגי דמנציה – מה חשוב לדעת</SectionTitle>
          <p className="text-muted-foreground">
            האחוזים משתנים בין מחקרים ומדינות, ולעיתים קיימת דמנציה "מעורבת" (יותר מסוג אחד). הנה הטווחים המקובלים:
          </p>

          <div className="space-y-3">
            <InfoBox variant="highlight">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-base">אלצהיימר</p>
                  <p className="text-muted-foreground text-xs mt-1">הנפוצה ביותר – 60-70% מהמקרים</p>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">60-70%</span>
              </div>
              <p className="mt-2 text-sm">התחלה הדרגתית, פגיעה בעיקר בזיכרון חדש ולמידה, ובהמשך קשיים בתכנון, שפה והתמצאות.</p>
            </InfoBox>

            <InfoBox>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-base">דמנציה וסקולרית (כלי דם)</p>
                  <p className="text-muted-foreground text-xs mt-1">השנייה בשכיחות – 20-30%</p>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">20-30%</span>
              </div>
              <p className="mt-2 text-sm">קשורה לפגיעה בזרימת הדם למוח (שבץ, "שבצים קטנים"). ההידרדרות יכולה להיות "במדרגות" – קפיצות אחרי אירוע. בולטת בקשיי תכנון ואטיות חשיבה.</p>
            </InfoBox>

            <InfoBox>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-base">דמנציה עם גופי לואי (Lewy Body)</p>
                  <p className="text-muted-foreground text-xs mt-1">5-10% (חלק מהמקורות עד 20%)</p>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">5-20%</span>
              </div>
              <p className="mt-2 text-sm">נגרמת מהשקעת חלבון (אלפא-סינוקלאין) בתאי עצב.</p>
              <div className="mt-2">
                <p className="font-medium text-xs mb-1">🚩 מאפיינים שמרימים דגל:</p>
                <BulletList items={[
                  "תנודתיות גדולה בערנות/קשב",
                  "הזיות ראייה",
                  "הפרעות שינה מסוג REM",
                  "לעיתים סימנים פרקינסוניים (רעד/נוקשות/איטיות)",
                ]} />
              </div>
            </InfoBox>

            <InfoBox>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-base">דמנציה פרונטו-טמפורלית (FTD)</p>
                  <p className="text-muted-foreground text-xs mt-1">נדירה יחסית</p>
                </div>
                <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-bold">נדירה</span>
              </div>
              <p className="mt-2 text-sm">פוגעת באזורים הקדמיים של המוח – מתבטאת בשינויי אישיות, התנהגות ושפה, לפעמים עוד לפני בעיות זיכרון משמעותיות.</p>
            </InfoBox>
          </div>
        </div>
      );

    case "2.3":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Activity}>מחלת פרקינסון</SectionTitle>
          <p>
            מחלה נוירולוגית כרונית שמערבת <strong>ירידה בדופמין במוח</strong> – ומשפיעה על תנועה, מצב רוח ותפקוד.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox variant="highlight">
              <p className="font-semibold mb-2">🦿 תסמינים מוטוריים</p>
              <BulletList items={[
                "רעד (בעיקר במנוחה)",
                "נוקשות שרירים",
                "קושי להתחיל תנועה (ברדיקינזיה)",
                "צעדים קטנים, גרירת רגליים",
                "חוסר יציבות ונפילות",
              ]} />
            </InfoBox>
            <InfoBox variant="warning">
              <p className="font-semibold mb-2">😔 תסמינים לא-מוטוריים</p>
              <BulletList items={[
                "עצירות",
                "ירידה בחוש ריח",
                "הפרעות שינה (\"משחק חלומות\")",
                "דיכאון וחרדה",
                "עייפות וירידה קוגניטיבית",
              ]} />
            </InfoBox>
          </div>

          <SectionTitle icon={Pill}>טיפול תרופתי</SectionTitle>
          <InfoBox variant="tip">
            <p className="text-sm">
              <strong>לבודופה (Levodopa)</strong> – הטיפול המרכזי, מעלה דופמין ומשפר תסמיני תנועה. הטיפול מותאם אישית (מינונים, תזמון) כדי להפחית תסמינים ולצמצם תופעות לוואי.
            </p>
          </InfoBox>

          <SectionTitle>גישה רב-תחומית</SectionTitle>
          <p className="text-muted-foreground">הגישה המודרנית מדגישה טיפול משולב:</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { title: "פיזיותרפיה", desc: "שיווי משקל, קימה מכיסא, הליכה" },
              { title: "ריפוי בעיסוק", desc: "התאמת הבית, ידיות, תאורה, סידור רהיטים" },
              { title: "קלינאות תקשורת", desc: "שיפור דיבור ובליעה" },
              { title: "תזונה", desc: "התאמת תפריט למצב התפקודי" },
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-3 border">
                <p className="font-medium text-xs">{item.title}</p>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <InfoBox variant="info">
            <p className="font-medium mb-1">🏠 התאמות ביתיות למניעת נפילות</p>
            <p className="text-muted-foreground text-xs">פינוי מכשולים, תאורת לילה, משטחים לא מחליקים – דומות מאוד להתאמות הכלליות למניעת נפילות בגיל המבוגר.</p>
          </InfoBox>
        </div>
      );

    case "2.4":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Heart}>העיקרון המנחה</SectionTitle>
          <InfoBox variant="highlight">
            <p className="text-sm">
              בגיל המבוגר, לא מספיק לטפל בכל מחלה "בנפרד". <strong>השילוב של מחלות + תרופות + ירידה תפקודית</strong> הוא מה שמייצר סיכון. צריך לראות את התמונה הכוללת.
            </p>
          </InfoBox>

          <div className="space-y-3">
            <InfoBox>
              <p className="font-semibold">🩸 סוכרת סוג 2</p>
              <p className="text-sm text-muted-foreground mt-1">דגש על איזון סוכר מותאם לגיל, תזונה ופעילות. מניעת היפוגליקמיה (סוכר נמוך) – שיכולה לגרום לנפילות ובלבול.</p>
            </InfoBox>

            <InfoBox>
              <p className="font-semibold">💓 יתר לחץ דם ומחלות לב וכלי דם</p>
              <p className="text-sm text-muted-foreground mt-1">קשורים ישירות לסיכון לאירועים מוחיים ולרכיב וסקולרי בקוגניציה. דגש על מדידות ביתיות ואיתור תופעות כמו סחרחורת בעמידה.</p>
            </InfoBox>

            <InfoBox>
              <p className="font-semibold">🦴 אוסטאופורוזיס</p>
              <p className="text-sm text-muted-foreground mt-1">לא רק "דלדול עצם" – אלא מנגנון שמכפיל סיכון לשבר אחרי נפילה. שילוב של: תזונה, פעילות/חיזוק שרירים, הערכת נפילות וטיפול תרופתי.</p>
            </InfoBox>

            <InfoBox variant="tip">
              <p className="font-semibold">😞 דיכאון גריאטרי</p>
              <p className="text-sm text-muted-foreground mt-1">יכול להיראות כמו "דמנציה" (ירידה בריכוז, זיכרון, מוטיבציה). <strong>חשוב לאבחן כי טיפול בדיכאון יכול לשפר תפקוד מאוד.</strong></p>
            </InfoBox>

            <InfoBox variant="warning">
              <p className="font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                דליריום (מצב בלבול חריף)
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                בלבול חריף שמתפתח על פני שעות-ימים, ולעיתים "עולה ויורד" במהלך היום.
              </p>
              <div className="mt-2">
                <p className="font-medium text-xs mb-1">טריגרים שכיחים:</p>
                <BulletList items={[
                  "זיהום (דלקת שתן, ריאות)",
                  "תרופות מרדימות / אינטראקציות",
                  "התייבשות והפרעות מלחים",
                  "ניתוח, מחלה חריפה",
                ]} />
              </div>
              <div className="mt-3 bg-destructive/5 rounded p-2">
                <p className="text-xs font-medium">👆 כלל אצבע למשפחה: אם "פתאום הוא/היא לא אותו אדם" תוך יום-יומיים – זה דחוף יותר מחשד לדמנציה.</p>
              </div>
            </InfoBox>
          </div>
        </div>
      );

    case "2.5":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Pill}>ניהול תרופתי מורכב (Polypharmacy)</SectionTitle>
          <p>
            ככל שיש יותר מחלות, יש יותר רופאים ויותר תרופות – <strong>וזה מגדיל סיכון לטעויות</strong>, אינטראקציות ותופעות שמחקות ירידה קוגניטיבית או גורמות לנפילות.
          </p>

          <SectionTitle>🛡️ מערכת הגנה משפחתית – כלים בסיסיים</SectionTitle>
          <div className="space-y-3">
            <InfoBox variant="highlight">
              <p className="font-semibold mb-2">📝 רשימת תרופות "אמיתית" אחת</p>
              <p className="text-muted-foreground text-xs">שם תרופה, מינון, שעה, למה ניתנה, מי רשם – במקום אחד נגיש.</p>
            </InfoBox>

            <div className="grid gap-2 sm:grid-cols-2">
              <InfoBox>
                <p className="font-medium text-xs">💊 קופסת תרופות שבועית</p>
                <p className="text-muted-foreground text-xs">או חלוקה בבליסטרים – מונע טעויות במינון</p>
              </InfoBox>
              <InfoBox>
                <p className="font-medium text-xs">📌 כלל זהב</p>
                <p className="text-muted-foreground text-xs">כל שינוי תרופתי נרשם מיד (כולל "הפסקנו כי...")</p>
              </InfoBox>
            </div>

            <InfoBox variant="warning">
              <p className="font-medium mb-1">⚠️ מעברים בין מסגרות = נקודת סיכון</p>
              <p className="text-muted-foreground text-xs">מיון, אשפוז, שיקום – תמיד לבקש "יישור קו" (Medication Reconciliation) של כל התרופות.</p>
            </InfoBox>
          </div>

          <SectionTitle>תיאום בין רופאים</SectionTitle>
          <InfoBox variant="tip">
            <p className="text-sm">
              בוחרים <strong>רופא/ה מוביל/ה</strong> (רופא משפחה או גריאטר) שמחזיק/ה את התמונה הכוללת. מבקשים סקירת תרופות עם רוקח/ת אחת לתקופה. משתמשים בעקרונות כמו <strong>Beers Criteria</strong> – רשימה מקצועית של תרופות שכדאי להימנע מהן או להשתמש בזהירות בגיל 65+.
            </p>
          </InfoBox>

          <SectionTitle>כלים טכנולוגיים ופרקטיים</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            <InfoBox>
              <p className="font-medium text-xs">📱 אפליקציות תזכורת</p>
              <p className="text-muted-foreground text-xs">עוזרות במיוחד כשיש 3+ זמני נטילה ביום, או כשכמה בני משפחה מתחלקים במעקב</p>
            </InfoBox>
            <InfoBox>
              <p className="font-medium text-xs">🏠 פתרון פיזי</p>
              <p className="text-muted-foreground text-xs">קופסת תרופות, לוח על המקרר, שעון תזכורת פשוט</p>
            </InfoBox>
          </div>
          <InfoBox variant="info">
            <p className="text-xs text-muted-foreground">
              <strong>💡 טיפ חשוב:</strong> אם המבוגר מתקשה עם סמארטפון – עדיף פתרון פיזי. בכל מקרה, לא סומכים רק על תזכורת – מוסיפים "בדיקת בקרה" (שיחה קצרה יומית / סימון בטבלה).
            </p>
          </InfoBox>
        </div>
      );

    default:
      return null;
  }
};
