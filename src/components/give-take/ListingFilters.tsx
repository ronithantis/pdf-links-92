import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ListingFiltersProps {
  typeFilter: string;
  categoryFilter: string;
  regionFilter: string;
  onTypeChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onRegionChange: (val: string) => void;
}

const ListingFilters = ({
  typeFilter, categoryFilter, regionFilter,
  onTypeChange, onCategoryChange, onRegionChange,
}: ListingFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {[
          { value: "all", label: "הכל" },
          { value: "donate", label: "תרומות" },
          { value: "request", label: "בקשות" },
        ].map((opt) => (
          <Button
            key={opt.value}
            size="sm"
            variant={typeFilter === opt.value ? "default" : "ghost"}
            className="h-8 text-xs"
            onClick={() => onTypeChange(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      <Select value={categoryFilter} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-36 h-9 text-sm">
          <SelectValue placeholder="קטגוריה" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">כל הקטגוריות</SelectItem>
          <SelectItem value="medical">ציוד רפואי</SelectItem>
          <SelectItem value="mobility">ניידות</SelectItem>
          <SelectItem value="hygiene">היגיינה</SelectItem>
          <SelectItem value="furniture">ריהוט מותאם</SelectItem>
          <SelectItem value="other">אחר</SelectItem>
        </SelectContent>
      </Select>

      <Select value={regionFilter} onValueChange={onRegionChange}>
        <SelectTrigger className="w-36 h-9 text-sm">
          <SelectValue placeholder="אזור" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">כל האזורים</SelectItem>
          <SelectItem value="north">צפון</SelectItem>
          <SelectItem value="center">מרכז</SelectItem>
          <SelectItem value="south">דרום</SelectItem>
          <SelectItem value="jerusalem">ירושלים והסביבה</SelectItem>
          <SelectItem value="sharon">השרון</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ListingFilters;
