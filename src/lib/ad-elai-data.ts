// All data for the Ad Elai (עד אלי) native services & equipment directory

export interface Provider {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  region: string;
  rating: number;
  reviewCount: number;
  phone: string;
  recommended: boolean;
  truvifyVerified: boolean;
  serviceTags?: string[];
  type: "service" | "equip";
  badge?: string; // e.g. "אספקה שוטפת"
}

export const regions = [
  "צפון",
  "חיפה והקריות",
  "מרכז – גוש דן",
  "שרון",
  "ירושלים והסביבה",
  "שפלה",
  "דרום",
  "נגב",
  "כל הארץ (משלוח)",
];

export const serviceCategories = [
  { id: "all", label: "כל הקטגוריות" },
  { id: "בריאות", label: "טיפול רפואי" },
  { id: "סיעוד", label: "סיעוד ואחיות" },
  { id: "יופי", label: "יופי וטיפוח" },
  { id: "בית", label: "שירותי בית" },
  { id: "תחזוקה", label: "תחזוקה ותיקונים" },
  { id: "ליווי", label: "ליווי וסיוע" },
  { id: "תזונה", label: "ארוחות מוכנות" },
  { id: "אחר", label: "אחר" },
];

export const equipCategories = [
  { id: "all", label: "כל הציוד" },
  { id: "היגיינה", label: "היגיינה וסניטציה" },
  { id: "חירום", label: "מערכות חירום" },
  { id: "ניידות", label: "ניידות ונגישות" },
  { id: "תזונה", label: "ארוחות ותזונה" },
  { id: "טכנולוגיה", label: "טכנולוגיה סיעודית" },
  { id: "אחר-ציוד", label: "אחר" },
];

export const serviceProviders: Provider[] = [
  {
    id: "s1",
    name: "מרים לוי – אחות סיעודית",
    category: "סיעוד",
    categoryLabel: "סיעוד ואחיות",
    description: "טיפול רפואי מקצועי בבית ובקהילה, זמינות 24/7 למצבי חירום",
    region: "מרכז – גוש דן",
    rating: 5,
    reviewCount: 42,
    phone: "NURSES-1-800",
    recommended: true,
    truvifyVerified: true,
    serviceTags: ["החלפת קטטר", "מתן עירוי", "טיפול בפצעי לחץ", "מדידת לחץ דם", "ניהול תרופות"],
    type: "service",
  },
  {
    id: "s2",
    name: 'ד"ר ישראל כהן – פיזיותרפיה',
    category: "בריאות",
    categoryLabel: "טיפול רפואי",
    description: "פיזיותרפיה, ריפוי בעיסוק וטיפולים בבית או במרפאה",
    region: "צפון",
    rating: 4.9,
    reviewCount: 38,
    phone: "THERAPY-1-800",
    recommended: true,
    truvifyVerified: true,
    type: "service",
  },
  {
    id: "s3",
    name: "מרכז סיוע ירושלים",
    category: "ליווי",
    categoryLabel: "ליווי וסיוע",
    description: "שירותי סיוע מקצועיים ועזרה יומיומית, מטפלים מורשים ומיומנים",
    region: "ירושלים והסביבה",
    rating: 4.8,
    reviewCount: 61,
    phone: "CARE-1-800",
    recommended: true,
    truvifyVerified: false,
    type: "service",
  },
  {
    id: "s4",
    name: "רחל אברהם – פדיקור מקצועי",
    category: "יופי",
    categoryLabel: "יופי וטיפוח",
    description: "פדיקור רפואי וקוסמטי בבית, טיפול בציפורניים עבות ועקומות",
    region: "מרכז – גוש דן",
    rating: 4.6,
    reviewCount: 27,
    phone: "",
    recommended: false,
    truvifyVerified: false,
    type: "service",
  },
  {
    id: "s5",
    name: "ביתי טעים – ארוחות מוכנות",
    category: "תזונה",
    categoryLabel: "ארוחות מוכנות",
    description: "ארוחות בישול ביתי, מתאימות לדיאטות מיוחדות, משלוח יומי עד אֵלַי",
    region: "שרון",
    rating: 4.9,
    reviewCount: 54,
    phone: "",
    recommended: false,
    truvifyVerified: false,
    type: "service",
  },
  {
    id: "s6",
    name: "אברהם חשמל – הנדימן",
    category: "תחזוקה",
    categoryLabel: "תחזוקה",
    description: "חשמלאי, הנדימן, התאמות בית לנגישות – ניסיון של 20 שנה",
    region: "דרום",
    rating: 0,
    reviewCount: 0,
    phone: "",
    recommended: false,
    truvifyVerified: false,
    serviceTags: ["תיקון קצר חשמלי", "החלפת מנורות", "התקנת מאחז יד", "תיקון מכשירי חשמל", "נגרות קלה"],
    type: "service",
  },
  {
    id: "s7",
    name: 'ד"ר שרה בן דוד – שיניים',
    category: "בריאות",
    categoryLabel: "טיפול רפואי",
    description: "טיפולי שיניים בבית – בדיקה, ניקוי, שיניים תותבות וכלים נייחים",
    region: "מרכז – גוש דן",
    rating: 5,
    reviewCount: 33,
    phone: "",
    recommended: true,
    truvifyVerified: false,
    type: "service",
  },
  {
    id: "s8",
    name: "נקיון בלב – שירותי ניקיון",
    category: "בית",
    categoryLabel: "שירותי בית",
    description: "ניקיון שוטף ועמוק, כביסה וגיהוץ, עובדים מאומתים ואמינים",
    region: "שפלה",
    rating: 0,
    reviewCount: 0,
    phone: "",
    recommended: false,
    truvifyVerified: false,
    serviceTags: ["ניקיון שוטף", "ניקיון עמוק", "כביסה וגיהוץ", "ניקוי חלונות"],
    type: "service",
  },
  {
    id: "s9",
    name: "סטודיו נוגה – ספרית ביתית",
    category: "יופי",
    categoryLabel: "יופי וטיפוח",
    description: "תספורות, צביעה וטיפוח שיער לגיל השלישי בסביבה הנוחה של הבית",
    region: "צפון",
    rating: 4.8,
    reviewCount: 30,
    phone: "",
    recommended: false,
    truvifyVerified: false,
    type: "service",
  },
];

