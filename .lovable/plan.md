# הוספת מדריך אינטראקטיבי להחלפת חיתול

המטרה: לצד מדריך ה-PDF הקיים ("מדריך החלפת חיתול לאדם סיעודי" שהוא בפועל מצגת/דף קבוע), נוסיף **מדריך אינטראקטיבי בפורמט אקורדיון** מהקובץ שצירפת — וניתן יהיה לפתוח אותו בחלון קופץ ממרכז הידע, מהיועץ החכם, מהחיפוש הגלובלי ומפרק 7.3 (היבטים קליניים — ניהול הפרשות).

## שלבי הביצוע

### 1. העלאת הקובץ
- העתקה: `user-uploads://index-4.html` → `public/guides/diaper-change-interactive.html`

### 2. הוספת רשומה חדשה ב-DB (`knowledge_resources`)
שורה חדשה לצד הקיימת:
- `title`: "מדריך החלפת חיתול — אינטראקטיבי (אקורדיון)"
- `description`: "מדריך נפתח לפי שלבים: הכנה, ביצוע, היגיינה, מצבים מיוחדים — לפתיחה בחלון"
- `category`: `videos` (מוצגת כ"מדריכים")
- `subcategory`: "מדריכים יישומיים"
- `resource_type`: `guide`
- `url`: `/guides/diaper-change-interactive.html`
- `is_published`: true
- `scenario_tags`: `["אדם מרותק למיטה","החלפת חיתולים","היגיינה","ניהול הפרשות","צרכים"]`

זה ייקלט אוטומטית גם **בחיפוש הגלובלי** (כי `knowledge_resources` נסרק ע"י `globalSearch`) — אין צורך בשינוי קוד לחיפוש.

מכיוון שה-URL הוא `.html` חיצוני (לא PDF), `ResourceCard` הקיים יזהה אותו כ-`isExternalGuide` ויפתח אותו ב-Dialog/iframe עם כפתור "פתיחת מדריך" + מסך מלא — בדיוק כפי שביקשת ("חלון נפתח"). אין שינוי בקוד הקומפוננטה.

### 3. עדכון `supabase/functions/smart-advisor/index.ts`
בכלל הקיים של `["חיתול", "חיתולים", ...]`:
- הוספת מילות מפתח: `"אדם מרותק למיטה"`, `"מרותק למיטה"`, `"צרכים"`, `"מטופל סיעודי"`
- הוספת פריט כלי חדש לרשימת `tools`:
  - `{ path: "/guides/diaper-change-interactive.html", label: "מדריך החלפת חיתול — אינטראקטיבי", reason: "מדריך נפתח שלב-אחר-שלב בפורמט אקורדיון, לעיון מהיר בזמן אמת" }`

### 4. עדכון פרק 7.3 — `src/components/module-content/Module6Content.tsx`
בתוך ה-InfoBox "📖 מדריכים מעשיים" שב-`case "7.3"` — להוסיף קישור שלישי למדריך האינטראקטיבי החדש (פותח בלשונית/חלון חדש).

### 5. עדכון פרק 7 (דמנציה — `Module7Content.tsx` case "3.3")
באותה רוח — הוספת הקישור החדש לרשימת המדריכים שכבר קיימת שם.

## מה לא משתנה
- לא נוגעים ב-`ResourceCard.tsx` — הוא כבר תומך ב-guide חיצוני (HTML) ופותח Dialog.
- לא נוגעים בקוד החיפוש — אינדוקס אוטומטי דרך `knowledge_resources`.
- מדריך ה-PDF הקיים נשאר במקומו; המדריך החדש מתווסף לצדו.

## קבצים שיעודכנו
- חדש: `public/guides/diaper-change-interactive.html`
- DB: INSERT אחד ל-`knowledge_resources`
- `supabase/functions/smart-advisor/index.ts` (הרחבת keywords + tool)
- `src/components/module-content/Module6Content.tsx` (7.3)
- `src/components/module-content/Module7Content.tsx` (3.3)
