import { useState, useMemo } from "react";
import { Search, Phone, Heart, Home, Users, Scale, FileText, Shield, Wrench, Eye, Globe, Activity, Car, Coffee, Utensils, Smile, Pill, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { organizations, categoryDefs, regions, costLabels } from "@/lib/organizations-data";

const iconMap: Record<string, React.ReactNode> = {
  Utensils: <Utensils className="h-5 w-5" />,
  Smile: <Smile className="h-5 w-5" />,
  Car: <Car className="h-5 w-5" />,
  Ambulance: <Car className="h-5 w-5" />,
  Activity: <Activity className="h-5 w-5" />,
  Pill: <Pill className="h-5 w-5" />,
  Home: <Home className="h-5 w-5" />,
  Coffee: <Coffee className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Scale: <Scale className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  Wrench: <Wrench className="h-5 w-5" />,
  Eye: <Eye className="h-5 w-5" />,
  Globe: <Globe className="h-5 w-5" />,
};

const costStyles: Record<string, string> = {
  free: "bg-emerald-50 text-emerald-700 border-emerald-200",
  sub: "bg-amber-50 text-amber-700 border-amber-200",
  dep: "bg-blue-50 text-blue-700 border-blue-200",
};

const OrganizationsSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState("ארצי");

  const filteredOrgs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (!q && !activeCategory) return null;

    let list = organizations;

    if (q) {
      list = list.filter((o) => {
        const haystack = `${o.name} ${o.tag} ${o.desc} ${o.keywords}`.toLowerCase();
        return q.split(/\s+/).every((w) => haystack.includes(w));
      });
    }

    if (activeCategory && !q) {
      list = list.filter((o) => o.cats.includes(activeCategory));
    }

    if (activeRegion !== "ארצי") {
      list = list.filter((o) => o.regions.includes("ארצי") || o.regions.includes(activeRegion));
    }

    return list;
  }, [searchQuery, activeCategory, activeRegion]);

  const displayOrgs = filteredOrgs?.slice(0, 6) ?? [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">חיפוש עזרה ועמותות</h1>
        <p className="text-muted-foreground text-lg">
          57 עמותות במערכת — מצאו עזרה מתאימה לפי קטגוריה, אזור או חיפוש חופשי
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-primary/10 border-r-4 border-primary rounded-lg p-4 text-sm leading-relaxed">
        <strong>57 עמותות במערכת — רובן ללא תשלום.</strong>
        <br />
        חלקן גובות פיקדון סמלי על ציוד, וחלקן מסובסדות. מומלץ לברר מראש בטלפון.
      </div>

      {/* Search */}
      <div>
        <p className="text-sm font-bold text-foreground mb-2">🔍 חיפוש חופשי</p>
        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveCategory(null);
            }}
            placeholder="הקלידו: שיניים, חיפה, מזון, שיפוץ, דיגיטל, שמיעה..."
            className="pr-10"
          />
        </div>
      </div>

      {/* Category Grid */}
      <div>
        <p className="text-sm text-muted-foreground text-center mb-3">— או בחרו קטגוריה —</p>
        <div className="grid grid-cols-4 gap-2">
          {categoryDefs.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSearchQuery("");
                setActiveCategory((prev) => (prev === cat.id ? null : cat.id));
              }}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all text-center ${
                activeCategory === cat.id
                  ? "border-primary bg-primary/10 ring-2 ring-primary"
                  : "border-border bg-card hover:bg-accent/50"
              }`}
            >
              <span className="text-primary">{iconMap[cat.icon]}</span>
              <span className="text-xs font-medium text-foreground leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div>
        <p className="text-sm font-bold text-foreground mb-2">אזור</p>
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <Button
              key={r}
              variant={activeRegion === r ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveRegion(r)}
            >
              {r}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredOrgs !== null && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{filteredOrgs.length}</strong> עמותות נמצאו
            {filteredOrgs.length > 6 && " — מוצגות 6 ראשונות"}
          </p>

          {displayOrgs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              לא נמצאו תוצאות. נסו מילה אחרת.
            </div>
          ) : (
            displayOrgs.map((org, i) => (
              <Card key={i} className="border-r-4 border-r-primary">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-lg font-semibold text-foreground">{org.name}</span>
                    <Badge variant="outline" className="text-xs whitespace-nowrap">
                      {org.tag}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{org.desc}</p>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <Badge variant="outline" className={`text-xs ${costStyles[org.cost]}`}>
                      {costLabels[org.cost]}
                    </Badge>

                    <a
                      href={`tel:${org.phone.replace(/[-*]/g, "")}`}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <span>התקשרו ·</span>
                      <span className="font-bold" dir="ltr">{org.phone}</span>
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {filteredOrgs === null && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          בחרו קטגוריה או הקלידו חיפוש
        </div>
      )}

      {/* Tip */}
      {filteredOrgs && filteredOrgs.some((o) => o.cats.some((c) => ["food", "nursing"].includes(c))) && (
        <div className="bg-amber-50 border-r-4 border-amber-400 rounded-lg p-4 text-sm text-amber-900 leading-relaxed">
          <Info className="inline h-4 w-4 ml-1" />
          <strong>טיפ:</strong> עבור מזון וסיעוד — מומלץ לפנות תחילה לעובד/ת הסוציאלי/ת בעירייה. רוב העמותות עובדות בתיאום עם לשכות הרווחה.
        </div>
      )}
    </div>
  );
};

export default OrganizationsSearch;
