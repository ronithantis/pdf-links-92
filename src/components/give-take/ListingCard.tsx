import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, HandHeart, MapPin, Package } from "lucide-react";

export interface Listing {
  id: string;
  type: "donate" | "request";
  title: string;
  category: string;
  other_category?: string | null;
  description?: string | null;
  region: string;
  shipping_available?: boolean;
  item_size?: string | null;
  created_at?: string;
}

interface ListingCardProps {
  listing: Listing;
  onContact: (listing: Listing) => void;
}

const categoryLabels: Record<string, string> = {
  medical: "ציוד רפואי",
  mobility: "ניידות",
  hygiene: "היגיינה",
  furniture: "ריהוט מותאם",
  other: "אחר",
};

const regionLabels: Record<string, string> = {
  north: "צפון",
  center: "מרכז",
  south: "דרום",
  jerusalem: "ירושלים והסביבה",
  sharon: "השרון",
};

const ListingCard = ({ listing, onContact }: ListingCardProps) => {
  const isDonate = listing.type === "donate";

  return (
    <Card className="hover:shadow-lg transition-all hover:-translate-y-1 group">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Badge
            variant={isDonate ? "default" : "secondary"}
            className={isDonate ? "bg-success text-success-foreground" : "bg-warm text-warm-foreground"}
          >
            {isDonate ? (
              <><Gift className="h-3 w-3 ml-1" /> תרומה</>
            ) : (
              <><HandHeart className="h-3 w-3 ml-1" /> בקשה</>
            )}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {categoryLabels[listing.category] || listing.other_category || listing.category}
          </span>
        </div>

        <h3 className="font-bold text-base leading-tight">{listing.title}</h3>

        {listing.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
        )}

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {regionLabels[listing.region] || listing.region}
          </span>
          {listing.shipping_available && (
            <span className="flex items-center gap-1">
              <Package className="h-3 w-3" />
              משלוח אפשרי
            </span>
          )}
        </div>

        <Button
          size="sm"
          variant="outline"
          className="w-full mt-2"
          onClick={() => onContact(listing)}
        >
          צור קשר
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
