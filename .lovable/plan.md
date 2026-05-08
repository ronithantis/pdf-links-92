## מטרה
לשפר את הנגישות הוויזואלית של עמוד המצגות (`/resources/presentations`) על ידי:
1. הוספת כפתור **"כל המצגות"** בראש העמוד שמציג את כל המצגות בבת אחת.
2. הוספת **חלון תצוגה מקדימה (Popover)** שנפתח בריחוף/הקלקה על כרטיס קטגוריה — ומציג את רשימת המצגות באותה קטגוריה. הקלקה על מצגת תפתח אותה במודאל הקיים.

## שינויים

### 1. `src/pages/PresentationsHub.tsx`
- מעל רשת הקטגוריות, להוסיף שורת כפתורים:
  - כפתור ראשי **"כל המצגות"** (`Button variant="default"`) — כשהוא פעיל, מציג מתחתיו רשת של *כל* המצגות (אותו `ResourceCard` שבשימוש כיום).
  - כשהמצב "כל המצגות" כבוי — מציג את רשת הקטגוריות הקיימת.
- מצב פנימי: `view: "categories" | "all"`. ברירת מחדל `categories`. חיפוש פעיל גובר על שני המצבים (כמו היום).

### 2. כרטיס קטגוריה — תצוגת ריחוף/הקלקה
- לעטוף כל כרטיס קטגוריה ב-`HoverCard` (Radix, כבר זמין דרך shadcn אם נוסיף; אחרת `Popover` עם `onMouseEnter`).
- בחירת רכיב: **`HoverCard`** — נפתח בריחוף וגם בפוקוס מקלדת. הקלקה רגילה על הכרטיס תמשיך לנווט לעמוד הקטגוריה (התנהגות קיימת נשמרת).
- תוכן ה-HoverCard:
  - כותרת הקטגוריה.
  - רשימה מקוצרת (עד ~8) של המצגות באותה קטגוריה — שם + תיאור קצר.
  - כל פריט הוא כפתור שלוחץ → קורא ל-`openPresentation(url, title)` מ-`PresentationModal` (אם `shouldOpenInModal(url)`), אחרת פותח בחלון חדש.
  - בתחתית: קישור "צפה בכל המצגות בקטגוריה ←" → מנווט ל-`/resources/presentations/:slug`.
- הנתונים כבר נטענים ב-`PresentationsHub` (`resources` state) — נסנן לפי `presentation_category === cat.id`. אין שינוי DB / לוגיקה עסקית.

### 3. רכיב `HoverCard`
- אם לא קיים בפרויקט (`src/components/ui/hover-card.tsx`) — להוסיף את גרסת shadcn הסטנדרטית (wrapper מעל `@radix-ui/react-hover-card`). בדיקה תיעשה לפני יצירה.

## מה לא משתנה
- לא נוגעים ב-`PresentationCategoryPage`, ב-`PresentationModal`, ב-Smart Advisor, בחיפוש הגלובלי, בהפניות חיצוניות, או בנתוני המצגות עצמם.
- אין שינוי DB, אין שינוי ב-`presentation-categories.ts`.
- נתיבים נשארים זהים.

## פרטים טכניים
- פתיחת מצגת: שימוש ב-`openPresentation` ו-`shouldOpenInModal` המיוצאים מ-`src/components/PresentationModal.tsx`.
- עיצוב: שימוש בטוקנים סמנטיים בלבד (primary, border, muted-foreground וכו').
- RTL: רשימת המצגות בחלון מיושרת לימין; חץ "צפה בכל" משתמש ב-`IconArrowLeft` בכיוון הנכון.
