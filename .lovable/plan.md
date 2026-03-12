

## מתווה: שדרוג מרכז הידע עם קטגוריות + מערכת ניהול תוכן

### מה נבנה

**חלק 1 - ממשק משתמש מחודש למרכז הידע:**
- עמוד ראשי עם 4 כרטיסיות גדולות ומזמינות: **טפסים**, **מצגות**, **סרטונים**, **אחר**
- לחיצה על קטגוריה מציגה את הקבצים/פריטים שלה ברשימת כרטיסים
- אפשרות חזרה לתצוגת הקטגוריות
- סינון וחיפוש בתוך כל קטגוריה

**חלק 2 - מערכת ניהול תוכן (CMS) בבסיס הנתונים:**
- טבלת `knowledge_resources` שתאחסן את כל הפריטים (כולל הקיימים שיועברו לDB)
- עמוד ניהול (`/admin/knowledge`) שמאפשר הוספה, עריכה ומחיקה של פריטים
- אפשרות העלאת קבצים (PDF, תמונות) לאחסון ענן
- סוג הקובץ, קטגוריה, כותרת, תיאור, קישור/קובץ

### מבנה הטבלה

```text
knowledge_resources
├── id (uuid, PK)
├── category (enum: forms, presentations, videos, other)
├── title (text)
├── description (text)
├── resource_type (text - link / file / embed)
├── url (text - קישור חיצוני או URL לקובץ)
├── subcategory (text - לסידור נוסף)
├── icon_name (text - שם אייקון)
├── sort_order (integer)
├── is_published (boolean, default true)
├── created_at (timestamptz)
├── updated_at (timestamptz)
```

Storage bucket: `knowledge-files` לקבצים מועלים.

### מבנה הקבצים

```text
src/pages/KnowledgeCenter.tsx     ← שדרוג: 4 קטגוריות + תצוגת פריטים
src/pages/AdminKnowledge.tsx      ← חדש: עמוד ניהול תוכן
src/components/knowledge/
  CategoryGrid.tsx                ← 4 כרטיסי קטגוריה
  ResourceCard.tsx                ← כרטיס פריט בודד
  ResourceForm.tsx                ← טופס הוספה/עריכה
```

### אימות וגישה

- מרכז הידע - פתוח לכולם (RLS: SELECT public)
- עמוד הניהול - ידרוש אימות. נוסיף אימות בסיסי (login) + טבלת `user_roles` עם הרשאת admin
- רק admin יכול INSERT/UPDATE/DELETE

### זרימת המשתמש

```text
מרכז הידע
  ┌──────────┬──────────┬──────────┬──────────┐
  │  טפסים   │  מצגות   │ סרטונים  │   אחר    │
  └────┬─────┴────┬─────┴────┬─────┴────┬─────┘
       │          │          │          │
       ▼          ▼          ▼          ▼
   רשימת פריטים בקטגוריה (כרטיסים עם חיפוש)
```

### שלבי ביצוע

1. יצירת טבלת `knowledge_resources` + storage bucket + RLS policies
2. יצירת טבלת `user_roles` + פונקציית `has_role` לבדיקת הרשאות
3. הוספת אימות (login/signup) + עמוד admin מוגן
4. שדרוג `KnowledgeCenter.tsx` - תצוגת 4 קטגוריות + טעינת נתונים מה-DB
5. בניית עמוד `AdminKnowledge.tsx` - טופס הוספה/עריכה/מחיקה + העלאת קבצים
6. מיגרציה של הנתונים הקיימים (מצגות + סרטונים) לטבלה

