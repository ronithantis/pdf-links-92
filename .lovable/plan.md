

המשתמשת אישרה: מדריכים = רק 3 החדשים (רחצה, האכלה, החלפת חיתול). 2 הסרטונים נשארים תחת "מצגות" (סה"כ 21 מצגות).

## תוכנית ביצוע

### 1. הוספת 3 מדריכים חדשים ל-DB
INSERT ל-`knowledge_resources` עם `category='videos'` (קטגוריה זו מוצגת כ"מדריכים" ב-UI):
- **מדריך האכלה** — `https://ronithantis.github.io/Feeding-Guide/`
- **מדריך רחצה** — `https://ronithantis.github.io/Bathing-Guide-/`
- **מדריך החלפת חיתול** — `/guides/diaper-change.pdf` (קובץ PDF שיועלה ל-public)

כל אחד יקבל: `subcategory='מדריכים יישומיים'`, `resource_type='guide'`, `is_published=true`, `scenario_tags` רלוונטיים.

### 2. שמירת קובץ PDF
העלאת `החלפת_חיתול_לאדם_סיעודי.pdf` ל-`public/guides/diaper-change.pdf`.

### 3. עדכון `ResourceCard.tsx`
מדריכים הם קישורים חיצוניים / PDF — לא וידאו. נוסיף טיפול ייעודי:
- אם `resource_type='guide'` ו-URL חיצוני → כרטיס עם אייקון BookOpen וכפתור "פתיחת מדריך"
- אם `resource_type='guide'` ו-URL הוא PDF → פתיחה ב-`PdfViewer` כמו טפסים (עם הורדה/הדפסה/מסך מלא)

### 4. שילוב במודולים
- **Module4Content.tsx** (דמנציה) — קישורים ל-3 המדריכים בסעיף טיפול יומיומי
- **Module7Content.tsx** (היבטים קליניים) — מדריך האכלה ב-7.2 תזונה והידרציה, מדריך רחצה בסעיף רחצה

### 5. שילוב ביועץ החכם
עדכון `supabase/functions/smart-advisor/index.ts` — הוספת `KEYWORD_RULES` עבור:
- "האכלה", "האכלה בכפית", "קושי באכילה" → מדריך האכלה
- "רחצה", "מקלחת", "היגיינה" → מדריך רחצה
- "חיתול", "החלפת חיתול", "incontinence" → מדריך החלפת חיתול

### 6. שילוב בתרחישים
UPDATE `scenarios` table — הוספת המדריכים ל-`recommended_actions` של:
- "רוצים לטפל בבית — האם זה ריאלי?"
- "ההורה עובד ממוסד לבית"
- "להגביר את רמת הטיפול"
- "יש לנו עובד זר"

### 7. חיפוש גלובלי
ייקלט אוטומטית — `globalSearch` קורא מ-`knowledge_resources`, אין שינוי קוד נדרש.

## קבצים שיעודכנו
- DB: INSERT 3 רשומות ל-`knowledge_resources` + UPDATE `scenarios.recommended_actions`
- `public/guides/diaper-change.pdf` (חדש)
- `src/components/knowledge/ResourceCard.tsx`
- `src/components/module-content/Module4Content.tsx`
- `src/components/module-content/Module7Content.tsx`
- `supabase/functions/smart-advisor/index.ts`

