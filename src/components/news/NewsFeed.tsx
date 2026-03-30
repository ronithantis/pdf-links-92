import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ExternalLink, Newspaper, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLatestNews, NEWS_CATEGORIES, type NewsItem } from "@/lib/news-client";

const categoryColors: Record<string, string> = {
  "ביטוח לאומי": "bg-blue-100 text-blue-800",
  "עובדים זרים": "bg-purple-100 text-purple-800",
  "בריאות": "bg-rose-100 text-rose-800",
  "זכויות": "bg-amber-100 text-amber-800",
  "המלצה": "bg-emerald-100 text-emerald-800",
};

function NewsCard({ item }: { item: NewsItem }) {
  const dateStr = new Date(item.published_at).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "short",
  });

  return (
    <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 h-full flex flex-col">
      <CardContent className="p-4 flex flex-col flex-1 gap-2">
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
        <h3 className="font-bold text-sm leading-snug line-clamp-2">{item.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">{item.summary}</p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
          <span className="text-[10px] text-muted-foreground">{item.source_name}</span>
          {item.source_url && (
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium hover:underline flex items-center gap-1"
              style={{ color: "#1d3557" }}
            >
              קראו עוד
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState("הכל");

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["news-latest"],
    queryFn: () => fetchLatestNews(12),
    staleTime: 5 * 60 * 1000,
  });

  const filtered = activeCategory === "הכל"
    ? news.slice(0, 6)
    : news.filter((n) => n.category === activeCategory).slice(0, 6);

  return (
    <section className="py-10 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1d3557" }}>
              <Newspaper className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">עדכונים וחדשות</h2>
              <p className="text-sm text-muted-foreground">חדשות רלוונטיות למשפחות מטפלות</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link to="/news">
              כל העדכונים
              <ArrowLeft className="h-4 w-4 mr-1" />
            </Link>
          </Button>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">אין עדכונים בקטגוריה זו</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="text-center mt-6 sm:hidden">
          <Button variant="outline" size="sm" asChild>
            <Link to="/news">
              כל העדכונים
              <ArrowLeft className="h-4 w-4 mr-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
