import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Phone, Globe, MapPin, Star } from "lucide-react";

const agencies = [
  { id: 1, name: "שלם בית", type: "חברת סיעוד", phone: "1-800-300-600", website: "www.shalem-bait.co.il", area: "ארצי", rating: 4.5, specialties: ["עובדים זרים", "סיעוד ביתי"] },
  { id: 2, name: "מטב", type: "חברת סיעוד", phone: "1-800-300-011", website: "www.matav.org.il", area: "ארצי", rating: 4.3, specialties: ["עובדים זרים", "שיקום"] },
  { id: 3, name: "עמל", type: "תאגיד כוח אדם", phone: "03-6234567", website: "www.amal.co.il", area: "מרכז", rating: 4.0, specialties: ["עובדים זרים", "כוח אדם"] },
  { id: 4, name: "ביקורית", type: "חברת סיעוד", phone: "02-6234567", website: "www.bikurit.co.il", area: "ירושלים והסביבה", rating: 4.2, specialties: ["עובדים זרים", "סיעוד ביתי"] },
  { id: 5, name: "גולדן קר", type: "חברת סיעוד", phone: "04-6234567", website: "www.goldencare.co.il", area: "צפון", rating: 4.1, specialties: ["עובדים זרים", "דמנציה"] },
];

const ForeignWorkerSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const areas = [...new Set(agencies.map((a) => a.area))];

  const filtered = agencies.filter((agency) => {
    const matchesSearch = agency.name.includes(searchTerm) || agency.type.includes(searchTerm) || agency.specialties.some((s) => s.includes(searchTerm));
    const matchesArea = !selectedArea || agency.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="container py-10 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">חיפוש עובד זר</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          מאגר חברות סיעוד ותאגידי כוח אדם להעסקת עובדים זרים בתחום הסיעוד
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חפש לפי שם חברה, סוג או התמחות..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant={selectedArea === null ? "default" : "outline"} size="sm" onClick={() => setSelectedArea(null)}>
            כל האזורים
          </Button>
          {areas.map((area) => (
            <Button key={area} variant={selectedArea === area ? "default" : "outline"} size="sm" onClick={() => setSelectedArea(area)}>
              {area}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {filtered.map((agency) => (
          <Card key={agency.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{agency.name}</CardTitle>
                <Badge variant="outline">{agency.type}</Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span>{agency.rating}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1">
                {agency.specialties.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                ))}
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{agency.phone}</div>
                <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" />{agency.website}</div>
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{agency.area}</div>
              </div>
              <Button size="sm" className="w-full">צור קשר</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">לא נמצאו תוצאות</div>
      )}

      {/* Info Box */}
      <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-2">💡 טיפים לבחירת חברת סיעוד</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>בדקו שהחברה מורשית על ידי רשות האוכלוסין וההגירה</li>
            <li>בקשו המלצות ממשפחות אחרות</li>
            <li>ודאו שהחברה מספקת ליווי ותמיכה גם לאחר ההשמה</li>
            <li>השוו עלויות בין מספר חברות</li>
            <li>בדקו את תנאי החוזה בקפידה לפני חתימה</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForeignWorkerSearch;