export const equipProviders: Provider[] = [
  {
    id: "e1",
    name: "מדיקר – מוצרי היגיינה",
    category: "היגיינה",
    categoryLabel: "היגיינה וסניטציה",
    description: "חיתולים למבוגרים, מגבונים, פדים, כיסויי מיטה ומוצרי רחצה – משלוח שוטף עד אֵלַי",
    region: "",
    rating: 4.9,
    reviewCount: 87,
    phone: "",
    recommended: false,
    truvifyVerified: false,
    badge: "אספקה שוטפת",
    type: "equip",
  },
  {
    id: "e2",
    name: "SafeGuard – שעון מצוקה",
    category: "חירום",
    categoryLabel: "מערכות חירום",
    description: "שעון חכם עם כפתור מצוקה, GPS, גלאי נפילה אוטומטי ושיחה ישירה לקרוב משפחה",
    region: "",
    rating: 5,
    reviewCount: 114,
    phone: "",
    recommended: true,
    truvifyVerified: false,
    type: "equip",
  },
  {
    id: "e3",
    name: "SensorAlert – פעמון חיישן תנועה",
    category: "חירום",
    categoryLabel: "מערכות חירום",
    description: "חיישן חכם המזהה חוסר פעילות בבית ומתריע אוטומטית לקרוב המשפחה",
    region: "",
    rating: 4.8,
    reviewCount: 56,
    phone: "",
    recommended: false,
    truvifyVerified: false,
    type: "equip",
  },
  {
    id: "e4",
    name: "קומפורט – כיסאות גלגלים ועזרי הליכה",
    category: "ניידות",
    categoryLabel: "ניידות ונגישות",
    description: "כיסאות גלגלים, הליכונים, מאחזי יד, כיסאות מקלחת – השכרה ומכירה",
    region: "",
    rating: 4.5,
    reviewCount: 43,
    phone: "",
    recommended: false,
    truvifyVerified: false,
    type: "equip",
  },
  {
    id: "e5",
    name: "אוכל טוב – מנות מוכנות יומיות",
    category: "תזונה",
    categoryLabel: "ארוחות מוכנות",
    description: "מנות מאוזנות תזונתית, מותאמות לסוכרת, לחץ דם ודיאטות רכות – משלוח קבוע",
    region: "",
    rating: 4.9,
    reviewCount: 72,
    phone: "",
    recommended: true,
    truvifyVerified: false,
    type: "equip",
  },
  {
    id: "e6",
    name: "טאבלט קשיש – מסך פשוט ענק",
    category: "טכנולוגיה",
    categoryLabel: "טכנולוגיה סיעודית",
    description: "טאבלט ייעודי עם ממשק פשוט לגיל השלישי – שיחות וידאו, תזכורות תרופות, בידור",
    region: "",
    rating: 4.4,
    reviewCount: 38,
    phone: "",
    recommended: false,
    truvifyVerified: false,
    type: "equip",
  },
];

