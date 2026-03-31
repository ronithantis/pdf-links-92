import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, X, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { modules } from "@/lib/modules-data";
import logo from "@/assets/logo.png";
import NewsNavButton from "@/components/news/NewsNavButton";

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

// Build search index from all modules and sub-modules
const searchIndex = modules.flatMap((mod) => [
  { label: mod.title, description: mod.description, url: `/module/${mod.id}` },
  ...mod.subModules.map((sub) => ({
    label: `${sub.title}`,
    description: sub.description,
    url: `/module/${mod.id}?section=${sub.id}`,
  })),
]);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const searchResults = searchQuery.length >= 2
    ? searchIndex.filter(
        (item) =>
          item.label.includes(searchQuery) ||
          item.description.includes(searchQuery)
      ).slice(0, 8)
    : [];

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
                  placeholder="חיפוש מהיר..."
                  className="h-8 w-52 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
                />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                  <X className="h-4 w-4" />
                </Button>
                {searchResults.length > 0 && (
                  <div className="absolute top-10 left-0 right-0 w-80 bg-popover border rounded-md shadow-lg z-50 max-h-72 overflow-y-auto">
                    {searchResults.map((result, i) => (
                      <button
                        key={i}
                        className="w-full text-right px-3 py-2 text-sm hover:bg-muted transition-colors border-b last:border-b-0"
                        onClick={() => {
                          navigate(result.url);
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="font-medium">{result.label}</div>
                        <div className="text-xs text-muted-foreground truncate">{result.description}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSearchOpen(true)}>
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>
          <NewsNavButton />
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
                <Link to="/news" onClick={() => setIsOpen(false)} className="block text-sm font-medium py-2 px-3 hover:bg-muted rounded-md">
                  עדכונים וחדשות
                </Link>
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
