import { AlertTriangle, CheckCircle2, Users, Heart, Shield, BookOpen, Stethoscope } from "lucide-react";

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
  return (
    <div className={`rounded-lg p-4 border ${styles[variant]}`}>
      {children}
    </div>
  );
};

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="list-disc list-inside space-y-1.5 text-sm leading-relaxed">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

const SectionTitle = ({ icon: Icon, children }: { icon?: React.ElementType; children: React.ReactNode }) => (
  <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
    {Icon && <Icon className="h-4 w-4 text-primary shrink-0" />}
    {children}
  </h3>
);

export const Module1Content = ({ subId }: SubModuleContentProps) => {
  switch (subId) {
    case "1.1":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Heart}>מיהו מטפל משפחתי?</SectionTitle>
          <p>
            מטפל משפחתי (Caregiver) הוא אדם שמסייע באופן קבוע לקרוב משפחה – בן/בת זוג, הורה, אח/ות – שהוא חולה, מוגבל או מזדקן, <strong>ללא הכשרה מקצועית ולרוב ללא תשלום</strong>. הסיוע משתלב בחיים היומיומיים, ולעיתים הוא כל כך "שקוף" שהמטפלים עצמם לא מזהים את עצמם ככאלה.
          </p>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2 text-base">📊 היקף התופעה בישראל</p>
            <BulletList items={[
              "כ-1.2 מיליון אנשים בישראל מטפלים בקרוב משפחה עם מוגבלות או מחלה",
              "21% מהאוכלוסייה הבוגרת מדווחים על כך (נתוני הלמ\"ס ומכון ברוקדייל)",
              "המטפל הממוצע משקיע כ-21 שעות שבועיות לאורך כ-4 שנים",
            ]} />
          </InfoBox>

          <SectionTitle>המעבר ה"שקוף" – מתמיכה לטיפול</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox>
              <p className="font-medium mb-2">💬 תמיכה רגשית/תפקודית</p>
              <p className="text-muted-foreground text-xs">שיחות, ליווי לבדיקות, תזכורות, עזרה בבירוקרטיה, מתן תרופות</p>
            </InfoBox>
            <InfoBox variant="warning">
              <p className="font-medium mb-2">🏥 טיפול פיזי/השגחתי</p>
              <p className="text-muted-foreground text-xs">רחצה, הלבשה, ניידות, השגחה, מניעת נפילות, החלפת תחבושות</p>
            </InfoBox>
          </div>
          <p className="text-muted-foreground">
            ככל שהטיפול הופך פיזי ואינטנסיבי יותר, עולה הסיכון ל<strong>שחיקת המטפל (Caregiver Burnout)</strong> – עומס, טעויות, קונפליקטים ופגיעה בבריאות.
          </p>

          <SectionTitle icon={Users}>מודל גישור גריאטרי (Elder Care Mediation)</SectionTitle>
          <p>
            מודל תקשורת מקצועי למניעת קונפליקטים סביב תהליך ההזדקנות – צד שלישי ניטרלי עוזר למשפחה לייצר הסכמות על טיפול, מגורים וחלוקת עלויות.
          </p>
          <InfoBox variant="tip">
            <p className="font-medium mb-2">📋 ארבעת השלבים:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs text-muted-foreground">
              <li>איסוף עובדות (רפואי/תפקודי/כספי) – בלי ויכוחים</li>
              <li>מיפוי אינטרסים – מה חשוב לכל אחד? (ביטחון? עצמאות? כסף?)</li>
              <li>חלוקת תפקידים + גיבוי – מי אחראי על מה?</li>
              <li>כללי תקשורת – מתי מדברים, ומה עושים כשיש מחלוקת</li>
            </ol>
          </InfoBox>
        </div>
      );

    case "1.2":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Stethoscope}>שכחה טבעית מול דמנציה</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox>
              <p className="font-medium mb-2">✅ שכחה טבעית</p>
              <BulletList items={[
                "איטיות בשליפת מידע",
                "לשכוח שם ולזכור אחר כך",
                "התפקוד היומיומי נשמר",
              ]} />
            </InfoBox>
            <InfoBox variant="warning">
              <p className="font-medium mb-2">⚠️ דמנציה</p>
              <BulletList items={[
                "אוסף תסמינים שמפריעים לתפקוד",
                "קשיים בניהול כסף, תרופות, שפה",
                "שינוי שמחמיר עם הזמן",
              ]} />
            </InfoBox>
          </div>

          <InfoBox variant="tip">
            <p className="font-medium">💡 ההבדל בשאלה אחת:</p>
            <p className="text-muted-foreground mt-1">"האם זה מפריע לתפקוד היומיומי?" – אם כן, יש לבדוק.</p>
          </InfoBox>

          <SectionTitle>סימני אזהרה מוקדמים</SectionTitle>
          <BulletList items={[
            "אובדן זיכרון קצר – שוכחים אירוע שקרה היום, איבוד חוט השיחה",
            "קושי במילים – עצירות רבות, \"הדבר הזה...\"",
            "בלבול בזמן/מקום – טעויות תכופות בשעה או ביום",
            "תכנון לקוי – חשבונות מתבלגנים, מתכון מוכר נהיה מסובך",
            "שיפוט ירוד – נפילות בהונאות, תרומות כספיות מוזרות",
          ]} />

          <InfoBox variant="info">
            <p className="font-medium mb-1">🔍 אל תדלגו על גורמים הפיכים</p>
            <p className="text-muted-foreground text-xs">
              ישנם מצבים שנראים כמו דמנציה אבל יכולים להשתפר: תופעות לוואי של תרופות, דום נשימה בשינה, דיכאון ועוד. חשוב לשלול אותם.
            </p>
          </InfoBox>
        </div>
      );

    case "1.3":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={AlertTriangle}>צ'ק־ליסט התנהגויות מסוכנות</SectionTitle>
          <p className="text-muted-foreground">סמנו "כן/לא" פעם בשבועיים:</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-start font-medium">תחום</th>
                  <th className="border p-2 text-start font-medium">סימן אזהרה</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="border p-2">גז/כיריים</td><td className="border p-2">סירים נשרפים, גז נשאר דולק</td></tr>
                <tr><td className="border p-2">דלתות/מפתחות</td><td className="border p-2">שכחה לנעול, בלבול במפתחות</td></tr>
                <tr><td className="border p-2">יציאה מהבית</td><td className="border p-2">יציאה "רק רגע" ושכחה לאן</td></tr>
                <tr><td className="border p-2">כספים</td><td className="border p-2">תשלומים כפולים, החמצת תשלומים</td></tr>
                <tr><td className="border p-2">תרופות</td><td className="border p-2">נטילה כפולה או החמצה</td></tr>
                <tr><td className="border p-2">היגיינה</td><td className="border p-2">ירידה חריגה בכביסה/ניקיון</td></tr>
                <tr><td className="border p-2">התנהגות</td><td className="border p-2">חשדנות, תוקפנות, הסתגרות חדשה</td></tr>
              </tbody>
            </table>
          </div>

          <InfoBox variant="warning">
            <p className="font-medium">🚨 2–3 סימנים ביחד (או סימן חמור אחד) = "דגל אדום" – יש לפנות לבדיקה.</p>
          </InfoBox>

          <SectionTitle icon={Shield}>בטיחות ומניעת נפילות</SectionTitle>
          <p className="text-muted-foreground mb-2">שינויים קטנים בבית שעושים הבדל גדול:</p>
          <BulletList items={[
            "פינוי שטיחים מחליקים, כבלים ומכשולים",
            "תאורה חזקה במסדרון ובשירותים – במיוחד בלילה",
            "נעליים סגורות בבית (לא גרביים על רצפה חלקה)",
            "ידיות אחיזה במקלחת, משטח מונע החלקה",
            "כיסא יציב להתלבשות, מגני פינות במידת הצורך",
          ]} />

          <InfoBox variant="info">
            <p className="font-medium mb-1">💊 הקשר בין תרופות לנפילות</p>
            <p className="text-muted-foreground text-xs">
              תרופות מסוימות עלולות לגרום לסחרחורת, עייפות או ירידת לחץ דם. מומלץ לבצע סקירת תרופות אצל רופא/רוקח – כולל תוספים ותרופות ללא מרשם. <strong>כלל חשוב: לא מפסיקים תרופה לבד – אבל כן מבקשים "בדיקת התאמה לגיל ולנפילות".</strong>
            </p>
          </InfoBox>
        </div>
      );

    case "1.4":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Stethoscope}>פנייה לרופא המשפחה</SectionTitle>
          <p>כשמגיעים לרופא, חשוב להגיע מוכנים עם:</p>
          <InfoBox variant="tip">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>דוגמאות קונקרטיות</strong> – 3-5 אירועים עם תאריך והקשר</li>
              <li><strong>רשימת תרופות מלאה</strong> – כולל תוספים "טבעיים"</li>
              <li><strong>תיאור תפקודי</strong> – מה השתנה בניהול בית, כספים, תרופות, בישול, נהיגה</li>
            </ol>
          </InfoBox>

          <SectionTitle>הערכה גריאטרית מקיפה (CGA)</SectionTitle>
          <p>הערכה רב-תחומית שבודקת לא רק "אבחנה" אלא תמונה שלמה:</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {["מצב רפואי וסקירת תרופות", "תפקוד יומיומי (ADL/IADL)", "קוגניציה וזיכרון", "מצב רוח ודיכאון", "ניידות ובטיחות", "סביבת מגורים ותמיכה משפחתית"].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-2 text-xs text-center border">
                {item}
              </div>
            ))}
          </div>

          <SectionTitle>מבחנים קוגניטיביים נפוצים</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox>
              <p className="font-medium">MoCA</p>
              <p className="text-muted-foreground text-xs">מבחן קצר (~10 דקות), ניקוד עד 30. נחשב רגיש לירידה קוגניטיבית קלה.</p>
            </InfoBox>
            <InfoBox>
              <p className="font-medium">MMSE</p>
              <p className="text-muted-foreground text-xs">מבחן קצר (5-10 דקות), ניקוד עד 30. שכיח לסקר קוגניטיבי ראשוני.</p>
            </InfoBox>
          </div>
          <p className="text-muted-foreground text-xs">
            ⚠️ תוצאה טובה לא שוללת בעיה – אם התפקוד מתדרדר, צריך להמשיך לבדוק.
          </p>

          <InfoBox variant="warning">
            <p className="font-medium mb-1">🚨 מתי זה דחוף ממש?</p>
            <BulletList items={[
              "בלבול חד שהתחיל בימים/שבועות (לא הדרגתי)",
              "נפילות חוזרות חדשות",
              "שינוי התנהגות קיצוני",
              "חשד להזנחה או סיכון מיידי",
            ]} />
          </InfoBox>
        </div>
      );

    case "1.5":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Users}>קונפליקטים בין אחים</SectionTitle>
          <p>
            מאחורי "טענות ענייניות" על טיפול, כסף ומגורים מסתתרים לרוב <strong>פחד ואשמה</strong>. הבנה זו מפחיתה 50% מהמריבות.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox>
              <p className="font-medium mb-1">⚖️ שוויון</p>
              <p className="text-muted-foreground text-xs">כולם עושים אותו דבר – לרוב לא ריאלי</p>
            </InfoBox>
            <InfoBox variant="tip">
              <p className="font-medium mb-1">🤝 הוגנות</p>
              <p className="text-muted-foreground text-xs">כל אחד תורם בהתאם ליכולתו ולמשאבים – באופן שקוף ומוסכם</p>
            </InfoBox>
          </div>

          <InfoBox variant="highlight">
            <p className="font-medium mb-2">דוגמה להוגנות:</p>
            <BulletList items={[
              "אח אחד מבקר פעמיים בשבוע (כי גר קרוב)",
              "אחות אחרת מנהלת בירוקרטיה וקניות אונליין",
              "אח שלישי ממן הוצאות / משתתף בשעות עזרה (יש פערי הכנסה)",
            ]} />
          </InfoBox>

          <SectionTitle>פרוטוקול תקשורת משפחתי</SectionTitle>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>ישיבת משפחה קבועה</strong> – פעם בשבועיים, 30 דק', בזום/טלפון</li>
            <li><strong>דובר/ת אחד/ת</strong> מול המערכת (רופאים, ביטוח לאומי)</li>
            <li><strong>סיכום כתוב</strong> אחרי כל שיחה – מה הוחלט, מי עושה מה, עד מתי</li>
            <li><strong>כלל זהב:</strong> לא פותרים מחלוקות בוואטסאפ בשתיים בלילה</li>
          </ol>

          <InfoBox variant="info">
            <p className="font-medium mb-2">🪜 סולם הסלמה:</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p><strong>שלב 1:</strong> חוזרים לעובדות – מה קרה, מה הסיכון</p>
              <p><strong>שלב 2:</strong> בוחרים פתרון זמני ל-3 חודשים</p>
              <p><strong>שלב 3:</strong> אם תקועים – מכניסים איש מקצוע (עו"ס, גריאטר, מגשר)</p>
            </div>
          </InfoBox>
        </div>
      );

    case "1.6":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={BookOpen}>כבוד הזקן בתרבויות שונות</SectionTitle>
          <p>
            בתרבויות רבות נהוג לראות בזקנים מקור לחכמה, ניסיון ומעמד משפחתי, ולכן היחס אליהם מלווה בכבוד רב. כבוד זה יכול להתבטא בהקשבה לדעתם, בהימנעות מערעור סמכותם, וברצון לשמור על כבודם גם בתקופות של ירידה תפקודית או קוגניטיבית.
          </p>
          <p>
            עם זאת, דווקא הערך החשוב הזה עלול לעיתים להקשות על קבלת החלטות מעשיות. בני משפחה עשויים:
          </p>
          <BulletList items={[
            "להימנע מלומר שההורה כבר אינו בטוח לבד",
            "לחשוש מהצבת גבולות או מהעברת אחריות",
            "להתקשות לשוחח על מעבר למסגרת מתאימה, על קבלת עזרה, או על החלטות רפואיות מורכבות",
          ]} />

          <p>
            במשפחות מסוימות יש גם השפעה חזקה של אמונה דתית, מסורת, תפיסת כבוד המשפחה או חשש מ״מה יגידו״. לכן חשוב להבין שלא מדובר רק בשאלה רפואית או תפקודית, אלא גם בשאלה ערכית, תרבותית ורגשית.
          </p>

          <InfoBox variant="tip">
            <p className="font-medium mb-2">💡 טיפ פרקטי</p>
            <p className="text-muted-foreground">
              כדי לנהל שיחה רגישה ומעשית יותר, אפשר לתרגם את הוויכוח הערכי לשתי שאלות ניטרליות:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-xs text-muted-foreground">
              <li>מה הסיכון הבטיחותי כרגע?</li>
              <li>מהו הפתרון הכי פחות פוגעני שיכול להפחית את הסיכון בחודשים הקרובים?</li>
            </ol>
          </InfoBox>

          <SectionTitle>דילמות דתיות בהחלטות רפואיות</SectionTitle>
          <p>
            כאשר עולות דילמות דתיות או רפואיות — למשל סביב הארכת חיים, איכות חיים, או הסכמה לטיפול — כדאי להיערך מוקדם ככל האפשר. בישראל קיימת מסגרת מוסדרת:
          </p>
          <BulletList items={[
            "חוק החולה הנוטה למות",
            "הנחיות רפואיות מקדימות",
            "מינוי מיופה כוח לקבלת החלטות רפואיות",
          ]} />

          <InfoBox variant="highlight">
            <p className="font-medium mb-2">🕐 מה כדאי לעשות מוקדם (גם אם ״עוד לא שם״)?</p>
            <BulletList items={[
              "לשקול מינוי מיופה כוח רפואי – לא ״זה מוות״, זה שליטה והפחתת מריבות",
              "לחשוב על הנחיות רפואיות מקדימות",
              "אם יש למשפחה סמכות רבנית או דתית משמעותית – לשלב אותה כבר בתחילת הדרך",
            ]} />
          </InfoBox>
        </div>
      );

    default:
      return null;
  }
};
