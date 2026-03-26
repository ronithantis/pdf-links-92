import { useState, useMemo } from "react";
import { Search, Star, MapPin, Phone, Users, Package, Check, Shield, AlertTriangle, Lock, X, Plus, Minus, ChevronLeft, ChevronRight, ExternalLink, Home, Heart, Smile, Wrench, Coffee, UserCheck, CircleAlert, Accessibility, Smartphone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  serviceProviders,
  equipProviders,
  serviceCategories,
  equipCategories,
  regions,
  wizardServiceChips,
  wizardEquipChips,
  truvifyCheckItems,
  legalTerms,
  type Provider,
} from "@/lib/ad-elai-data";

const TEAL = "hsl(195, 60%, 36%)";
const TEAL_DARK = "hsl(195, 60%, 26%)";
const TEAL_LIGHT = "hsl(195, 40%, 94%)";

// ── Rating Stars ──
const RatingStars = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => {
  if (rating === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="text-muted-foreground/50">☆☆☆☆☆</span>
        <span>טרם דורג</span>
      </div>
    );
  }
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-amber-500">{"★".repeat(full)}{half ? "★" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}</span>
      <span className="font-bold">{rating}</span>
      <span className="text-muted-foreground">({reviewCount} ביקורות)</span>
    </div>
  );
};

