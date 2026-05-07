export interface SubModule {
  id: string;
  title: string;
  description: string;
}

export interface Module {
  id: string;
  title: string;
  partTitle: string;
  partNumber: number;
  description: string;
  icon: string;
  subModules: SubModule[];
}

export const modules: Module[] = [
  // פרק 1: מבוא – המציאות החדשה
  {
    id: "chapter-1",
    title: "מבוא – המציאות החדשה",
    partTitle: "המציאות החדשה",
    partNumber: 1,
    description: "הגדרת התפקיד, דינמיקה משפחתית והיבטים תרבותיים",
    icon: "Eye",
    subModules: [
      { id: "1.1", title: "הגדרת מטפל משפחתי והיקף התופעה", description: "מיהו מטפל משפחתי, נתונים בישראל ומודל גישור גריאטרי" },
      { id: "1.2", title: "זיהוי שינויים קוגניטיביים מוקדם", description: "ההבדל בין שכחה טבעית לדמנציה וסימני אזהרה מוקדמים" },
      { id: "1.3", title: "נורות אזהרה בבית", description: "צ'ק־ליסט התנהגויות מסוכנות, בטיחות ומניעת נפילות" },
      { id: "1.4", title: "הערכה רפואית ראשונית", description: "פנייה לרופא משפחה, הערכה גריאטרית מקיפה ומבחנים קוגניטיביים" },
      { id: "1.5", title: "הדינמיקה המשפחתית", description: "קונפליקטים בין אחים, שוויון מול הוגנות ופרוטוקול תקשורת" },
      { id: "1.6", title: "היבטים תרבותיים ודתיים", description: "כבוד הזקן בתרבויות שונות ודילמות בהחלטות רפואיות" },
    ],
  },
  // פרק 2: אבחון רפואי וטיפול
  {
    id: "chapter-2",
    title: "אבחון רפואי וטיפול",
    partTitle: "רפואה ובריאות",
    partNumber: 2,
    description: "תהליך אבחון, מחלות נפוצות וניהול טיפול רפואי",
    icon: "Stethoscope",
    subModules: [
      { id: "2.1", title: "תהליך האבחון", description: "מסלול אבחון טיפוסי, סקר קוגניטיבי והערכה גריאטרית מקיפה (CGA)" },
      { id: "2.2", title: "סוגי דמנציה", description: "אלצהיימר, וסקולרית, לואי ופרונטו-טמפורלית – מאפיינים ושכיחות" },
      { id: "2.3", title: "מחלת פרקינסון", description: "תסמינים מוטוריים ולא-מוטוריים, טיפול תרופתי והתאמות" },
      { id: "2.4", title: "מחלות כרוניות נוספות", description: "סוכרת, לחץ דם, אוסטאופורוזיס, דיכאון גריאטרי ודליריום" },
      { id: "2.5", title: "ניהול תרופתי מורכב", description: "מניעת טעויות, תיאום בין רופאים וכלים טכנולוגיים" },
    ],
  },
  // פרק 3: התמודדות עם דמנציה
  {
    id: "chapter-3",
    title: "התמודדות עם דמנציה",
    partTitle: "התמודדות עם דמנציה",
    partNumber: 3,
    description: "שלבי הדמנציה, תקשורת תומכת, ניהול BPSD, פעילויות ושימור איכות חיים",
    icon: "Brain",
    subModules: [
      { id: "3.1", title: "שלבי הדמנציה והשלכותיהם", description: "שלב מוקדם, בינוני ומתקדם – מאפיינים, צרכים והתאמות" },
      { id: "3.2", title: "תקשורת תומכת", description: "טכניקות להפחתת BPSD, שפה פשוטה, קשר עין ואלגוריתם הרגעה" },
      { id: "3.3", title: "ניהול התנהגויות מאתגרות (BPSD)", description: "שיטת ABC, נדודים, תוקפנות, הזיות ו-Sundowning" },
      { id: "3.4", title: "פעילויות ושימור איכות חיים", description: "כושר וקוגניציה, גירוי חושי, פעילויות משמעותיות ובנק פעילויות מדורג" },
    ],
  },
  // פרק 4: תשתית משפטית
  {
    id: "chapter-4",
    title: "תשתית משפטית",
    partTitle: "תשתית משפטית",
    partNumber: 4,
    description: "צוואה, ייפוי כוח מתמשך, אפוטרופסות, חשבונות בנק והנחיות רפואיות",
    icon: "Scale",
    subModules: [
      { id: "4.1", title: "עריכת צוואה", description: "סוגי צוואות, מה לכלול ומתי לעדכן" },
      { id: "4.2", title: "ייפוי כוח מתמשך", description: "שלושת התחומים, עלויות, הפקדה וכניסה לתוקף" },
      { id: "4.3", title: "אפוטרופסות", description: "מתי נדרשת, תהליך המינוי וההבדל מייפוי כוח" },
      { id: "4.4", title: "הסדרת חשבונות בנק", description: "שותף בחשבון, סעיף אריכות ימים ורשימת נכסים" },
      { id: "4.5", title: "הנחיות רפואיות מקדימות", description: "צוואה בחיים, ייפוי כוח רפואי ותוקף ההנחיות" },
    ],
  },
  // פרק 5: זכויות וגמלת סיעוד
  {
    id: "chapter-5",
    title: "זכויות וגמלת סיעוד",
    partTitle: "זכויות וגמלת סיעוד",
    partNumber: 5,
    description: "תנאי זכאות, רמות גמלה, סל שירותים, הגשת תביעה וזכויות מיוחדות",
    icon: "Shield",
    subModules: [
      { id: "5.1", title: "תנאי זכאות לגמלת סיעוד", description: "גיל, תושבות, מגורים, צורך בעזרה ומבחן הכנסות" },
      { id: "5.2", title: "מבחן התלות (ADL) וביקור מעריך", description: "פעולות יום-יום שנבדקות והכנה לביקור" },
      { id: "5.3", title: "רמות הגמלה ושעות שבועיות", description: "6 רמות מ-5.5 ועד 30 שעות שבועיות" },
      { id: "5.4", title: "צורת קבלת הגמלה וסל השירותים", description: "בעין, בכסף או שילוב – ומה כולל הסל" },
      { id: "5.5", title: "הגשת התביעה", description: "מסמכים, מסלולי הגשה וטיפים למניעת טעויות" },
      { id: "5.6", title: "זכויות מיוחדות וערעור", description: "ניצולי שואה, נכי צה\"ל, ביטוח פרטי ומנגנון ערעור" },
      { id: "5.7", title: "הוצאות רפואיות וזיכוי מס", description: "טופס 17, זיכוי בגין החזקת קרוב במוסד ונקודות זיכוי" },
      { id: "5.8", title: "ביטוח סיעוד פרטי vs לאומי", description: "הגדרות שונות, סכומי גמלה וכדאיות תביעה כפולה" },
      { id: "5.9", title: "מימון הטיפול ממקורות נוספים", description: "חסכונות, מכירת נכסים, הלוואות וקרנות צדקה" },
    ],
  },
  // פרק 6: כוח אדם וטכנולוגיה
  {
    id: "chapter-6",
    title: "כוח אדם וטכנולוגיה לטיפול בבית",
    partTitle: "כוח אדם וטכנולוגיה",
    partNumber: 6,
    description: "חברות סיעוד, העסקת עובד זר, ניהול הקשר, שירותים קהילתיים וטכנולוגיה מסייעת",
    icon: "Users",
    subModules: [
      { id: "6.1", title: "חברות סיעוד ותאגידי כוח אדם", description: "תפקידים, עלויות וקריטריונים לבחירה" },
      { id: "6.2", title: "העסקת עובד/ת זר/ה", description: "תנאי היתר, עלויות חודשיות, זכויות והעסקת בן משפחה" },
      { id: "6.3", title: "ניהול הקשר עם העובד/ת", description: "תיאום ציפיות, מצלמות, הסכמים בכתב ותשלומים" },
      { id: "6.4", title: "שמירה על כבוד ויחסי עבודה", description: "פידבק, הסלמה, סימני אזהרה, פיטורים ותמיכה בעובד" },
      { id: "6.5", title: "שירותים קהילתיים וטכנולוגיה", description: "מרכזי יום, קהילה תומכת, לחצני מצוקה וטכנולוגיה חכמה" },
      { id: "6.6", title: "העסקת עובד/ת זר/ה מחליף/ה", description: "מחליף בתקופת חופשת העובד הקבוע — תנאים, שכר, טפסים וכלי דיגיטלי" },
    ],
  },
  // פרק 7: היבטים קליניים והטיפול הביתי
  {
    id: "chapter-7",
    title: "היבטים קליניים",
    partTitle: "היבטים קליניים",
    partNumber: 7,
    description: "מניעת פצעי לחץ, תזונה והידרציה, ניהול הפרשות ורפואת שיניים/שמיעה/ראייה",
    icon: "Heart",
    subModules: [
      { id: "7.1", title: "מניעת פצעי לחץ", description: "פרוטוקול מניעה, שינוי תנוחות, זיהוי מוקדם וטיפול בפצע" },
      { id: "7.2", title: "תזונה והידרציה", description: "מעקב תזונתי, דיספגיה, מניעת התייבשות ותת-תזונה" },
      { id: "7.3", title: "ניהול הפרשות", description: "בריחת שתן/צואה, התאמת עזרים, היגיינה ופניה רפואית" },
      { id: "7.4", title: "רפואת שיניים, שמיעה וראייה", description: "טיפול מונע, התאמת מכשירים ומימון בסל הבריאות" },
    ],
  },
  // פרק 8: ניהול הטיפול
  {
    id: "chapter-8",
    title: "ניהול הטיפול",
    partTitle: "ניהול הטיפול",
    partNumber: 8,
    description: "חברות סיעוד, העסקת עובד זר, ניהול הקשר, שירותים קהילתיים וטכנולוגיה מסייעת",
    icon: "Users",
    subModules: [
      { id: "8.1", title: "חברות סיעוד vs תאגידי כוח אדם", description: "הבדלים, אחריות, עלויות ומתי לבחור בכל אחת" },
      { id: "8.2", title: "בחירת ספק שירות", description: "קריטריונים, זכויות, מסמכים וטיפים לבחירה נכונה" },
      { id: "8.3", title: "העסקת עובד/ת זר/ה", description: "תנאי זכאות, תהליך שלב אחר שלב, שכר וניכויים" },
      { id: "8.4", title: "העסקת בן משפחה בתשלום", description: "יתרונות, אתגרים, תנאים והסדרה מול הביטוח הלאומי" },
      { id: "8.5", title: "שירותים קהילתיים תומכים", description: "מרכזי יום, קהילה תומכת ואשפוז בית" },
      { id: "8.6", title: "טכנולוגיה מסייעת ובטיחות בבית", description: "לחצני חירום, בית חכם, ניהול תרופות חכם" },
      { id: "8.7", title: "ניהול הקשר עם העובד/ת הזר/ה", description: "קליטה, תיאום ציפיות, מצלמות, הסכמים, פיטורים ותמיכה" },
      { id: "8.8", title: "מסמכים וטפסים נדרשים", description: "ערכת מסמכים מומלצת לניהול מקצועי של ההעסקה" },
    ],
  },
  // פרק 9: חלופות מגורים ואשפוז
  {
    id: "chapter-9",
    title: "חלופות מגורים ואשפוז",
    partTitle: "חלופות מגורים ואשפוז",
    partNumber: 9,
    description: "מתי לשקול מעבר, סוגי מסגרות, מימון, תהליך הבחירה, התמודדות עם התנגדות, אשפוז ושיקום, קליטה ושיחת משפחה",
    icon: "Building",
    subModules: [
      { id: "9.1", title: "מתי לשקול מעבר מהבית", description: "סימנים מרכזיים: ירידה תפקודית, סיכון בטיחותי, עומס על המטפלים" },
      { id: "9.2", title: "סוגי מסגרות מגורים", description: "דיור מוגן, בית אבות, מוסד סיעודי, אשפוז גריאטרי ושיקומי" },
      { id: "9.3", title: "זכאות ומימון", description: "משרד הבריאות (קוד), משרד הרווחה, משרד הביטחון וגמלת סיעוד" },
      { id: "9.4", title: "תהליך הבחירה וביקורים", description: "מאגרים רשמיים, ביקור איכות, קריטריונים להשוואה" },
      { id: "9.5", title: "התמודדות עם התנגדות ההורה", description: "עקרונות שיחה, תסריטים מוכנים ו׳אמת טיפולית׳ בדמנציה" },
      { id: "9.6", title: "מסלול מעבר מעשי וקליטה", description: "צ׳ק-ליסט כרונולוגי, חוזה ועלויות, תיק מידע לצוות והסתגלות" },
      { id: "9.7", title: "שיחת משפחה וחלוקת תפקידים", description: "פרוטוקול החלטה, חלוקה הוגנת, תקציב ומניעת קונפליקטים" },
      { id: "9.8", title: "תרחישים: אשפוז, שיקום וחזרה", description: "אשפוז חריף, שיקום, שחרור הביתה מול מסגרת, שאלות קריטיות" },
      { id: "9.9", title: "מימון מפורט ומסלולים", description: "קוד משרד הבריאות, משרד הרווחה, מענק ביטחון, גמלת סיעוד במוסד" },
      { id: "9.10", title: "טפסים וכלי עבודה", description: "רשימת בדיקה למוסד, טופס השוואה, תיק מידע לצוות, תקציב חודשי" },
      { id: "9.11", title: "הוספיס בית", description: "טיפול פליאטיבי בבית — זכויות, קריטריונים, השוואת קופות, תהליך הצטרפות והנחיות מקדימות" },
      { id: "9.12", title: "מה עושים לאחר פטירה", description: "מדריך מלא: שעות ראשונות, רישיון קבורה, תעודת פטירה, שבעה, מענק פטירה, קצבת שאירים, ירושה ועיזבון" },
    ],
  },
  // פרק 10: רווחת המטפל
  {
    id: "chapter-10",
    title: "רווחת המטפל",
    partTitle: "רווחת המטפל",
    partNumber: 10,
    description: "זיהוי שחיקה, קבוצות תמיכה, זכויות בעבודה, טיפול עצמי, מוקדי סיוע, שגרה מומלצת, תכנית גיבוי וחלוקת תפקידים",
    icon: "HeartHandshake",
    subModules: [
      { id: "10.1", title: "תסמונת השחיקה (Burnout)", description: "סימנים פיזיים, רגשיים והתנהגותיים, גורמי סיכון וקו אדום" },
      { id: "10.2", title: "קבוצות תמיכה למטפלים", description: "יד לתומך, CareGivers Israel, קבוצות ביטוח לאומי וקהילות מקוונות" },
      { id: "10.3", title: "זכויות המטפל בעבודה", description: "ימי מחלה לטיפול בהורה, התאמות בעבודה וזכויות נוספות" },
      { id: "10.4", title: "טיפול עצמי (Self-care)", description: "מינימום יומי, רזרבה שבועית, הצבת גבולות וטיפול מקצועי" },
      { id: "10.5", title: "מרכזי ייעוץ ומוקדים חשובים", description: "מוקד *8840, מרכזי ייעוץ משרד הבריאות, עזרה ראשונה נפשית" },
      { id: "10.6", title: "שגרה מומלצת למטפל/ת", description: "3 רמות עומס, לו״ז שבועי לדוגמה ועוגנים יומיים" },
      { id: "10.7", title: "תכנית גיבוי (Plan B)", description: "מתי מפעילים, 3 דרגות הקלה וכרטיס חירום למטפל" },
      { id: "10.8", title: "חלוקת תפקידים וטפסים", description: "חלוקת אחריות במשפחה, לוח שבועי, טופס Plan B ומשפטי גבולות" },
    ],
  },
  // פרק 11: פרידה וסוף החיים
  {
    id: "chapter-11",
    title: "סוף החיים",
    partTitle: "סוף החיים",
    partNumber: 11,
    description: "סידורים מיידיים לאחר פטירה, קבורה, גמר חשבון, מימוש צוואה וניהול עיזבון",
    icon: "Heart",
    subModules: [
      { id: "11.1", title: "השעות הראשונות – מה עושים מיד", description: "הודעה על פטירה, רישיון קבורה והודעה למשפחה" },
      { id: "11.2", title: "סידור הקבורה", description: "בחירת קבר, תיאום הלוויה ופרסום הודעות" },
      { id: "11.3", title: "גמר חשבון עם עובד/ת זר/ה", description: "זכויות עובד, תשלומים והודעות לגורמים" },
      { id: "11.4", title: "הודעות לגורמים פיננסיים", description: "ביטוח לאומי, בנקים, קופות חולים וספקים" },
      { id: "11.5", title: "שבעה ומסורת", description: "ארגון לוגיסטי, חלוקת תפקידים וגבולות בריאים" },
      { id: "11.6", title: "הפרדה: קבורה vs ירושה", description: "מה מיידי ומה דורש צו, הקלסר המשפחתי" },
      { id: "11.7", title: "מענק קבורה/פטירה", description: "דמי קבורה, מענק פטירה ותנאי זכאות" },
      { id: "11.8", title: "האם יש צוואה?", description: "חיפוש בבית, בדיקה ברשם הירושות ופנייה לעו\"ד" },
      { id: "11.9", title: "צו קיום צוואה", description: "הליך הגשה, מסמכים נדרשים, לוחות זמנים והתנגדויות" },
      { id: "11.10", title: "צו ירושה – ללא צוואה", description: "סדר הירושה לפי חוק, הגשה מקוונת והסתלקות" },
      { id: "11.11", title: "ניהול העיזבון", description: "מינוי מנהל, משימות, מיפוי נכסים וחובות, מיסוי" },
      { id: "11.12", title: "מניעת סכסוכים בין יורשים", description: "שקיפות, דוחות חודשיים, גישור והסכם חלוקה" },
    ],
  },
];

