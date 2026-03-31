export interface Organization {
  name: string;
  phone: string;
  tag: string;
  desc: string;
  cats: string[];
  regions: string[];
  cost: "free" | "sub" | "dep";
  keywords: string;
}

export interface CategoryDef {
  id: string;
  label: string;
  icon: string; // lucide icon name
}

export const organizations: Organization[] = [
  { name: "עזר מציון", phone: "1-800-80-20-30", tag: "הסעות ובריאות", desc: "הסעות חינם לבתי חולים, אמבולנסים, ציוד רפואי, ארוחות חמות. יש לתאם יום מראש עד 12:00.", cats: ["transport", "ambulance", "health", "meals", "lonely"], regions: ["ארצי"], cost: "free", keywords: "עזר מציון הסעה אמבולנס ציוד" },
  { name: "יד שרה", phone: "*6444", tag: "ציוד ושיניים", desc: "השאלת ציוד רפואי (פיקדון סמלי). מרפאת שיניים ניידת — מסובסד. שלוחה 7 לשיניים.", cats: ["dental", "health", "transport"], regions: ["ארצי"], cost: "dep", keywords: "יד שרה שיניים ציוד נכונית" },
  { name: "חיבורים 20-80 / דור לדור", phone: "*3284", tag: "ביקורי בית", desc: "רשת קהילתית של מתנדבים — ביקורי בית, עזרה בסידורים, שיחות וליווי.", cats: ["homevisit", "lonely", "medicine"], regions: ["ארצי"], cost: "free", keywords: "חיבורים 20 80 דור לדור מתנדבים" },
  { name: "כן לזקן", phone: "*2284", tag: "זכויות", desc: "סיוע אישי במיצוי זכויות, ייצוג מול רשויות, ליווי בתביעות סיעוד — חינם לחלוטין.", cats: ["rights", "legal", "nursing"], regions: ["ארצי"], cost: "free", keywords: "כן לזקן זכויות ביטוח לאומי סיעוד" },
  { name: "קו לזקן", phone: "1-800-800-505", tag: "תמיכה נפשית", desc: "אוזן קשבת, שיחות טלפון וליווי רגשי לקשישים בודדים.", cats: ["lonely"], regions: ["ארצי"], cost: "free", keywords: "קו לזקן בדידות תמיכה" },
  { name: "המוקד לאזרחים ותיקים", phone: "*8840", tag: "מוקד ממשלתי", desc: "מוקד ממשלתי (המשרד לשוויון חברתי) — מענה ראשוני 24/7 בכל נושא וזכות לאזרח ותיק.", cats: ["rights", "legal", "nursing"], regions: ["ארצי"], cost: "free", keywords: "מוקד אזרחים ותיקים 8840 ממשלתי" },
  { name: "לב אחד", phone: "02-6762044", tag: "תרופות ומזון לבית", desc: "הבאת תרופות ומזון עד הבית לקשישים המתקשים לצאת — סיוע לוגיסטי.", cats: ["medicine", "food", "homevisit"], regions: ["ארצי"], cost: "free", keywords: "לב אחד תרופות מזון בית לוגיסטי" },
  { name: "מטב", phone: "073-2393333", tag: "סיעוד וקהילה", desc: "העמותה הגדולה בישראל לסיעוד — מטפלות, מרכזי יום, קהילות תומכות ושירותי שטח.", cats: ["nursing", "homevisit"], regions: ["ארצי"], cost: "sub", keywords: "מטב סיעוד מטפלת מרכז יום קהילה" },
  { name: "איגוד הלב", phone: "03-6202244", tag: "ארגון גג לעמותות", desc: "ארגון גג ל-100 עמותות מקומיות למען הקשיש הפועלות בכל רשות מקומית בארץ.", cats: ["rights", "nursing", "homevisit"], regions: ["ארצי"], cost: "free", keywords: "איגוד הלב עמותות מקומיות רשות" },
  { name: "שיל — ייעוץ לאזרח", phone: "118", tag: "ביורוקרטיה", desc: "ייעוץ בנושאי ביטוח לאומי, דיור, צרכנות וטפסים — דרך הרשויות המקומיות.", cats: ["rights", "legal"], regions: ["ארצי"], cost: "free", keywords: "שיל ביורוקרטיה זכויות 118" },
  { name: "ייעוץ לאזרח הוותיק (ביטוח לאומי)", phone: "*9696", tag: "ביטוח לאומי", desc: "מתנדבים גמלאים עם ביקורי בית — עוזרים במילוי טפסים לקצבאות והכוונה.", cats: ["rights", "legal", "homevisit"], regions: ["ארצי"], cost: "free", keywords: "ביטוח לאומי קצבאות טפסים 9696" },
  { name: "יד ריבה", phone: "02-6444569", tag: "הגנה משפטית", desc: "מגנה על קשישים מפני עושק וניצול כלכלי. ייעוץ בצוואות, ירושות וסכסוכי שכנים.", cats: ["legal", "rights"], regions: ["ארצי"], cost: "free", keywords: "יד ריבה עושק ניצול צוואה ירושה" },
  { name: "האגודה לזכויות החולה", phone: "03-6023111", tag: "זכויות רפואיות", desc: "מימוש זכויות מול קופות חולים ובתי חולים.", cats: ["rights", "health"], regions: ["ארצי"], cost: "free", keywords: "אגודה זכויות חולה קופת חולים" },
  { name: "עמותת עמדה", phone: "*8889", tag: "דמנציה", desc: "תמיכה, מידע וקבוצות תמיכה לחולי דמנציה ואלצהיימר ולבני משפחותיהם.", cats: ["lonely", "nursing"], regions: ["ארצי"], cost: "free", keywords: "עמדה דמנציה אלצהיימר" },
  { name: 'מלב"ב', phone: "1-700-70-4532", tag: "דמנציה", desc: "מרכזי יום ייעודיים, טיפולים בבית לחולי דמנציה, מוקד קשר להפגת בדידות.", cats: ["lonely", "homevisit", "nursing"], regions: ["ירושלים", "מרכז"], cost: "free", keywords: "מלבב דמנציה קהילה מרכז יום" },
  { name: 'ער"ן — עזרה נפשית', phone: "1201", tag: "תמיכה נפשית", desc: "קו חם לקשישים עם בדידות, חרדה ודיכאון. שלוחה למבוגרים.", cats: ["lonely"], regions: ["ארצי"], cost: "free", keywords: "עין נפשית בדידות חרדה" },
  { name: "עמך — ניצולי שואה", phone: "1-800-27-66-22", tag: "תמיכה נפשית", desc: "טיפול פסיכולוגי, מועדונים חברתיים ותמיכה לניצולי שואה ודור שני.", cats: ["lonely", "nursing"], regions: ["ארצי"], cost: "sub", keywords: "עמך ניצולי שואה טיפול נפשי דור שני" },
  { name: "והדרת", phone: "073-2160533", tag: "מתנדבים בבית", desc: "מתנדבי שירות לאומי לשיחה, ליווי לסידורים וסיוע טכנולוגי.", cats: ["homevisit", "lonely", "digital"], regions: ["ארצי"], cost: "free", keywords: "והדרת מתנדבים ביקור בית" },
  { name: "חברים לרפואה", phone: "03-6167788", tag: "תרופות והסעות", desc: "חלוקת תרופות יקרות + הסעות לאונקולוגיה ודיאליזה.", cats: ["medicine", "health", "transport"], regions: ["ארצי"], cost: "free", keywords: "חברים לרפואה תרופות הסעה אונקולוגיה" },
  { name: "לתת", phone: "*6833", tag: "מזון וליווי", desc: "מזון, שיפוץ ליקויי בטיחות, ליווי חברתי. גם הסעות לניצולי שואה.", cats: ["food", "homevisit", "transport", "renovation"], regions: ["ארצי"], cost: "free", keywords: "לתת מזון ניצולי שואה שיפוץ בטיחות" },
  { name: "לקט ישראל", phone: "09-7441757", tag: "מזון טרי", desc: "ארוחות מבושלות ופירות וירקות ישירות לבית, בתיאום עמותות מקומיות.", cats: ["food", "meals"], regions: ["ארצי"], cost: "free", keywords: "לקט ישראל מזון ארוחות" },
  { name: "מאיר פנים", phone: "1-800-20-22-22", tag: "ארוחות חמות", desc: "מסעדות לנזקקים בחינם ו'ארוחה על גלגלים' לקשישים מרותקי בית.", cats: ["meals", "food"], regions: ["ארצי"], cost: "free", keywords: "מאיר פנים ארוחות גלגלים מסעדה" },
  { name: "חסדי נעמי", phone: "1-800-600-604", tag: "סלי מזון", desc: "סלי מזון שבועיים, חבילות חגים. מתמקדים בקשישים וניצולי שואה.", cats: ["food", "meals"], regions: ["ארצי"], cost: "free", keywords: "חסדי נעמי מזון סלים חגים" },
  { name: 'כולל חב"ד', phone: "02-5812222", tag: "כרטיסי מזון", desc: "מיזם לאומי לביטחון תזונתי: כרטיסי נטען לרכישת מזון בפריסה ארצית.", cats: ["food"], regions: ["ארצי"], cost: "free", keywords: "חבד מזון כרטיסים תזונה" },
  { name: "עמותת רעות", phone: "03-7333333", tag: "סיעוד וייעוץ", desc: "מרכז מידע מקיף — זכויות, שיקום, סיעוד, דיור מוגן. מוקד עובדים סוציאליים.", cats: ["nursing", "rights"], regions: ["ארצי"], cost: "free", keywords: "רעות סיעוד זכויות דיור שיקום" },
  { name: "Caregivers Israel", phone: "058-6310245", tag: "בני משפחה מטפלים", desc: "ליווי ותמיכה לאנשים המטפלים בבן משפחה מזדקן.", cats: ["nursing", "rights"], regions: ["ארצי"], cost: "free", keywords: "caregivers מטפלים משפחה" },
  { name: "בטרם", phone: "03-6056111", tag: "בטיחות בבית", desc: "סקרי בטיחות בבית, המלצות למניעת נפילות — ייעוץ חינם.", cats: ["safety", "homevisit", "health"], regions: ["ארצי"], cost: "free", keywords: "בטרם בטיחות נפילות בית" },
  { name: "תנופה בקהילה", phone: "02-6793491", tag: "שיפוצים לקשישים", desc: "שיפוצי עומק בבתי קשישים וניצולי שואה (גגות, חשמל, אינסטלציה) — ללא עלות.", cats: ["renovation", "safety"], regions: ["ארצי"], cost: "free", keywords: "תנופה שיפוץ בית ניצולי שואה תיקון" },
  { name: "עמותת לבבי", phone: "050-2111351", tag: "תיקונים קלים", desc: "מתנדבים לתיקונים קלים בבית (נורה, ברז, ידיות אחיזה). עבודה חינם — חומרים בלבד.", cats: ["renovation", "safety"], regions: ["מרכז", "ירושלים"], cost: "free", keywords: "לבבי תיקונים קלים ידיות אחיזה" },
  { name: "עמותה לרפואת שיניים ניידת", phone: "1-700-50-24-24", tag: "שיניים ניידת", desc: "מרפאה המגיעה עד לבית לטיפולי שיניים. מסובסד מאוד, לעיתים חינם למקרים קשים.", cats: ["dental"], regions: ["ארצי"], cost: "sub", keywords: "שיניים ניידת בית גרפונקל מרפאה" },
  { name: 'עמותת על"ה', phone: "03-6393938", tag: "לקויי ראייה", desc: "מתנדבים לבית — הקראת דואר, עזרה בסידורים לעיוורים ולקויי ראייה.", cats: ["vision", "homevisit", "lonely"], regions: ["ארצי"], cost: "free", keywords: "עלה ראייה עיוורים לקויי ראייה" },
  { name: "עמותת בקול", phone: "03-5257001", tag: "לקויי שמיעה", desc: "ייעוץ על מכשירי שמיעה, זכויות והנגשה לקשישים עם ירידה בשמיעה.", cats: ["vision", "rights"], regions: ["ארצי"], cost: "free", keywords: "בקול שמיעה מכשיר שמיעה כבדי שמיעה" },
  { name: "עמותת תפוח", phone: "08-6852146", tag: "אוריינות דיגיטלית", desc: "הכשרות חינם לסמארטפון, זום, אפליקציות ממשלתיות ושיחות וידאו עם המשפחה.", cats: ["digital"], regions: ["ארצי"], cost: "free", keywords: "תפוח דיגיטל סמארטפון זום אפליקציה" },
  { name: "מחוברים — בני ברית", phone: "09-7603777", tag: "מחשבים לקשישים", desc: "התקנת מחשבים בבתי קשישים בודדים והדרכה על ידי מתנדבים.", cats: ["digital", "homevisit", "lonely"], regions: ["ארצי"], cost: "free", keywords: "מחוברים מחשב בני ברית דיגיטל אינטרנט" },
  { name: "אביב לניצולי השואה", phone: "*5711", tag: "זכויות ניצולי שואה", desc: "מיצוי זכויות ייעודי לניצולי שואה מהארץ ומחו\"ל. ייעוץ משפטי ללא עלות.", cats: ["rights", "legal"], regions: ["ארצי"], cost: "free", keywords: "אביב ניצולי שואה זכויות גרמניה" },
  { name: "תבונה משפטית", phone: "03-5177114", tag: "ייעוץ משפטי", desc: "ייעוץ חינם: אפוטרופסות, ייפוי כוח מתמשך, הגנה מעוקץ.", cats: ["legal", "rights"], regions: ["ארצי"], cost: "free", keywords: "תבונה משפטית אפוטרופסות" },
  { name: "הקרן לרווחת ניצולי השואה", phone: "03-6090866", tag: "סיוע כספי", desc: "סיוע כספי, טיפולים ומזון לניצולי שואה. גם סבסוד נסיעות.", cats: ["food", "health", "nursing", "transport"], regions: ["ארצי"], cost: "free", keywords: "קרן ניצולי שואה סיוע מזון נסיעות" },
  { name: "לחיים — מתנדבים", phone: "050-7171121", tag: "הסעות", desc: "מתנדבים המסיעים קשישים וניצולי שואה לבדיקות, קניות וסידורים.", cats: ["transport"], regions: ["ארצי"], cost: "free", keywords: "לחיים מתנדבים הסעה בדיקות" },
  { name: "יד עזרא ושולמית", phone: "02-5383130", tag: "סלי מזון", desc: "אלפי סלי מזון שבועיים וחבילות חג למשפחות וקשישים.", cats: ["food"], regions: ["ארצי"], cost: "free", keywords: "יד עזרא שולמית מזון סלים" },
  { name: "רופאים לזכויות אדם", phone: "03-6873020", tag: "טיפול בהתנדבות", desc: "טיפולים רפואיים ושיניים בהתנדבות לנזקקים.", cats: ["dental", "health"], regions: ["מרכז"], cost: "free", keywords: "רופאים שיניים בריאות" },
  { name: "פתחון לב", phone: "03-5576000", tag: "סלי מזון", desc: "סלי מזון שבועיים עם מוצרי יסוד, פירות וירקות.", cats: ["food"], regions: ["מרכז"], cost: "free", keywords: "פתחון לב מזון סלים" },
  { name: "עזרא ומרפא", phone: "03-5777000", tag: "ציוד ואמבולנסים", desc: "ציוד רפואי ואמבולנסים חינם, ייעוץ רפואי.", cats: ["health", "ambulance"], regions: ["מרכז"], cost: "free", keywords: "עזרא מרפא ציוד אמבולנס" },
  { name: "אביב לגיל השלישי", phone: "03-6931212", tag: "ייעוץ כלכלי", desc: "ייעוץ כלכלי, זכויות ובירוקרטיה לגיל השלישי.", cats: ["rights", "legal"], regions: ["מרכז"], cost: "free", keywords: "אביב גיל שלישי כלכלי" },
  { name: "עמותת לשובע", phone: "03-6816101", tag: "מסעדות לנזקקים", desc: "מסעדות שבהן קשישים אוכלים בחינם. גם חלוקת בגדים.", cats: ["food", "meals"], regions: ["מרכז"], cost: "free", keywords: "לשובע מסעדה קשישים בגדים" },
  { name: "אור מצווה", phone: "03-5161300", tag: "בית תבשיל", desc: "הפעלת בית תבשיל וחלוקת סלי מזון לקשישים בודדים.", cats: ["food", "meals"], regions: ["מרכז"], cost: "free", keywords: "אור מצווה תבשיל מזון" },
  { name: "עמותת עמית", phone: "03-5441234", tag: "ביקורי בית", desc: "מתנדבים לביקורי בית, קניות, תרופות וליווי.", cats: ["homevisit", "medicine"], regions: ["מרכז"], cost: "free", keywords: "עמית ביקורי בית תרופות" },
  { name: "מזון לחיים", phone: "03-9341110", tag: "מזון פתח תקווה", desc: "חלוקת מזון לנזקקים וקשישים וליווי — פתח תקווה.", cats: ["food", "homevisit"], regions: ["מרכז"], cost: "free", keywords: "מזון לחיים פתח תקווה" },
  { name: "עמך", phone: "03-7457777", tag: "תמיכה נפשית", desc: "תמיכה נפשית וטיפול רגשי לקשישים ובני משפחה.", cats: ["lonely"], regions: ["מרכז"], cost: "free", keywords: "עמך נפשי רגשי" },
  { name: "יד אליעזר", phone: "02-5899000", tag: "סלי מזון", desc: "סלי מזון ותמיכה לקשישים ומשפחות נזקקות בירושלים.", cats: ["food"], regions: ["ירושלים"], cost: "free", keywords: "יד אליעזר מזון ירושלים" },
  { name: "עזרת אבות", phone: "02-5829984", tag: "ארוחות על גלגלים", desc: "ארוחות חמות עד הבית לניצולי שואה וקשישים בירושלים.", cats: ["meals", "food"], regions: ["ירושלים"], cost: "free", keywords: "עזרת אבות ארוחות גלגלים ירושלים" },
  { name: "אשל", phone: "02-6557111", tag: "שירותים קהילתיים", desc: "פיתוח שירותים וחיבור קשישים למסגרות בקהילה.", cats: ["nursing", "homevisit"], regions: ["ירושלים"], cost: "free", keywords: "אשל קהילה שירותים" },
  { name: "יד עזר לחבר", phone: "04-8666922", tag: "סיוע כולל צפון", desc: "ביקורי בית, מזון, הסעות לקשישים לצרכים רפואיים וחברתיים בחיפה.", cats: ["homevisit", "food", "lonely", "transport"], regions: ["חיפה והצפון"], cost: "free", keywords: "יד עזר חבר חיפה צפון הסעה מזון" },
  { name: 'לב ח"ש', phone: "04-8666988", tag: "מזון חיפה", desc: "חבילות מזון חודשיות לקשישים וניצולי שואה בחיפה.", cats: ["food"], regions: ["חיפה והצפון"], cost: "free", keywords: "לב חש חיפה מזון חבילות" },
  { name: "נר דוד אבי", phone: "08-6752222", tag: "ציוד ואמבולנסים", desc: "ציוד רפואי ואמבולנסים חינם — אשקלון, אשדוד, נתיבות, שדרות.", cats: ["health", "ambulance", "transport"], regions: ["דרום"], cost: "free", keywords: "נר דוד דרום אמבולנס ציוד" },
  { name: "האגודה למען הקשיש אשדוד", phone: "08-8540100", tag: "סיוע אשדוד", desc: "מזון, ביקורי בית, פעילויות ותמיכה לקשישים באשדוד.", cats: ["food", "homevisit", "lonely"], regions: ["דרום"], cost: "free", keywords: "אגודה קשיש אשדוד מזון" },
  { name: "באר שובע", phone: "08-6441597", tag: "מסעדה קהילתית", desc: "מסעדה קהילתית — ארוחות חמות בחינם וסלי מזון בבאר שבע.", cats: ["food", "meals"], regions: ["דרום"], cost: "free", keywords: "באר שובע מסעדה מזון" },
  { name: "האגודה למען הקשיש באר שבע", phone: "08-6275555", tag: "סיוע באר שבע", desc: "ייעוץ, מזון, פעילות חברתית וסיוע יומיומי בבאר שבע.", cats: ["food", "rights", "lonely"], regions: ["דרום"], cost: "free", keywords: "אגודה קשיש באר שבע מזון זכויות" },
];