// ── Provider Card ──
const ProviderCard = ({ provider, onContact, onTruvify }: { provider: Provider; onContact: () => void; onTruvify: () => void }) => (
  <Card className="relative hover:-translate-y-1 hover:shadow-lg transition-all duration-200 border-[hsl(var(--border))]">
    <CardContent className="p-6">
      {provider.recommended && (
        <Badge className="absolute top-4 left-4 text-white text-xs" style={{ backgroundColor: TEAL }}>מומלץ</Badge>
      )}
      {provider.badge && (
        <Badge className="absolute top-4 left-4 bg-gray-700 text-white text-xs">{provider.badge}</Badge>
      )}

      <div className="text-xs font-bold mb-1.5 flex items-center gap-1.5" style={{ color: TEAL }}>
        {provider.categoryLabel}
      </div>

      {provider.truvifyVerified && (
        <button
          onClick={onTruvify}
          className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-2.5 border cursor-pointer transition-colors"
          style={{ background: "#0f172a", color: "#fff", borderColor: "#334155" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22d3ee" }} />
          TRUVIFY ✓ אומת
        </button>
      )}

      <h3 className="text-lg font-extrabold mb-2">{provider.name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{provider.description}</p>

      {provider.serviceTags && provider.serviceTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {provider.serviceTags.map((tag) => (
            <span key={tag} className="text-xs font-semibold px-2.5 py-0.5 rounded-full border" style={{ background: TEAL_LIGHT, color: TEAL, borderColor: "#d4e4e4" }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} />

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1.5">
        <MapPin className="h-3.5 w-3.5" style={{ color: TEAL }} />
        {provider.region || "משלוח לכל הארץ"}
      </div>

      {provider.phone && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
          <Phone className="h-3.5 w-3.5" style={{ color: TEAL }} />
          {provider.phone}
        </div>
      )}

      <div className="flex gap-2.5 mt-4">
        <Button className="flex-1 text-white font-bold" style={{ backgroundColor: TEAL }} onClick={onContact}>
          צור קשר
        </Button>
        <Button variant="outline" className="text-sm">פרטים נוספים</Button>
      </div>
    </CardContent>
  </Card>
);

// ── Category Chips ──
const CategoryChips = ({ categories, active, onSelect }: { categories: { id: string; label: string }[]; active: string; onSelect: (id: string) => void }) => (
  <div className="flex flex-wrap gap-2 py-3 px-1">
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onSelect(cat.id)}
        className="px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200"
        style={
          active === cat.id
            ? { background: TEAL, color: "#fff", borderColor: TEAL }
            : { background: "#fff", color: "hsl(var(--foreground))", borderColor: "hsl(var(--border))" }
        }
      >
        {cat.label}
      </button>
    ))}
  </div>
);

// ── Main Page ──
const AdElai = () => {
  const [view, setView] = useState<"search" | "register">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState<"services" | "equip">("services");
  const [activeCategory, setActiveCategory] = useState("all");
  const [regionFilter, setRegionFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  // Modals
  const [contactOpen, setContactOpen] = useState(false);
  const [truvifyOpen, setTruvifyOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  // Wizard
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [pricingRows, setPricingRows] = useState([{ id: 1, desc: "", regular: "", discounted: "", variable: false }]);
  const [nextRowId, setNextRowId] = useState(2);

  // Filter logic
  const providers = activeType === "services" ? serviceProviders : equipProviders;
  const categories = activeType === "services" ? serviceCategories : equipCategories;

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      if (searchQuery && !p.name.includes(searchQuery) && !p.description.includes(searchQuery) && !p.categoryLabel.includes(searchQuery)) return false;
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (regionFilter && p.region !== regionFilter && p.region !== "") return false;
      if (ratingFilter && p.rating < parseInt(ratingFilter)) return false;
      return true;
    });
  }, [providers, searchQuery, activeCategory, regionFilter, ratingFilter]);

  const switchType = (type: "services" | "equip") => {
    setActiveType(type);
    setActiveCategory("all");
    setSearchQuery("");
    setRegionFilter("");
    setRatingFilter("");
  };

  // Wizard helpers
  const toggleChip = (chip: string) => {
    setSelectedServices((prev) => prev.includes(chip) ? prev.filter((s) => s !== chip) : [...prev, chip]);
  };
  const toggleRegion = (r: string) => {
    setSelectedRegions((prev) => prev.includes(r) ? prev.filter((s) => s !== r) : [...prev, r]);
  };
  const addPricingRow = (variable = false) => {
    setPricingRows((prev) => [...prev, { id: nextRowId, desc: "", regular: "", discounted: "", variable }]);
    setNextRowId((n) => n + 1);
  };
  const removePricingRow = (id: number) => {
    setPricingRows((prev) => prev.length > 1 ? prev.filter((r) => r.id !== id) : prev);
  };
  const updatePricingRow = (id: number, field: string, value: string) => {
    setPricingRows((prev) => prev.map((r) => {
      if (r.id !== id) return r;
      const updated = { ...r, [field]: value };
      if (field === "regular" && !r.variable) {
        const num = parseFloat(value);
        if (num > 0) updated.discounted = String(Math.floor(num * 0.9));
      }
      return updated;
    }));
  };

  const goToStep = (step: number) => { setWizardStep(step); window.scrollTo(0, 0); };
  const submitForm = () => { setWizardStep(6); window.scrollTo(0, 0); };
  const resetForm = () => {
    setSelectedServices([]);
    setSelectedRegions([]);
    setPricingRows([{ id: 1, desc: "", regular: "", discounted: "", variable: false }]);
    setNextRowId(2);
    setWizardStep(2);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen" style={{ background: "#f5fafa" }}>
      {/* Nav Tabs */}
      <div className="bg-background border-b flex items-center justify-between px-4 md:px-9 h-16 sticky top-0 z-40" style={{ borderColor: "#d4e4e4" }}>
        <div className="flex items-center gap-2 text-xl font-black" style={{ color: TEAL }}>
          <Home className="h-6 w-6" />
          עַד אֵלַי
        </div>
        <div className="flex gap-1.5">
          <button
            className="px-4 md:px-5 py-2 rounded-full text-sm font-semibold transition-all"
            style={view === "search" ? { background: TEAL, color: "#fff" } : { color: "hsl(var(--muted-foreground))" }}
            onClick={() => setView("search")}
          >
            חיפוש שירות וציוד
          </button>
          <button
            className="px-4 md:px-5 py-2 rounded-full text-sm font-semibold transition-all"
            style={view === "register" ? { background: TEAL, color: "#fff" } : { color: "hsl(var(--muted-foreground))" }}
            onClick={() => setView("register")}
          >
            הצטרפות כספק / יצרן
          </button>
        </div>
      </div>

      {/* ═══ SEARCH VIEW ═══ */}
      {view === "search" && (
        <>
          {/* Hero */}
          <div className="text-center py-12 md:py-16 px-4 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${TEAL_DARK} 0%, ${TEAL} 55%, #2a9d9a 100%)` }}>
            <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-white/5" />
            <h1 className="text-3xl md:text-[42px] font-black text-white mb-3 leading-tight">מדריך שירותים וציוד לגיל השלישי</h1>
            <p className="text-lg md:text-xl text-white/85 mb-8">שירותים מקצועיים, ציוד רפואי ומוצרים – ישירות לבית שלכם</p>

            <div className="max-w-xl mx-auto mb-5 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: TEAL }} />
              <input
                className="w-full py-4 pr-12 pl-5 text-lg rounded-full border-0 outline-none shadow-lg font-medium"
                placeholder="חפשו שירות, ציוד או ספק..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <select
                className="py-2.5 px-4 rounded-full border-2 border-white/40 bg-white/15 text-white text-sm font-medium backdrop-blur-sm outline-none min-w-[150px]"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="" className="text-foreground bg-background">כל האזורים</option>
                {regions.slice(0, -1).map((r) => (
                  <option key={r} value={r} className="text-foreground bg-background">{r}</option>
                ))}
              </select>
              <select
                className="py-2.5 px-4 rounded-full border-2 border-white/40 bg-white/15 text-white text-sm font-medium backdrop-blur-sm outline-none min-w-[150px]"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="" className="text-foreground bg-background">כל הדירוגים</option>
                <option value="5" className="text-foreground bg-background">מצוין (5 כוכבים)</option>
                <option value="4" className="text-foreground bg-background">טוב מאוד (4+)</option>
                <option value="3" className="text-foreground bg-background">טוב (3+)</option>
              </select>
            </div>
          </div>

          {/* Type Tabs */}
          <div className="bg-background border-b flex px-4 md:px-9" style={{ borderColor: "#d4e4e4" }}>
            <button
              className="py-4 px-5 md:px-7 text-base font-semibold flex items-center gap-2 border-b-[3px] transition-all"
              style={activeType === "services" ? { color: TEAL, borderColor: TEAL } : { color: "hsl(var(--muted-foreground))", borderColor: "transparent" }}
              onClick={() => switchType("services")}
            >
              <Users className="h-4 w-4" />
              שירותים אישיים
            </button>
            <button
              className="py-4 px-5 md:px-7 text-base font-semibold flex items-center gap-2 border-b-[3px] transition-all"
              style={activeType === "equip" ? { color: TEAL, borderColor: TEAL } : { color: "hsl(var(--muted-foreground))", borderColor: "transparent" }}
              onClick={() => switchType("equip")}
            >
              <Package className="h-4 w-4" />
              ציוד ומוצרים
            </button>
          </div>

          {/* Category Chips */}
          <div className="bg-background border-b px-4 md:px-9" style={{ borderColor: "#d4e4e4" }}>
            <CategoryChips categories={categories} active={activeCategory} onSelect={setActiveCategory} />
          </div>

          {/* Platform Disclaimer */}
          <div className="flex items-start gap-2.5 px-4 md:px-9 py-3" style={{ background: "#1a1a2e" }}>
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#fbbf24" }} />
            <span className="text-sm leading-relaxed" style={{ color: "#cbd5e1" }}>
              <strong style={{ color: "#fbbf24" }}>עַד אֵלַי – פלטפורמה מנגישה בלבד.</strong>{" "}
              אנו משתדלים להציג ספקים אמינים, אך <strong className="text-white">אין לנו כל אחריות</strong> לאיכות השירות, לנזקים או לתוצאות ההתקשרות.{" "}
              <button onClick={() => setLegalOpen(true)} className="underline" style={{ color: "#22d3ee" }}>תנאי שימוש מלאים</button>
            </span>
          </div>

          {/* Section Header */}
          <div className="flex justify-between items-baseline px-4 md:px-9 pt-7 pb-2">
            <div>
              <h2 className="text-2xl font-extrabold">{activeType === "services" ? "ספקי שירות במאגר" : "ספקי ציוד ומוצרים"}</h2>
              <p className="text-sm text-muted-foreground mt-1">הספקים עברו סינון אמינות ראשוני בלבד · עַד אֵלַי אינה אחראית לשירות הניתן</p>
            </div>
            <Badge style={{ background: TEAL_LIGHT, color: TEAL }} className="font-bold">{filtered.length} {activeType === "services" ? "ספקים" : "ספקים וחנויות"}</Badge>
          </div>

          {/* Cards Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 md:px-9 pb-12 pt-3">
              {filtered.map((p) => (
                <ProviderCard key={p.id} provider={p} onContact={() => setContactOpen(true)} onTruvify={() => setTruvifyOpen(true)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-14 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-semibold">לא נמצאו תוצאות</p>
              <p className="text-base mt-2">נסו לשנות את הסינון</p>
            </div>
          )}
        </>
      )}

      {/* ═══ REGISTER VIEW ═══ */}
      {view === "register" && (
        <>
          {/* Hero */}
          <div className="text-center py-12 md:py-16 px-4 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${TEAL_DARK} 0%, ${TEAL} 55%, #2a9d9a 100%)` }}>
            <h1 className="text-3xl md:text-[40px] font-black text-white mb-3 leading-tight">הצטרפו למאגר "עד אֵלַי"</h1>
            <p className="text-lg text-white/85 max-w-xl mx-auto mb-8">הגיעו ללקוחות חדשים ופרסמו את השירות או הציוד שלכם לאלפי משפחות ברחבי הארץ</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {[
                { icon: Check, label: "חינמי לתקופת ההשקה" },
                { icon: Star, label: "חשיפה ממוקדת לגיל השלישי" },
                { icon: Lock, label: "פרטיותכם מוגנת" },
                { icon: Star, label: "בניית מוניטין דיגיטלי" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/30 bg-white/15 text-white text-sm font-medium backdrop-blur-sm">
                  <b.icon className="h-4 w-4" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* Wizard */}
          <div className="max-w-2xl mx-auto -mt-8 px-4 pb-12 relative z-10">
            <div className="bg-background rounded-2xl shadow-xl overflow-hidden border" style={{ borderColor: "#d4e4e4" }}>
              {/* Progress */}
              {wizardStep <= 5 && (
                <div className="px-6 md:px-9 pt-7">
                  <div className="flex justify-between items-center relative mb-7">
                    <div className="absolute top-4 right-4 left-4 h-0.5 bg-border z-0" />
                    <div className="absolute top-4 right-4 h-0.5 z-[1] transition-all duration-400" style={{ background: TEAL, width: `${Math.max(0, ((wizardStep - 1) / 4) * 100)}%` }} />
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="flex flex-col items-center relative">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold relative z-[2] transition-all"
                          style={
                            s < wizardStep
                              ? { background: TEAL, borderColor: TEAL, color: "#fff", border: "2px solid" }
                              : s === wizardStep
                                ? { background: "#fff", borderColor: TEAL, color: TEAL, border: "2px solid", boxShadow: `0 0 0 4px rgba(27,122,120,0.12)` }
                                : { background: "#fff", borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))", border: "2px solid" }
                          }
                        >
                          {s < wizardStep ? "✓" : s}
                        </div>
                        <span className="text-[11px] text-muted-foreground absolute top-10 whitespace-nowrap">
                          {["פרטים", "שירות/ציוד", "אזור", "מחיר", "אישור"][s - 1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="px-6 md:px-9 pb-9 pt-4">
                {/* Step 1 */}
                {wizardStep === 1 && (
                  <div>
                    <h3 className="text-xl font-extrabold mb-1">פרטים אישיים ועסקיים</h3>
                    <p className="text-sm text-muted-foreground mb-6">כיצד תרצו להופיע במאגר?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><Label>שם פרטי *</Label><Input placeholder="מרים" className="mt-1.5" /></div>
                      <div><Label>שם משפחה *</Label><Input placeholder="לוי" className="mt-1.5" /></div>
                      <div className="md:col-span-2"><Label>שם העסק / המותג</Label><Input placeholder="למשל: מדיקר ישראל" className="mt-1.5" /></div>
                      <div><Label>טלפון *</Label><Input type="tel" placeholder="050-0000000" className="mt-1.5" /></div>
                      <div><Label>אימייל *</Label><Input type="email" placeholder="name@email.com" className="mt-1.5" /></div>
                      <div className="md:col-span-2"><Label>תיאור קצר</Label><Textarea placeholder="ספרו על הניסיון, ההתמחות והגישה שלכם..." className="mt-1.5" /></div>
                    </div>
                    <div className="flex items-start gap-2 mt-4 p-3 rounded-lg text-sm" style={{ background: "#fffbf0", border: "1.5px solid #f4a261", color: "#78520a" }}>
                      <Info className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#f4a261" }} />
                      <span>פרטי הקשר שלכם <strong>לא יופיעו לגולשים לא רשומים</strong>. רק משתמשים מאומתים יוכלו לראותם.</span>
                    </div>
                    <div className="flex justify-end mt-7 pt-5 border-t">
                      <Button style={{ background: TEAL }} className="text-white font-bold px-8" onClick={() => goToStep(2)}>הבא ←</Button>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {wizardStep === 2 && (
                  <div>
                    <h3 className="text-xl font-extrabold mb-1">מה אתם מציעים?</h3>
                    <p className="text-sm text-muted-foreground mb-5">בחרו שירות, ציוד, או שניהם – ניתן לסמן מספר אפשרויות</p>
                    <p className="text-sm font-bold mb-2" style={{ color: TEAL }}>שירותים אישיים</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {wizardServiceChips.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => toggleChip(chip)}
                          className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                          style={
                            selectedServices.includes(chip)
                              ? { background: TEAL_LIGHT, borderColor: TEAL, color: TEAL, fontWeight: 700 }
                              : { background: "#fff", borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }
                          }
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm font-bold mb-2" style={{ color: TEAL }}>ציוד ומוצרים</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {wizardEquipChips.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => toggleChip(chip)}
                          className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                          style={
                            selectedServices.includes(chip)
                              ? { background: TEAL_LIGHT, borderColor: TEAL, color: TEAL, fontWeight: 700 }
                              : { background: "#fff", borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }
                          }
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                    <div>
                      <Label>פירוט השירותים הניתנים – חשוב מאוד!</Label>
                      <p className="text-xs text-muted-foreground mb-1.5">ככל שתפרטו יותר – כך המידע יוצג טוב יותר למחפש השירות.</p>
                      <Textarea className="min-h-[120px]" placeholder="פרטו כאן את השירותים שלכם..." />
                    </div>
                    <div className="flex justify-between mt-7 pt-5 border-t">
                      <Button variant="outline" onClick={() => goToStep(1)}>← חזרה</Button>
                      <Button style={{ background: TEAL }} className="text-white font-bold px-8" onClick={() => goToStep(3)}>הבא ←</Button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {wizardStep === 3 && (
                  <div>
                    <h3 className="text-xl font-extrabold mb-1">אזור הפעילות</h3>
                    <p className="text-sm text-muted-foreground mb-5">בחרו את כל האזורים בהם אתם נותנים שירות</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      {regions.map((r) => (
                        <button
                          key={r}
                          onClick={() => toggleRegion(r)}
                          className="py-3 px-4 rounded-lg text-sm font-medium border text-center transition-all"
                          style={
                            selectedRegions.includes(r)
                              ? { background: TEAL_LIGHT, borderColor: TEAL, color: TEAL, fontWeight: 700 }
                              : { background: "#fff", borderColor: "hsl(var(--border))" }
                          }
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    <div className="mt-5">
                      <Label>שעות פעילות / זמני אספקה</Label>
                      <Input className="mt-1.5" placeholder="למשל: א'–ה' 08:00–20:00 | משלוח: 2–3 ימי עסקים" />
                    </div>
                    <div className="flex justify-between mt-7 pt-5 border-t">
                      <Button variant="outline" onClick={() => goToStep(2)}>← חזרה</Button>
                      <Button style={{ background: TEAL }} className="text-white font-bold px-8" onClick={() => goToStep(4)}>הבא ←</Button>
                    </div>
                  </div>
                )}

                {/* Step 4 */}
                {wizardStep === 4 && (
                  <div>
                    <h3 className="text-xl font-extrabold mb-1">תמחור והתחייבות</h3>
                    <p className="text-sm text-muted-foreground mb-4">פרטו את השירותים והמחירים שלכם</p>
                    <div className="rounded-lg p-4 mb-4" style={{ background: TEAL_LIGHT, border: `1.5px solid ${TEAL}` }}>
                      <h4 className="text-base font-bold mb-1" style={{ color: TEAL_DARK }}>התחייבות הנחה – תנאי קבלה</h4>
                      <p className="text-sm text-muted-foreground">כל מחיר שתציינו דרך המאגר יהיה נמוך ב-<strong>לפחות 10%</strong> ממחירכם הרגיל.</p>
                    </div>

                    {/* Pricing Header */}
                    <div className="grid grid-cols-[1fr_100px_100px_36px] gap-2 mb-2 px-1 text-xs font-bold text-muted-foreground">
                      <span>תיאור השירות</span>
                      <span className="text-center">מחיר רגיל (₪)</span>
                      <span className="text-center">מחיר מאגר (₪)</span>
                      <span />
                    </div>

                    {pricingRows.map((row) => (
                      <div key={row.id} className="grid grid-cols-[1fr_100px_100px_36px] gap-2 mb-2 items-center">
                        <Input placeholder="תיאור השירות" value={row.desc} onChange={(e) => updatePricingRow(row.id, "desc", e.target.value)} className="text-sm" />
                        {row.variable ? (
                          <div className="text-center py-2 rounded-md text-xs font-semibold" style={{ background: TEAL_LIGHT, color: TEAL, border: `1.5px solid ${TEAL}` }}>לפי היקף</div>
                        ) : (
                          <Input type="number" placeholder="₪" value={row.regular} onChange={(e) => updatePricingRow(row.id, "regular", e.target.value)} className="text-sm text-center" />
                        )}
                        {row.variable ? (
                          <div className="text-center py-2 rounded-md text-xs font-semibold" style={{ background: TEAL_LIGHT, color: TEAL, border: `1.5px solid ${TEAL}` }}>−10%+</div>
                        ) : (
                          <Input type="number" placeholder="−10%" value={row.discounted} onChange={(e) => updatePricingRow(row.id, "discounted", e.target.value)} className="text-sm text-center" />
                        )}
                        <button onClick={() => removePricingRow(row.id)} className="w-8 h-8 rounded-full border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-colors">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    <div className="flex gap-2 mt-3 flex-wrap">
                      <button onClick={() => addPricingRow(false)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold border-dashed border-2" style={{ background: TEAL_LIGHT, borderColor: TEAL, color: TEAL }}>
                        <Plus className="h-4 w-4" />מחיר קבוע
                      </button>
                      <button onClick={() => addPricingRow(true)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold border-dashed border-2 bg-muted border-muted-foreground/30 text-muted-foreground">
                        <Plus className="h-4 w-4" />מחיר לפי היקף
                      </button>
                    </div>

                    <div className="flex justify-between mt-7 pt-5 border-t">
                      <Button variant="outline" onClick={() => goToStep(3)}>← חזרה</Button>
                      <Button style={{ background: TEAL }} className="text-white font-bold px-8" onClick={() => goToStep(5)}>הבא ←</Button>
                    </div>
                  </div>
                )}

                {/* Step 5 */}
                {wizardStep === 5 && (
                  <div>
                    <h3 className="text-xl font-extrabold mb-1">אישור ושליחה</h3>
                    <p className="text-sm text-muted-foreground mb-5">קראו ואשרו את ההצהרות להשלמת הרישום</p>

                    {/* Platform disclaimer */}
                    <div className="rounded-lg p-5 mb-4" style={{ background: "#1a1a2e" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <CircleAlert className="h-4 w-4" style={{ color: "#22d3ee" }} />
                        <span className="text-sm font-extrabold" style={{ color: "#22d3ee" }}>הצהרת הפלטפורמה</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "#e2e8f0" }}>
                        <strong className="text-white">עַד אֵלַי היא פלטפורמה מנגישה בלבד.</strong> אנו משתדלים להציג ספקים אמינים ומקצועיים, אך <strong style={{ color: "#fbbf24" }}>אין לנו כל אחריות</strong> לאיכות השירות, לנזקים, לתאונות, או לכל תוצאה של ההתקשרות.
                      </p>
                    </div>

                    {/* Privacy info */}
                    <div className="flex items-start gap-2 p-3 rounded-lg text-sm mb-4" style={{ background: "#fffbf0", border: "1.5px solid #f4a261", color: "#78520a" }}>
                      <Lock className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#f4a261" }} />
                      <span><strong>הגנת פרטיות:</strong> פרטי הקשר ישמשו לחיבור עם לקוחות מאומתים בלבד ולא יועברו לצד שלישי.</span>
                    </div>

                    {/* Insurance */}
                    <div className="rounded-lg p-4 mb-4" style={{ background: "#fff7ed", border: "1.5px solid #ea580c" }}>
                      <h4 className="text-base font-bold mb-1 flex items-center gap-2" style={{ color: "#9a3412" }}>
                        <Shield className="h-4 w-4" style={{ color: "#ea580c" }} />הצהרת ביטוח – חובה
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "#7c3e1a" }}>
                        אני מצהיר/ה שברשותי ביטוח אחריות מקצועית בתוקף. ידוע לי כי פלטפורמת "עַד אֵלַי" אינה אחראית לכל נזק במהלך מתן השירות.
                      </p>
                    </div>

                    {/* Truvify opt-in */}
                    <div className="rounded-lg p-4 mb-4" style={{ background: "#f0f9ff", border: "1.5px solid #0284c7" }}>
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <h4 className="text-base font-extrabold flex items-center gap-2" style={{ color: "#075985" }}>
                          <span className="text-xs font-black px-2 py-1 rounded" style={{ background: "#0f172a", color: "#22d3ee", fontFamily: "monospace" }}>TRUVIFY</span>
                          תג אמינות – רשות
                        </h4>
                        <a href="https://truvify.com/" target="_blank" rel="noopener noreferrer" className="text-xs underline flex items-center gap-1" style={{ color: "#0284c7" }}>
                          <ExternalLink className="h-3 w-3" />אתר Truvify
                        </a>
                      </div>
                      <p className="text-sm mb-3" style={{ color: "#0c4a6e" }}>
                        Truvify סורקת מיליוני רשומות ציבוריות. ספקים שיעברו את הבדיקה יקבלו <strong>תג TRUVIFY בולט</strong> על הפרופיל.
                      </p>
                      <label className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:border-primary transition-colors bg-background">
                        <input type="checkbox" className="mt-0.5 accent-[#1B7A78]" />
                        <span className="text-sm"><strong>אני מעוניין/ת לבצע בדיקת Truvify (₪50 חד פעמי)</strong></span>
                      </label>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-2.5">
                      {[
                        "קראתי ואני מסכים/ה לתנאי השימוש ולמדיניות הפרטיות",
                        "פרטי הקשר שלי יוצגו למשתמשים רשומים בלבד",
                        "אני מצהיר/ה שיש לי ביטוח בתוקף ומקבל/ת על עצמי אחריות מלאה",
                        "אני מתחייב/ת לאמינות ומקצועיות",
                      ].map((text) => (
                        <label key={text} className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:border-primary transition-colors">
                          <input type="checkbox" className="mt-0.5 accent-[#1B7A78]" />
                          <span className="text-sm">{text}</span>
                        </label>
                      ))}
                    </div>

                    {/* References */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div><Label>המלצה ראשונה (שם + טלפון)</Label><Input placeholder="דורית כהן 050-1111111" className="mt-1.5" /></div>
                      <div><Label>המלצה שנייה (שם + טלפון)</Label><Input placeholder="יוסי לוי 052-2222222" className="mt-1.5" /></div>
                    </div>

                    <div className="flex justify-between mt-7 pt-5 border-t">
                      <Button variant="outline" onClick={() => goToStep(4)}>← חזרה</Button>
                      <Button className="text-white font-bold px-8 bg-green-600 hover:bg-green-700" onClick={submitForm}>שלחו בקשת הצטרפות ✓</Button>
                    </div>
                  </div>
                )}

                {/* Step 6 – Success */}
                {wizardStep === 6 && (
                  <div className="text-center py-5">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: TEAL_LIGHT }}>
                      <Check className="h-10 w-10" style={{ color: TEAL }} />
                    </div>
                    <h3 className="text-2xl font-extrabold mb-2">הבקשה התקבלה בהצלחה!</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">הצוות שלנו יבחן את הבקשה ויצור איתכם קשר תוך 3–5 ימי עסקים.</p>
                    <div className="mt-5 p-3 rounded-lg text-sm" style={{ background: TEAL_LIGHT, color: TEAL_DARK }}>
                      נשלח אליכם אימייל אישור עם פרטים נוספים
                    </div>

                    <div className="mt-5 p-4 rounded-lg border bg-muted/50 text-right">
                      <p className="text-sm font-bold mb-1">נותנים יותר משירות אחד?</p>
                      <p className="text-sm text-muted-foreground mb-3">ניתן להירשם שוב ולהוסיף שירות נוסף.</p>
                      <Button className="w-full text-white font-bold" style={{ background: TEAL }} onClick={resetForm}>הרשמה לשירות נוסף +</Button>
                    </div>

                    <Button variant="outline" className="mt-3" onClick={() => setView("search")}>חזרה לדף הבית</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="bg-background border-t py-5 text-center text-sm text-muted-foreground" style={{ borderColor: "#d4e4e4" }}>
        <strong>עַד אֵלַי</strong> – פלטפורמה מנגישה למציאת שירותים וציוד לגיל השלישי &nbsp;|&nbsp;
        <button onClick={() => setLegalOpen(true)} className="underline" style={{ color: TEAL }}>תנאי שימוש</button>
        {" "}<button onClick={() => setLegalOpen(true)} className="underline" style={{ color: TEAL }}>מדיניות פרטיות</button>
        <br />
        <span className="text-xs font-semibold text-destructive mt-1 inline-block">⚠️ הפלטפורמה מנגישה ספקים בלבד ואינה אחראית לשירותים הניתנים.</span>
      </div>

      {/* ── Modals ── */}

      {/* Contact Modal */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="text-center max-w-sm">
          <DialogHeader>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: TEAL_LIGHT }}>
              <Lock className="h-8 w-8" style={{ color: TEAL }} />
            </div>
            <DialogTitle>פרטי קשר למשתמשים רשומים</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-5">כדי לצפות בפרטי הקשר, יש להירשם. ההרשמה חינמית ומגינה על פרטיות כלל הצדדים.</p>
          <div className="flex gap-3 justify-center">
            <Button style={{ background: TEAL }} className="text-white" onClick={() => setContactOpen(false)}>הרשמה חינמית</Button>
            <Button variant="outline" onClick={() => setContactOpen(false)}>לא עכשיו</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Truvify Modal */}
      <Dialog open={truvifyOpen} onOpenChange={setTruvifyOpen}>
        <DialogContent className="max-w-md text-right">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-lg px-3 py-1.5" style={{ background: "#0f172a" }}>
                <span className="font-black text-sm" style={{ color: "#22d3ee", fontFamily: "monospace", letterSpacing: "1px" }}>TRUVIFY</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">מה זה אומר?</p>
                <DialogTitle className="text-lg">ספק זה עבר הערכת אמינות</DialogTitle>
              </div>
            </div>
          </DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Truvify היא חברה ישראלית המפעילה טכנולוגיה מתקדמת לסריקת מיליוני פריטי מידע ציבוריים. הספק הסכים לבדיקה ועבר אותה בהצלחה.
          </p>
          <p className="text-sm font-bold mb-2">הבדיקה כוללת:</p>
          <ul className="space-y-2">
            {truvifyCheckItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground pb-2 border-b last:border-b-0">
                <Check className="h-3.5 w-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-3 p-3 rounded-lg text-xs leading-relaxed" style={{ background: "#fff7ed", border: "1.5px solid #f59e0b", color: "#78350f" }}>
            <strong>⚠️ הגבלת אחריות:</strong> בדיקת Truvify מהווה מידע ציבורי בנקודת זמן מסוימת ואינה ערבות לאיכות השירות.
          </div>
          <a href="https://truvify.com/" target="_blank" rel="noopener noreferrer" className="text-xs underline flex items-center gap-1 mt-2" style={{ color: TEAL }}>
            <ExternalLink className="h-3 w-3" />למידע נוסף על Truvify
          </a>
          <div className="text-center mt-4">
            <Button style={{ background: TEAL }} className="text-white" onClick={() => setTruvifyOpen(false)}>הבנתי, סגור</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Legal Modal */}
      <Dialog open={legalOpen} onOpenChange={setLegalOpen}>
        <DialogContent className="max-w-xl text-right max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold">תנאי שימוש והגבלת אחריות</DialogTitle>
          </DialogHeader>
          {legalTerms.map((term) => (
            <div key={term.title}>
              <h4 className="text-sm font-bold mt-4 mb-1" style={{ color: TEAL }}>{term.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{term.content}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground/60 mt-4">* מסמך זה הוא נוסח עבודה ראשוני. יש להיוועץ בעורך דין לפני הפעלת המערכת לציבור.</p>
          <div className="text-center mt-4">
            <Button style={{ background: TEAL }} className="text-white" onClick={() => setLegalOpen(false)}>הבנתי, סגור</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdElai;
