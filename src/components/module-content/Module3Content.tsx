import { FileText, Shield, Users, Landmark, Heart } from "lucide-react";

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

export const Module3Content = ({ subId }: SubModuleContentProps) => {
  switch (subId) {
    case "4.1":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <InfoBox variant="highlight">
            <p className="text-sm">
              💡 <strong>מסר מרכזי:</strong> מדברים על זה היום (כשכולם צלולים) – וזה מציל את המשפחה מחר (כשיש משבר, לחץ, אשפוז או סכסוך).
            </p>
          </InfoBox>

          <SectionTitle icon={FileText}>מהי צוואה?</SectionTitle>
          <p>מסמך שמבטא את רצון האדם לגבי רכושו לאחר פטירתו. בישראל יש 4 צורות חוקיות.</p>

          <SectionTitle>סוגי צוואות נפוצים</SectionTitle>
          <div className="space-y-2">
            {[
              { num: "1", title: "צוואה בכתב יד", desc: "כולה בכתב יד עם תאריך וחתימה. פשוטה וזולה, אך יש סיכון לפגמים צורניים ולטענות השפעה." },
              { num: "2", title: "צוואה בעדים", desc: "מסמך כתוב עם תאריך, חתימת המצווה ואישור שני עדים." },
              { num: "3", title: "צוואה בפני רשות", desc: "נעשית בפני שופט, רשם או בית דין – גורם רשמי." },
              { num: "4", title: "צוואה בעל פה", desc: "קיימת בחוק אך נדירה מאוד – למצבים חריגים בלבד." },
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

          <SectionTitle>מה כדאי לכלול בצוואה?</SectionTitle>
          <BulletList items={[
            "חלוקת רכוש מפורטת: דירה, רכב, חשבונות, חסכונות, תכשיטים, חפצים סנטימנטליים",
            "יורש חלופי (למקרה שיורש נפטר לפני המצווה)",
            "מינוי מנהל עיזבון (במיוחד כשהמשפחה מורכבת או יש נכסים רבים)",
            "הוראות לגבי קבורה",
            "ניסוח \"נעשתה מרצון\" – מקטין טענות קשות",
          ]} />

          <InfoBox variant="tip">
            <p className="font-medium mb-2">🔄 מתי לעדכן צוואה?</p>
            <p className="text-muted-foreground text-xs">
              אין חובה לעדכן רשמית, אך מומלץ בעקבות: נישואין/גירושין, לידת נכדים, רכישת נכס, שינוי ביחסים במשפחה, שינוי בריאותי.
            </p>
          </InfoBox>

          <InfoBox variant="warning">
            <p className="font-medium mb-1">⚠️ נושא רגיש: מתנות/הלוואות בעבר</p>
            <p className="text-muted-foreground text-xs">
              האם לקזז מתנות שניתנו בעבר? זה נושא שמדליק מלחמות. כדאי להתייחס אליו מראש בצוואה.
            </p>
          </InfoBox>
        </div>
      );

    case "4.2":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Shield}>מהו ייפוי כוח מתמשך?</SectionTitle>
          <p>
            מסמך רשמי שמאפשר לאדם <strong>לקבוע מראש מי ינהל את ענייניו</strong> אם יאבד כשירות בעתיד. ההליך מוסדר דרך האפוטרופוס הכללי / משרד המשפטים.
          </p>

          <SectionTitle>שלושת תחומי הכוח</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-3">
            <InfoBox variant="highlight">
              <p className="font-semibold text-center">💰 רכוש</p>
              <p className="text-muted-foreground text-xs text-center mt-1">חשבונות, תשלומים, נכסים, חוזים, מיסוי</p>
            </InfoBox>
            <InfoBox variant="highlight">
              <p className="font-semibold text-center">🏥 בריאות</p>
              <p className="text-muted-foreground text-xs text-center mt-1">החלטות רפואיות במסגרת הדין והמסמך</p>
            </InfoBox>
            <InfoBox variant="highlight">
              <p className="font-semibold text-center">🏠 רווחה/אישי</p>
              <p className="text-muted-foreground text-xs text-center mt-1">מגורים, מטפל/ת, סדר יום, שירותים קהילתיים</p>
            </InfoBox>
          </div>

          <SectionTitle>תהליך ועלויות</SectionTitle>
          <BulletList items={[
            "עריכה והפקדה מקוונת על ידי עו\"ד מוסמך",
            "הפקדה ברשם – חייב להיות מופקד כדי שיהיה בעל תוקף",
            "כניסה לתוקף – כשמתקיימים התנאים שנקבעו במסמך",
          ]} />

          <InfoBox>
            <p className="font-medium mb-1">💲 טווח עלויות ריאלי</p>
            <p className="text-muted-foreground text-xs">
              סדר גודל של אלפי שקלים למסמך (לרוב סביב ₪2,500 ליחיד, ₪5,000+ לזוג לפני מע"מ). המחיר מושפע ממורכבות, מספר מיופי כוח, סעיפי פיקוח ועוד.
            </p>
          </InfoBox>

          <SectionTitle>מה חשוב לכלול – למניעת סכסוכים</SectionTitle>
          <BulletList items={[
            "מיופה כוח ראשי + מחליף (גיבוי)",
            "איך מקבלים החלטות אם יש שני מיופים?",
            "כללי שקיפות – למי מדווחים?",
            "עקרונות טיפול: מה חשוב לאדם? (עצמאות? להישאר בבית?)",
          ]} />

          <InfoBox variant="warning">
            <p className="font-medium mb-1">💥 \"דברים קטנים שמפוצצים משפחות\"</p>
            <p className="text-muted-foreground text-xs">
              מתנות כספיות לילדים, מכירת דירה, העסקת מטפל זר, מעבר לבית אבות, משיכת כספים גדולה – כדאי להתייחס מראש.
            </p>
          </InfoBox>
        </div>
      );

    case "4.3":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Landmark}>אפוטרופסות – מתי נדרשת?</SectionTitle>
          <p>
            כשאדם כבר <strong>לא כשיר לנהל ענייניו</strong> ולא קיים ייפוי כוח מתמשך תקף/מספק – צריך מינוי אפוטרופוס על ידי בית משפט.
          </p>

          <SectionTitle>תהליך המינוי</SectionTitle>
          <InfoBox variant="highlight">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>מגישים <strong>בקשה לבית משפט לענייני משפחה</strong></li>
              <li>מצרפים <strong>מסמכים רפואיים / תצהיר</strong> שמצדיקים את הצורך</li>
              <li>בית המשפט קובע <strong>מי האפוטרופוס</strong> ומה סמכויותיו (רכוש/גוף/אישי)</li>
            </ol>
          </InfoBox>

          <SectionTitle>תפקידי האפוטרופוס</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-3">
            <InfoBox>
              <p className="font-medium text-xs text-center">💰 ניהול רכוש ותשלומים</p>
            </InfoBox>
            <InfoBox>
              <p className="font-medium text-xs text-center">🏥 החלטות רפואיות/טיפוליות</p>
            </InfoBox>
            <InfoBox>
              <p className="font-medium text-xs text-center">🛡️ שמירה על זכויות ורווחה</p>
            </InfoBox>
          </div>

          <InfoBox variant="tip">
            <p className="font-medium mb-1">💲 שכר אפוטרופוס</p>
            <p className="text-muted-foreground text-xs">
              סביב ₪399-400 לחודש במינויים מסוימים (בפרט רכוש בקהילה). הסכום משתנה לפי סוג המינוי והמסגרת – זה לא מספר קבוע אחד.
            </p>
          </InfoBox>

          <SectionTitle>ההבדל בין ייפוי כוח לאפוטרופסות</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-start font-medium"></th>
                  <th className="border p-2 text-start font-medium">ייפוי כוח מתמשך</th>
                  <th className="border p-2 text-start font-medium">אפוטרופסות</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="border p-2 font-medium text-foreground">מתי?</td><td className="border p-2">מראש, מרצון</td><td className="border p-2">לאחר אובדן כשירות</td></tr>
                <tr><td className="border p-2 font-medium text-foreground">מי קובע?</td><td className="border p-2">"אני קובע מי ינהל"</td><td className="border p-2">בית משפט</td></tr>
                <tr><td className="border p-2 font-medium text-foreground">פיקוח</td><td className="border p-2">לפי המסמך</td><td className="border p-2">חובות דיווח ופיקוח</td></tr>
              </tbody>
            </table>
          </div>

          <InfoBox variant="info">
            <p className="text-xs text-muted-foreground">
              📋 <strong>דיווחים:</strong> אפוטרופוס נדרש לרוב להגיש דיווח פתיחה (פרטה/סל מחיה) ודו"חות תקופתיים דרך השירות הממשלתי.
            </p>
          </InfoBox>
        </div>
      );

    case "4.4":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <InfoBox variant="highlight">
            <p className="text-sm">
              ⭐ <strong>החלק הכי "טכני" – אבל הכי מציל תפקוד ביום שאחרי.</strong>
            </p>
          </InfoBox>

          <SectionTitle icon={Landmark}>שותף / מיופה כוח בחשבון</SectionTitle>
          <p>
            לאחר פטירה, יש לעיתים עיכוב תפעולי עד שיש צו ירושה/צוואה – אבל <strong>צריך לשלם חשמל, מים, שכר מטפל/ת, תרופות ואפילו הוצאות קבורה</strong>. מיופה כוח בחשבון עוזר בניהול שוטף בחיים.
          </p>

          <SectionTitle>🏦 סעיף אריכות ימים (Survivorship)</SectionTitle>
          <InfoBox>
            <p className="font-medium mb-2">מהו?</p>
            <p className="text-muted-foreground text-xs">
              תנאי בחשבון משותף שמאפשר לבנק להמשיך לכבד פעולות של השותף שנשאר בחיים.
            </p>
          </InfoBox>

          <InfoBox variant="tip">
            <p className="font-medium mb-2">🛡️ למה זה מגן?</p>
            <p className="text-muted-foreground text-xs">
              מונע קיפאון חשבון למשך חודשים עד להוצאת צו ירושה. הכספים נשארים של העיזבון – הסעיף נותן <strong>"גישה תפעולית", לא "זכויות ירושה"</strong>.
            </p>
          </InfoBox>

          <InfoBox variant="warning">
            <p className="font-medium mb-1">⚠️ חשוב להבין</p>
            <BulletList items={[
              "הסעיף לא גובר על דיני ירושה ולא מעביר בעלות",
              "אם נמשכו כספים מעבר לחלקו של השותף – היורשים יכולים לתבוע",
              "מומלץ לבדוק מול הבנק אם יש חתימה על סעיף כזה (במיוחד בחשבונות ישנים)",
            ]} />
          </InfoBox>

          <SectionTitle>📋 רשימת חשבונות ונכסים פיננסיים</SectionTitle>
          <p className="text-muted-foreground">צ'ק-ליסט מומלץ למשפחה:</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "כל חשבון/בנק + אנשי קשר",
              "כרטיסי אשראי",
              "חסכונות וכספות",
              "הלוואות והוראות קבע",
              "ביטוחים ופוליסות",
              "חשבונות דיגיטליים (מייל, טלפון)",
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-2 text-xs border text-center font-medium">{item}</div>
            ))}
          </div>
        </div>
      );

    case "4.5":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Heart}>הנחיות רפואיות מקדימות ("צוואה בחיים")</SectionTitle>
          <p>
            הנחיות שנועדו למצב שבו אדם יוגדר כ<strong>חולה הנוטה למות</strong> (בהגדרה – עד 6 חודשים) ואינו כשיר לקבל החלטות. מוסדרות בחוק החולה הנוטה למות.
          </p>

          <SectionTitle>מה כוללות ההנחיות?</SectionTitle>
          <InfoBox variant="highlight">
            <p className="text-muted-foreground text-sm">
              הוראות לגבי טיפולים לקראת סוף החיים:
            </p>
            <BulletList items={[
              "החייאה – כן/לא",
              "הנשמה מלאכותית",
              "הזנה מלאכותית",
              "אשפוז חוזר",
              "טיפול בכאב",
              "מקום מועדף (בית/אשפוז)",
              "מי מדבר עם הצוות הרפואי",
            ]} />
          </InfoBox>

          <SectionTitle>ההבדל מייפוי כוח רפואי</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox>
              <p className="font-semibold text-center mb-1">📝 הנחיות מקדימות</p>
              <p className="text-muted-foreground text-xs text-center">
                <strong>אתם כותבים</strong> מה רוצים / לא רוצים
              </p>
            </InfoBox>
            <InfoBox variant="tip">
              <p className="font-semibold text-center mb-1">👤 ייפוי כוח רפואי</p>
              <p className="text-muted-foreground text-xs text-center">
                <strong>אתם ממנים</strong> מי יחליט עבורכם במצב הרלוונטי
              </p>
            </InfoBox>
          </div>

          <InfoBox>
            <p className="font-medium mb-1">📌 כשיש גם הנחיות וגם מיופה כוח</p>
            <p className="text-muted-foreground text-xs">
              משרד הבריאות מציין שלרוב תינתן העדפה להנחיות המטופל.
            </p>
          </InfoBox>

          <SectionTitle>תוקף ועדכון</SectionTitle>
          <BulletList items={[
            "תוקף ההנחיות: 5 שנים (ניתן להארכה)",
            "עריכה: בכתב, בפני עדים, דרך השירות הממשלתי",
            "עדכון בכל שינוי במצב הבריאות",
          ]} />

          <InfoBox variant="warning">
            <p className="font-medium mb-1">⏰ מה כדאי לעשות מוקדם?</p>
            <p className="text-muted-foreground text-xs">
              גם אם "עוד לא שם" – למנות מיופה כוח רפואי ולשקול הנחיות מקדימות. זה לא "מוות", זה שליטה והפחתת מריבות.
            </p>
          </InfoBox>
        </div>
      );

    default:
      return null;
  }
};
