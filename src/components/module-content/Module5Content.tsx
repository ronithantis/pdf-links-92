import { Users, FileText, Shield, Heart, Smartphone, Home, AlertTriangle, Camera, Wallet } from "lucide-react";

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

export const Module5Content = ({ subId }: SubModuleContentProps) => {
  switch (subId) {
    case "6.1":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Users}>חברות סיעוד vs תאגידי כוח אדם</SectionTitle>
          <p>חברות סיעוד ותאגידי כוח אדם הם הגורמים שמתווכים בין המשפחה לעובד/ת הסיעוד.</p>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">תפקידי חברת הסיעוד / תאגיד:</p>
            <BulletList items={[
              "גיוס עובדים ושיבוץ",
              "ליווי מקצועי ופיקוח",
              "אחריות על איכות הטיפול",
            ]} />
            <p className="text-muted-foreground text-xs mt-2">💰 עלות: כ-₪70-150 לחודש</p>
          </InfoBox>

          <SectionTitle>קריטריונים לבחירת חברת סיעוד</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { title: "מוניטין", desc: "בדיקת ביקורות ושיחות עם משפחות אחרות" },
              { title: "איכות שירות", desc: "זמינות, החלפת מטפל, מענה לבעיות" },
              { title: "שקיפות פיננסית", desc: "פירוט עלויות ברור ומלא" },
              { title: "זכויות המטופל", desc: "מדיניות החלפה, ביטולים, תלונות" },
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-3 border">
                <p className="font-medium text-xs">{item.title}</p>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <InfoBox variant="tip">
            <p className="font-medium mb-1">📋 טפסים רלוונטיים:</p>
            <p className="text-muted-foreground text-xs">רשימת בדיקה לבחירת חברה • טופס השוואת הצעות מחיר • הסכם עם חברת סיעוד</p>
          </InfoBox>
        </div>
      );

    case "6.2":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Users}>העסקת עובד/ת זר/ה</SectionTitle>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">תנאי זכאות להיתר העסקה:</p>
            <p className="text-muted-foreground text-xs">גיל 85+ או ADL3+ (3 פעולות יומיומיות שדורשות עזרה)</p>
            <p className="text-muted-foreground text-xs mt-1">התהליך: הגשת בקשה → קבלת היתר → גיוס עובד/ת</p>
          </InfoBox>

          <SectionTitle icon={Wallet}>עלויות חודשיות (בקירוב)</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <tbody className="text-muted-foreground">
                <tr><td className="border p-2 font-medium text-foreground">שכר בסיס</td><td className="border p-2">~₪5,300</td></tr>
                <tr><td className="border p-2 font-medium text-foreground">דמי ביטוח</td><td className="border p-2">~₪660</td></tr>
                <tr><td className="border p-2 font-medium text-foreground">תאגיד</td><td className="border p-2">~₪70</td></tr>
                <tr><td className="border p-2 font-medium text-foreground">ביטוח רפואי</td><td className="border p-2">~₪1,370</td></tr>
                <tr className="bg-muted/50"><td className="border p-2 font-bold text-foreground">סה"כ חודשי</td><td className="border p-2 font-bold">~₪7,400</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-xs">+ הוצאות חד-פעמיות: אגרה ~₪2,000, כרטיס טיסה, הדרכה</p>

          <SectionTitle>העסקת בן משפחה בתשלום</SectionTitle>
          <InfoBox>
            <BulletList items={[
              "תנאים: רישום בתאגיד + הסכם העסקה",
              "תשלום: 75-85% משכר מטפל רגיל",
              "יתרונות: אמון, רציפות טיפול",
              "חסרונות: קושי בהפרדת גבולות, זכויות סוציאליות",
            ]} />
          </InfoBox>
        </div>
      );

    case "6.3":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <InfoBox variant="highlight">
            <p className="text-sm">
              💡 <strong>עיקרון מנחה:</strong> עובד שמרגיש מוגן ומכובד → פחות שחיקה, פחות עימותים, יותר סבלנות למטופל = טיפול טוב יותר בהורה שלך.
            </p>
          </InfoBox>

          <SectionTitle icon={Users}>הבנת נקודת המבט של העובד/ת</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "מעבר למדינה זרה, שפה זרה, ללא רשת תמיכה",
              "פערי תרבות, דת, מנהגים וצניעות",
              "עבודה 24/6 או 24/5 עם אחריות כבדה",
              "לחץ כלכלי – ציפייה לשלוח כסף הביתה",
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-2.5 text-xs border">{item}</div>
            ))}
          </div>

          <InfoBox>
            <p className="font-semibold mb-2">🏠 מה העובד/ת צריך/ה:</p>
            <BulletList items={[
              "חדר פרטי (חובה), מיטה, ארון",
              "אוכל מתאים בהתחשבות בדת ותרבות",
              "זמן אישי, פרטיות, שיחות טלפון",
              "כבוד, הערכה, פנייה בשם",
            ]} />
          </InfoBox>

          <SectionTitle icon={FileText}>תיאום ציפיות ביום הראשון</SectionTitle>
          <p>השקעה של שעתיים ביום הראשון חוסכת חודשים של תסכול.</p>
          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📋 יום 1 – פגישת קליטה מובנית:</p>
            <BulletList items={[
              "סיור בבית: חדרים, ציוד, חומרים מסוכנים, ערכת עזרה ראשונה",
              "היכרות עם המטופל: רקע רפואי, הרגלים, טריגרים, מה מרגיע",
              "הסבר על מחלות (דמנציה/פרקינסון/סוכרת) – \"בשפה פשוטה\"",
              "תרופות: תרשים מסודר עם שעות + \"מי מוסמך לשנות\" (רק רופא/משפחה)",
              "הגדרת תפקידים: מה כן ומה לא",
            ]} />
          </InfoBox>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox>
              <p className="font-semibold mb-1 text-xs">✅ כן – תפקידי הסיעוד</p>
              <BulletList items={[
                "טיפול אישי: רחצה, הלבשה, חיתולים",
                "הכנת ארוחות למטופל",
                "מתן תרופות (בפיקוח)",
                "ליווי לרופא, שמירה ובטיחות",
              ]} />
            </InfoBox>
            <InfoBox variant="warning">
              <p className="font-semibold mb-1 text-xs">❌ לא – לא תפקיד העובד/ת</p>
              <BulletList items={[
                "ניקיון כבד של כל הבית",
                "טיפול בבני משפחה אחרים",
                "עבודות גינון כבדות",
                "בישול קבוע למשפחה מורחבת",
              ]} />
            </InfoBox>
          </div>

          <SectionTitle icon={Camera}>מצלמות אבטחה – איזון בטיחות ופרטיות</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            <InfoBox>
              <p className="font-medium text-xs mb-1">✅ מותר לצלם</p>
              <p className="text-muted-foreground text-xs">סלון, מטבח, חדרי מגורים משותפים, כניסה לבית</p>
            </InfoBox>
            <InfoBox variant="warning">
              <p className="font-medium text-xs mb-1">❌ אסור לצלם</p>
              <p className="text-muted-foreground text-xs">חדר שינה של העובד, שירותים, מקלחת, אזורי החלפת בגדים</p>
            </InfoBox>
          </div>
          <InfoBox variant="info">
            <p className="font-medium mb-1">📌 חובות חוקיות:</p>
            <BulletList items={[
              "חובה ליידע את העובד בכתב ובשפתו",
              "חתימה על הסכמה מדעת",
              "צפייה מוגבלת (1-2 אנשים עם סיסמה)",
              "מחיקה אוטומטית אחרי 30 יום",
              "חלופות: שיחות וידאו, דוחות יומיים, חיישני נפילה (ללא וידאו)",
            ]} />
          </InfoBox>

          <SectionTitle icon={Wallet}>הסכמים בכתב ותשלומים</SectionTitle>
          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">📝 חובה: הסכם העסקה כתוב תוך 30 יום</p>
            <BulletList items={[
              "פרטי צדדים, תיאור תפקיד, שכר (ברוטו/נטו)",
              "שעות עבודה ומנוחה (25 שעות רצופות בשבוע)",
              "ימי חופשה וחגים, תנאי פיטורים",
              "תקופת ניסיון (3 חודשים), חתימות",
              "בשפת העובד (דו-לשוני)",
            ]} />
          </InfoBox>
          <InfoBox>
            <p className="font-medium mb-1">💳 תשלום ותיעוד:</p>
            <BulletList items={[
              "תשלום בהעברה בנקאית (הוכחת תשלום)",
              "דיווח לביטוח לאומי עד ה-15 לחודש העוקב",
              "שמירת תיעוד 7 שנים (דרישה חוקית)",
              "דמי הבראה לפי ימים × שווי יום עדכני × ותק",
            ]} />
          </InfoBox>
        </div>
      );

    case "6.4":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Heart}>שמירה על מקצועיות וכבוד הדדי</SectionTitle>
          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">כללי יסוד:</p>
            <BulletList items={[
              "כבוד הדדי ושפה מכבדת (אסור צעקות/השפלות)",
              "גבולות ברורים: העובד/ת הוא/היא עובד/ת, לא בן/בת משפחה",
              "תקשורת ישירה: מדברים מוקדם, לא צוברים",
            ]} />
          </InfoBox>

          <SectionTitle>מנגנון פידבק</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox>
              <p className="font-medium text-xs">👍 פידבק חיובי – קצר ובזמן אמת</p>
              <p className="text-muted-foreground text-xs mt-1">"שמתי לב שאמא יותר רגועה היום, תודה."</p>
            </InfoBox>
            <InfoBox variant="tip">
              <p className="font-medium text-xs">🔧 פידבק מתקן – בפרטיות, עם דרך פעולה</p>
              <p className="text-muted-foreground text-xs mt-1">"שמתי לב שהתרופות ניתנו באיחור. בוא נקבע תזכורת קבועה."</p>
            </InfoBox>
          </div>

          <SectionTitle>הסלמה מדורגת (מומלץ בכתב)</SectionTitle>
          <div className="space-y-2">
            {[
              { step: "1", text: "שיחה ותזכורת לכללים" },
              { step: "2", text: "תיעוד קצר בכתב (ווטסאפ/דף)" },
              { step: "3", text: "התראה רשמית + הגדרת יעד שיפור" },
              { step: "4", text: "התייעצות עם תאגיד/לשכה/עו\"ד לפני צעד דרמטי" },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 bg-muted/50 rounded-md p-2.5 border">
                <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{item.step}</span>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          <SectionTitle icon={AlertTriangle}>סימני אזהרה שמחייבים פעולה</SectionTitle>
          <InfoBox variant="warning">
            <BulletList items={[
              "חשד להזנחה / אלימות / פגיעה בכבוד המטופל",
              "שימוש באלכוהול/סמים",
              "היעלמות ללא הודעה",
              "חשד לגניבה (תיעוד, בירור זהיר – לא \"בית דין שדה\")",
            ]} />
          </InfoBox>

          <SectionTitle>פיטורים והודעה מוקדמת</SectionTitle>
          <InfoBox>
            <BulletList items={[
              "לאחר 8 חודשי עבודה: 11 ימי הודעה מוקדמת",
              "חשבון גמר מלא: פיצויים, חופשה, הבראה",
              "הודעה לביטוח לאומי ולתאגיד",
              "יש הוראות מיוחדות לזכויות עובדים זרים בסיעוד",
            ]} />
          </InfoBox>

          <SectionTitle>תמיכה בעובד/ת – השקעה שמשתלמת</SectionTitle>
          <InfoBox variant="tip">
            <p className="font-medium mb-2">תמיכה "קטנה" מונעת תחלופה ומעלה איכות טיפול:</p>
            <BulletList items={[
              "ביטוח בריאות פרטי (חובת המעסיק, ניכוי מוגבל ~₪168.8/חודש)",
              "עידוד והרשמה לקורס עברית",
              "ליווי לרופא אם חולה",
              "מפגשים עם עובדים מארצו – קשר עם הקהילה",
              "לא למנוע יציאות בזמן המנוחה, לכבד ימי חופש",
              "תמריצים: בונוס לחגים, מתנת יום הולדת, כרטיס טלפון נדיב",
            ]} />
          </InfoBox>
        </div>
      );

    case "6.5":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Home}>שירותים קהילתיים נוספים</SectionTitle>
          <div className="space-y-2">
            <InfoBox variant="highlight">
              <p className="font-semibold">🏢 מרכזי יום לתשושים/תשושי נפש</p>
              <p className="text-muted-foreground text-xs mt-1">טיפול יומי, פעילויות, ארוחות – מאפשר הפוגה למטפל ואינטראקציה חברתית למטופל</p>
            </InfoBox>
            <InfoBox>
              <p className="font-semibold">🤝 קהילה תומכת</p>
              <p className="text-muted-foreground text-xs mt-1">סיוע בקניות, ליווי לבנק, תרופות – התנדבותי או דרך שירותי רווחה</p>
            </InfoBox>
            <InfoBox>
              <p className="font-semibold">🏥 אשפוז בית</p>
              <p className="text-muted-foreground text-xs mt-1">טיפול רפואי סיעודי בבית – חלופה לאשפוז ממושך</p>
            </InfoBox>
          </div>

          <SectionTitle icon={Smartphone}>טכנולוגיה מסייעת ובטיחות</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { title: "🔴 לחצני מצוקה", desc: "לחצן אדום, שעון חכם עם GPS" },
              { title: "📡 סנסורים", desc: "זיהוי נפילות ותנועה" },
              { title: "📹 מצלמות לניטור", desc: "בהסכמה ובאזורים משותפים בלבד" },
              { title: "🏠 בית חכם", desc: "גלאי גז אוטומטי, תאורה חכמה" },
              { title: "💊 אפליקציות תרופות", desc: "תזכורות ומעקב נטילה" },
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-3 border">
                <p className="font-medium text-xs">{item.title}</p>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <InfoBox variant="tip">
            <p className="font-medium mb-1">💡 עיקרון מנחה</p>
            <p className="text-muted-foreground text-xs">
              הטכנולוגיה לא מחליפה מטפל אנושי – אלא מוסיפה שכבת ביטחון, מאפשרת מעקב מרחוק ומפחיתה חרדה למשפחה.
            </p>
          </InfoBox>
        </div>
      );

    default:
      return null;
  }
};