export interface ChecklistItem {
  text: string;
  toolId?: string;
  toolLabel?: string;
  externalUrl?: string;
  serviceLink?: boolean; // links to /services or /ad-elai
  servicePath?: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  icon: string;
  items: ChecklistItem[];
}

export const checklistItems: ChecklistCategory[] = [
  {
    id: "legal",
    title: "סידורים משפטיים",
    icon: "FileText",
    items: [
      { text: "בדיקת ייפוי כוח מתמשך — האם קיים? האם תקף?", toolId: "poa-guide", toolLabel: "מדריך ייפוי כוח" },
      { text: "בדיקת צוואה — האם מעודכנת?", toolId: "will-template", toolLabel: "כלי כתיבת צוואה" },
      { text: "בדיקת אפוטרופסות — האם נדרשת?" },
      { text: "הסדרת חשבונות בנק — גישה ומורשי חתימה" },
      { text: "איסוף ושמירת מסמכים חשובים במקום אחד" },
      { text: "בדיקת פוליסת ביטוח סיעודי פרטי — מה מכוסה?" },
      { text: "תיעוד רצונות בכתב ובווידאו למי שלא עורך ייפוי כוח", toolId: "life-compass", toolLabel: "מצפן חיים" },
      { text: "הסדרת ייפוי כוח רפואי מתמשך" },
    ],
  },
  {
    id: "insurance",
    title: "ביטוח לאומי וזכויות",
    icon: "Shield",
    items: [
      { text: "בדיקת זכאות לגמלת סיעוד", toolId: "nursing-claim-guide", toolLabel: "מדריך תביעת סיעוד" },
      { text: "הגשת תביעה לביטוח לאומי" },
      { text: "פתיחת תיק מעסיק בביטוח לאומי (אם מעסיקים מטפל/ת)" },
      { text: "דיווח ותשלום חודשי לביטוח לאומי כמעסיק" },
      { text: "בדיקת זכויות נוספות (ניצולי שואה, נכי צה\"ל, קצבת שירותים מיוחדים)" },
      { text: "בדיקת ביטוח סיעודי פרטי — מימוש מול חברת הביטוח" },
      { text: "מימוש הנחות ופטורים — ארנונה, תרופות, עזרי ניידות" },
      { text: "בדיקת זכאות להחזר מס על הוצאות סיעוד (סעיף 44)" },
      { text: "בדיקת זכאות להשתתפות בשכר דירה (דיור ציבורי)" },
    ],
  },
  {
    id: "safety",
    title: "בטיחות בבית",
    icon: "Home",
    items: [
      { text: "התקנת מוטות אחיזה בחדר אמבטיה ובשירותים", servicePath: "/ad-elai", serviceLink: true, toolLabel: "ספקי ציוד" },
      { text: "הסרת שטיחונים מחליקים ומכשולים" },
      { text: "תאורה מספקת בכל החדרים ובמעברים" },
      { text: "סידור מסלולי הליכה נקיים ממכשולים" },
      { text: "התקנת כפתור מצוקה / שעון חירום / לחצן SOS", servicePath: "/ad-elai", serviceLink: true, toolLabel: "ספקי ציוד" },
      { text: "התאמת גובה מיטה וכיסא לצרכי ההורה" },
      { text: "בדיקת מערכת גז, חשמל וגלאי עשן" },
      { text: "שקילת כסא רחצה / כסא גלגלים לבית", servicePath: "/give-take", serviceLink: true, toolLabel: "לוח קח ותן" },
      { text: "התקנת מעלון / רמפה אם יש מדרגות", servicePath: "/ad-elai", serviceLink: true, toolLabel: "ספקי ציוד" },
    ],
  },
  {
    id: "medical",
    title: "ניהול רפואי",
    icon: "Heart",
    items: [
      { text: "עדכון רשימת תרופות מלאה", toolId: "med-tracker", toolLabel: "ניהול ומעקב תרופות" },
      { text: "קביעת רופא אחראי / גריאטר" },
      { text: "תיאום בין רופאים מטפלים" },
      { text: "סידור קופסת תרופות שבועית" },
      { text: "שמירת סיכומי אשפוז ובדיקות במקום מרכזי", toolId: "blue-folder", toolLabel: "תיק כחול דיגיטלי" },
      { text: "רישום לתיק רפואי דיגיטלי בקופת החולים" },
      { text: "בדיקת אינטראקציות בין תרופות עם הרוקח" },
      { text: "קביעת לוח זמנים לבדיקות תקופתיות", toolId: "printable-calendar", toolLabel: "לוח חודשי להדפסה" },
      { text: "הכנת כרטיס מטופל למצבי חירום — תרופות, אבחנות ואנשי קשר", toolId: "emergency-protocol", toolLabel: "פרוטוקול חירום" },
    ],
  },
  {
    id: "family",
    title: "ארגון משפחתי",
    icon: "Users",
    items: [
      { text: "שיחת משפחה על חלוקת תפקידים", toolId: "family-sync", toolLabel: "סנכרון טיפול משפחתי" },
      { text: "קביעת איש קשר ראשי מול גורמים רפואיים" },
      { text: "הקמת קבוצת WhatsApp משפחתית לעדכונים" },
      { text: "תכנון תקציב טיפול משותף", toolId: "expense-tracker", toolLabel: "ניהול הוצאות" },
      { text: "תיאום לוחות זמנים לביקורים וסיוע" },
      { text: "מינוי 'מנהל טיפול' מרכזי במשפחה" },
      { text: "הגדרת שגרת עדכון שבועית בין בני המשפחה" },
    ],
  },
  {
    id: "caregiver-management",
    title: "ניהול מטפל/ת שכיר/ה",
    icon: "Users",
    items: [
      { text: "הכנה לראיון עובד/ת זר/ה — שאלות מומלצות ונקודות לבדיקה", toolId: "interview-manager", toolLabel: "ניהול ראיון לעובד זר" },
      { text: "בחירת מודל העסקה — תאגיד / חברת סיעוד / מטפל פרטי" },
      { text: "חתימה על חוזה העסקה תקני", toolId: "contract-explanation", toolLabel: "מדריך חוזה העסקה" },
      { text: "ביצוע חפיפה בבית — שגרה, תרופות, כללי בית" },
      { text: "הסדרת גיבוי להיעדרות / חופשה / עזיבה פתאומית" },
      { text: "הגדרת תאום ציפיות בכתב", toolId: "expectations-alignment", toolLabel: "תאום ציפיות" },
      { text: "חישוב שכר ריאלי כולל זכויות סוציאליות", toolId: "salary-calculator", toolLabel: "מחשבון שכר" },
      { text: "בדיקת זכויות עובד זר — שכר, חופשות, פנסיה ופיצויים", toolId: "foreign-worker-rights", toolLabel: "זכויות עובד זר" },
      { text: "בחירת ימי חג שנתיים לעובד/ת", toolId: "holiday-selector", toolLabel: "בחירת ימי חג" },
      { text: "הכנת חדר מגורים מתאים לעובד/ת (אם רלוונטי)" },
    ],
  },
  {
    id: "financial-planning",
    title: "תכנון כספי",
    icon: "FileText",
    items: [
      { text: "בניית תקציב חודשי משוער — מטפל, תרופות, ציוד, נסיעות", toolId: "expense-tracker", toolLabel: "ניהול הוצאות" },
      { text: "הגדרת מי אחראי על תשלומים שוטפים" },
      { text: "פתיחת תיק קבלות והוצאות לצורך תביעות ביטוח" },
      { text: "בדיקת זכאות להחזרי מס בגין הוצאות סיעוד" },
      { text: "בדיקת זכאות למענק עבודה / הנחות עירוניות" },
      { text: "תכנון פנסיוני — בדיקת חסכונות, ביטוחים, קצבאות" },
    ],
  },
  {
    id: "advance-directives",
    title: "הנחיות רפואיות מקדימות",
    icon: "Heart",
    items: [
      { text: "שיחה עם הקשיש/ה על רצונות רפואיים ואיכות חיים" },
      { text: "הסדרת ייפוי כוח רפואי מתמשך", toolId: "poa-guide", toolLabel: "מדריך ייפוי כוח" },
      { text: "רישום הנחיות רפואיות מקדימות דרך משרד הבריאות", externalUrl: "https://www.health.gov.il/Subjects/RightsInsured/RightsUnderLaw/Pages/Advanced_directives.aspx", toolLabel: "אתר משרד הבריאות" },
      { text: "תיעוד רצונות בכתב ובווידאו (למי שלא עורך ייפוי כוח)", toolId: "life-compass", toolLabel: "מצפן חיים" },
      { text: "שיחה על העדפות סוף חיים — אשפוז, הנשמה, טיפול פליאטיבי" },
      { text: "שיתוף בני המשפחה ברצונות שנרשמו" },
    ],
  },
];

