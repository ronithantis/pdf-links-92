import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Home, Heart, Activity, Phone, Shield, FileText, Zap, Bus, Star, Clock, DollarSign, AlertTriangle, CheckCircle, Info, Building, Scale, Briefcase, UserCheck } from "lucide-react";
import { RIGHTS_DATA as D } from "@/lib/rights-data";

const Rights = () => {
  const [view, setView] = useState<"rights" | "obligations">("rights");

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-card border-b py-8 text-center">
        <Badge variant="secondary" className="mb-3">
          <CheckCircle className="h-3 w-3 ml-1" />
          מעודכן ל-{D.year}
        </Badge>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
          זכויות וחובות — <span className="text-primary">מעסיק ועובד זר</span>
        </h1>
        <p className="text-muted-foreground text-sm">מידע פרקטי ומעודכן — במקום אחד</p>

        {/* Top-level toggle */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setView("rights")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all border-2 ${
              view === "rights"
                ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                : "bg-card text-foreground border-border hover:border-primary/50"
            }`}
          >
            <Scale className="h-5 w-5" />
            זכויות
          </button>
          <button
            onClick={() => setView("obligations")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all border-2 ${
              view === "obligations"
                ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                : "bg-card text-foreground border-border hover:border-primary/50"
            }`}
          >
            <Briefcase className="h-5 w-5" />
            חובות
          </button>
        </div>
      </div>

      <div className="container max-w-4xl py-6">
        {view === "rights" ? <RightsView /> : <ObligationsView />}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
// RIGHTS VIEW (existing content)
// ═══════════════════════════════════════════════
const RightsView = () => (
  <Tabs defaultValue="elderly" dir="rtl">
    <TabsList className="w-full h-auto flex-wrap gap-1.5 bg-muted/50 p-2">
      <TabsTrigger value="elderly" className="flex items-center gap-2 text-xs sm:text-sm flex-1 min-w-[120px] py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
        <Users className="h-4 w-4" /> זכויות הקשיש
      </TabsTrigger>
      <TabsTrigger value="family" className="flex items-center gap-2 text-xs sm:text-sm flex-1 min-w-[120px] py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
        <Home className="h-4 w-4" /> משפחה מטפלת
      </TabsTrigger>
      <TabsTrigger value="worker" className="flex items-center gap-2 text-xs sm:text-sm flex-1 min-w-[120px] py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
        <Heart className="h-4 w-4" /> עובד זר
      </TabsTrigger>
      <TabsTrigger value="hmo" className="flex items-center gap-2 text-xs sm:text-sm flex-1 min-w-[120px] py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
        <Activity className="h-4 w-4" /> קופות חולים
      </TabsTrigger>
    </TabsList>

    {/* ═══ TAB 1: ELDERLY ═══ */}
    <TabsContent value="elderly" className="space-y-6 mt-6">
      <SectionHeader icon={<Users />} title="זכויות הקשיש" subtitle="גמלאות, בריאות, הגנה משפטית, הנחות ועוד" />

      <Callout variant="info" title="הטעות הנפוצה ביותר">
        משפחות מתמקדות בגמלת הסיעוד ומחמיצות גמלת ניידות, קצבת שאירים, הנחות ארנונה ותחבורה, זכויות בריאות, וכלים להגנה משפטית על הקשיש.
      </Callout>

      <ToolLink title="כיצד מגישים תביעת סיעוד?" description="מדריך שלב-אחר-שלב, מה לצרף ומה לצפות" linkText="← למדריך הגשת תביעה" to="/tools#nursing-claim-guide" />

      <SubSection title="א. גמלת סיעוד — תנאי זכאות" />
      <CheckList items={[
        { bold: "תושבות ישראלית", text: "ומגורים בקהילה (לא מוסד)" },
        { bold: "מבחן הכנסות", text: "— ראו טבלה למטה" },
        { bold: "בדיקת תפקוד", text: 'ע"י אחות ביטוח לאומי, או על סמך מסמכים רפואיים' },
        { bold: "קשיים ב-5 פעולות", text: "— ניידות, הלבשה, רחצה, אכילה, הפרשות" },
      ]} />

      <StyledTable
        headers={["מצב משפחתי", "גמלה מלאה", "גמלה מופחתת 50%", "אין זכאות"]}
        rows={[
          ["יחיד/ה", `עד ${D.nursing_single_full} ₪`, `${D.nursing_single_full} – ${D.nursing_single_partial} ₪`, `מעל ${D.nursing_single_partial} ₪`],
          ["זוג", `עד ${D.nursing_couple_full} ₪`, `${D.nursing_couple_full} – ${D.nursing_couple_partial} ₪`, `מעל ${D.nursing_couple_partial} ₪`],
        ]}
      />

      <StyledTable
        headers={["רמה", "נקודות תלות", "מטפל ישראלי (שעות/שבוע)", "עובד זר (שעות/שבוע)"]}
        rows={[
          ["1", "1–1.5", "9.75", "—"],
          ["2", "2–2.5", "14", "—"],
          ["3", "3–3.5", "18.5", "—"],
          ["4", "4–5", "22", "—"],
          ["5", "6–8.5", "26", "22"],
          ["6", "9.5–10.5", "30", "26"],
        ]}
      />

      <SubSection title="ב. קצבאות מביטוח לאומי (2026)" />
      <StyledTable
        headers={["סוג", "סכום"]}
        rows={[
          ["קצבת אזרח ותיק — יחיד/ה", `${D.senior_single} ₪`],
          ["יחיד/ה גיל 80+", `${D.senior_single_80} ₪`],
          ["זוג", `${D.senior_couple} ₪`],
          ["יחיד + השלמת הכנסה", `${D.senior_single_plus} ₪`],
          ["זוג + השלמת הכנסה", `${D.senior_couple_plus} ₪`],
        ]}
      />

      <SubSection title="ג. קצבאות נוספות לבדוק" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InfoCard title="הבטחת הכנסה" description="קשיש עם הכנסה נמוכה — זכאי להשלמת הכנסה מביטוח לאומי, מעבר לקצבת הבסיס. כולל בדיקת נכסים ותנאים." />
        <InfoCard title="קצבת שאירים" description="אלמן/ה שבן/בת זוגם נפטר/ה זכאים לקצבת שאירים. רבים אינם תובעים." />
        <InfoCard title="גמלת ניידות" description="מי שהיה מוגבל בניידות — ממשיך לקבל. מי שנהיה מוגבל לאחר גיל הפרישה — גובהה תלוי בגיל. לבדוק זכאות ברשות הניידות." />
        <InfoCard title="קצבת נכה בפרישה" description="קשיש שהיה נכה לפני גיל פרישה — זכאי לקצבת נכה. ייתכן שגבוהה מהרגילה — כדאי לבדוק." />
      </div>

      <SubSection title="ד. זכויות בריאות בגיל השלישי" />
      <CheckList items={[
        { bold: "תרופות", text: "— תעריף מופחת לתרופות בסל הבריאות" },
        { bold: "שיניים", text: "— זכאות לפרוטזות בעלות מופחתת" },
        { bold: "ראייה ושמיעה", text: "— משקפיים ומכשירי שמיעה — כלולים חלקית בסל קופות החולים" },
        { bold: "שיקום", text: "— פיזיותרפיה, ריפוי בעיסוק, קלינאות תקשורת — בסל הבריאות" },
        { bold: "ביקורי בית", text: "— קופות החולים מחויבות לשירות בית למי שאינו יכול להגיע לקליניקה" },
        { bold: "ייעוץ גריאטרי", text: "— הפניה לרופא גריאטר דרך רופא המשפחה" },
      ]} />

      <SubSection title="ה. הנחות והטבות כלכליות" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <InfoCard icon={<Bus className="h-5 w-5 text-primary" />} title="תחבורה ציבורית" description="נשים מגיל 60, גברים מגיל 65 — 50% הנחה. מגיל 75 — נסיעה חינמית. נדרש כרטיס רב-קו." footer="מוקד: *8840" />
        <InfoCard icon={<Home className="h-5 w-5 text-amber-500" />} title="הנחה בארנונה" description='30% הנחה (עד 100 מ"ר) להכנסה עד 150% שכר ממוצע. פטור מלא למקבלי השלמת הכנסה.' footer="לפנות: מחלקת ארנונה ברשות המקומית" />
        <InfoCard icon={<Zap className="h-5 w-5 text-amber-500" />} title="הנחה בחשמל" description="50% הנחה על צריכה ביתית (עד 400 קווט) למקבלי השלמת הכנסה. לחלק מהזכאים — אוטומטי." footer="בירור: ביטוח לאומי *6050" />
        <InfoCard icon={<Star className="h-5 w-5 text-primary" />} title="גנים, תרבות ובידור" description="50% הנחה בגנים לאומיים ושמורות טבע. הנחות בתיאטראות, קולנוע ומוזיאונים — עם תעודת אזרח ותיק." footer="תעודה: המשרד לשוויון חברתי *8840" />
        <InfoCard icon={<Building className="h-5 w-5 text-primary" />} title="דיור ציבורי ומסובסד" description="קשישים עם הכנסה נמוכה זכאים לתור לדיור ציבורי ושכר דירה מוזל לפי גיל והכנסה." footer="לפנות: משרד הבינוי *5442" />
        <InfoCard icon={<DollarSign className="h-5 w-5 text-amber-500" />} title="מענק חימום שנתי" description="כ-649 ₪ בינואר למקבלי השלמת הכנסה באזורים קרים. ניתן אוטומטית לרוב הזכאים." footer="בירור: ביטוח לאומי *6050" />
      </div>

      <SubSection title="ו. הגנה משפטית על הקשיש" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard icon={<FileText className="h-5 w-5 text-primary" />} title="ייפוי כוח מתמשך" description="מסמך משפטי הנערך בעודו צלול — מסמיך אדם לקבל החלטות כלכליות ו/או רפואיות כשיאבד כשירות." />
        <InfoCard icon={<Activity className="h-5 w-5 text-primary" />} title="הנחיות רפואיות מקדימות" description="מסמך המאפשר להביע מראש עמדות לגבי טיפול רפואי עתידי, כולל סוגיות סוף חיים. ניתן לעדכן." />
        <InfoCard icon={<Shield className="h-5 w-5 text-destructive" />} title="הגנה מניצול" description="פגיעה בקשיש — כלכלית, פיזית, נפשית — היא עבירה פלילית. ניתן לפנות לרשויות הרווחה או קו 118." />
        <InfoCard icon={<AlertTriangle className="h-5 w-5 text-destructive" />} title="אפוטרופסות" description="כשאין ייפוי כוח — בית המשפט ממנה אפוטרופוס. עדיף הרבה יותר לערוך ייפוי כוח מתמשך מראש." />
      </div>

      <SubSection title="שאלות נפוצות" />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="e1"><AccordionTrigger>האם אפשר לקבל גמלת סיעוד בלי ביקור בית?</AccordionTrigger>
          <AccordionContent>כן. ביטוח לאומי יכול לקבוע זכאות על סמך <strong>מסמכים רפואיים בלבד</strong> אם החומר מפורט. מומלץ לצרף מסמכים עדכניים בעת הגשת התביעה.</AccordionContent></AccordionItem>
        <AccordionItem value="e2"><AccordionTrigger>מה ניתן לקבל בסל הסיעוד מעבר לשעות מטפל?</AccordionTrigger>
          <AccordionContent>ניתן לבחור שילוב של: <strong>טיפול אישי בבית, מרכז יום, מוצרי ספיגה, לחצן מצוקה, שירותי כביסה, חברות בקהילה תומכת.</strong> בחלק מהרמות גם רכיב כספי.</AccordionContent></AccordionItem>
        <AccordionItem value="e3"><AccordionTrigger>מה ההבדל בין ייפוי כוח מתמשך לאפוטרופסות?</AccordionTrigger>
          <AccordionContent><strong>ייפוי כוח מתמשך</strong> — הקשיש בוחר בעצמו, בעודו כשיר, מי יטפל בענייניו. <strong>אפוטרופסות</strong> — נכפית על ידי בית המשפט. ייפוי כוח מתמשך עדיף הרבה — שומר על כבוד הקשיש ועל רצונו.</AccordionContent></AccordionItem>
      </Accordion>

      <SubSection title="📞 מספרי מידע" />
      <ContactGrid contacts={[
        { title: "ביטוח לאומי — ייעוץ לאזרח ותיק", desc: "ייעוץ חינמי, מיצוי זכויות, תמיכה רגשית — ימים א׳–ה׳", phone: "*9696" },
        { title: "ביטוח לאומי — קצבאות ושאירים", desc: "בירורים על קצבת אזרח ותיק, קצבת שאירים, גמלת ניידות, השלמת הכנסה", phone: "*6050" },
        { title: "המוקד הממשלתי לאזרח ותיק", desc: "מידע מקיף על כלל הזכויות, הטבות, הנחות", phone: "*8840" },
        { title: "קו חירום — דיווח על ניצול/הזנחה", desc: "דיווח על התעללות, הזנחה, ניצול — פעיל 24 שעות", phone: "118" },
        { title: "האפוטרופוס הכללי", desc: "ייפוי כוח מתמשך, הנחיות רפואיות, אפוטרופסות", phone: "02-6467001" },
      ]} />
    </TabsContent>

    {/* ═══ TAB 2: FAMILY ═══ */}
    <TabsContent value="family" className="space-y-6 mt-6">
      <SectionHeader icon={<Home />} title="משפחה מטפלת" subtitle="זכויות עבודה, ימי מחלה, הקלות מס ותמיכה" />

      <Callout variant="warning" title="הפרטים קריטיים — פערים גדולים בין מקרים">
        ימי מחלה לטיפול בבן/בת זוג שונים מאלה לטיפול בהורה. טיפול בהורה עם מוגבלות מזכה ב-18 ימים — לא רק 6.
      </Callout>

      <SubSection title="א. ימי מחלה לפי סוג הטיפול" />
      <StyledTable
        headers={["סיבת ההיעדרות", "ימים לשנה", "תשלום", "הערות"]}
        rows={[
          ["הורה חולה", "עד 6 ימים", "כמו ימי מחלה", "גם הורה של בן/בת הזוג"],
          ["בן/בת זוג חולה", "עד 6 ימים", "כמו ימי מחלה", "חולי ממושך — ייתכן יותר"],
          ["ילד חולה (עד גיל 16)", "עד 8 ימים", "כמו ימי מחלה", "רק אם שני ההורים עובדים"],
          ["הורה / ילד עם מוגבלות", "עד 18 ימים", "ממחלה/חופשה לבחירה", "עד 36 ימים במקרים מיוחדים"],
          ["סיוע לילד עם מוגבלות", "52 שעות", "ללא ניכוי שכר", "עד 104 שעות במקרים מסוימים"],
        ]}
      />

      <Callout variant="success" title="⭐ חשוב — 52 שעות ללא ניכוי שכר">
        הורה לילד עם מוגבלות זכאי ל-52 שעות העדרות בשנה — <strong>ללא כל ניכוי</strong> משכרו. זכות שרבים לא מודעים אליה.
      </Callout>

      <SubSection title="ב. זכויות נוספות בדיני עבודה" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard title="זכאות לפיצויים" description="עובד שנאלץ להתפטר עקב מחלת הורה, לאחר לפחות שנת עבודה — עשוי להיות זכאי לפיצויי פיטורים." />
        <InfoCard title="איסור אפליה" description="החוק אוסר לפגוע בעובד בגלל טיפול בבן משפחה עם מוגבלות. המעסיק עשוי להיות חייב בהתאמות." />
        <InfoCard title="הפחתת שעות עבודה" description="עובד מטפל יכול לבקש הפחתת שעות. המעסיק מחויב לנהל דיאלוג — אין חובה להסכים, אך אסור להתעלם." />
        <InfoCard title="זיכוי מס — מוסד" description="מי ששילם עבור הורה במוסד — זיכוי 35% מההפרש בין התשלום ל-12.5% מהכנסתו החייבת." />
        <InfoCard title='נקודות זיכוי מס' description='עובד המטפל בהורה עם מוגבלות חמורה — עשוי להיות זכאי לנקודות זיכוי נוספות. יש לבדוק עם רו"ח.' />
      </div>

      <SubSection title="ג. שירותי תמיכה ומידע" />
      <ContactGrid contacts={[
        { title: "ביטוח לאומי — ייעוץ לאזרח ותיק", desc: "ייעוץ חינמי, מיצוי זכויות, תמיכה רגשית", phone: "*9696" },
        { title: "Caregivers Israel", desc: "ייעוץ אישי, מיפוי צרכים, ליווי והכוונה" },
        { title: "עמדא — דמנציה", desc: "קבוצות תמיכה, הדרכה לבני משפחה" },
        { title: "משרד הכלכלה — זכויות עובדים", desc: "בירורים על ימי מחלה, פיצויים ואפליה", phone: "1800-354-354" },
        { title: "מרכז יום לאזרח ותיק", desc: "הפוגה למשפחה — הסעות, ארוחות, פעילויות" },
        { title: "הלשכה לסיוע משפטי", desc: "סיוע משפטי חינמי לזכאים", phone: "1700-706-106" },
      ]} />

      <SubSection title="שאלות נפוצות" />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="f1"><AccordionTrigger>ימי מחלה לטיפול בהורה עם מוגבלות לעומת הורה חולה?</AccordionTrigger>
          <AccordionContent><strong>הורה חולה</strong> = עד 6 ימים. <strong>הורה עם מוגבלות</strong> = עד 18 ימים (ואף 36 במקרים מיוחדים) + 52 שעות ללא ניכוי. חשוב לדעת את ההגדרה המדויקת של מוגבלות לפי החוק.</AccordionContent></AccordionItem>
        <AccordionItem value="f2"><AccordionTrigger>איך מוכיחים שהתפטרתי בגלל מצב הורה?</AccordionTrigger>
          <AccordionContent><strong>תעדו הכל:</strong> אישורים רפואיים, מכתב הסבר למעסיק בזמן אמת, תכתובות. בית הדין לעבודה בודק שמצב הבריאות היה <strong>הגורם העיקרי והממשי</strong> להתפטרות.</AccordionContent></AccordionItem>
        <AccordionItem value="f3"><AccordionTrigger>האם מגיעים לי ימי מחלה גם לטיפול בבן/בת זוג?</AccordionTrigger>
          <AccordionContent>כן — עד <strong>6 ימים לשנה</strong>. אם בן/בת הזוג עם <strong>מחלה ממארת</strong> — ייתכן שיש זכאות רחבה יותר. יש לבדוק עם יועץ עבודה.</AccordionContent></AccordionItem>
      </Accordion>
    </TabsContent>

    {/* ═══ TAB 3: WORKER ═══ */}
    <TabsContent value="worker" className="space-y-6 mt-6">
      <SectionHeader icon={<Heart />} title="עובד זר בסיעוד ביתי" subtitle={`זכויות, פנסיה, פיצויים, בריאות והגנה — ${D.year}`} />

      <Callout variant="primary" title={`שכר מינימום — נכון ל-${D.min_wage_date}`}>
        <strong>חודשי:</strong> {D.min_wage_monthly} ₪ &nbsp;|&nbsp; <strong>יומי</strong> (6 ימי עבודה בשבוע)<strong>:</strong> {D.min_wage_daily} ₪ &nbsp;|&nbsp; <strong>שעתי</strong> ({D.min_wage_hours_note})<strong>:</strong> {D.min_wage_hourly} ₪
      </Callout>

      <ToolLink title="מחשבון שכר לעובד זר" description="חישוב מדויק לפי ימי עבודה, ותק, ניכויים ותוספות" linkText="← למחשבון השכר" to="/tools#salary-calculator" />

      <SubSection title="א. זכויות עבודה בסיסיות" />
      <CheckList items={[
        { bold: "חוזה כתוב", text: "בשפה שהעובד מבין" },
        { bold: "שכר מינימום", text: `— ${D.min_wage_monthly} ₪ לחודש או גבוה ממנו` },
        { bold: "יום מנוחה שבועי", text: "— לפחות 25 שעות רצופות" },
        { bold: "9 ימי חג", text: "בתשלום בשנה" },
        { bold: "16 ימי חופשה שנתית", text: "בחמש השנים הראשונות (14 ימים בתשלום + 2 ימי מנוחה שבועית ללא תשלום, כי במשרת 24/7 יום חופשה כולל יום מנוחה). מספר הימים עולה לפי ותק — ראו טבלה בחובות" },
        { bold: "דמי מחלה", text: "— 1.5 ימים/חודש, עד 90 ימים. יום 1 ללא תשלום, ימים 2–3 ב-50%, מיום 4 ב-100%" },
        { bold: "ביטוח רפואי פרטי", text: "מיום הראשון + עותק פוליסה בשפת העובד" },
        { bold: "מגורים הולמים", text: "בבית המטופל + 7 ימים לאחר סיום" },
        { bold: "150% שכר", text: "עבור עבודה ביום מנוחה שבועי או בחגו" },
      ]} />

      <SubSection title="ב. זכויות פנסיוניות ופיצויים" />
      <Callout variant="primary" title="⚠️ חשוב: דין מיוחד לעובדי סיעוד זרים — שונה מעובד רגיל">
        עובדים זרים אינם יכולים להצטרף לקרנות פנסיה רגילות (אין ת.ז. ישראלית). <strong>המעסיק מחויב לשמור את הכספים בחשבון בנק נפרד או בחיסכון ייעודי על שם העובד, ולשלם את הסכום הצבור בסיום ההעסקה.</strong> חובה לנהל רישום מדויק של הצבירה ולהפריש מדי חודש.
      </Callout>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="תחילת זכאות לפנסיה" value="חודש 7" desc="עובד ללא הסדר פנסיוני פעיל קודם — זכאי להפרשות לאחר 6 חודשי עבודה (מהחודש ה-7)." />
        <StatCard title="שיעור ההפרשה — מעסיק" value="6.5%" desc="תגמולי מעסיק מהשכר המבוטח. נשמר בחשבון נפרד על שם העובד ומשולם בסיום." />
        <StatCard title="פיצויי פיטורים" value="6%–8.33%" desc="מינימום 6% מופרש חודשית (שייך לעובד בכל מקרה). השלמה ל-8.33% — רק אם פוטר או בסיבה מזכה." />
        <StatCard title="מצב יוצא דופן" value="יום 1" desc="אם לעובד קיימת פנסיה פעילה ממעסיק קודם בישראל — החובה חלה מהיום הראשון (בפועל רטרואקטיבית לאחר 3 חודשים)." />
      </div>

      <StyledTable
        headers={["רכיב", "שיעור", "מתי מתחיל", "אופן התשלום"]}
        rows={[
          ["תגמולי מעסיק", "6.5% מהשכר המבוטח", "חודש 7 (או יום 1 אם יש פנסיה פעילה)", "נשמר בחשבון נפרד על שם העובד, משולם בסיום"],
          ["פיצויי פיטורים (מינימום)", "6% מהשכר", "מופרש מדי חודש", "שייך לעובד בכל מקרה — גם בהתפטרות (סעיף 14)"],
          ["השלמת פיצויים", "עד 8.33% לשנה", "לאחר שנה רצופה", "רק אם פוטר, או בסיבה מזכה (הרעת תנאים, מצב בריאותי, מות מטופל)"],
          ["תגמולי עובד", "6% (מנוכה מהשכר)", "חודש 7 (או יום 1)", "מנוכה משכר העובד"],
          [`ביטוח לאומי (מעסיק)`, `${D.btl_rate}%`, "מיום הראשון", "אסור לנכות מהשכר"],
        ]}
      />

      <Callout variant="warning" title="נקודות מרכזיות שחשוב לדעת">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>אין הפקדה לקרן פנסיה רגילה</strong> — הכסף נשמר בחשבון נפרד/חיסכון ייעודי ומשולם בסיום. חובה לנהל רישום מדויק.</li>
          <li><strong>חודש 7, לא חודש 3</strong> — תחילת חובת הפרשה לעובד ללא הסדר פנסיוני קודם</li>
          <li><strong>יום 1 — אם יש פנסיה פעילה</strong> ממעסיק קודם בישראל — החובה חלה מיד (רטרואקטיבית לאחר 3 חודשים)</li>
          <li><strong>רכיב פיצויים 6% — שייך לעובד תמיד</strong>, גם אם התפטר מרצונו (לפי סעיף 14 לחוק פיצויי פיטורים)</li>
          <li><strong>השלמה ל-8.33%</strong> — רק בפיטורים או בסיבה מזכה (הרעת תנאים, מצב בריאותי, מות המטופל)</li>
          <li><strong>מות המטופל</strong> = נחשב לפיטורים — העובד זכאי לפיצויים מלאים</li>
        </ul>
      </Callout>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="wp1"><AccordionTrigger>מה קורה לכסף הפנסיוני אם העובד עוזב ישראל?</AccordionTrigger>
          <AccordionContent>מאחר שהכסף נשמר בחשבון נפרד על שם העובד (לא בקרן פנסיה), <strong>על המעסיק לשלם לעובד את מלוא הסכום שנצבר ביום סיום ההעסקה</strong>, בין אם העובד נשאר בישראל ובין אם לא.</AccordionContent></AccordionItem>
        <AccordionItem value="wp2"><AccordionTrigger>האם פיצויים מגיעים גם אם העובד התפטר?</AccordionTrigger>
          <AccordionContent><strong>חלקית כן.</strong> רכיב הפיצויים שבתוך ההפרשה הפנסיונית (6%) שייך לעובד בכל מקרה, גם בהתפטרות מרצון — לפי סעיף 14 לחוק פיצויי פיטורים. <strong>ההשלמה ל-8.33%</strong> מגיעה רק אם העובד פוטר, או התפטר מ"סיבה מזכה" — כגון הרעה בתנאי עבודה, מצב בריאותי, או מות המטופל (שנחשב לפיטורים).</AccordionContent></AccordionItem>
        <AccordionItem value="wp3"><AccordionTrigger>מהו "שכר מבוטח" לצורך חישוב ההפרשה?</AccordionTrigger>
          <AccordionContent>השכר המבוטח הוא השכר הרגיל ששולם לעובד — ללא תשלומי שעות נוספות חד-פעמיות, אך כן כולל את שכר הבסיס ורכיבי השכר הקבועים. ההפרשות מחושבות על בסיס זה.</AccordionContent></AccordionItem>
      </Accordion>

      <SubSection title="ג. זכויות בריאות לעובד הזר" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <InfoCard title="ביטוח רפואי פרטי חובה" description="המעסיק מחויב לבטח את העובד מיום הראשון. העובד זכאי לקבל עותק הפוליסה בשפתו." />
        <InfoCard title="טיפול חירום — גם ללא ביטוח" description="עובד זר במצב חירום רפואי — זכאי לטיפול בחדר מיון גם ללא ביטוח בתוקף." />
        <InfoCard title="תאונת עבודה" description="עובד שנפגע בתאונת עבודה — זכאי לטיפול מלא ולפיצוי. יש לדווח מיד למעסיק ולממונה." />
      </div>

      <SubSection title="ד. ניכויים מותרים מהשכר" />
      <StyledTable
        headers={["סוג ניכוי", "תקרה מרבית", "הערות"]}
        rows={[
          ["ביטוח רפואי פרטי", `${D.deduct_insurance} ₪ / חודש`, "עד מחצית ההוצאה בפועל"],
          ["מגורים + נלוות (בבית המעסיק)", `${D.deduct_housing} ₪ / חודש`, "בבית המטופל בלבד"],
          ["אוכל", "עד 10% משכר המינימום", "רק בהסכם כתוב מובן לעובד"],
          ["ביטוח לאומי", "לא מנוכה", `${D.btl_rate}% — המעסיק משלם, אסור לנכות`],
        ]}
      />

      <SubSection title="ה. הגנה מניצול ואכיפת זכויות" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard title="הגשת תלונה לממונה" description='עובד שזכויותיו הופרו — יכול להגיש תלונה לממונה על זכויות עובדים זרים ללא עלות ובלי עו"ד.' />
        <InfoCard title="תביעה לבית הדין לעבודה" description="עובד זר יכול לתבוע שכר, פיצויים וזכויות בבית הדין האזורי לעבודה — גם בלי עורך דין." />
        <InfoCard title="הגנה מסחר בבני אדם" description="ניצול חמור, כליאה, עבדות מודרנית — עברות פליליות חמורות. קו חירום: 1202." />
        <InfoCard title="זכות לתרגום" description="בהליכים משפטיים — עובד זר זכאי לתרגום בבית המשפט. בחלק מהמקרים — סיוע משפטי חינמי." />
      </div>

      <SubSection title="ו. לוח הודעה מוקדמת" />
      <div className="space-y-3 border-r-2 border-primary pr-4 mr-2">
        {[
          { period: "7 ימים", desc: "עבד עד 3 חודשים" },
          { period: "14 ימים", desc: "עבד 3–6 חודשים" },
          { period: "21 ימים", desc: "עבד 7–12 חודשים" },
          { period: "30 ימים", desc: "לאחר שנת עבודה" },
        ].map((item, i) => (
          <div key={i} className="relative">
            <div className="absolute -right-[13px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
            <strong className="block text-sm">{item.period}</strong>
            <span className="text-xs text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>

      <Callout variant="warning" title="מה אינו חלק מתפקיד העובד">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>מטלות ביתיות עבור בני משפחה אחרים</li>
          <li>טיפול בבעלי חיים</li>
          <li>נהיגה/הסעה — אלא אם נרשם מפורשות בחוזה</li>
        </ul>
      </Callout>

      <SubSection title="שאלות נפוצות" />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="w1"><AccordionTrigger>מה קורה לפנסיה כשהעובד עוזב את ישראל?</AccordionTrigger>
          <AccordionContent>העובד <strong>זכאי למשוך</strong> את הכספים הצבורים. קרן פנסיה מאפשרת משיכה (ייתכן ניכוי מס). קופת גמל — תלוי בתנאי הקופה.</AccordionContent></AccordionItem>
        <AccordionItem value="w2"><AccordionTrigger>האם פיצויים משולמים גם אם העובד מתפטר?</AccordionTrigger>
          <AccordionContent>בדרך כלל <strong>לא</strong>. אם <strong>פוטר</strong> — זכאי לפיצויים מלאים. אם <strong>התפטר</strong> ללא עילה — כספי הקרן שלו נשארים, אך המעסיק לא חייב תוספת.</AccordionContent></AccordionItem>
        <AccordionItem value="w3"><AccordionTrigger>לאן פונה עובד שהמעסיק לא שילם לו שכר?</AccordionTrigger>
          <AccordionContent>(1) <strong>תלונה לממונה על עובדים זרים</strong> — מהיר ויעיל לאכיפה מנהלית. (2) <strong>תביעה לבית הדין לעבודה</strong> — לפיצוי מלא כולל פיצויי הלנת שכר. ניתן לעשות גם וגם.</AccordionContent></AccordionItem>
      </Accordion>

      <SubSection title="📞 גורמי אכיפה וסיוע" />
      <ContactGrid contacts={[
        { title: "ממונה על זכויות עובדים זרים", desc: "הגשת תלונות — ללא עלות", phone: "1800-354-354" },
        { title: "רשות האוכלוסין", desc: "היתרי העסקה, אשרות, מעבר מעסיק", phone: "*3450" },
        { title: "קו חירום — סחר בבני אדם", desc: "ניצול חמור, כליאה, ניצול מיני", phone: "1202" },
        { title: "הלשכה לסיוע משפטי", desc: "סיוע חינמי — תביעות עבודה", phone: "1700-706-106" },
      ]} />
    </TabsContent>

    {/* ═══ TAB 4: HMO ═══ */}
    <TabsContent value="hmo" className="space-y-6 mt-6">
      <SectionHeader icon={<Activity />} title="קופות חולים — זכויות לקשיש ולמשפחה מטפלת" subtitle="הטבות וזכויות נוספות מכללית, מכבי, מאוחדת ולאומית" />

      <Callout variant="info" title="זכויות סל הבריאות — זהות בכל הקופות">
        חלק מהזכויות מעוגנות בסל הבריאות הממלכתי ומחייבות את כל ארבע קופות החולים. אחרות הן הטבות ספציפיות של כל קופה — שווה לבדוק מול הקופה שלכם.
      </Callout>

      <SubSection title="א. זכויות בסל הבריאות — תקפות בכל הקופות" />
      <CheckList items={[
        { bold: "ביקורי בית", text: "— קופת החולים מחויבת לשלוח רופא או אחות הביתה למי שאינו יכול להגיע למרפאה" },
        { bold: "פיזיותרפיה, ריפוי בעיסוק, קלינאות תקשורת", text: "— כלולים בסל הבריאות, עם השתתפות עצמית מופחתת לגיל השלישי" },
        { bold: "ייעוץ גריאטרי", text: "— הפניה לרופא גריאטר דרך רופא המשפחה, ללא עלות נוספת" },
        { bold: "אביזרי שיקום וניידות", text: "— כסאות גלגלים, קביים, הליכונים — כלולים חלקית בסל" },
        { bold: "פרוטזות שיניים", text: "— זכאות חלקית לשיניים תותבות בסל הבריאות" },
        { bold: "מכשירי שמיעה", text: "— סיוע חלקי בסל — גובה הסיוע משתנה בין קופות" },
      ]} />

      <SubSection title="ב. הטבות ייחודיות לפי קופה" />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="clalit">
          <AccordionTrigger className="text-base">🏥 כללית — זכויות והטבות לגיל השלישי</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>כללית מושלם / פלטינום</strong> — ביטוחי משלים הכוללים הרחבות משמעותיות לגיל השלישי: שיניים, עיניים, שמיעה ועוד</li>
              <li><strong>מרפאות גריאטריות ייעודיות</strong> — כללית מפעילה מרפאות גריאטריות עם צוותים מיוחדים בתחום הזקנה</li>
              <li><strong>שירות "כללית בבית"</strong> — ביקורי אחות ורופא בבית — מותאם לקשישים שאינם ניידים</li>
              <li><strong>תוכניות ניהול מחלות כרוניות</strong> — מעקב יזום לסוכרת, יתר לחץ דם, COPD — קריטי לקשישים</li>
              <li><strong>יועצות סיעוד</strong> — סיוע בתיאום טיפול ומיצוי זכויות — שאלו במרפאה</li>
            </ul>
            <p className="mt-3 text-sm"><strong>מוקד כללית:</strong> <a href="tel:*2700" className="text-primary font-bold">*2700</a></p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="maccabi">
          <AccordionTrigger className="text-base">🔵 מכבי — זכויות והטבות לגיל השלישי</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>מכבי שלי / מכבי זהב</strong> — ביטוחי משלים הכוללים הנחות על שיניים, משקפיים, מכשירי שמיעה ואביזרים</li>
              <li><strong>יועצת גריאטרית</strong> — מכבי מעסיקה יועצות גריאטריות המסייעות במיפוי צרכים ומיצוי זכויות</li>
              <li><strong>רפואה מרחוק</strong> — שירות "מכבי Online" לייעוץ רפואי בווידאו — נוח לבני משפחה מטפלים</li>
              <li><strong>מרכזי יום לאזרח ותיק</strong> — מכבי משתפת פעולה עם מרכזי יום ומפנה חברים</li>
              <li><strong>שירות "מכבי בבית"</strong> — צוות רב-מקצועי לטיפול ביתי מקיף</li>
            </ul>
            <p className="mt-3 text-sm"><strong>מוקד מכבי:</strong> <a href="tel:*3555" className="text-primary font-bold">*3555</a></p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="meuhedet">
          <AccordionTrigger className="text-base">🟢 מאוחדת — זכויות והטבות לגיל השלישי</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>מאוחדת שיא / עדיף</strong> — ביטוחי משלים הכוללים הרחבות לגיל השלישי בשיניים, שמיעה ועוד</li>
              <li><strong>רשת דיור מוגן ובתי חולים סיעודיים</strong> — מאוחדת מפעילה מסגרות לגיל השלישי ברחבי הארץ</li>
              <li><strong>שני בתי מלון שיקומיים</strong> — באלי טבריה ומלון ספא כנען בצפת — לשהיית החלמה לאחר אשפוז</li>
              <li><strong>שירות "מאוחדת בבית"</strong> — ביקורי אחות וצוות רפואי בבית למי שאינו יכול להגיע למרפאה</li>
              <li><strong>מעקב חולים כרוניים</strong> — תוכנית מיוחדת למעקב קשישים עם מחלות כרוניות</li>
            </ul>
            <p className="mt-3 text-sm"><strong>מוקד מאוחדת:</strong> <a href="tel:*3833" className="text-primary font-bold">*3833</a></p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="leumit">
          <AccordionTrigger className="text-base">🟡 לאומית — זכויות והטבות לגיל השלישי</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong>לאומית כסף / זהב</strong> — תוכניות משלים הכוללות שירותים נוספים לגיל השלישי</li>
              <li><strong>רפואה מרחוק</strong> — התייעצות טלפונית ווידאו — נוחה במיוחד לקשישים שמתקשים לנסוע</li>
              <li><strong>ניהול בריאות משפחתי</strong> — אתר ואפליקציה המאפשרים לבן משפחה לנהל את בריאות הקשיש</li>
              <li><strong>מעקב תרופות</strong> — שירות לוודא נטילת תרופות נכונה — קריטי לקשישים עם ריבוי תרופות</li>
            </ul>
            <p className="mt-3 text-sm"><strong>מוקד לאומית:</strong> <a href="tel:*507" className="text-primary font-bold">*507</a></p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <SubSection title="ג. משפחה מטפלת — מה מציעות קופות החולים" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard title="מידע ותמיכה למטפלים" description="מכבי, כללית ומאוחדת מציעות לבני משפחה מטפלים מידע מקצועי, קישור לקבוצות תמיכה ומשאבים בקהילה. פנו לרופא המשפחה." />
        <InfoCard title="ייעוץ בבריאות הנפש" description="בני משפחה מטפלים הסובלים מעומס נפשי — זכאים לפנות לפסיכולוג או עובד סוציאלי קליני דרך קופת החולים." />
        <InfoCard title="הנחיות רפואיות מקדימות — סיוע" description="כל קופה מסייעת בהכנת הנחיות רפואיות מקדימות לקשיש — שאלו את הרופא הראשוני או האחות המטפלת." />
        <InfoCard title="טלרפואה — ייעוץ מרחוק" description="כל הקופות מציעות ייעוץ רפואי בטלפון או וידאו — מאפשר לבן משפחה להיות נוכח בשיחה עם הקשיש מכל מקום." />
      </div>

      <SubSection title="ד. ביטוח סיעודי דרך קופת החולים" />
      <Callout variant="warning" title="ביטוח סיעודי — השלמה לגמלת סיעוד">
        כל קופה מציעה ביטוח סיעודי קבוצתי. <strong>זהו ביטוח נוסף מעבר לגמלת סיעוד</strong> — כדאי לבדוק מה יש לקשיש ולשקול רכישה לפני גיל הזקנה.
      </Callout>

      <StyledTable
        headers={["קופה", "שם ביטוח סיעודי משלים", "מוקד טלפון"]}
        rows={[
          ["כללית", "כללית סיעוד / כללית סיעוד פלוס", "*2700"],
          ["מכבי", "מכבי סיעוד / מכבי סיעוד זהב", "*3555"],
          ["מאוחדת", "מאוחדת סיעוד מושלם", "*3833"],
          ["לאומית", "לאומית סיעוד מקיף", "*507"],
        ]}
      />

      <SubSection title="📞 מוקדי קופות החולים" />
      <ContactGrid contacts={[
        { title: "🏥 כללית", desc: "שירות חברים, זכויות, ביטוח משלים", phone: "*2700" },
        { title: "🔵 מכבי", desc: "שירות חברים, זכאויות, אביזרים, ביטוח", phone: "*3555" },
        { title: "🟢 מאוחדת", desc: "שירות חברים, דיור מוגן, ביטוח סיעודי", phone: "*3833" },
        { title: "🟡 לאומית", desc: "שירות חברים, ביטוח משלים, רפואה מרחוק", phone: "*507" },
        { title: "קול הבריאות — משרד הבריאות", desc: "מידע על זכויות בריאות, תלונות, הנחיות רפואיות", phone: "*5400" },
        { title: "ממונה על קופות החולים", desc: "תלונות על קופת חולים, הפרות זכויות חולה", phone: "*5400" },
      ]} />
    </TabsContent>
  </Tabs>
);

// ═══════════════════════════════════════════════
// OBLIGATIONS VIEW (new content)
// ═══════════════════════════════════════════════
const ObligationsView = () => (
  <Tabs defaultValue="worker-obligations" dir="rtl">
    <TabsList className="w-full h-auto flex-wrap gap-1.5 bg-muted/50 p-2">
      <TabsTrigger value="worker-obligations" className="flex items-center gap-2 text-xs sm:text-sm flex-1 min-w-[140px] py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
        <UserCheck className="h-4 w-4" /> חובות העובד הזר
      </TabsTrigger>
      <TabsTrigger value="employer-obligations" className="flex items-center gap-2 text-xs sm:text-sm flex-1 min-w-[140px] py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all">
        <Briefcase className="h-4 w-4" /> חובות המעסיק
      </TabsTrigger>
    </TabsList>

    {/* ═══ WORKER OBLIGATIONS ═══ */}
    <TabsContent value="worker-obligations" className="space-y-6 mt-6">
      <SectionHeader icon={<UserCheck />} title="חובות העובד הזר" subtitle="חובות ליבה לפי הדין, החוזה הסטנדרטי וסעיפים חוזיים נפוצים" />

      <Callout variant="info" title="מקורות החובות">
        החובות נגזרות מהדין הישראלי, מהחוזה הסטנדרטי הרשמי של רשות האוכלוסין, ומסעיפים חוזיים מקובלים. סעיפים שמקורם בחוזה פרטי מסומנים בהתאם.
      </Callout>

      <SubSection title="א. עבודה כחוק ובהתאם לאשרה" />
      <CheckList items={[
        { bold: "עבודה רק במסגרת האשרה וההיתר", text: "— בענף ובאזור הגיאוגרפי שמותרים לו" },
        { bold: "רישום דרך לשכה פרטית מורשית", text: "— חובה בענף הסיעוד הביתי" },
        { bold: "הודעה מוקדמת בכתב לפני עזיבה", text: "— גם ללשכה וגם למטופל/נציגו" },
        { bold: "דיווח ללשכה בסיום עבודה", text: "— באמצעות הלשכה הפרטית" },
      ]} />

      <Callout variant="warning" title="זהירות — החלפת מעסיקים">
        עובד שמחליף מקום עבודה לפחות 3 פעמים בתוך שנתיים, ורשות האוכלוסין חושדת בשימוש לרעה בוויזה — עשוי להיות מוזמן לבירור. עזיבה ללא הודעה מוקדמת כנדרש עלולה להוביל להרחקה מישראל, בכפוף לשימוע.
      </Callout>

      <SubSection title="ב. לוח הודעה מוקדמת לפני עזיבה" />
      <div className="space-y-3 border-r-2 border-primary pr-4 mr-2">
        {[
          { period: "7 ימים", desc: "עבד עד 3 חודשים" },
          { period: "14 ימים", desc: "עבד 3–6 חודשים" },
          { period: "21 ימים", desc: "עבד 7–12 חודשים" },
          { period: "30 ימים", desc: "לאחר שנת עבודה" },
        ].map((item, i) => (
          <div key={i} className="relative">
            <div className="absolute -right-[13px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
            <strong className="block text-sm">{item.period}</strong>
            <span className="text-xs text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>

      <SubSection title="ג. ביצוע תפקידי הסיעוד" />
      <p className="text-sm text-muted-foreground mb-3">העובד חייב לבצע את כל תפקידי הסיעוד האישיים והביתיים של המטופל כפי שהוגדרו בחוזה הסטנדרטי:</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {["הלבשה", "רחצה וניקיון", "סיוע בשירותים / החתלה", "הכנת מזון ובישול", "אכילה והאכלה", "מתן תרופות מרשם", "השגחה", "הרמה והעברה", "ניקיון סביבת המטופל", "קניות", "כביסה", "ליווי מחוץ לבית"].map((task, i) => (
          <div key={i} className="flex items-center gap-2 text-sm bg-muted/50 rounded-lg px-3 py-2">
            <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{task}</span>
          </div>
        ))}
      </div>

      <Callout variant="warning" title="מה אינו חלק מהתפקיד">
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>עבודות בית עבור בני משפחה אחרים — אינן חלק מהתפקיד</li>
          <li>טיפול בבעלי חיים — אינו כלול</li>
          <li>נהיגה/הסעה — רק אם הוגדר מפורשות בנספח צרכים מיוחדים</li>
        </ul>
      </Callout>

      <SubSection title="ד. חובות מגורים והתנהלות" />
      <CheckList items={[
        { bold: "מגורים בבית המטופל", text: "— במהלך שבוע העבודה הרגיל (6 ימים). ביום המנוחה רשאי ללון מחוץ לבית" },
        { bold: "לא לעזוב את המטופל לבדו", text: "— ללא תיאום, אם כך נקבע בחוזה. המטופל עלול להיות חסר ישע — עזיבה ללא השגחה עשויה להוות עבירה" },
        { bold: "שמירה על כללי המגורים", text: "— אין להזמין אורחים, אין שימוש חריג בבית. העובד הוא בר-רשות בלבד" },
        { bold: "שיתוף פעולה עם ביטוח רפואי", text: "— מילוי וחתימה מהימנה על טפסים הדרושים לביטוח" },
        { bold: "התנהגות חוקית ומכבדת", text: "— ללא התעללות או הטרדה. חובה הדדית — חלה גם על המעסיק" },
      ]} />

      <SubSection title="ה. סעיפים חוזיים נפוצים (לפי הסכם פרטי)" />
      <Callout variant="info" title="הבהרה: סעיפים אלה מקורם בחוזים פרטיים, לא בדין">
        הסעיפים הבאים נפוצים בחוזי העסקה אך אינם חובה מכוח הדין. תוקפם מותנה בכך שנכתבו מפורשות בחוזה שהעובד חתם עליו.
      </Callout>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard title="ליווי בעת אשפוז" description="אם המטופל מאושפז, העובד ישהה במחיצתו במשך היום או הלילה — לפי ההסכם." />
        <InfoCard title="תיאום חופשת מולדת" description="העובד יתאם מראש חופשה לביקור במדינת המוצא, וישא בעלויות הקשורות לאינטר-ויזה." />
        <InfoCard title="הצהרות כשירות" description="העובד מצהיר שהוא כשיר פיזית ונפשית לתפקיד, ושאין לו עבר פלילי או חקירה מתנהלת." />
        <InfoCard title="איסור שימוש בחומרים ממכרים" description="איסור שימוש לרעה באלכוהול, סמים או חומרים ממכרים — סעיף מקובל בחוזי העסקה." />
      </div>

      <SubSection title="שאלות נפוצות" />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="wo1"><AccordionTrigger>מה קורה אם העובד עוזב בלי הודעה מוקדמת?</AccordionTrigger>
          <AccordionContent>עזיבה ללא הודעה כנדרש עלולה להוביל ל<strong>הרחקה מישראל</strong>, בכפוף לזכות שימוע. בנוסף, המעסיק עשוי לתבוע פיצוי על הנזק שנגרם לו בגין העזיבה הפתאומית.</AccordionContent></AccordionItem>
        <AccordionItem value="wo2"><AccordionTrigger>האם העובד חייב ללוות את המטופל לבית החולים?</AccordionTrigger>
          <AccordionContent>רק <strong>אם נקבע כך בחוזה</strong>. זהו סעיף חוזי נפוץ אך אינו חובה מכוח הדין. אם מופיע בחוזה — העובד ישהה במחיצת המטופל בזמן שהוגדר (יום או לילה).</AccordionContent></AccordionItem>
        <AccordionItem value="wo3"><AccordionTrigger>מה קורה לעובד שמחליף 3 מעסיקים בשנתיים?</AccordionTrigger>
          <AccordionContent>רשות האוכלוסין עשויה <strong>להזמין אותו לבירור</strong> אם יש חשד לשימוש לרעה בוויזה. זה לא אוטומטי — אלא בכפוף לשיקול דעת הרשות ולנסיבות.</AccordionContent></AccordionItem>
        <AccordionItem value="wo4"><AccordionTrigger>כמה זמן יש לעובד למצוא מעסיק חדש אחרי סיום?</AccordionTrigger>
          <AccordionContent>לפי <strong>הזכותון הרשמי המעודכן</strong> של רשות האוכלוסין, לעובד סיעוד זר שמסיים העסקה חוקית יש בדרך כלל <strong>90 יום</strong> של שהייה נוספת בישראל לצורך היערכות. ייתכנו חוזים ישנים שמציינים 30 יום — יש להישען על הכללים העדכניים.</AccordionContent></AccordionItem>
      </Accordion>
    </TabsContent>

    {/* ═══ EMPLOYER OBLIGATIONS ═══ */}
    <TabsContent value="employer-obligations" className="space-y-6 mt-6">
      <SectionHeader icon={<Briefcase />} title="חובות המעסיק" subtitle="חובות ליבה לפי הדין, החוזה הסטנדרטי וסעיפים חוזיים מקובלים" />

      <Callout variant="primary" title="מיהו המעסיק?">
        המעסיק הוא המטופל עצמו, או — בנוסח ב' של החוזה הסטנדרטי — <strong>אפוטרופוס חוקי או קרוב משפחה מדרגה ראשונה</strong>. המטופל עצמו חייב להיות בעל היתר תקף להעסקת עובד זר.
      </Callout>

      <SubSection title="א. העסקה חוקית ומוסדרת" />
      <CheckList items={[
        { bold: "היתר תקף", text: "— להעסיק רק עם היתר בתוקף, במשרה מלאה, כעובד לן בבית המטופל" },
        { bold: "חוזה כתוב", text: "— עם נספחים: צרכים מיוחדים, פוליסת ביטוח בשפת העובד, נספח ניכויים, וצו אפוטרופסות אם רלוונטי" },
        { bold: "רישום בלשכה מורשית", text: "— העסקה באמצעות לשכה פרטית מורשית בלבד" },
        { bold: "דיווח ללשכה", text: "— על כל שינוי או הפרה של ההסכם — תוך 24 שעות" },
      ]} />

      <SubSection title="ב. שכר ותשלומים" />
      <CheckList items={[
        { bold: "לפחות שכר מינימום", text: `— ${D.min_wage_monthly} ₪ לחודש (${D.year})` },
        { bold: "תשלום במועד", text: "— עד סוף החודש שבעדו משולם, ולא יאוחר מה-9 בחודש הבא" },
        { bold: "הפקדה לחשבון בנק", text: "— על שם העובד בלבד, ללא זכות לצד שלישי בחשבון" },
        { bold: "רק ניכויים מותרים", text: "— ביטוח רפואי, מגורים ואוכל — בתקרות הקבועות בחוק" },
        { bold: "מקדמות", text: "— ניתן לתת בהסכמה ולקזז בהמשך, בכתב" },
      ]} />

      <SubSection title="ג. מנוחה, חופשה וחגים" />
      <StyledTable
        headers={["זכות", "פירוט", "הערות"]}
        rows={[
          ["יום מנוחה שבועי", "לפחות 25 שעות רצופות", "תוספת 150% אם עובד ביום המנוחה"],
          ["ימי חג", "9 ימים בתשלום בשנה", "לפי בחירת העובד. 150% אם עובד בחג"],
          ["חופשה שנתית", "16 ימים (14 בתשלום + 2 ימי מנוחה ללא תשלום)", "במשרת 24/7 יום חופשה כולל יום מנוחה. מספר הימים עולה לפי ותק"],
          ["דמי מחלה", "1.5 ימים/חודש, עד 90", "יום 1 ללא תשלום, 2–3 ב-50%, מיום 4 ב-100%"],
          ["דמי הבראה", "לאחר שנת עבודה מלאה", "לפי הצו הרלוונטי"],
        ]}
      />

      <SubSection title="ד. הפרשות סוציאליות" />
      <StyledTable
        headers={["רכיב", "שיעור", "תחילה", "הערות"]}
        rows={[
          ["תגמולי מעסיק", "6.5%", "חודש 7", "נשמר בחשבון נפרד על שם העובד"],
          ["פיצויי פיטורים", "6% (מינימום)", "חודש 7", "שייך לעובד בכל מקרה (סעיף 14)"],
          ["השלמת פיצויים", "עד 8.33%", "לאחר שנה", "רק בפיטורים או סיבה מזכה"],
          ["ביטוח לאומי", `${D.btl_rate}%`, "יום 1", "אסור לנכות מהשכר"],
        ]}
      />

      <Callout variant="warning" title="⚠️ אין הפקדה לקרן פנסיה רגילה">
        עובדים זרים אינם יכולים להצטרף לקרנות פנסיה (אין ת.ז. ישראלית). <strong>המעסיק חייב לשמור את הכספים בחשבון בנק נפרד או בחיסכון ייעודי על שם העובד</strong>, לנהל רישום מדויק של הצבירה, ולשלם את מלוא הסכום בסיום ההעסקה.
      </Callout>

      <SubSection title="ה. ביטוח רפואי ובריאות" />
      <CheckList items={[
        { bold: "ביטוח רפואי פרטי", text: "— חובה מיום הראשון ולכל תקופת ההעסקה" },
        { bold: "עותק פוליסה", text: "— למסור לעובד בשפה שהוא מבין" },
        { bold: "סיוע בטיפול רפואי", text: "— אם העובד חלה, המעסיק חייב לסייע לו לקבל טיפול הולם" },
        { bold: "דיווח על תאונת עבודה", text: "— חובת דיווח לרשויות ומילוי טופס 250" },
        { bold: "ניכוי ביטוח רפואי", text: `— עד ${D.deduct_insurance} ₪/חודש, או מחצית ההוצאה בפועל — לפי הנמוך` },
      ]} />

      <SubSection title="ו. מגורים ותנאי חיים" />
      <CheckList items={[
        { bold: "מגורים נאותים", text: "— חדר בבית המטופל לכל תקופת ההעסקה ולפחות 7 ימים לאחר סיומה" },
        { bold: "8 שעות מנוחה ביממה", text: "— המעסיק ישתדל לספק, בכפוף לצרכי המטופל" },
        { bold: "לא להחזיק דרכון", text: "— אסור להחזיק בדרכון העובד בניגוד לרצונו" },
        { bold: "לא למנוע תקשורת", text: "— אסור למנוע שימוש סביר בטלפון סלולרי על חשבון העובד" },
        { bold: "לא לדרוש עבודות חריגות", text: "— אסור להעסיק בבתים אחרים או בעבודות שאינן לצורכי המטופל" },
      ]} />

      <SubSection title="ז. סיום העסקה" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard icon={<AlertTriangle className="h-5 w-5 text-amber-500" />} title="הודעה מוקדמת" description="חובה לתת הודעה מוקדמת כדין, להסביר את הסיבה, ולשקול את תגובת העובד — למעט מצבי התעללות." />
        <InfoCard icon={<Shield className="h-5 w-5 text-primary" />} title="תום לב בסיום" description="המעסיק חייב לפעול בתום לב. חובות/הלוואות של העובד צריכות להיות מתועדות בכתב ובשפה שהעובד מבין." />
        <InfoCard icon={<Home className="h-5 w-5 text-primary" />} title="מגורים לאחר סיום" description="חובה לספק מגורים לעובד לפחות 7 ימים לאחר סיום ההעסקה." />
        <InfoCard icon={<DollarSign className="h-5 w-5 text-primary" />} title="תשלום מלוא הזכויות" description="בסיום — תשלום שכר, פדיון חופשה, פיצויים (אם זכאי), וכספי פנסיה/חיסכון שנצברו." />
      </div>

      <SubSection title="ח. סעיפים נוספים מקובלים (לפי הסכם פרטי)" />
      <Callout variant="info" title="סעיפים שמקורם בחוזים פרטיים — לא חובה מכוח הדין">
        הסעיפים הבאים נפוצים בחוזי העסקה והם משקפים מקובלות בענף, אך תוקפם מותנה בהכללתם בחוזה שנחתם.
      </Callout>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoCard title="מזון ומוצרי היגיינה" description="חלק מהחוזים מחייבים את המעסיק לספק מזון בכמות מספקת, מוצרי היגיינה בסיסיים ורחצה יומית." />
        <InfoCard title="סידור בעת אשפוז" description="אם המטופל מאושפז — תשלום נסיעות הלוך-שוב, מזון ושתייה לעובד הן בבית החולים והן בבית." />
        <InfoCard title="נסיעות לחו״ל עם המטופל" description="אם המעסיק דורש ליווי לחו״ל — עליו לספק ביטוח נסיעות, סיוע בויזה ואינטר-ויזה לחזרה, על חשבונו." />
        <InfoCard title="סיוע בהתגוננות אזרחית" description="סיוע לעובד ברכישת ערכת מגן לצורכי התגוננות אזרחית — אם נדרש." />
        <InfoCard title="חידוש אשרת עבודה" description="המעסיק ידאג לחידוש אשרת העבודה של העובד אם הצדדים ממשיכים לתקופה נוספת." />
        <InfoCard title="מצבי חירום" description="במצבי מלחמה, אסון או סכנה — המעסיק או נציגו חייב לספק סיוע סביר כולל העברה למקום בטוח." />
      </div>

      <SubSection title="שאלות נפוצות" />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="eo1"><AccordionTrigger>האם חייבים לספק אוכל לעובד?</AccordionTrigger>
          <AccordionContent>החוזה הסטנדרטי <strong>לא מחייב</strong> במפורש, אך מאפשר ניכוי עד 10% משכר המינימום עבור אוכל (בהסכם כתוב). חוזים פרטיים רבים כוללים חובת אספקת מזון. הנוהג המקובל — לספק.</AccordionContent></AccordionItem>
        <AccordionItem value="eo2"><AccordionTrigger>מה קורה אם המטופל נפטר?</AccordionTrigger>
          <AccordionContent><strong>מות המטופל נחשב לפיטורים</strong> — העובד זכאי לפיצויים מלאים, לתשלום כל הזכויות הצבורות, ולמגורים ל-7 ימים נוספים. על המשפחה לדווח ללשכה.</AccordionContent></AccordionItem>
        <AccordionItem value="eo3"><AccordionTrigger>האם מותר להחזיק את דרכון העובד?</AccordionTrigger>
          <AccordionContent><strong>לא, בשום מקרה.</strong> החזקת דרכון בניגוד לרצון העובד היא <strong>עבירה פלילית</strong> ויכולה להוביל להעמדה לדין. הדרכון שייך לעובד בלבד.</AccordionContent></AccordionItem>
        <AccordionItem value="eo4"><AccordionTrigger>מה קורה אם העובד נפגע בתאונת עבודה?</AccordionTrigger>
          <AccordionContent>המעסיק חייב <strong>לדווח לרשויות ולמלא טופס 250</strong>, לדאוג לטיפול רפואי הולם, ולשלם דמי מחלה. העובד זכאי לפיצוי מלא דרך ביטוח לאומי.</AccordionContent></AccordionItem>
      </Accordion>

      <SubSection title="📞 גורמים רלוונטיים" />
      <ContactGrid contacts={[
        { title: "רשות האוכלוסין", desc: "היתרי העסקה, אשרות, חידושים", phone: "*3450" },
        { title: "ממונה על זכויות עובדים זרים", desc: "שאלות על חובות וזכויות — ללא עלות", phone: "1800-354-354" },
        { title: "ביטוח לאומי", desc: "דמי ביטוח, תאונות עבודה, דיווחים", phone: "*6050" },
        { title: "הלשכה לסיוע משפטי", desc: "סיוע משפטי חינמי לזכאים", phone: "1700-706-106" },
      ]} />
    </TabsContent>
  </Tabs>
);

// ── Sub-components ──

const StyledTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto rounded-lg border border-border">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-primary text-primary-foreground">
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-3 text-right font-bold whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className={ri % 2 === 0 ? "bg-background" : "bg-muted/30"}>
            {row.map((cell, ci) => (
              <td key={ci} className={`px-4 py-3 ${ci === 0 ? "font-semibold text-foreground" : "text-primary font-medium"}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SectionHeader = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => (
  <div className="flex items-center gap-4 pb-5 border-b">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">{icon}</div>
    <div>
      <h2 className="text-xl font-extrabold">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </div>
);

const SubSection = ({ title }: { title: string }) => (
  <h3 className="text-base font-bold text-foreground pt-2">{title}</h3>
);

const Callout = ({ variant, title, children }: { variant: "info" | "warning" | "success" | "primary"; title: string; children: React.ReactNode }) => {
  const styles = {
    info: "bg-primary/5 border-primary/20",
    warning: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
    success: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800",
    primary: "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800",
  };
  const icons = {
    info: <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />,
    success: <Shield className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />,
    primary: <DollarSign className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />,
  };
  return (
    <div className={`rounded-xl border p-4 flex gap-3 ${styles[variant]}`}>
      {icons[variant]}
      <div>
        <h4 className="text-sm font-bold mb-1">{title}</h4>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
};

const ToolLink = ({ title, description, linkText, to }: { title: string; description: string; linkText: string; to: string }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-primary/20 bg-card shadow-sm">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><FileText className="h-5 w-5 text-primary" /></div>
      <div>
        <h4 className="text-sm font-bold">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
    <Link to={to} className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
      {linkText}
    </Link>
  </div>
);

const CheckList = ({ items }: { items: { bold: string; text: string }[] }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-sm">
        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <span><strong>{item.bold}</strong> {item.text}</span>
      </li>
    ))}
  </ul>
);

const InfoCard = ({ icon, title, description, footer }: { icon?: React.ReactNode; title: string; description: string; footer?: string }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-4 space-y-2">
      {icon && <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">{icon}</div>}
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      {footer && <p className="text-xs font-semibold text-primary">{footer}</p>}
    </CardContent>
  </Card>
);

const StatCard = ({ title, value, desc }: { title: string; value: string; desc: string }) => (
  <Card className="border-t-2 border-t-primary">
    <CardContent className="p-4">
      <h4 className="text-xs font-bold text-primary mb-1">{title}</h4>
      <div className="text-2xl font-extrabold mb-1">{value}</div>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </CardContent>
  </Card>
);

const ContactGrid = ({ contacts }: { contacts: { title: string; desc: string; phone?: string }[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {contacts.map((c, i) => (
      <Card key={i}>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <h4 className="text-sm font-bold">{c.title}</h4>
          </div>
          <p className="text-xs text-muted-foreground">{c.desc}</p>
          {c.phone && <a href={`tel:${c.phone}`} className="text-base font-extrabold text-primary block" dir="ltr">{c.phone}</a>}
        </CardContent>
      </Card>
    ))}
  </div>
);

export default Rights;
