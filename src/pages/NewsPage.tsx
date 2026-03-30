import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Newspaper, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllNews, NEWS_CATEGORIES, type NewsItem } from "@/lib/news-client";

const categoryColors: Record<string, string> = {
  "ביטוח לאומי": "bg-blue-100 text-blue-800",
  "עובדים זרים": "bg-purple-100 text-purple-800",
  "בריאות": "bg-rose-100 text-rose-800",
  "זכויות": "bg-amber-100 text-amber-800",
  "המלצה": "bg-emerald-100 text-emerald-800",
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("הכל");

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["news-all", activeCategory],
    queryFn: () => fetchAllNews(activeCategory),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1d3557" }}>
          <Newspaper className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">עדכונים וחדשות</h1>
          <p className="text-muted-foreground">כל החדשות והעדכונים הרלוונטיים למשפחות מטפלות</p>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {NEWS_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            style={activeCategory === cat ? { backgroundColor: "#1d3557" } : undefined}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-52 rounded-lg" />
          ))}
        </div>
      ) : news.length === 0 ? (
        <p className="text-center text-muted-foreground py-16">אין עדכונים בקטגוריה זו</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.map((item) => (
            <NewsFullCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function NewsFullCard({ item }: { item: NewsItem }) {
  const dateStr = new Date(item.published_at).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 h-full flex flex-col">
      <CardContent className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {item.is_new && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#2a9d8f" }}>
              חדש
            </span>
          )}
          <Badge variant="secondary" className={`text-[10px] ${categoryColors[item.category] || "bg-muted text-muted-foreground"}`}>
            {item.category}
          </Badge>
          <span className="text-[10px] text-muted-foreground mr-auto">{dateStr}</span>
        </div>
        <h3 className="font-bold text-base leading-snug">{item.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.summary}</p>
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground">{item.source_name}</span>
          {item.source_url && (
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline flex items-center gap-1"
              style={{ color: "#1d3557" }}
            >
              קראו עוד
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
