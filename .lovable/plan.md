

## מתווה: מערכת תרחישים, ניהול ידע ויועץ AI

### סקירת מצב נוכחי
- טבלת `knowledge_resources` **לא קיימת** (רק `assessment_responses` ב-DB) — צריך ליצור מאפס
- מרכז הידע כרגע hardcoded עם מצגות וסרטונים
- אין edge functions, אין אימות משתמשים, אין storage buckets
- LOVABLE_API_KEY קיים — ניתן להשתמש ב-Lovable AI

### שלב 1 — מבנה הנתונים (DB migrations)

**Migration 1: יצירת טבלאות + enum + RLS**

```sql
-- Enum לקטגוריות
CREATE TYPE public.knowledge_category AS ENUM ('forms', 'presentations', 'videos', 'other');

-- טבלת משאבים
CREATE TABLE public.knowledge_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category knowledge_category NOT NULL,
  title text NOT NULL,
  description text,
  resource_type text NOT NULL DEFAULT 'link', -- link / file / embed
  url text,
  subcategory text,
  icon_name text,
  sort_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  scenario_tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- טבלת תרחישים
CREATE TABLE public.scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  trigger_phrases text[] DEFAULT '{}',
  questions jsonb DEFAULT '[]',
  recommended_actions jsonb DEFAULT '[]',
  tags text[] DEFAULT '{}',
  is_published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS: קריאה ציבורית, כתיבה רק ל-admin
ALTER TABLE public.knowledge_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON public.knowledge_resources FOR SELECT USING (is_published = true);
CREATE POLICY "Public read" ON public.scenarios FOR SELECT USING (is_published = true);
```

**Migration 2: תפקידי admin**

```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Admin-only write policies
CREATE POLICY "Admin insert" ON public.knowledge_resources FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update" ON public.knowledge_resources FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete" ON public.knowledge_resources FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin insert" ON public.scenarios FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update" ON public.scenarios FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete" ON public.scenarios FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
```

**Migration 3: Storage bucket לקבצים**

```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('knowledge-files', 'knowledge-files', true);
CREATE POLICY "Public read" ON storage.objects FOR SELECT USING (bucket_id = 'knowledge-files');
CREATE POLICY "Admin upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'knowledge-files' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'knowledge-files' AND public.has_role(auth.uid(), 'admin'));
```

**הכנסת נתונים ראשוניים:** מיגרציה של כל המצגות והסרטונים הקיימים מה-hardcoded data + 2 התרחישים לדוגמה

### שלב 2 — אימות משתמשים

- עמוד Login/Signup פשוט (`/auth`)
- הגנת עמוד Admin — redirect אם לא מחובר או לא admin
- profiles table לא נדרש (אין צורך בנתונים נוספים על המשתמש)

### שלב 3 — שדרוג ממשק מרכז הידע

**`src/pages/KnowledgeCenter.tsx`** — שדרוג מלא:
- תצוגת 4 קטגוריות ראשיות (כרטיסים גדולים): טפסים, מצגות, סרטונים, אחר
- לחיצה → מעבר לתצוגת פריטים מסוננת מה-DB
- כפתור חזרה לקטגוריות
- חיפוש בתוך קטגוריה

**קומפוננטות חדשות:**
- `src/components/knowledge/CategoryGrid.tsx` — 4 כרטיסי קטגוריה
- `src/components/knowledge/ResourceList.tsx` — רשימת פריטים + חיפוש
- `src/components/knowledge/ResourceCard.tsx` — כרטיס פריט בודד

### שלב 4 — מערכת תרחישים

**`src/components/knowledge/ScenarioExplorer.tsx`:**
- תצוגת תרחישים מה-DB (כרטיסים)
- לחיצה על תרחיש → הצגת שאלות מנחות + פעולות מומלצות + משאבים רלוונטיים (לפי תגיות)
- הלוגיקה: שליפת `knowledge_resources` שה-`scenario_tags` שלהן חופפות ל-`tags` של התרחיש

### שלב 5 — יועץ חכם (SmartAdvisor) עם AI

**Edge Function: `supabase/functions/smart-advisor/index.ts`**
- מקבל טקסט חופשי מהמשתמש
- שולף את כל `knowledge_resources` מה-DB
- שולח ל-Lovable AI (gemini-3-flash-preview) עם system prompt + רשימת המשאבים
- משתמש ב-tool calling להחזרת JSON מובנה: summary, actions, relevant_resources
- מחזיר stream לקליינט

**`src/components/knowledge/SmartAdvisor.tsx`:**
- תיבת טקסט חופשית + כפתור "קבלו המלצות"
- מצב טעינה: "מנתחים את המצב..."
- תצוגת תוצאות: פעולות מומלצות + כרטיסי משאבים רלוונטיים

### שלב 6 — עמוד Admin

**`src/pages/AdminKnowledge.tsx`** (`/admin/knowledge`):
- טאבים: משאבים | תרחישים
- טבלה עם כל הרשומות + כפתורי עריכה/מחיקה
- טופס הוספה/עריכה (dialog) עם שדות: כותרת, תיאור, קטגוריה, URL/העלאת קובץ, scenario_tags
- העלאת קבצים ל-storage bucket

**Routes חדשים ב-App.tsx:**
- `/auth` — Login/Signup
- `/admin/knowledge` — ניהול תוכן (מוגן)

### סדר ביצוע

1. DB: יצירת טבלאות + enum + RLS + storage + user_roles
2. הכנסת נתונים ראשוניים (מצגות + סרטונים + 2 תרחישים)
3. Auth: עמוד login + הגנת admin
4. UI: מרכז ידע מחודש עם 4 קטגוריות + טעינה מ-DB
5. תרחישים: ScenarioExplorer + חיבור למשאבים
6. AI: Edge function + SmartAdvisor component
7. Admin: ממשק ניהול משאבים + תרחישים

