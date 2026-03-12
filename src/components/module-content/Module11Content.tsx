import { Heart, FileText, Users, Phone, Home, AlertTriangle, Wallet, Search, Scale, Building, Shield, CheckCircle } from "lucide-react";

interface SubModuleContentProps {
  subId: string;
}

const InfoBox = ({ children, variant = "info" }: { children: React.ReactNode; variant?: "info" | "warning" | "tip" | "highlight" | "memorial" }) => {
  const styles = {
    info: "bg-primary/5 border-primary/20 text-foreground",
    warning: "bg-destructive/10 border-destructive/20",
    tip: "bg-accent/10 border-accent/30 text-foreground",
    highlight: "bg-secondary border-secondary-foreground/10",
    memorial: "bg-muted/80 border-muted-foreground/20",
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

const ChecklistItem = ({ children, checked = false }: { children: React.ReactNode; checked?: boolean }) => (
  <div className="flex items-start gap-2 text-sm">
    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${checked ? 'bg-primary/10 border-primary' : 'border-muted-foreground/30'}`}>
      {checked && <CheckCircle className="h-3 w-3 text-primary" />}
    </div>
    <span>{children}</span>
  </div>
);

export const Module11Content = ({ subId }: SubModuleContentProps) => {
  switch (subId) {
    case "11.1":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <InfoBox variant="memorial">
            <p className="text-center text-base">💔 היום הקשה ביותר – כך עוברים אותו צעד אחר צעד</p>
          </InfoBox>

          <SectionTitle icon={FileText}>שלושה מסמכים חשובים</SectionTitle>
          <div className="space-y-2">
            {[
              { num: "1", title: "הודעת פטירה", desc: "מסמך רפואי המונפק ע״י רופא/בית חולים (צריך 4 עותקים)" },
              { num: "2", title: "רישיון קבורה", desc: "מונפק ע״י משרד הבריאות, ללא תשלום – תנאי לתיאום הלוויה" },
              { num: "3", title: "תעודת פטירה", desc: "מונפקת ע״י רשות האוכלוסין – לצרכים משפטיים/כלכליים בהמשך" },
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

          <InfoBox variant="warning">
            <p className="font-semibold mb-1">⚠️ כלל עבודה פשוט:</p>
            <p className="text-sm">בלי רישיון קבורה – אי אפשר לתאם הלוויה. בלי תעודת פטירה – קשה יהיה להתחיל תהליכים משפטיים/כלכליים בהמשך.</p>
          </InfoBox>

          <SectionTitle icon={Phone}>מי מדווח ומה?</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            <InfoBox>
              <p className="font-medium text-xs mb-1">🏥 פטירה בבית חולים</p>
              <p className="text-muted-foreground text-xs">בית החולים מפיק מסמכים רפואיים ומכוון להמשך התהליך</p>
            </InfoBox>
            <InfoBox>
              <p className="font-medium text-xs mb-1">🏠 פטירה בבית</p>
              <p className="text-muted-foreground text-xs">מזעיקים מד"א/רופא לקביעת מוות ולקבלת מסמך רפואי, אז פונים ללשכת הבריאות לרישיון קבורה</p>
            </InfoBox>
          </div>

          <SectionTitle icon={Users}>הודעה למשפחה וקרובים – סדר שמונע הצפה</SectionTitle>
          <InfoBox variant="tip">
            <BulletList items={[
              "לבחור אדם אחד (בן/בת זוג, אח/אחות) כ\"מרכז הודעות\"",
              "להשתמש ברשימת אנשי קשר מוכנה מראש",
              "לנסח הודעה קצרה אחידה למניעת טעויות",
            ]} />
          </InfoBox>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">📋 רשימת אנשי קשר לחירום (תבנית):</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <tbody className="text-muted-foreground">
                  <tr><td className="border p-2 font-medium text-foreground">איש קשר מרכז</td><td className="border p-2">טל׳: _______</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">אח/אחות 1</td><td className="border p-2">טל׳: _______</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">רופא משפחה</td><td className="border p-2">טל׳: _______</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">תאגיד/חברת סיעוד</td><td className="border p-2">טל׳: _______</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">חברה קדישא</td><td className="border p-2">טל׳: _______</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">עו״ד משפחה (אם יש)</td><td className="border p-2">טל׳: _______</td></tr>
                </tbody>
              </table>
            </div>
          </InfoBox>
        </div>
      );

    case "11.2":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Home}>סידור הקבורה</SectionTitle>
          
          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">💰 דמי קבורה – ללא תשלום ברוב המקרים</p>
            <p className="text-sm">דמי הקבורה משולמים ע"י ביטוח לאומי לחברת הקבורה המורשית. ברוב המקרים לא נגבה תשלום מהמשפחה עבור הקבורה והשירותים המקובלים ביום הקבורה.</p>
            <p className="text-muted-foreground text-xs mt-2">⚠️ יש מצבים מיוחדים (סוג קבורה/שירותים נוספים) שעשויים להיות כרוכים בתשלום – חשוב לקבל הצעת מחיר כתובה.</p>
          </InfoBox>

          <SectionTitle>בחירת קבר ותיאום הלוויה</SectionTitle>
          <div className="space-y-2">
            <InfoBox>
              <p className="font-medium text-xs mb-1">🪦 בחירת קבר</p>
              <p className="text-muted-foreground text-xs">חלקה ציבורית / קבר משפחתי / אפשרויות נוספות לפי הנהלים והזמינות</p>
            </InfoBox>
            <InfoBox>
              <p className="font-medium text-xs mb-1">📅 מועד הלוויה</p>
              <p className="text-muted-foreground text-xs">תיאום מול חברת הקבורה (לאחר רישיון קבורה). כולל: רב/ה, נואמים, מוזיקה (ככל שמקובל במשפחה)</p>
            </InfoBox>
            <InfoBox>
              <p className="font-medium text-xs mb-1">📢 פרסום הודעה</p>
              <p className="text-muted-foreground text-xs">עדיף הודעה מרכזית אחת + ערוץ אחד (וואטסאפ/משפחה/קהילה) למניעת פערי מידע</p>
            </InfoBox>
          </div>

          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📋 צ׳ק-ליסט לסידורי קבורה:</p>
            <div className="space-y-1.5">
              <ChecklistItem>הודעת פטירה (מסמך רפואי)</ChecklistItem>
              <ChecklistItem>רישיון קבורה (משרד הבריאות)</ChecklistItem>
              <ChecklistItem>קשר עם חברת הקבורה/חברה קדישא ותיאום מועד</ChecklistItem>
              <ChecklistItem>בחירת חלקה/קבר (אם יש אפשרויות)</ChecklistItem>
              <ChecklistItem>רשימת נואמים/תוכן קצר לטקס</ChecklistItem>
              <ChecklistItem>הודעה מרוכזת לציבור</ChecklistItem>
              <ChecklistItem>ארגון הסעות/נגישות למבוגרים</ChecklistItem>
            </div>
          </InfoBox>

          <SectionTitle>תבנית הודעת אבל</SectionTitle>
          <InfoBox variant="memorial">
            <p className="text-center text-sm italic">
              "בצער רב אנו מודיעים על פטירתה של<br />
              _________ ז״ל<br />
              אם/רעיה/סבתא אהובה<br /><br />
              הלוויה תתקיים היום ב-__:__ בבית העלמין _______<br />
              השבעה תתקיים ברח׳ _______ מס׳ ___<br /><br />
              פרטי הלוויה יימסרו בהמשך.<br />
              אנא כבדו את פרטיות המשפחה בשעות הקרובות.<br />
              תודה על התמיכה."
            </p>
          </InfoBox>
        </div>
      );

    case "11.3":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Users}>גמר חשבון עם עובד/ת זר/ה ביום הפטירה</SectionTitle>
          
          <InfoBox variant="warning">
            <p className="font-semibold mb-1">⚠️ עיקרון משפטי בסיסי:</p>
            <p className="text-sm">כאשר המטופל נפטר, סיום העסקה של העובד הזר נחשב לפיטורים לעניין זכויות, והעובד זכאי לתשלומים שונים – גם אם חזר כבר לארצו.</p>
          </InfoBox>

          <SectionTitle icon={Wallet}>זכויות העובד/ת לפי "כל-זכות"</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { title: "שכר אחרון", desc: "עד יום הפטירה + כל הנלוות" },
              { title: "פיצויי פיטורים", desc: "בהתאם לוותק ותנאים" },
              { title: "תמורת הודעה מוקדמת", desc: "גם במקרה שהמעסיק נפטר" },
              { title: "פדיון חופשה", desc: "ימי חופשה שלא נוצלו" },
              { title: "דמי הבראה", desc: "לפי הזכאות" },
              { title: "תשלומים נוספים", desc: "לפי נסיבות ההעסקה" },
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-2.5 border">
                <p className="font-medium text-xs">{item.title}</p>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <InfoBox>
            <p className="font-semibold mb-1">📌 דגש חשוב להדרכה:</p>
            <p className="text-sm">לעיתים לעובד יש שני מעסיקים (חברת סיעוד + המטופל), ואז חלוקת התשלומים יכולה להיות יחסית להיקף ההעסקה.</p>
          </InfoBox>

          <SectionTitle>מועד תשלום</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            <InfoBox variant="highlight">
              <p className="font-medium text-xs">💵 פיצויי פיטורים</p>
              <p className="text-muted-foreground text-xs">מועד תשלום: עם סיום יחסי העבודה, לכל המאוחר תוך 15 יום (לאחר מכן עלולות לחול הצמדה/סנקציות)</p>
            </InfoBox>
            <InfoBox variant="highlight">
              <p className="font-medium text-xs">💵 השכר האחרון</p>
              <p className="text-muted-foreground text-xs">יש לשלם במועד הקבוע בחוק (בד״כ במועד השכר הרגיל)</p>
            </InfoBox>
          </div>

          <SectionTitle icon={FileText}>צעדים מיידיים מול גורמים</SectionTitle>
          <InfoBox variant="tip">
            <BulletList items={[
              "עדכון ביטוח לאומי / דיווחים תעסוקתיים בהתאם למבנה ההעסקה",
              "עדכון תאגיד/חברת סיעוד (אם רלוונטי)",
              "תיאום המשך/מעבר העובד למעסיק חדש דרך התאגיד, או היערכות לחזרה לארץ מוצא",
            ]} />
          </InfoBox>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">📁 טפסים רלוונטיים (11.3):</p>
            <BulletList items={[
              "טופס \"גמר חשבון לעובד זר\" (תבנית/חישובון פנימי)",
              "רשימת \"מסמכים לסיום העסקה\" (קבלות, תלושים, יומן תשלומים)",
              "מכתב \"הודעה לתאגיד\" (תבנית)",
            ]} />
          </InfoBox>
        </div>
      );

    case "11.4":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Phone}>הודעות לגורמים פיננסיים ורשמיים</SectionTitle>
          
          <InfoBox variant="highlight">
            <p className="font-semibold mb-1">💡 למה זה חשוב?</p>
            <p className="text-sm">לא כדי "להתעסק בכסף" – אלא כדי למנוע חיובים מיותרים (קופה/מנויים/חשבונות), להפסיק או להתאים קצבאות, ולממש זכויות.</p>
          </InfoBox>

          <SectionTitle>גורמים עיקריים לעדכון</SectionTitle>
          <div className="space-y-2">
            {[
              { icon: Shield, title: "ביטוח לאומי", desc: "עדכון/ביטול קצבאות, הגשת תביעה למענק קבורה" },
              { icon: Building, title: "משרד הפנים", desc: "עדכון מרשם האוכלוסין" },
              { icon: Wallet, title: "בנקים", desc: "הודעה והקפאת חשבונות (אלא אם יש סעיף אריכות ימים)" },
              { icon: Heart, title: "קופות חולים", desc: "ביטול חברות" },
              { icon: Home, title: "ספקי שירות", desc: "חשמל, מים, ארנונה – עדכון" },
              { icon: Users, title: "עובדי סיעוד", desc: "סיום העסקה, גמר חשבון" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 bg-muted/50 rounded-md p-3 border">
                <item.icon className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📋 רשימת בדיקה – גורמים ליידע (11.5):</p>
            <div className="grid gap-1.5 sm:grid-cols-2">
              <ChecklistItem>ביטוח לאומי</ChecklistItem>
              <ChecklistItem>בנקים</ChecklistItem>
              <ChecklistItem>קופת חולים</ChecklistItem>
              <ChecklistItem>חברת חשמל</ChecklistItem>
              <ChecklistItem>תאגיד מים</ChecklistItem>
              <ChecklistItem>עירייה (ארנונה)</ChecklistItem>
              <ChecklistItem>ביטוחים פרטיים</ChecklistItem>
              <ChecklistItem>פנסיה/גמל</ChecklistItem>
            </div>
          </InfoBox>

          <SectionTitle icon={FileText}>תבנית מכתב הודעה סטנדרטי</SectionTitle>
          <InfoBox variant="memorial">
            <p className="text-sm font-medium mb-2">לכבוד _______</p>
            <p className="text-sm mb-2"><strong>הנדון:</strong> הודעה על פטירה ובקשה לעדכון רישומים</p>
            <p className="text-sm mb-2">
              אבקש לעדכן כי מר/גב׳ ________ ת.ז ________ נפטר/ה ביום __/__/____.
            </p>
            <p className="text-sm mb-2">מצ״ב תעודת פטירה/אישור מתאים.</p>
            <p className="text-sm mb-2">
              אבקש לעדכן את הרישומים, להפסיק חיובים שאינם נדרשים, ולהנחות לגבי מסמכים הדרושים להמשך טיפול.
            </p>
            <p className="text-sm mt-3">
              בברכה,<br />
              שם: ________ ת.ז: ________ טל׳: ________<br />
              חתימה: ________
            </p>
          </InfoBox>
        </div>
      );

    case "11.5":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Home}>שבעה ומסורת – היבט תפקודי-רגשי</SectionTitle>
          
          <InfoBox variant="highlight">
            <p className="text-sm">זהו חלק שמטרתו לארגן "מסגרת" כדי שהבית לא יקרוס – תמיכה לוגיסטית ורגשית.</p>
          </InfoBox>

          <SectionTitle>חלוקת תפקידים בין האחים</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { title: "מקבל/ת אנשים", desc: "מי מארח את המנחמים" },
              { title: "עונה לטלפונים", desc: "מי מתאם שיחות נכנסות" },
              { title: "לוגיסטיקה", desc: "כיסאות, מים, ניקיון בסיסי, תיאום זמנים" },
              { title: "ניירת דחופה", desc: "מי מטפל במסמכים הדחופים" },
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-2.5 border">
                <p className="font-medium text-xs">{item.title}</p>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <SectionTitle icon={Heart}>גבולות בריאים</SectionTitle>
          <InfoBox variant="tip">
            <BulletList items={[
              "שעות ביקור מוגדרות",
              "הפסקות מנוחה למשפחה הקרובה",
              "לא חייבים לקבל את כולם – זה בסדר",
            ]} />
          </InfoBox>

          <InfoBox variant="warning">
            <p className="font-semibold mb-1">💡 עיקרון מנחה:</p>
            <p className="text-sm">מינוי אדם אחד ל"אחראי לוגיסטיקה" + אדם אחד ל"אחראי קשר משפחתי" – כדי לא להציף אדם אחד.</p>
          </InfoBox>
        </div>
      );

    case "11.6":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Scale}>הפרדה חשובה: קבורה vs ירושה</SectionTitle>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoBox variant="highlight">
              <p className="font-semibold mb-2">⚡ מיידי – קבורה והוצאות</p>
              <p className="text-sm">קבורה וסידורים מיידיים נעשים מיד, משולמים מחשבון הנפטר או ע"י המשפחה.</p>
            </InfoBox>
            <InfoBox>
              <p className="font-semibold mb-2">⏳ דורש זמן – ירושה/גישה לנכסים</p>
              <p className="text-sm">ירושה/גישה לנכסים דורשים לרוב צו ירושה/צו קיום צוואה – תהליך נפרד שמתחיל אחרי.</p>
            </InfoBox>
          </div>

          <SectionTitle icon={FileText}>הקלסר המשפחתי – הכלי שחוסך זמן וכסף</SectionTitle>
          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📁 מה צריך לרכז?</p>
            <BulletList items={[
              "תעודת פטירה, מסמכים רפואיים בסיסיים",
              "רשימת חשבונות, נכסים, הלוואות, מנויים",
              "פרטי סוכני ביטוח/חברות פרטיים",
              "היכן נמצאת הצוואה/ייפוי כוח/תיק רפואי",
            ]} />
          </InfoBox>

          <SectionTitle>איתור חסכונות ופוליסות</SectionTitle>
          <div className="space-y-2">
            {[
              { title: "הר הכסף", desc: "אתר משרד האוצר לאיתור חסכונות פנסיוניים וקופות גמל" },
              { title: "בדיקה בבנקים", desc: "דרישה עם תעודת פטירה" },
              { title: "חיפוש בבית", desc: "בית, הכסף – פוליסות ביטוח" },
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-2.5 border">
                <p className="font-medium text-xs">{item.title}</p>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">📋 תבנית "קלסר משפחתי" – רשימת נכסים וחשבונות:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <tbody className="text-muted-foreground">
                  <tr><td className="border p-2 font-medium text-foreground">חשבונות בנק</td><td className="border p-2">בנק/סניף/מס׳ חשבון: _______ | אריכות ימים: כן/לא</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">פנסיה/גמל/ביטוח חיים</td><td className="border p-2">חברה/סוכן/מס׳ פוליסה: _______ | מוטבים ידועים</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">נכסים</td><td className="border p-2">דירה/רכב/השכרות/מסמכי בעלות</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">הלוואות</td><td className="border p-2">גוף מממן/יתרה/ערבים</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">מנויים</td><td className="border p-2">טלפון/אינטרנט/טלוויזיה/אחר</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">מסמכים</td><td className="border p-2">היכן נמצאת צוואה/ייפוי כוח/תיק רפואי</td></tr>
                </tbody>
              </table>
            </div>
          </InfoBox>
        </div>
      );

    case "11.7":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Wallet}>מענק קבורה/פטירה מביטוח לאומי</SectionTitle>
          
          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">📌 חשוב לעשות סדר במונחים:</p>
            <p className="text-sm">משפחות רבות משתמשות בביטוי "מענק קבורה", אבל בפועל יש כמה מסלולים שונים:</p>
          </InfoBox>

          <div className="space-y-3">
            <InfoBox>
              <p className="font-semibold mb-1">1️⃣ דמי קבורה</p>
              <p className="text-sm">תשלום של ביטוח לאומי לחברת הקבורה לכיסוי שירותי קבורה. ברוב המקרים – ללא תשלום מהמשפחה עבור שירותים מקובלים.</p>
            </InfoBox>
            <InfoBox>
              <p className="font-semibold mb-1">2️⃣ מענק פטירה</p>
              <p className="text-sm">מענק חד-פעמי לשאירים במקרים מסוימים (למשל כאשר הנפטר קיבל קצבאות מסוימות). לא תמיד משולם אוטומטית – ניתן להגיש תביעה.</p>
            </InfoBox>
          </div>

          <InfoBox variant="warning">
            <p className="font-semibold mb-1">⚠️ "דמי קבורה" ≠ "מענק פטירה"</p>
            <p className="text-sm">דמי קבורה הם תשלום לחברת הקבורה. מענק פטירה הוא מענק חד-פעמי לשאירים – תלוי בסוג הקצבאות שהנפטר קיבל/תנאי שאירים.</p>
          </InfoBox>

          <SectionTitle>הגשת תביעה למענק פטירה</SectionTitle>
          <InfoBox variant="tip">
            <BulletList items={[
              "הגשה: תוך 12 חודשים מהפטירה",
              "סכום: משתנה לפי הכנסה (לפי המידע המוצג ב\"כל-זכות\")",
              "הזכאות תלויה בעיקר בסוג הקצבאות שהנפטר קיבל/תנאי שאירים",
            ]} />
          </InfoBox>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">📁 טפסים רלוונטיים:</p>
            <p className="text-muted-foreground text-xs">בקשה למענק קבורה – באתר ביטוח לאומי</p>
          </InfoBox>
        </div>
      );

    case "11.8":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Search}>האם יש צוואה?</SectionTitle>
          
          <InfoBox variant="highlight">
            <p className="text-sm">
              <strong>העיקרון המארגן:</strong> אי-אפשר "לשחרר" כספים/לרשום נכסים/למכור/לחלק באופן מסודר – לפני שיש צו משפטי (צו קיום צוואה או צו ירושה).
            </p>
          </InfoBox>

          <SectionTitle>א. חיפוש "חכם" בבית ובמסמכים</SectionTitle>
          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📁 איפה לחפש?</p>
            <BulletList items={[
              "כספת / ארון מסמכים / מגירה קבועה",
              "תיקיית \"עו״ד/נוטריון\" / מסמכי בנק / פוליסות",
              "מיילים – חיפוש מילות מפתח: \"צוואה\", \"נוטריון\", \"עו״ד\", \"הפקדה\", \"רשם\"",
              "שיחה עם עו״ד משפחתי/נוטריון שהמשפחה השתמשה בו בעבר",
            ]} />
          </InfoBox>

          <SectionTitle>ב. בדיקה ברשם הירושות</SectionTitle>
          <InfoBox>
            <p className="text-sm mb-2">אם אדם שנפטר הפקיד צוואה אצל הרשם לענייני ירושה – קיימת אפשרות לבדוק זאת. שירות ממשלתי מקוון (ללא עלות).</p>
            <p className="text-muted-foreground text-xs">⚠️ חשוב להבין: ההפקדה אינה חובה – אם לא נמצאה צוואה מופקדת, עדיין יכולה להיות צוואה ששמורה בבית/אצל עו״ד.</p>
          </InfoBox>

          <SectionTitle>ג. אם נמצאו כמה גרסאות</SectionTitle>
          <InfoBox variant="warning">
            <BulletList items={[
              "סימנו את תאריך כל גרסה",
              "שמרו הכל, לא זורקים כלום",
              "בד\"כ בודקים מה המאוחרת/התקפה",
              "אם יש בלבול/חשש – פונים לייעוץ משפטי נקודתי",
            ]} />
          </InfoBox>

          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📋 צ׳ק-ליסט איתור צוואה:</p>
            <div className="space-y-1.5">
              <ChecklistItem>בדקנו אם הופקדה צוואה ברשם (מקוון)</ChecklistItem>
              <ChecklistItem>חיפשנו בכספת/תיק מסמכים/מיילים</ChecklistItem>
              <ChecklistItem>פנינו לעו״ד/נוטריון משפחתי</ChecklistItem>
              <ChecklistItem>אספנו גרסאות (אם יש)</ChecklistItem>
            </div>
          </InfoBox>
        </div>
      );

    case "11.9":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={FileText}>צו קיום צוואה – מימוש הצוואה</SectionTitle>
          
          <InfoBox variant="highlight">
            <p className="font-semibold mb-1">מהו צו קיום צוואה?</p>
            <p className="text-sm">צו משפטי שמאשר שהצוואה תקפה וניתן לפעול לפיה (בנקים, ביטוחים, מקרקעין וכו').</p>
          </InfoBox>

          <SectionTitle>מי מגיש?</SectionTitle>
          <p>כל הזוכים על פי הצוואה (או מי שמיוצג מטעמם). ההגשה נעשית לרשם לענייני ירושה.</p>

          <SectionTitle>מסמכים נדרשים (כיוונים לעבודה)</SectionTitle>
          <InfoBox variant="tip">
            <BulletList items={[
              "הצוואה המקורית (או הסבר מסודר אם אינה קיימת)",
              "פרטים מזהים של המנוח",
              "פרטי היורשים/הזוכים",
              "תצהירים, ייפויי כוח",
              "מסמכים נוספים לפי נסיבות (בשפה זרה/תרגומים)",
            ]} />
          </InfoBox>

          <SectionTitle>איך מגישים בפועל?</SectionTitle>
          <InfoBox>
            <p className="text-sm">לרוב אפשר להגיש באופן מקוון דרך שירות Gov.il / הרשם לענייני ירושה. לאחר ההגשה – יש פרסום לציבור כדי לאפשר התנגדויות.</p>
          </InfoBox>

          <SectionTitle>כמה זמן זה לוקח?</SectionTitle>
          <InfoBox variant="highlight">
            <p className="text-sm">
              <strong>כלל אצבע תפעולי:</strong> במקרים רגילים, הצו ניתן כ-40 יום ממועד הגשת הבקשה/השלמת המסמכים המקוריים (המאוחר מביניהם).
            </p>
            <p className="text-muted-foreground text-xs mt-2">בפועל: חוסרים/טעויות/התנגדויות עלולים להאריך את הזמן.</p>
          </InfoBox>

          <SectionTitle icon={AlertTriangle}>התנגדויות</SectionTitle>
          <InfoBox variant="warning">
            <BulletList items={[
              "קיימת אפשרות להגיש התנגדות לצו קיום צוואה",
              "ההתנגדות מוגשת לרשם, אך נדונה בבית המשפט לענייני משפחה",
              "לוחות זמנים להתנגדות קצרים (לעיתים 14 ימים ממועד הפרסום – תלוי מסלול ונסיבות)",
            ]} />
          </InfoBox>

          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📁 טפסים שימושיים:</p>
            <BulletList items={[
              "שירות \"בקשה לצו קיום צוואה\" (Gov.il)",
              "בירור \"סטטוס הטיפול בבקשה\" (מעקב)",
            ]} />
          </InfoBox>
        </div>
      );

    case "11.10":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Scale}>צו ירושה – כשאין צוואה</SectionTitle>
          
          <InfoBox variant="highlight">
            <p className="font-semibold mb-1">מהו צו ירושה?</p>
            <p className="text-sm">צו שקובע מי היורשים על פי דין (חוק הירושה) ומה חלקו של כל אחד – כשאין צוואה.</p>
          </InfoBox>

          <SectionTitle>סדר הירושה לפי חוק (מסגרת בסיסית)</SectionTitle>
          <div className="space-y-2">
            {[
              { num: "1", title: "בן/בת זוג + ילדים", desc: "העיזבון מתחלק ביניהם בהתאם לכללים בחוק" },
              { num: "2", title: "הורים", desc: "כשאין בן/בת זוג או ילדים" },
              { num: "3", title: "אחים", desc: "כשאין יורשים מהדרגות הקודמות" },
            ].map((item) => (
              <div key={item.num} className="flex gap-3 bg-muted/50 rounded-md p-2.5 border">
                <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{item.num}</span>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-xs">* בפועל הסדר יכול להיות יותר מורכב (ידועים בציבור, ילדים מנישואים קודמים וכו')</p>

          <SectionTitle>איך מגישים?</SectionTitle>
          <InfoBox>
            <BulletList items={[
              "יש אפשרות להגשה מקוונת בהזדהות לאומית",
              "פרטי יורשים נמשכים אוטומטית ממרשם האוכלוסין (בחלק מהמקרים)",
              "קיימים גם מסלולים ידניים למי שאינו מיוצג",
            ]} />
          </InfoBox>

          <SectionTitle>ויתור/הסתלקות מירושה</SectionTitle>
          <InfoBox variant="tip">
            <p className="text-sm">לפעמים יורש מבקש לוותר (למשל כדי למנוע סכסוך או מטעמי תכנון). החוק מאפשר הסתלקות כללית או הסתלקות לטובת בן/בת זוג/ילד/אח בלבד של המוריש, באמצעות תצהיר.</p>
          </InfoBox>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">📁 טפסים שימושיים:</p>
            <BulletList items={[
              "שירות \"בקשה לצו ירושה\" (Gov.il)",
              "טופס בקשה לצו ירושה (קובץ ממשלתי)",
            ]} />
          </InfoBox>
        </div>
      );

    case "11.11":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Building}>ניהול העיזבון</SectionTitle>
          
          <InfoBox variant="highlight">
            <p className="text-sm">כאן רוב המשפחות מגלות שהאתגר האמיתי הוא ניהול העיזבון: איסוף נכסים, סגירת חובות, תיעוד, מיסוי, ואז חלוקה.</p>
          </InfoBox>

          <SectionTitle>האם צריך מנהל עיזבון?</SectionTitle>
          <InfoBox>
            <p className="font-semibold mb-2">ברירת מחדל: לא תמיד ממנים</p>
            <p className="text-sm mb-2">ממנים בעיקר כשהעיזבון מורכב:</p>
            <BulletList items={[
              "יורשים קטינים",
              "חובות כבדים",
              "נכסים בחו״ל",
              "קושי לאתר יורשים",
              "סכסוכים בין יורשים",
            ]} />
          </InfoBox>

          <SectionTitle>משימות מומלצות לניהול עיזבון</SectionTitle>
          <div className="space-y-2">
            {[
              { num: "1", title: "פתיחת קלסר/תיק עיזבון", desc: "צו, תעודת פטירה (עותקים), ת.ז + רשימת יורשים" },
              { num: "2", title: "מיפוי נכסים", desc: "בנקים/חסכונות/פיקדונות, קופות גמל/פנסיה/ביטוחים, מקרקעין/רכב, חובות פתוחים" },
              { num: "3", title: "פנייה לגופים פיננסיים", desc: "בקשה לקבלת העתק דיגיטלי של הצו – אם צריך" },
              { num: "4", title: "סילוק חובות לפני חלוקה", desc: "כלל ברזל: רק אחרי שמבינים מה \"נטו\" – מחלקים" },
              { num: "5", title: "תיעוד מלא", desc: "כל פעולה: תאריך, גוף, סכום, מסמך – מוריד סיכון דרמטית לסכסוך" },
            ].map((item) => (
              <div key={item.num} className="flex gap-3 bg-muted/50 rounded-md p-2.5 border">
                <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{item.num}</span>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <SectionTitle icon={Wallet}>מיסוי – כדאי לדעת</SectionTitle>
          <InfoBox variant="tip">
            <BulletList items={[
              "בישראל אין כיום מס ירושה (לפי מחקר הכנסת)",
              "אבל: עצם ההורשה אינה \"עסקה\" ואינה מחייבת – פעולות מימוש יכולות ליצור חבות מס",
              "דוגמה: בעת מכירת דירה שהתקבלה בירושה – ייתכן מס שבח (עם פטור בתנאים מסוימים)",
              "המלצה תפעולית: כשיש מקרקעין/השקעות/נכסים בחו״ל – שווה להתייעץ נקודתית עם מס/מומחה לפני חלוקה/מכירה",
            ]} />
          </InfoBox>

          <InfoBox variant="highlight">
            <p className="font-semibold mb-2">📁 טפסים שימושיים:</p>
            <BulletList items={[
              "בקשה למינוי מנהל עיזבון (Gov.il)",
              "העתק דיגיטלי של צו ירושה/צו קיום צוואה",
              "טופס 2805 (הצהרה על יורשים/מנהל עיזבון במס הכנסה) – לפי צורך",
            ]} />
          </InfoBox>
        </div>
      );

    case "11.12":
      return (
        <div className="space-y-5 text-foreground text-sm leading-relaxed">
          <SectionTitle icon={Users}>מניעת סכסוכים בין יורשים</SectionTitle>
          
          <InfoBox variant="warning">
            <p className="font-semibold mb-1">⚠️ סכסוכי ירושה "אוכלים" זמן, כסף ומשפחה</p>
            <p className="text-sm">המפתח הוא מנגנון עבודה – לא רק "שיחות".</p>
          </InfoBox>

          <SectionTitle>איפה זה נתקע כלל בדרך?</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "תחושת אי-שוויון: \"מי טיפל בהורה\" מול \"מי מקבל חלק שווה\"",
              "נכסים לא נזילים (דירה אחת, עסק)",
              "חוסר שקיפות בניהול כספים בתקופה הראשונה",
              "פרשנות שונה של הצוואה / חשד להשפעה בלתי הוגנת",
              "פער בין ציפיות למציאות (זמן, מסמכים, עלויות)",
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-md p-2.5 text-xs border">{item}</div>
            ))}
          </div>

          <SectionTitle icon={Shield}>פרוטוקול קצר שמפחית סיכון לפיצוץ</SectionTitle>
          <div className="space-y-2">
            {[
              { num: "1", title: "ממנים איש/אשת קשר אחד", desc: "מטפל/ת מול גופים, מדווח/ת לכולם" },
              { num: "2", title: "דוח חודש קבוע", desc: "נכסים שהתגלו, פעולות שבוצעו, הוצאות ששולמו" },
              { num: "3", title: "תיק מסמכים משותף", desc: "גיבוי ענן + הרשאות צפייה" },
              { num: "4", title: "כל החלטה גדולה בכתב", desc: "מכירה, שיפוץ דירה לפני מכירה, שכר טרחה" },
              { num: "5", title: "אם יש תקיעות – גישור לפני משפט", desc: "חוסך שנים" },
            ].map((item) => (
              <div key={item.num} className="flex gap-3 bg-muted/50 rounded-md p-2.5 border">
                <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{item.num}</span>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <SectionTitle icon={FileText}>חלוקת תפקידים בין יורשים</SectionTitle>
          <InfoBox variant="highlight">
            <p className="text-sm mb-2">כדי למנוע עומס וסכסוכים, ממנים תפקידים:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <tbody className="text-muted-foreground">
                  <tr><td className="border p-2 font-medium text-foreground">איש/אשת קשר מרכז/ת</td><td className="border p-2">________</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">בנקים</td><td className="border p-2">________</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">ביטוחים/פנסיה</td><td className="border p-2">________</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">מקרקעין/רכב</td><td className="border p-2">________</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">חובות/חשבונות</td><td className="border p-2">________</td></tr>
                  <tr><td className="border p-2 font-medium text-foreground">תקשורת ועדכון משפחה</td><td className="border p-2">________</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-xs mt-2">כלל עבודה: כל פעולה משמעותית מתועדת (תאריך, סכום, אסמכתא).</p>
          </InfoBox>

          <SectionTitle>הסכם חלוקת עיזבון</SectionTitle>
          <InfoBox variant="tip">
            <p className="font-semibold mb-2">📝 עקרונות בסיסיים (להסכמה משפחתית, רצוי לגבות בייעוץ במקרים מורכבים):</p>
            <BulletList items={[
              "חלוקה לפי הצו / לפי הסכמה כתובה",
              "מנגנון שווי: שמאי/הערכה/אקטואר לפי סוג נכס",
              "נכסים לא נזילים (דירה/רכב): מכירה / העברה לאחד היורשים עם איזון / השכרה זמנית",
              "חובות מסולקים לפני חלוקה",
              "מנגנון מחלוקת: גישור לפני משפט",
              "חתימות כל היורשים + תאריך",
            ]} />
          </InfoBox>

          <InfoBox variant="memorial">
            <p className="text-center text-sm">
              <strong>לסיום המודול:</strong><br />
              העיזבון הוא תהליך – לא אירוע.<br />
              כשעובדים מסודר, עם חלוקת תפקידים, שקיפות ותיעוד –<br />
              חוסכים זמן, כסף, ובעיקר שומרים על היחסים במשפחה.
            </p>
          </InfoBox>
        </div>
      );

    default:
      return null;
  }
};
