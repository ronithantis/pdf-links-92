import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { supabase } from "@/integrations/supabase/client";
import { presentationCategories, getCategoryById } from "@/lib/presentation-categories";
import ResourceCard from "@/components/knowledge/ResourceCard";

const PresentationsHub = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("knowledge_resources")
        .select("*")
        .eq("category", "presentations")
        .eq("is_published", true)
        .order("sort_order");
      setResources(data || []);
    })();
  }, []);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of resources) {
      const k = (r as any).presentation_category || "_unassigned";
      m[k] = (m[k] || 0) + 1;
    }
    return m;
  }, [resources]);

  const q = search.trim();
  const searching = q.length >= 2;
  const filtered = useMemo(() => {
    if (!searching) return [];
    return resources.filter((r) =>
      r.title?.includes(q) ||
      r.description?.includes(q) ||
      JSON.stringify((r as any).tags || {}).includes(q)
    );
  }, [resources, q, searching]);

  return (
    <div className="container py-10 max-w-6xl">
      <div className="mb-4">
        <Link to="/tools-resources" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <IconArrowRight size={16} stroke={1.75} />
          חזרה לכלים ומשאבים
        </Link>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">מרכז הידע למטפלים ובני משפחה</h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          לפניכם אוסף מצגות ממוקדות ומבוססות ידע, שנועדו לסייע בהתמודדות עם מצבים מרכזיים בתחום הסיעוד והטיפול.
        </p>

        <div className="mt-5 max-w-md mx-auto">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <IconSearch size={16} stroke={1.75} className="text-muted-foreground shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="חיפוש מצגת לפי שם, תיאור או תגית..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {searching ? (
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-base font-semibold">תוצאות חיפוש</h2>
            <span className="text-xs text-muted-foreground">{filtered.length} מצגות</span>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">לא נמצאו מצגות</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((r) => <ResourceCard key={r.id} resource={r} />)}
            </div>
          )}
        </section>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {presentationCategories.map((cat) => {
            const { Icon } = cat;
            const count = counts[cat.id] || 0;
            return (
              <Link
                key={cat.id}
                to={`/resources/presentations/${cat.slug}`}
                className="block rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-sm transition-all"
                style={{ backgroundColor: "hsl(195, 60%, 96%)" }}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-lg p-2" style={{ backgroundColor: "hsl(195, 60%, 88%)" }}>
                    <Icon size={22} stroke={1.75} className="text-primary" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-sm font-semibold text-foreground mb-1">{cat.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
                    <div className="mt-2 text-[11px] text-muted-foreground/80">{count} מצגות</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PresentationsHub;