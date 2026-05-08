import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BookOpen, ArrowLeft, ArrowRight, Search, FileText, Presentation, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { modules } from "@/lib/modules-data";
import { resourceCounts } from "@/lib/resource-counts";

const KnowledgeCenter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  // Backwards-compat: external links to ?tab=advisor / ?tab=scenarios / ?scenario=
  // redirect to /tools-resources where those features now live.
  useEffect(() => {
    const tab = searchParams.get("tab");
    const scenario = searchParams.get("scenario");
    if (tab === "advisor" || tab === "scenarios" || scenario) {
      const qs = searchParams.toString();
      navigate(`/tools-resources${qs ? `?${qs}` : ""}`, { replace: true });
    }
  }, [searchParams, navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter((m) => {
      if (m.title.toLowerCase().includes(q)) return true;
      if (m.description.toLowerCase().includes(q)) return true;
      return m.subModules.some(
        (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <div className="container py-10 space-y-8">
      <div>
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowRight className="h-4 w-4 ml-1" />
          חזרה לדף הבית
        </Button>
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">מרכז הידע</h1>
        <p className="text-base text-muted-foreground">
          11 פרקי מידע מקיפים על טיפול בהורה מבוגר
        </p>
      </div>

      <div className="max-w-md mx-auto relative">
        <Search className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חיפוש בתוך הפרקים והנושאים..."
          className="pr-9"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <button
            key={m.id}
            onClick={() => navigate(`/module/${m.id}`)}
            className="text-right bg-white border border-border/60 rounded-xl p-4 hover:shadow-md hover:border-primary/40 transition-all flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-muted text-foreground/70 flex items-center justify-center text-xs font-semibold">
                {m.partNumber}
              </span>
              <span className="text-xs text-muted-foreground">פרק {m.partNumber}</span>
            </div>
            <h3 className="text-sm font-medium leading-snug">{m.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">{m.description}</p>
            <div className="text-xs text-muted-foreground/80 pt-1">
              {m.subModules.length} נושאים ←
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground py-8">
            לא נמצאו פרקים תואמים לחיפוש
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/glossary")}
        className="w-full flex items-center justify-between gap-4 rounded-xl p-5 hover:shadow-md transition-all text-right border border-border/40"
        style={{ backgroundColor: "#F1EFE8" }}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/70 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">מילון מושגים</div>
            <div className="text-xs text-muted-foreground">הסבר מקצועי למונחים</div>
          </div>
        </div>
        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
      </button>

      {/* Resource library — light teal tint to distinguish from chapters & glossary */}
      <div className="space-y-3 pt-2">
        <div className="text-right">
          <h2 className="text-lg font-semibold">ספריית משאבים</h2>
          <p className="text-xs text-muted-foreground">תכנים מוכנים לעיון או הורדה</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { to: "/resources/videos", icon: BookMarked, title: "מדריכים", desc: "מדריכים יישומיים למטפלים", count: resourceCounts.guides },
            { to: "/resources/presentations", icon: Presentation, title: "מצגות", desc: "מצגות מקצועיות על כל הנושאים", count: resourceCounts.presentations },
            { to: "/resources/forms", icon: FileText, title: "טפסים", desc: "טפסים ומסמכים להורדה", count: resourceCounts.forms },
          ].map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.to}
                onClick={() => navigate(r.to)}
                className="text-right rounded-xl p-4 hover:shadow-md transition-all flex flex-col gap-2 border border-border/40"
                style={{ backgroundColor: "hsl(195, 55%, 92%)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-white/70 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{r.title}</span>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed flex-1">{r.desc}</p>
                <div className="text-xs text-foreground/60 pt-1">{r.count} פריטים ←</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCenter;
