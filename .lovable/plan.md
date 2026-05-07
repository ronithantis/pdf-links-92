## ארגון מחדש של דף הכלים הדיגיטליים לפי 5 קטגוריות

### מה משתנה
1. **`src/lib/modules-data.ts`** — הוספת שדה `category` לכל כלי + הגדרת רשימת הקטגוריות עם כותרת ותיאור.
2. **`src/pages/DigitalTools.tsx`** — שינוי הרינדור: במקום grid אחד שטוח, חמישה sections (אחד לכל קטגוריה), עם כותרת ותיאור לכל אחד.

### חמש הקטגוריות (כותרת + משפט תיאור)

1. **גיוס, חוזים וקליטת עובד** — ריכוז כלל הכלים הדרושים בשלב תחילת ההעסקה או החלפת מטפל
2. **זכויות, כספים והטבות** — הכלים המעניקים מענה לדרישות החוק, מיצוי זכויות וניהול תקציב
3. **ניהול הטיפול השוטף** — כלים דיגיטליים המסייעים בתפעול היום-יומי ובקשר עם המטפל והמשפחה
4. **תכנון משפטי ועתידי** — הסדרת הרצונות וההגנות המשפטיות של המטופל לטווח הארוך
5. **כלים נוספים** — קטגוריה לכלים כלליים, כלי עזר לוגיסטיים וכלים חדשים שיצטרפו בעתיד

### שיוך הכלים (24 בסך הכל)

**1. גיוס, חוזים וקליטת עובד (6):**
`interview-manager` · `worker-guide` · `expectations-alignment` · `contract-explanation` · `caregiver-replacement` · `holiday-selector`

**2. זכויות, כספים והטבות (7):**
`disability-tag-guide` · `salary-calculator` · `foreign-worker-rights` · `final-settlement-calc` · `nursing-claim-guide` · `expense-tracker` · `nursing-code-calculator`

**3. ניהול הטיפול השוטף (5):**
`daily-care` · `med-tracker` · `medicine-manager` · `family-sync` · `caregiver-communicator`
*הערה: הוספתי גם את `medicine-manager` (תרופות עם תמונות) שלא הופיע ברשימה שלך — קטגוריה זו מתאימה לו.*

**4. תכנון משפטי ועתידי (3):**
`poa-guide` · `will-template` · `life-compass`

**5. כלים נוספים (3):**
`blue-folder` · `emergency-protocol` · `printable-calendar`

### עיצוב
- כותרת קטגוריה: `text-2xl font-bold text-primary` עם משפט תיאור מתחת ב-`text-muted-foreground`
- מפריד עדין בין קטגוריות (margin / Separator)
- בתוך כל קטגוריה — אותו `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` שיש היום (לא לשנות עיצוב כרטיס)
- ה-deep-linking בעזרת `#tool-id` (location.hash) ימשיך לעבוד כי ה-id נשאר על הכרטיס

### מה לא משתנה
- אייקונים, באדג'ים (כלי חיצוני / בתשלום), טקסטים בכרטיסים
- לוגיקת פתיחת מודאל / ניווט פנימי / קישור חיצוני
- חיפוש גלובלי (`digitalTools` ממשיך להיות אותו מערך)