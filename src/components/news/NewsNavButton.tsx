import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Bell, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchLatestNews, type NewsItem } from "@/lib/news-client";

export default function NewsNavButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data: news = [] } = useQuery({
    queryKey: ["news-nav"],
    queryFn: () => fetchLatestNews(6),
    staleTime: 5 * 60 * 1000,
  });

  const newCount = news.filter((n) => n.is_new).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative gap-1 h-8 px-2"
        onClick={() => setOpen(!open)}
      >
        <Bell className="h-4 w-4" />
        <span className="text-xs hidden xl:inline">עדכונים</span>
        {newCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
            {newCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute top-10 left-0 w-80 bg-popover border rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="px-3 py-2 border-b font-bold text-sm flex items-center gap-2" style={{ color: "#1d3557" }}>
            <Bell className="h-4 w-4" />
            עדכונים אחרונים
          </div>
          <div className="max-h-80 overflow-y-auto">
            {news.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">אין עדכונים</p>
            ) : (
              news.map((item) => (
                <NewsDropdownItem key={item.id} item={item} onClose={() => setOpen(false)} />
              ))
            )}
          </div>
          <div className="border-t px-3 py-2 text-center">
            <Link
              to="/news"
              onClick={() => setOpen(false)}
              className="text-xs font-medium hover:underline"
              style={{ color: "#1d3557" }}
            >
              צפו בכל העדכונים →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function NewsDropdownItem({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  const dateStr = new Date(item.published_at).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "short",
  });

  return (
    <a
      href={item.source_url || "#"}
      target={item.source_url ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex gap-3 px-3 py-2.5 hover:bg-muted transition-colors border-b last:border-b-0"
      onClick={onClose}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          {item.is_new && (
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#2a9d8f" }} />
          )}
          <span className="text-sm font-medium line-clamp-1">{item.title}</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">{item.summary}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-muted-foreground">{item.source_name}</span>
          <span className="text-[10px] text-muted-foreground">•</span>
          <span className="text-[10px] text-muted-foreground">{dateStr}</span>
        </div>
      </div>
      {item.source_url && <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-1" />}
    </a>
  );
}
