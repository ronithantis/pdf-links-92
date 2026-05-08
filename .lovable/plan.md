## מה לתקן

**1. צבע הכותרת בלוגו (Header)**
בצילום המסך המקורי הכותרת "מרכז הידע והכלים" מופיעה בכחול כהה נייבי (#1d3557). כיום ב-`Header.tsx` שורה 313 הכותרת משתמשת ב-`text-primary`, וה-`--primary` ב-`index.css` הוא טורקיז (`hsl(195 60% 36%)`) — לכן היא נראית טורקיז/כהה ולא הנייבי המקורי.

**הפתרון:** להוסיף טוקן ייעודי `--brand-navy: 210 50% 23%` (≈#1d3557) ב-`index.css` + מחלקה `text-brand-navy` ב-`tailwind.config.ts`, ולהחליף את `text-primary` בכותרת הלוגו ל-`text-brand-navy`. כך הצבע נשמר זהה ב-light/dark ולא מושפע משינויי primary עתידיים.

**2. שוליים עליונים לסרטון ההירו**
ב-`src/pages/Index.tsx` סקציית ה-Hero מתחילה צמודה לסרגל הניווט (`<section className="relative overflow-hidden bg-background">`). נוסיף ריווח עליון עדין (`pt-4 md:pt-6`) כדי שהסרטון "ינשום" מתחת להדר.

## קבצים שישתנו

- `src/index.css` — הוספת `--brand-navy: 210 50% 23%` תחת `:root` ו-`.dark`.
- `tailwind.config.ts` — מיפוי `brand: { navy: "hsl(var(--brand-navy))" }` תחת `colors`.
- `src/components/layout/Header.tsx` — שורה 313: `text-primary` → `text-brand-navy`.
- `src/pages/Index.tsx` — שורה 73: הוספת `pt-4 md:pt-6` ל-section ההירו.

## מה לא משתנה

- שאר ה-primary (טורקיז) נשאר כפי שהוא — כפתורים, badges, יועץ חכם.
- מבנה הסרגל, גודל הסרטון, וכל שאר הדף.