export const wizardServiceChips = [
  "פיזיותרפיה", "אחות / סיעוד", "מסאז' רפואי", "שיניים בבית",
  "פדיקור", "ספרית/ספר", "קוסמטיקאית", "ארוחות מוכנות",
  "ניקיון", "הנדימן", "חשמלאי", 'עו"ס / תומכת טיפול',
  "מלווה בית חולים", "עזרה בטכנולוגיה", "קניות ומשימות",
  "גינון קל", "הסעות רפואיות",
];

export const wizardEquipChips = [
  "מוצרי היגיינה", "חיתולים למבוגרים", "שעון מצוקה",
  "פעמון חיישן תנועה", "כיסא גלגלים / הליכון", "טאבלט ייעודי",
  "מנות מוכנות / קייטרינג", "עזרי נגישות לבית",
];

export const truvifyCheckItems = [
  "הסתבכויות פליליות וכלכליות",
  "בדיקת רשימת המבוקשים של האינטרפול",
  "בדיקת חדלות פירעון / הגבלה בנקאית",
  "חשש להתחזות – האם מוכר בשמות אחרים",
  "קשרים לפעילות טרור / מטבעות קריפטו חשודים",
];

export const legalTerms = [
  {
    title: "1. מהות הפלטפורמה",
    content: 'פלטפורמת "עד אֵלַי" (להלן: "המערכת") משמשת כמדריך דיגיטלי להצגת נותני שירות וספקי ציוד בלבד. המערכת אינה צד בכל הסכם, עסקה, או התקשרות שתיעשה בין המשתמש לבין ספק השירות.',
  },
  {
    title: "2. הגבלת אחריות – ללקוחות",
    content: "המערכת אינה אחראית, במישרין או בעקיפין, לאיכות השירות, לנזקים גופניים, לנזקים רכושיים, לכישלון מקצועי, לגניבה, לתאונה, או לכל תוצאה אחרת הנובעת מהתקשרות עם ספק שמופיע במאגר. השימוש במאגר ובמידע המוצג בו הוא באחריות המשתמש בלבד.",
  },
  {
    title: "3. אימות ספקים",
    content: "המערכת עשויה לבצע בדיקת אמינות בסיסית לספקים (אימות זהות ו/או בדיקת עבר פלילי) באמצעות גורם מורשה. בדיקה זו אינה מהווה ערבות, המלצה, או אישור לאיכות השירות. הספק אחראי בלעדית על השירות הניתן.",
  },
  {
    title: "4. ביטוח – ספקים",
    content: 'כל ספק המצטרף למאגר מצהיר ומתחייב כי ברשותו ביטוח אחריות מקצועית בתוקף. הספק נושא באחריות מלאה ובלעדית לכל נזק שייגרם ללקוח, לצד שלישי, לרכוש, או לגוף במהלך מתן השירות. כל תביעה שתוגש תופנה כלפי הספק ו/או חברת הביטוח שלו בלבד.',
  },
  {
    title: "5. הגבלת סכום תביעה",
    content: "בכל מקרה ובכפוף לכל דין, אחריות המערכת לא תעלה על סכום דמי המנוי ששולמו לה על ידי הספק בשנה הקודמת לאירוע.",
  },
  {
    title: "6. שינוי תנאים",
    content: "המערכת שומרת לעצמה את הזכות לשנות תנאים אלה בכל עת. המשך השימוש לאחר שינוי מהווה הסכמה לתנאים החדשים.",
  },
];
