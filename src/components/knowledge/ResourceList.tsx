import { useState, useEffect } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import ResourceCard from "./ResourceCard";

interface ResourceListProps {
  category?: string | null;
  onBack?: () => void;
}

const categoryLabels: Record<string, string> = {
  presentations: "מצגות",
  videos: "סרטונים",
  forms: "טפסים",
  other: "כלים נוספים",
};

const ResourceList = ({ category, onBack }: ResourceListProps) => {
  const [resources, setResources] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(category || null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      let query = supabase
        .from("knowledge_resources")
        .select("*")
        .eq("is_published", true)
        .order("sort_order");

      if (category) {
        query = query.eq("category", category as any);
      }

      const { data } = await query;
      setResources(data || []);
      setLoading(false);
    };
    fetchResources();
  }, [category]);

  const filtered = resources.filter((r) => {
    const matchesSearch = !search || 
      r.title.includes(search) ||
      r.description?.includes(search) ||
      r.subcategory?.includes(search);
    const matchesFilter = !activeFilter || r.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Group by subcategory
  const grouped = filtered.reduce((acc: Record<string, any[]>, r) => {
    const key = r.subcategory || categoryLabels[r.category] || "כללי";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  // Count per category for filter badges
  const categoryCounts = resources.reduce((acc: Record<string, number>, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowRight className="h-4 w-4 ml-1" />
              חזרה
            </Button>
          )}
          <h2 className="text-2xl font-bold">
            {category ? categoryLabels[category] || category : "כל המשאבים"}
          </h2>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חיפוש..."
            className="pr-9"
          />
        </div>
      </div>

      {/* Category filter pills - only when showing all */}
      {!category && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={activeFilter === null ? "default" : "outline"}
            className="cursor-pointer text-sm px-3 py-1"
            onClick={() => setActiveFilter(null)}
          >
            הכל ({resources.length})
          </Badge>
          {Object.entries(categoryLabels).map(([key, label]) => {
            const count = categoryCounts[key] || 0;
            if (count === 0) return null;
            return (
              <Badge
                key={key}
                variant={activeFilter === key ? "default" : "outline"}
                className="cursor-pointer text-sm px-3 py-1"
                onClick={() => setActiveFilter(activeFilter === key ? null : key)}
              >
                {label} ({count})
              </Badge>
            );
          })}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-muted-foreground">טוען...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">לא נמצאו פריטים</div>
      ) : (
        Object.entries(grouped).map(([subcategory, items]) => {
          const isFormCategory = category === "forms" || (items as any[])[0]?.category === "forms";
          return (
            <div key={subcategory}>
              {Object.keys(grouped).length > 1 && (
                <h3 className="text-lg font-semibold mb-4 text-primary">{subcategory}</h3>
              )}
              {isFormCategory ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(items as any[]).map((resource: any) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {(items as any[]).map((resource: any) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}

    </div>
  );
};

export default ResourceList;
