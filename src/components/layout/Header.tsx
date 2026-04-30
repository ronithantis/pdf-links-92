import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, X, Shield, BookOpen, FileText, Layout, GraduationCap, Wrench } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { modules, digitalTools } from "@/lib/modules-data";
import { glossaryData } from "@/lib/glossary-data";
import { openPresentation, shouldOpenInModal } from "@/components/PresentationModal";
import logo from "@/assets/logo.png";


const parts = [
  { number: 1, title: "המציאות החדשה", modules: modules.filter((m) => m.partNumber === 1) },
  { number: 2, title: "אבחון רפואי וטיפול", modules: modules.filter((m) => m.partNumber === 2) },
  { number: 3, title: "התמודדות עם דמנציה", modules: modules.filter((m) => m.partNumber === 3) },
  { number: 4, title: "תשתית משפטית", modules: modules.filter((m) => m.partNumber === 4) },
  { number: 5, title: "זכויות וגמלת סיעוד", modules: modules.filter((m) => m.partNumber === 5) },
  { number: 6, title: "כוח אדם וטכנולוגיה", modules: modules.filter((m) => m.partNumber === 6) },
  { number: 7, title: "היבטים קליניים", modules: modules.filter((m) => m.partNumber === 7) },
  { number: 8, title: "ניהול הטיפול", modules: modules.filter((m) => m.partNumber === 8) },
  { number: 9, title: "חלופות מגורים ואשפוז", modules: modules.filter((m) => m.partNumber === 9) },
  { number: 10, title: "רווחת המטפל", modules: modules.filter((m) => m.partNumber === 10) },
  { number: 11, title: "סוף החיים", modules: modules.filter((m) => m.partNumber === 11) },
];

type SearchSource = "page" | "module" | "glossary" | "tool";

interface SearchItem {
  label: string;
  description: string;
  url: string;
  source: SearchSource;
  sourceLabel: string;
}

// Build search index from all modules, sub-modules, site pages, and glossary
const sitePages: SearchItem[] = [
  { label: "מרכז הידע והכלים", description: "משאבים, תרחישים ויועץ חכם", url: "/knowledge-center", source: "page", sourceLabel: "דף באתר" },
  { label: "זכויות וחובות", description: "מידע על זכויות סוציאליות וחובות", url: "/rights", source: "page", sourceLabel: "דף באתר" },
  { label: "שירותים וציוד", description: "מדריך שירותים וספקים", url: "/services", source: "page", sourceLabel: "דף באתר" },
  { label: "סיוע מעמותות", description: "חיפוש עמותות וארגוני סיוע", url: "/organizations", source: "page", sourceLabel: "דף באתר" },
  { label: "כלים דיגיטליים", description: "מחשבונים, מעקב תרופות וכלים נוספים", url: "/digital-tools", source: "page", sourceLabel: "דף באתר" },
  { label: "תן וקח", description: "לוח תרומות וציוד יד שנייה", url: "/give-take", source: "page", sourceLabel: "דף באתר" },
  { label: "תרגול קוגניטיבי", description: "משחקים ותרגילים לחיזוק הזיכרון", url: "/cognitive-training", source: "page", sourceLabel: "דף באתר" },
  { label: "חיפוש עובד זר", description: "מנוע חיפוש עובדים זרים", url: "/foreign-worker-search", source: "page", sourceLabel: "דף באתר" },
  { label: "מתווה שאלות לראיון עובד זר", description: "טופס מובנה עם שאלות מומלצות לראיון מועמד/ת לתפקיד מטפל/ת", url: "/forms", source: "page", sourceLabel: "טופס" },
  { label: "טפסים ומסמכים", description: "טפסים להורדה ומילוי", url: "/forms", source: "page", sourceLabel: "דף באתר" },
  { label: "מעקב תרופות", description: "ניהול ומעקב אחר תרופות", url: "/med-tracker", source: "page", sourceLabel: "דף באתר" },
  
  { label: "צור קשר", description: "יצירת קשר עם הצוות", url: "/contact", source: "page", sourceLabel: "דף באתר" },
  { label: "אודות", description: "אודות האתר והצוות", url: "/about", source: "page", sourceLabel: "דף באתר" },
  { label: "מילון מושגים", description: "הסבר מהיר למושגים בסיעוד וגיל שלישי", url: "/glossary", source: "page", sourceLabel: "דף באתר" },
];

