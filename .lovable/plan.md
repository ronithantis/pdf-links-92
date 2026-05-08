## שלב C2 — ניקוי מרכז הידע

אשכתב את `src/pages/KnowledgeCenter.tsx` כך שיציג רק את 11 הפרקים + קישור למילון. הקבצים האחרים (SmartAdvisor, ScenarioExplorer, ResourceList, CategoryGrid, ToolsResources, ניתובים, Header) לא ייגעו — כל הפונקציונליות הקיימת נשמרת ונגישה דרך עמודים אחרים (`/tools-resources`, `/glossary`, וכן יועץ/תרחישים אם מקושרים מבחוץ).

### מה יוסר מהעמוד
- ה-`Tabs` ושלושת הטאבים (יועץ חכם / תרחישים / משאבים)
- קומפוננטות `CategoryGrid`, `ResourceList`, `SmartAdvisor`, `ScenarioExplorer` ושימוש ב-`supabase` לספירת קטגוריות
- כפתור "מילון מושגים" הקטן הקיים (יוחלף בכרטיס רחב בתחתית)

### מה ייבנה במקום (באותו קובץ)
1. **Breadcrumb**: "בית › מרכז הידע" (משתמש ב-`Breadcrumbs` הגלובלי שכבר ב-Layout — אין צורך להוסיף ידנית, כבר מטופל ע"י `STATIC_LABELS`. אוודא שהתווית "מרכז הידע" קיימת; אם לא — אוסיף).
2. **כותרת**: `מרכז הידע`
3. **תת-כותרת**: `11 פרקי מידע מקיפים על טיפול בהורה מבוגר`
4. **שדה חיפוש מקומי** עם placeholder `חיפוש בתוך הפרקים והנושאים...` — מסנן את הגריד לפי `title`/`description`/`subModules.title` (state מקומי, ללא ניווט).
5. **גריד 11 כרטיסים** (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap 4):
   - מקור הנתונים: `modules` מ-`src/lib/modules-data.ts` (כבר קיים, 11 פרקים תואמים בדיוק לרשימה שלך כולל ספירת תתי-נושאים).
   - עיצוב: `bg-white border border-border/50 rounded-xl p-4 hover:shadow-md transition`
   - בראש: עיגול אפור (`bg-muted h-7 w-7 rounded-full`) עם מספר הפרק + טקסט `פרק {n}` (12px muted)
   - כותרת הפרק (text-sm font-medium / 14px weight 500)
   - תיאור (text-xs text-muted-foreground)
   - בתחתית: `{subModules.length} נושאים ←` (text-xs text-muted-foreground)
   - לחיצה על הכרטיס מנווטת אל `/module/{module.id}` (תואם ל-`Route /module/:moduleId` הקיים)
6. **כרטיס מילון מושגים** רחב מתחת לגריד:
   - `bg-[hsl(var(--surface-warm))]` או רקע אפור-בז' עדין תואם, `rounded-xl p-5`
   - מימין: אייקון `BookOpen` + "מילון מושגים" + תיאור "הסבר מקצועי למונחים"
   - משמאל: `ArrowLeft`
   - לחיצה → `navigate("/glossary")`

### בטיחות / אי-פגיעה בתפקוד
- לא מוחקים את `SmartAdvisor`, `ScenarioExplorer`, `CategoryGrid`, `ResourceList` — נשארים בשימוש ב-`/tools-resources` ובניתובים ישירים.
- אם מגיעים ל-`/knowledge-center?tab=advisor&q=...` (מהחיפוש הגלובלי / chips), צריך להפנות לעמוד היועץ. אבדוק אם יש עמוד עצמאי ליועץ; אם אין — אשמור fallback קטן: כשה-URL מכיל `?tab=advisor` או `?tab=scenarios` או `?scenario=...`, אנתב אוטומטית לעמוד המתאים (או אציג את הקומפוננטה). **אאשר את הגישה איתך לפני המימוש**: עדיף (א) להפנות ל-`/tools-resources?tab=advisor` אם קיים, או (ב) להשאיר את היועץ נגיש דרך הסרגל בלבד, או (ג) לשמור fallback בקובץ הזה.
- שאר הקישורים (סרגל ניווט, Header) לא משתנים.

### קבצים שייגעו
- `src/pages/KnowledgeCenter.tsx` — שכתוב מלא
- (אם נדרש) `src/components/layout/Breadcrumbs.tsx` — אוודא שהתווית "מרכז הידע" קיימת ל-`/knowledge-center`

### שאלה אחת לפני ביצוע
מה לעשות עם הגעה ל-`/knowledge-center?tab=advisor` או `?scenario=...` (לדוגמה מצ'יפים בדף הבית או מהחיפוש הגלובלי)? — להפנות ל-`/tools-resources`, או לשמור פתיחה אוטומטית של היועץ/תרחישים בעמוד הזה כ-fallback?