import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Gift, HandHeart, Plus, Store, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import ListingCard, { type Listing } from "@/components/give-take/ListingCard";
import ListingFilters from "@/components/give-take/ListingFilters";
import NewListingDialog from "@/components/give-take/NewListingDialog";
import ContactDialog from "@/components/give-take/ContactDialog";

const GiveTake = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "services" ? "services" : "community";

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [showNew, setShowNew] = useState(false);
  const [contactListing, setContactListing] = useState<Listing | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    let query = supabase
      .from("donation_listings")
      .select("id, type, title, category, other_category, description, region, shipping_available, item_size, created_at")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (typeFilter !== "all") query = query.eq("type", typeFilter as "donate" | "request");
    if (categoryFilter !== "all") query = query.eq("category", categoryFilter);
    if (regionFilter !== "all") query = query.eq("region", regionFilter);

    const { data } = await query;
    setListings((data as Listing[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, [typeFilter, categoryFilter, regionFilter]);

  const handleNewListing = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    setShowNew(true);
  };

  const handleTabChange = (value: string) => {
    setSearchParams(value === "services" ? { tab: "services" } : {});
    if (value !== "services") setIsFullscreen(false);
  };

  const donateCount = listings.filter((l) => l.type === "donate").length;
  const requestCount = listings.filter((l) => l.type === "request").length;

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-background flex flex-col" : "container py-8 space-y-6"}>
      {/* Hero */}
      <div className={isFullscreen ? "px-4 pt-3 pb-2 border-b bg-muted/30 flex items-center justify-between" : "text-center space-y-3"}>
        {isFullscreen ? (
          <>
            <h1 className="text-lg font-bold text-foreground">שירותים וציוד לגיל השלישי</h1>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFullscreen(false)}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              קח ותן — <span className="text-primary">שירותים, ציוד ותרומות</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              לוח קהילתי לשיתוף ציוד סיעודי ומאגר ספקי שירותים וציוד לגיל השלישי
            </p>
          </>
        )}
      </div>

      {!isFullscreen && (
        <Tabs defaultValue={initialTab} onValueChange={handleTabChange} className="w-full" dir="rtl">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="community" className="gap-2">
              <Gift className="h-4 w-4" />
              לוח תרומות ובקשות
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Store className="h-4 w-4" />
              שירותים וציוד
            </TabsTrigger>
          </TabsList>

          <TabsContent value="community" className="space-y-6 mt-6">
            {/* Stats */}
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Gift className="h-4 w-4 text-success" />
                <span className="font-semibold">{donateCount}</span>
                <span className="text-muted-foreground">תרומות פעילות</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <HandHeart className="h-4 w-4 text-warm" />
                <span className="font-semibold">{requestCount}</span>
                <span className="text-muted-foreground">בקשות פעילות</span>
              </div>
            </div>

            {/* Filters + New */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <ListingFilters
                typeFilter={typeFilter}
                categoryFilter={categoryFilter}
                regionFilter={regionFilter}
                onTypeChange={setTypeFilter}
                onCategoryChange={setCategoryFilter}
                onRegionChange={setRegionFilter}
              />
              <Button onClick={handleNewListing} className="gap-2">
                <Plus className="h-4 w-4" />
                פרסמו מודעה
              </Button>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">טוען מודעות...</div>
            ) : listings.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Gift className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">אין מודעות פעילות כרגע</p>
                <Button variant="outline" onClick={handleNewListing}>היו הראשונים לפרסם!</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} onContact={setContactListing} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <div className="flex justify-end mb-2">
              <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => setIsFullscreen(true)}>
                <Maximize2 className="h-3.5 w-3.5" />
                מסך מלא
              </Button>
            </div>
            <div className="rounded-lg border overflow-hidden" style={{ height: "80vh" }}>
              <iframe
                src="https://ad-elai.vercel.app/"
                className="w-full h-full border-0"
                title="עד אלי – שירותים וציוד לגיל השלישי"
                allow="clipboard-write"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              עד אלי – פלטפורמה מנגישה בלבד. אין לנו אחריות לאיכות השירות של הספקים המוצגים.
            </p>
          </TabsContent>
        </Tabs>
      )}

      {/* Fullscreen iframe */}
      {isFullscreen && (
        <div className="flex-1 overflow-hidden">
          <iframe
            src="https://ad-elai.vercel.app/"
            className="w-full h-full border-0"
            title="עד אלי – שירותים וציוד לגיל השלישי"
            allow="clipboard-write"
          />
        </div>
      )}

      <NewListingDialog open={showNew} onOpenChange={setShowNew} onCreated={fetchListings} />
      <ContactDialog open={!!contactListing} onOpenChange={(o) => !o && setContactListing(null)} listing={contactListing} />
    </div>
  );
};

export default GiveTake;