// Specific knowledge resources surfaced in global search
const knowledgeHighlights: SearchItem[] = [
  {
    label: "גמר חשבון להעסקה ישירה",
    description: "מצגת — מה משלמים לעובד זר בפטירה, פיטורים או התפטרות (פיצויים, פנסיה, הבראה, חופשה)",
    url: "https://drive.google.com/file/d/1HpjQfa4VIgS-I5cDI_FBWx0b4VQzLiE0/preview",
    source: "page",
    sourceLabel: "מצגת · מרכז הידע",
  },
  {
    label: "סימולציית עלות עובד זר בהעסקה ישירה",
    description: "מצגת בחלון צף — כמה עולה להעסיק עובד זר? שכר, זכויות, יום מנוחה, ניכויים וסיכום תרחישים (אפריל 2026)",
    url: "/presentations/foreign-worker-cost-simulator.html",
    source: "page",
    sourceLabel: "מצגת · מרכז הידע",
  },
  {
    label: "כמה עולה / יעלה לי להעסיק עובד זר?",
    description: "תרחיש מלא: סימולציית עלות חודשית להעסקה ישירה — כולל מחשבון, זכויות וניכויים",
    url: "/knowledge-center?scenario=ea99afaa-ada5-45d2-b41b-0be66a758805",
    source: "page",
    sourceLabel: "תרחיש · מרכז הידע",
  },
  {
    label: "אבי/אימי נפטר — איך עושים גמר חשבון לעובד הזר?",
    description: "תרחיש מלא: חישוב פיצויים, הודעה מוקדמת, פדיון חופשה ודמי הבראה במקרה של פטירת המטופל",
    url: "/knowledge-center?scenario=158377d8-80a1-48aa-9ab5-a334e8a907ad",
    source: "page",
    sourceLabel: "תרחיש · מרכז הידע",
  },
  // Recipes guide — opens in floating modal. Surface for: מתכונים, מזון, אוכל, בליעה, דיספגיה
  {
    label: "מתכונים לאדם סיעודי",
    description: "מדריך מתכונים בחלון צף — מה נותנים לאכול, אוכל מזין, רעיונות לאדם שמתקשה בבליעה (דיספגיה), מרקמים מותאמים, ארוחות לאדם שלא רוצה לאכול",
    url: "https://ronithantis.github.io/RECIPES/",
    source: "page",
    sourceLabel: "מדריך · מרכז הידע",
  },
  // End-of-life: surface for keywords מוות, מת, נפטר, נפטרה, סוף החיים, פטירה, אבל, לוויה, שבעה
  {
    label: "סוף החיים — מוות, פטירה ואבל",
    description: "פרק 11 המלא: השעות הראשונות לאחר מוות/פטירה, קבורה, לוויה, שבעה, גמר חשבון, צוואה, ירושה וניהול עיזבון. מת/נפטר/נפטרה",
    url: "/module/chapter-11",
    source: "module",
    sourceLabel: "פרק לימוד · סוף החיים",
  },
  {
    label: "ההורה נפטר – מה עושים בימים הראשונים?",
    description: "תרחיש: צעדים מיידיים לאחר מוות/פטירה — הודעה, רישיון קבורה, לוויה, שבעה והודעות לגורמים. נפטר נפטרה מת",
    url: "/knowledge-center?scenario=ff217c45-d921-4b71-95f1-a0144d6e82e7",
    source: "page",
    sourceLabel: "תרחיש · מרכז הידע",
  },
  {
    label: "השעות הראשונות לאחר פטירה",
    description: "מה עושים מיד כשההורה נפטר/נפטרה: קביעת מוות, הודעה למשפחה, רישיון קבורה והוצאת הגופה",
    url: "/module/chapter-11?section=11.1",
    source: "module",
    sourceLabel: "פרק לימוד · סוף החיים",
  },
  {
    label: "סידור הקבורה והלוויה",
    description: "בחירת חלקת קבר, תיאום לוויה, פרסום הודעות אבל ולוגיסטיקה ביום הפטירה",
    url: "/module/chapter-11?section=11.2",
    source: "module",
    sourceLabel: "פרק לימוד · סוף החיים",
  },
  {
    label: "שבעה ומסורת אבלות",
    description: "ארגון השבעה, חלוקת תפקידים במשפחה, גבולות בריאים וקבלת מנחמים לאחר מוות של הורה",
    url: "/module/chapter-11?section=11.5",
    source: "module",
    sourceLabel: "פרק לימוד · סוף החיים",
  },
  {
    label: "מענק פטירה ודמי קבורה",
    description: "תנאי זכאות, מי משלם (ביטוח לאומי) וכיצד מגישים בקשה לאחר פטירה/מוות",
    url: "/module/chapter-11?section=11.7",
    source: "module",
    sourceLabel: "פרק לימוד · סוף החיים",
  },
  {
    label: "צוואה, ירושה וניהול עיזבון",
    description: "חיפוש צוואה, צו קיום צוואה, צו ירושה ללא צוואה, וניהול עיזבון לאחר מוות/פטירת ההורה",
    url: "/module/chapter-11?section=11.8",
    source: "module",
    sourceLabel: "פרק לימוד · סוף החיים",
  },
  {
    label: "היבטים רוחניים ורגשיים בסוף החיים",
    description: "התמודדות רגשית עם פרידה, מוות ואובדן — תמיכה למטופל ולמשפחה בסוף החיים",
    url: "/knowledge-center?tab=resources",
    source: "page",
    sourceLabel: "מרכז הידע",
  },
];

