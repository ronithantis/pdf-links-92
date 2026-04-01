import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { glossaryData } from "@/lib/glossary-data";

function fuzzyMatch(text: string, query: string): { match: boolean; score: number } {
  if (!query) return { match: true, score: 0 };
  const lower = text;
  if (lower.includes(query)) return { match: true, score: 0 };
  const words = query.split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.every((w) => lower.includes(w))) return { match: true, score: 1 };
  const tokens = lower.split(/[\s\/\-,".()]+/).filter((w) => w.length > 1);
  for (const tok of tokens) {
    if (Math.abs(tok.length - query.length) > 2) continue;
    let d = 0;
    const ml = Math.min(tok.length, query.length);
    for (let i = 0; i < ml; i++) if (tok[i] !== query[i]) d++;
    d += Math.abs(tok.length - query.length);
    if (d <= 1) return { match: true, score: 2 };
    if (d <= 2 && query.length >= 4) return { match: true, score: 3 };
  }
  return { match: false, score: 99 };
}

function highlightText(text: string, query: string) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200/70 text-inherit rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

const GlossaryPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(() => glossaryData.map((c) => c.category), []);

  const totalTerms = useMemo(
    () => glossaryData.reduce((sum, c) => sum + c.terms.length, 0),
    []
  );

  const results = useMemo(() => {
    const q = query.trim();
    const mode = q ? "search" : activeCategory ? "cat" : showAll ? "all" : null;
    if (!mode) return null;

    const out: { category: string; terms: { name: string; definition: string; score: number }[] }[] = [];
    let isFuzzy = false;

    for (const cat of glossaryData) {
      if (mode === "cat" && cat.category !== activeCategory) continue;
      const hits: { name: string; definition: string; score: number }[] = [];
      for (const t of cat.terms) {
        const r = fuzzyMatch(t.name + " " + t.definition, q);
        if (r.match) {
          hits.push({ ...t, score: r.score });
          if (r.score > 1) isFuzzy = true;
        }
      }
      if (hits.length > 0) {
        hits.sort((a, b) => a.score - b.score);
        out.push({ category: cat.category, terms: hits });
      }
    }

    const total = out.reduce((s, c) => s + c.terms.length, 0);
    return { groups: out, total, isFuzzy };
  }, [query, activeCategory, showAll]);

  const handleCategoryClick = (cat: string) => {
    setQuery("");
    if (activeCategory === cat) {
      setActiveCategory(null);
    } else {
      setActiveCategory(cat);
      setShowAll(false);
    }
  };

  const handleShowAll = () => {
    setQuery("");
    setActiveCategory(null);
    setShowAll(!showAll);
  };

  const handleSearchChange = (val: string) => {
    setQuery(val);
    if (val) {
      setActiveCategory(null);
      setShowAll(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="container py-10 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Button variant="ghost" size="sm" onClick={() => navigate("/knowledge-center")}>
          <ArrowRight className="h-4 w-4 ml-1" />
          חזרה למרכז הידע
        </Button>
      </div>

      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold">מילון מושגים</h1>
        </div>
        <p className="text-muted-foreground">
          {totalTerms} מושגים בסיעוד, זכויות, רפואה והעסקה — הסבר מהיר ופשוט
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="חפשו מושג..."
          className="pr-10 pl-10"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            className="cursor-pointer text-sm px-3 py-1.5 transition-colors"
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </Badge>
        ))}
        <Badge
          variant={showAll ? "default" : "outline"}
          className="cursor-pointer text-sm px-3 py-1.5 transition-colors"
          onClick={handleShowAll}
        >
          הצג הכל
        </Badge>
      </div>

      {/* Results meta */}
      {results && (
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{results.total}</span> מושגים
          {results.isFuzzy && query && (
            <span className="italic mr-2">— מציג תוצאות קרובות לחיפוש</span>
          )}
        </p>
      )}

      {/* Results */}
      {!results ? (
        <div className="text-center py-16 text-muted-foreground leading-relaxed">
          בחרו קטגוריה למעלה, חפשו מושג בשדה החיפוש,
          <br />
          או לחצו על <span className="font-semibold text-foreground">הצג הכל</span> לדפדוף חופשי.
        </div>
      ) : results.total === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          לא נמצאו תוצאות{query ? ` עבור "${query}"` : ""}
        </div>
      ) : (
        <div className="space-y-6">
          {results.groups.map((group) => (
            <div key={group.category}>
              {(results.groups.length > 1 || !activeCategory) && (
                <div className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-3 pb-2 border-b">
                  {group.category}
                </div>
              )}
              <div className="space-y-2">
                {group.terms.map((term) => (
                  <div
                    key={term.name}
                    className="border rounded-xl p-4 bg-card"
                  >
                    <div className="font-bold text-[15px] mb-1.5">
                      {highlightText(term.name, query.trim())}
                    </div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {highlightText(term.definition, query.trim())}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlossaryPage;
