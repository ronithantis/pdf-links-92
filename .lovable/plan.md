

## תכנית: פתיחת טפסים בחלון פנימי עם אפשרות הדפסה

### מה ישתנה

**`src/components/knowledge/ResourceCard.tsx`**
- לחיצה על טופס תפתח `Dialog` (חלון פנימי) במקום לנסות לפתוח טאב חדש
- בתוך הדיאלוג: `<iframe>` שמציג את ה-PDF
- סרגל עליון עם: שם הטופס, כפתור הדפסה (🖨️), כפתור מסך מלא, כפתור סגירה
- כפתור הדפסה יפעיל `window.print()` על ה-iframe או יפתח את ה-PDF בטאב חדש להדפסה
- מצב מסך מלא: הדיאלוג יתרחב לכל המסך (כמו שכבר עובד בדף הכלים הדיגיטליים)

### פרטים טכניים
- State חדש: `openFormUrl` ו-`openFormTitle` לניהול הדיאלוג
- שימוש ב-`Dialog` + `DialogContent` הקיימים
- כפתור הדפסה: `iframe.contentWindow.print()` עם fallback ל-`window.open(url)` למקרה שהדפדפן חוסם
- עיצוב דומה לחלון הכלים הדיגיטליים ב-`DigitalTools.tsx` (כבר ממומש שם)

### קבצים
- `src/components/knowledge/ResourceCard.tsx` - שינוי מרכזי

