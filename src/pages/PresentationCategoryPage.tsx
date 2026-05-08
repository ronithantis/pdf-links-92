import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import ResourceCard from "@/components/knowledge/ResourceCard";
import {
  AUDIENCE_OPTIONS,
  STAGE_OPTIONS,
  TOPIC_OPTIONS,
  getCategoryBySlug,
} from "@/lib/presentation-categories";

type TagGroup = "audience" | "stage" | "topic";

const PresentationCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = getCategoryBySlug(categorySlug);
  const [resources, setResources] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<TagGroup, string[]>>({
    audience: [],
    stage: [],
    topic: [],
  });

  useEffect(() => {
    if (!category) return;
    (async () => {
      const { data } = await supabase
        .from("knowledge_resources")
        .select("*")
        .eq("category", "presentations")
        .eq("is_published", true)
        .order("sort_order");
      setResources((data || []).filter((r: any) => r.presentation_category === category.id));
    })();
  }, [category]);

  const toggle = (group: TagGroup, value: string) => {
    setFilters((f) => {
      const has = f[group].includes(value);
      return { ...f, [group]: has ? f[group].filter((v) => v !== value) : [...f[group], value] };
    });
  };

  const q = search.trim();
  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch =
        !q ||
        r.title?.includes(q) ||
        r.description?.includes(q) ||
        JSON.stringify(r.tags || {}).includes(q);
      if (!matchesSearch) return false;
      const tags = (r.tags || {}) as Record<TagGroup, string[]>;
      for (const group of ["audience", "stage", "topic"] as TagGroup[]) {
        if (filters[group].length === 0) continue;
        const rTags = tags[group] || [];
        if (!filters[group].some((v) => rTags.includes(v))) return false;
      }
      return true;
    });
  }, [resources, q, filters]);

  if (!category) {
    return (
      <div className="container py-10 max-w-6xl">
        <p>קטגוריה לא נמצאה.</p>
        <Link to="/resources/presentations" className="text-primary hover:underline">חזרה לכל המצגות</Link>
      </div>
    );
  }

  const renderChips = (label: string, group: TagGroup, options: string[]) => (
    <div>
      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = filters[group].includes(opt);
          return (
            <Badge
              key={opt}
              variant={active ? "default" : "outline"}
              className="cursor-pointer text-xs px-2.5 py-0.5"
              onClick={() => toggle(group, opt)}
            >
              {opt}
            </Badge>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="container py-10 max-w-6xl">
      <div className="mb-4">
        <Link to="/resources/presentations" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <IconArrowRight size={16} stroke={1.75} />
          חזרה לכל המצגות
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">{category.title}</h1>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </div>

      <div className="mb-5 max-w-md">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
          <IconSearch size={16} stroke={1.75} className="text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חיפוש בקטגוריה..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 rounded-lg border border-border bg-muted/30">
        {renderChips("סוג משתמש", "audience", AUDIENCE_OPTIONS)}
        {renderChips("שלב", "stage", STAGE_OPTIONS)}
        {renderChips("נושא", "topic", TOPIC_OPTIONS)}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">לא נמצאו מצגות התואמות לסינון</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((r) => <ResourceCard key={r.id} resource={r} />)}
        </div>
      )}
    </div>
  );
};

export default PresentationCategoryPage;