export const categoryDefs: CategoryDef[] = [
  { id: "food", label: "מזון", icon: "Utensils" },
  { id: "dental", label: "שיניים", icon: "Smile" },
  { id: "transport", label: "הסעות", icon: "Car" },
  { id: "ambulance", label: "אמבולנס", icon: "Ambulance" },
  { id: "health", label: "בריאות", icon: "Activity" },
  { id: "medicine", label: "תרופות", icon: "Pill" },
  { id: "homevisit", label: "ביקורי בית", icon: "Home" },
  { id: "meals", label: "ארוחות חמות", icon: "Coffee" },
  { id: "lonely", label: "בדידות", icon: "Heart" },
  { id: "nursing", label: "סיעוד", icon: "Users" },
  { id: "rights", label: "זכויות", icon: "Scale" },
  { id: "legal", label: "ייעוץ משפטי", icon: "FileText" },
  { id: "safety", label: "בטיחות בבית", icon: "Shield" },
  { id: "renovation", label: "שיפוצים", icon: "Wrench" },
  { id: "vision", label: "ראייה ושמיעה", icon: "Eye" },
  { id: "digital", label: "דיגיטל", icon: "Globe" },
];

export const regions = ["ארצי", "מרכז", "ירושלים", "חיפה והצפון", "דרום"];

export const costLabels: Record<string, string> = {
  free: "ללא תשלום",
  sub: "מסובסד",
  dep: "פיקדון סמלי",
};