const glossaryIndex: SearchItem[] = glossaryData.flatMap((cat) =>
  cat.terms.map((term) => ({
    label: term.name,
    description: term.definition.length > 80 ? term.definition.slice(0, 80) + "…" : term.definition,
    url: `/glossary?q=${encodeURIComponent(term.name)}`,
    source: "glossary" as SearchSource,
    sourceLabel: `מילון מושגים · ${cat.category}`,
  }))
);

const toolsIndex: SearchItem[] = digitalTools.map((tool) => ({
  label: tool.title,
  description: tool.description,
  url: (tool as any).isInternal ? tool.toolUrl! : `/tools#${tool.id}`,
  source: "tool" as SearchSource,
  sourceLabel: "כלי דיגיטלי",
}));

const searchIndex: SearchItem[] = [
  ...sitePages,
  ...knowledgeHighlights,
  ...modules.flatMap((mod) => [
    { label: mod.title, description: mod.description, url: `/module/${mod.id}`, source: "module" as SearchSource, sourceLabel: "פרק לימוד" },
    ...mod.subModules.map((sub) => ({
      label: sub.title,
      description: sub.description,
      url: `/module/${mod.id}?section=${sub.id}`,
      source: "module" as SearchSource,
      sourceLabel: "פרק לימוד",
    })),
  ]),
  ...glossaryIndex,
  ...toolsIndex,
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const q = searchQuery.trim();
    // Score: 0 = label starts with query, 1 = label contains, 2 = description contains
    const scored = searchIndex
      .map((item) => {
        if (item.label.startsWith(q)) return { ...item, score: 0 };
        if (item.label.includes(q)) return { ...item, score: 1 };
        if (item.description.includes(q)) return { ...item, score: 2 };
        return null;
      })
      .filter(Boolean) as (SearchItem & { score: number })[];
    scored.sort((a, b) => a.score - b.score);
    return scored.slice(0, 10);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      {/* Row 1: Logo + Quick Links */}
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="HUB2CARE" className="h-9 w-9 object-contain" />
          <div className="flex flex-col">
            <span className="text-base font-bold text-primary leading-tight">מרכז הידע והכלים</span>
            <span className="hidden text-xs text-muted-foreground sm:block">למשפחות מטפלות בהורה מבוגר</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {/* Quick Search */}
          <div ref={searchRef} className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-1">
                <input
                  ref={inputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchResults.length > 0) {
                      const top = searchResults[0];
                      const u = top.url;
                      if (shouldOpenInModal(u)) {
                        openPresentation(u, top.label);
                      } else if (u.startsWith("http")) {
                        window.open(u, "_blank", "noopener");
                      } else {
                        navigate(u);
                      }
                      setSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                  placeholder="חיפוש מהיר..."
                  className="h-8 w-52 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
                />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                  <X className="h-4 w-4" />
                </Button>
                {searchQuery.length >= 2 && (
                  <div className="absolute top-10 left-0 right-0 w-96 bg-popover border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                    {searchResults.length === 0 ? (
                      <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                        לא נמצאו תוצאות עבור "{searchQuery}"
                      </div>
                    ) : (
                      searchResults.map((result, i) => (
                        <button
                          key={i}
                          className="w-full text-right px-3 py-2.5 text-sm hover:bg-muted transition-colors border-b last:border-b-0"
                          onClick={() => {
                            if (shouldOpenInModal(result.url)) {
                              openPresentation(result.url, result.label);
                            } else if (result.url.startsWith("http")) {
                              window.open(result.url, "_blank", "noopener");
                            } else {
                              navigate(result.url);
                            }
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                              result.source === "glossary" 
                                ? "bg-accent/20 text-accent-foreground" 
                                : result.source === "module" 
                                ? "bg-primary/10 text-primary" 
                                : result.source === "tool"
                                ? "bg-warm/10 text-warm"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {result.source === "glossary" && <BookOpen className="h-2.5 w-2.5" />}
                              {result.source === "module" && <GraduationCap className="h-2.5 w-2.5" />}
                              {result.source === "page" && <Layout className="h-2.5 w-2.5" />}
                              {result.source === "tool" && <Wrench className="h-2.5 w-2.5" />}
                              {result.sourceLabel}
                            </span>
                          </div>
                          <div className="font-medium mt-0.5">{result.label}</div>
                          <div className="text-xs text-muted-foreground truncate">{result.description}</div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSearchOpen(true)}>
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <Link to="/rights" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            זכויות וחובות
          </Link>
          <Link to="/knowledge-center" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            מרכז הידע
          </Link>
          <Link to="/give-take" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            קח ותן
          </Link>
          <Link to="/ad-elai" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            שירותים וציוד
          </Link>
          <Link to="/organizations" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            סיוע מעמותות
          </Link>
          <Link to="/tools" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            כלים דיגיטליים
          </Link>
          <Link to="/cognitive-training" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            תרגול קוגניטיבי
          </Link>
          <Link to="/foreign-worker-search" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            חיפוש עובד זר
          </Link>
          <Link to="/about" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            אודות
          </Link>
          <Link to="/contact" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            צור קשר
          </Link>
          {isAdmin && (
            <Link to="/admin/knowledge" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" />
              ניהול
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="תפריט ניווט">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetTitle className="text-lg font-bold text-primary mb-4">תפריט ניווט</SheetTitle>
            <nav className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-base font-semibold text-primary">
                דף הבית
              </Link>
              {parts.map((part) => (
                <div key={part.number}>
                  <h3 className="text-sm font-bold text-muted-foreground mb-2">פרק {part.number}: {part.title}</h3>
                  {part.modules.map((mod) => (
                    <Link
                      key={mod.id}
                      to={`/module/${mod.id}`}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      {mod.title}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="border-t pt-3 space-y-1">
                <Link to="/rights" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  זכויות וחובות
                </Link>
                <Link to="/knowledge-center" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  מרכז הידע
                </Link>
                <Link to="/give-take" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  קח ותן
                </Link>
                <Link to="/ad-elai" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  שירותים וציוד
                </Link>
                <Link to="/organizations" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  סיוע מעמותות
                </Link>
                <Link to="/tools" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  כלים דיגיטליים
                </Link>
                <Link to="/cognitive-training" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  תרגול קוגניטיבי
                </Link>
                <Link to="/foreign-worker-search" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  חיפוש עובד זר
                </Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  אודות
                </Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  צור קשר
                </Link>
                {isAdmin && (
                  <Link to="/admin/knowledge" onClick={() => setIsOpen(false)} className="flex items-center gap-1 text-sm font-medium py-2 px-3 hover:bg-muted rounded-md text-primary">
                    <Shield className="h-3.5 w-3.5" />
                    ניהול
                  </Link>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Row 2: Chapters Navigation (Desktop only) */}
      <div className="hidden lg:block border-t border-border/50 bg-muted/30">
        <div className="container py-1">
          <nav className="flex flex-wrap items-center gap-0.5">
            {parts.map((part) => {
              const firstModule = part.modules[0];
              if (!firstModule) return null;
              return (
                <Link
                  key={part.number}
                  to={`/module/${firstModule.id}`}
                  className="flex items-center gap-1 text-xs font-medium h-7 px-1.5 rounded-md hover:bg-accent/20 transition-colors"
                >
                  <span className="w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold min-w-[18px]">
                    {part.number}
                  </span>
                  <span className="whitespace-nowrap">{part.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
