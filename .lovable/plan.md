

# פיצ'ר חדשות ועדכונים — תוכנית מפורטת

## סקירה

בניית מערכת חדשות מלאה בשלושה חלקים: מקטע בדף הבית, כפתור בסרגל הניווט עם dropdown, ודף חדשות ייעודי. הנתונים נטענים מ-Supabase חיצוני (לא מה-Cloud של הפרויקט).

---

## חלק 1 — חיבור לנתונים

### קובץ חדש: `src/lib/news-client.ts`
- יצירת Supabase client נפרד שמתחבר ל-DB החיצוני (`bvcmokkgcpqysopspnez.supabase.co` עם ה-anon key שסופק)
- המפתח הוא publishable key ולכן בטוח לשמור בקוד
- פונקציות: `fetchLatestNews(limit)` ו-`fetchAllNews(category?)`
- טבלה: `news_items`, שדות: `title`, `summary`, `category`, `source_url`, `source_name`, `is_new`, `published_at`

---

## חלק 2 — רכיבי React

### קובץ חדש: `src/components/news/NewsFeed.tsx`
- מקטע חדשות לדף הבית — מציג 6 כרטיסיות אחרונות
- כפתורי סינון לפי קטגוריה: הכל / ביטוח לאומי / עובדים זרים / בריאות / זכויות / המלצה
- כל כרטיסייה כוללת:
  - תגית "חדש" בצבע `#2a9d8f` (כש-`is_new=true`)
  - תגית קטגוריה צבעונית
  - כותרת, תקציר, שם מקור, קישור חיצוני
- עיצוב בצבעי האתר: `#1d3557` ראשי, `#2a9d8f` הדגשה

### קובץ חדש: `src/components/news/NewsNavButton.tsx`
- כפתור עגול עם אייקון פעמון וטקסט "עדכונים"
- badge אדום עם מספר פריטים חדשים (`is_new=true`)
- בלחיצה נפתח dropdown עם 6 הפריטים האחרונים
- קישור "כל העדכונים" לדף `/news`

---

## חלק 3 — דף חדשות מלא

### קובץ חדש: `src/pages/NewsPage.tsx`
- דף בנתיב `/news` שמציג את כל הפריטים
- אותו עיצוב כרטיסיות כמו בדף הבית
- סינון לפי קטגוריה
- טעינה מלאה מה-DB

---

## חלק 4 — אינטגרציה

### עדכון `src/pages/Index.tsx`
- הוספת `<NewsFeed />` מיד אחרי ה-Hero section

### עדכון `src/components/layout/Header.tsx`
- הוספת `<NewsNavButton />` אחרי אייקון החיפוש בדסקטופ
- הוספת קישור "עדכונים" בתפריט מובייל

### עדכון `src/App.tsx`
- הוספת route: `/news` → `NewsPage`

---

## פרטים טכניים

- ה-Supabase client החיצוני משתמש ב-publishable key — בטוח לשמור בקוד
- לא נוגעים ב-client.ts של הפרויקט — client נפרד לחלוטין
- שימוש ב-`@tanstack/react-query` לקאשינג ו-loading states
- RTL מלא, רספונסיבי