export const digitalTools = [
  {
    id: "salary-calculator",
    title: "מחשבון שכר עובד זר (Hub2Care)",
    description: "כלי לחישוב שכר חודשי, תשלומים והוצאות העסקת עובד זר לתקופת ההעסקה, כולל חישוב גמר חשבון",
    icon: "Calculator",
    isPaid: false,
    isInternal: true,
    toolUrl: "/salary-calculator",
  },
  {
    id: "expense-tracker",
    title: "ניהול הוצאות הטיפול",
    description: "מערכת לניהול ומעקב הוצאות הטיפול בבית המטופל, עם הפקת דוחות לכמה מבני המשפחה",
    icon: "Wallet",
    isPaid: false,
    toolUrl: "https://elder-support-ledger.lovable.app/",
  },
  {
    id: "nursing-claim-guide",
    title: "מדריך להגשת תביעת סיעוד",
    description: "מדריך שלב אחר שלב להגשת תביעת סיעוד, עם איסוף מסמכים והפקת דוח מוכנות",
    icon: "ShieldCheck",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/harel-siud-guide/",
  },
  {
    id: "final-settlement-calc",
    title: "מחשבון גמר חשבון",
    description: "כלי לחישוב גמר חשבון עם עובד זר – פיצויים, חופשה, הבראה וזכויות סיום",
    icon: "Receipt",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/gamar-cheshbon/",
  },
  {
    id: "expectations-alignment",
    title: "תאום ציפיות עם עובד זר",
    description: "טופס תאום ציפיות עם עובד זר בכמה שפות, לניסוח והפקת מסמך מוסכם",
    icon: "Handshake",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/careagree/",
  },
  {
    id: "family-sync",
    title: "סינכרון הטיפול המשפחתי",
    description: "מערכת לתכנון מטלות וחלוקת תפקידים במשפחה המטפלת",
    icon: "RefreshCw",
    isPaid: false,
    toolUrl: "https://familycaresync.lovable.app/",
  },
  {
    id: "contract-explanation",
    title: "מדריך לחוזה העסקת עובד זר",
    description: "כלי להערכה עצמית, הבנת היבטים חשובים והכנה לחתימה על חוזה העסקת עובד זר",
    icon: "Briefcase",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/caregiver-agreement/",
  },
  {
    id: "daily-care",
    title: "מעקב ודיווח יומי",
    description: "מערכת מעקב ודיווח יומי על משימות הטיפול ומצבי המטופל בעברית ובאנגלית",
    icon: "ClipboardList",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/Daily-monitoring/",
  },
  {
    id: "holiday-selector",
    title: "בחירת ימי חג לעובד זר",
    description: "כלי לבחירת 9 ימי חג שנתיים לעובד זר והדפסתם",
    icon: "CalendarDays",
    isPaid: false,
    toolUrl: "https://holiday-helper-multilingual.lovable.app/",
  },
  {
    id: "will-template",
    title: "כתיבת צוואה",
    description: "כלי לניסוח טיוטת צוואה (עדים / הדדית) עם הדרכה שלב אחר שלב",
    icon: "FileSignature",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/will-builder/",
  },
  {
    id: "poa-guide",
    title: "מדריך לייפוי כוח מתמשך",
    description: "מדריך אינטראקטיבי להכנת ייפוי כוח מתמשך עם הסבר, הדגמה והפקת טיוטה",
    icon: "BookOpen",
    isPaid: false,
    toolUrl: "https://yipuy-koach-iota.vercel.app/",
  },
  {
    id: "nursing-code-calculator",
    title: "מחשבון קוד סיעודי",
    description: "כלי של משרד הבריאות להערכת רמת הסיעוד וגובה ההשתתפות העצמית",
    icon: "Calculator",
    isPaid: false,
    isExternal: true,
    externalUrl: "https://me.health.gov.il/nursing-calculator/",
  },
  {
    id: "life-compass",
    title: "מצפן חיים",
    description: "כלי לתיעוד רצונות בכתב ובווידאו – למי שלא עושה ייפוי כוח מתמשך. אינו מהווה מסמך משפטי מחייב.",
    icon: "Compass",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/Matzpen-chaim/",
  },
  {
    id: "med-tracker",
    title: "ניהול ומעקב מתן תרופות",
    description: "מערכת מעקב יומי למתן תרופות – הגדרת תרופות, סימון מתן, לוח שנה, דוחות ושליחה לבני משפחה",
    icon: "ClipboardList",
    isPaid: false,
    toolUrl: "/med-tracker",
    isInternal: true,
  },
  {
    id: "blue-folder",
    title: "תיק כחול",
    description: "ניהול כל המסמכים והתשלומים במקום אחד – תיק דיגיטלי מסודר למשפחה המטפלת",
    icon: "FolderOpen",
    isPaid: false,
    toolUrl: "https://effulgent-liger-ffb340.netlify.app/",
  },
  {
    id: "emergency-protocol",
    title: "פרוטוקול חירום",
    description: "כרטיס מטופל דיגיטלי – מצב רפואי, תפקודי ונתונים חיוניים למצב חירום",
    icon: "ShieldAlert",
    isPaid: false,
    toolUrl: "https://astonishing-pony-0b9a51.netlify.app/",
  },
  {
    id: "caregiver-communicator",
    title: "תקשורת מטפל-מטופל",
    description: "כלי תקשורת חזותי בין מטפל למטופל כשיש קשיי שפה — תמונות, סמלים ומשפטים מוכנים בכמה שפות",
    icon: "Handshake",
    isPaid: false,
    toolUrl: "https://effortless-empanada-30cdf9.netlify.app/",
  },
  {
    id: "printable-calendar",
    title: "לוח חודשי להדפסה",
    description: "עריכה והדפסה של לוח חודשי עברי-לועזי עם אירועים, תזכורות ומידע חשוב",
    icon: "CalendarDays",
    isPaid: false,
    toolUrl: "/printable-calendar",
    isInternal: true,
  },
  {
    id: "interview-manager",
    title: "ניהול ראיון לגיוס עובד זר",
    description: "כלי להכנה וניהול ראיון עבודה עם מועמד/ת לתפקיד מטפל/ת – שאלות מומלצות, הערכה ותיעוד",
    icon: "ClipboardList",
    isPaid: false,
    toolUrl: "/tools/interview-manager.html",
  },
  {
    id: "foreign-worker-rights",
    title: "זכויות עובד זר – מחשבון ומדריך",
    description: "כלי אינטראקטיבי לבדיקת זכויות עובד זר בסיעוד — שכר, חופשות, פנסיה, פיצויים ועוד",
    icon: "ShieldCheck",
    isPaid: false,
    toolUrl: "https://charming-duckanoo-b30851.netlify.app/",
  },
  {
    id: "worker-guide",
    title: "מדריך לעובד זר חדש",
    description: "כלי שמסביר לעובד הזר כל מה שצריך לדעת בהגיעו לארץ — זכויות, חובות, שגרה, תרבות ושפה",
    icon: "BookOpen",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/worker-guide/",
  },
  {
    id: "disability-tag-guide",
    title: "מדריך להוצאת תו נכה לקשיש לא נייד",
    description: "מדריך אינטראקטיבי שלב אחר שלב להוצאת תו חניה לנכה עבור קשיש מוגבל בניידות — תנאי זכאות, מסמכים נדרשים והגשת הבקשה",
    icon: "ShieldCheck",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/tav-neche/",
  },
  {
    id: "caregiver-replacement",
    title: "חוזה להעסקת עובד/ת מחליף/ה",
    description: "כלי להכנה והפקה של חוזה להעסקת עובד/ת מחליף/ה בתקופת חופשת העובד/ת הקבוע/ה — תנאים, שכר יומי, מנוחה ואישור גמר תקופה",
    icon: "FileSignature",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/caregiver-replacement/",
  },
  {
    id: "medicine-manager",
    title: "תרופות – תזכורות ומעקב כולל תמונות לזיהוי",
    description: "כלי לניהול תרופות מרובות — תזכורות, תיעוד נטילה ותמונות לזיהוי חזותי של כל תרופה (חיוני להפחתת טעויות ולפיקוח על המטפל)",
    icon: "ClipboardList",
    isPaid: false,
    toolUrl: "https://ronithantis.github.io/medicine-manager/",
  },
];