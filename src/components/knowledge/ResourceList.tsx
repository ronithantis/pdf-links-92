import { useState, useEffect } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import ResourceCard from "./ResourceCard";

interface ResourceListProps {
  category: string;
  onBack: () => void;
}

const categoryTitles: Record<string, string> = {
  presentations: "מצגות",
  videos: "סרטונים",
  forms: "טפסים",
  other: "כלים נוספים",
};

const ResourceList = ({ category, onBack }: ResourceListProps) => {
  const [resources, setResources] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("knowledge_resources")
        .select("*")
        .eq("category", category as any)
        .eq("is_published", true)
        .order("sort_order");
      setResources(data || []);
      setLoading(false);
    };
    fetchResources();
  }, [category]);

  const filtered = search
    ? resources.filter(
        (r) =>
          r.title.includes(search) ||
          r.description?.includes(search) ||
          r.subcategory?.includes(search)
      )
    : resources;

  // Group by subcategory
  const grouped = filtered.reduce((acc: Record<string, any[]>, r) => {
    const key = r.subcategory || "כללי";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowRight className="h-4 w-4 ml-1" />
            חזרה
          </Button>
          <h2 className="text-2xl font-bold">{categoryTitles[category] || category}</h2>
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

      {loading ? (
        <div className="text-center py-10 text-muted-foreground">טוען...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">לא נמצאו פריטים</div>
      ) : (
        Object.entries(grouped).map(([subcategory, items]) => (
          <div key={subcategory}>
            {Object.keys(grouped).length > 1 && (
              <h3 className="text-lg font-semibold mb-4 text-primary">{subcategory}</h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {(items as any[]).map((resource: any) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ResourceList;
