import { useNavigate } from "react-router-dom";
import { FileText, Video, ClipboardList, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { key: "presentations" as const, title: "מצגות", icon: FileText, description: "מצגות מקצועיות על כל הנושאים", color: "text-primary" },
  { key: "videos" as const, title: "סרטונים", icon: Video, description: "סרטוני הדרכה והסבר", color: "text-accent" },
  { key: "forms" as const, title: "טפסים", icon: ClipboardList, description: "טפסים ומסמכים להורדה", color: "text-warm" },
  { key: "other" as const, title: "כלים נוספים", icon: MoreHorizontal, description: "משאבים וכלים נוספים", color: "text-success", linkTo: "/digital-tools" },
];

interface CategoryGridProps {
  onSelect: (category: string) => void;
  counts: Record<string, number>;
}

const CategoryGrid = ({ onSelect, counts }: CategoryGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <Card
            key={cat.key}
            className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 group"
            onClick={() => {
              if ('linkTo' in cat && cat.linkTo) {
                navigate(cat.linkTo);
              } else {
                onSelect(cat.key);
              }
            }}
          >
            <CardContent className="p-6 text-center space-y-3">
              <div className={`mx-auto w-14 h-14 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`h-7 w-7 ${cat.color}`} />
              </div>
              <h3 className="font-bold text-lg">{cat.title}</h3>
              <p className="text-sm text-muted-foreground">{cat.description}</p>
              {!('linkTo' in cat && cat.linkTo) && (
                <span className="text-xs text-muted-foreground">{counts[cat.key] || 0} פריטים</span>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
