import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NewListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

const NewListingDialog = ({ open, onOpenChange, onCreated }: NewListingDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: "donate" as "donate" | "request",
    title: "",
    category: "",
    other_category: "",
    description: "",
    region: "",
    contact_email: "",
    contact_phone: "",
    shipping_available: false,
    item_size: "",
  });

  const update = (field: string, value: any) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    if (!form.title || !form.category || !form.region || !form.contact_email) {
      toast({ title: "יש למלא את כל השדות הנדרשים", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "יש להתחבר כדי לפרסם מודעה", variant: "destructive" });
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("donation_listings").insert({
        type: form.type,
        title: form.title,
        category: form.category,
        other_category: form.category === "other" ? form.other_category : null,
        description: form.description || null,
        region: form.region,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone || null,
        shipping_available: form.shipping_available,
        item_size: form.item_size || null,
        user_id: user.id,
      });

      if (error) throw error;

      toast({ title: "המודעה פורסמה בהצלחה! 🎉" });
      onOpenChange(false);
      onCreated();
      setForm({
        type: "donate", title: "", category: "", other_category: "",
        description: "", region: "", contact_email: "", contact_phone: "",
        shipping_available: false, item_size: "",
      });
    } catch (err: any) {
      toast({ title: "שגיאה בפרסום", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>פרסום מודעה חדשה</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={form.type === "donate" ? "default" : "outline"}
              className={form.type === "donate" ? "bg-success text-success-foreground hover:bg-success/90" : ""}
              onClick={() => update("type", "donate")}
              size="sm"
            >
              יש לי לתרום
            </Button>
            <Button
              variant={form.type === "request" ? "default" : "outline"}
              className={form.type === "request" ? "bg-warm text-warm-foreground hover:bg-warm/90" : ""}
              onClick={() => update("type", "request")}
              size="sm"
            >
              אני צריך/ה
            </Button>
          </div>

          <div>
            <Label>כותרת *</Label>
            <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="לדוגמה: כסא גלגלים במצב מצוין" />
          </div>

          <div>
            <Label>קטגוריה *</Label>
            <Select value={form.category} onValueChange={(v) => update("category", v)}>
              <SelectTrigger><SelectValue placeholder="בחרו קטגוריה" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">ציוד רפואי</SelectItem>
                <SelectItem value="mobility">ניידות</SelectItem>
                <SelectItem value="hygiene">היגיינה</SelectItem>
                <SelectItem value="furniture">ריהוט מותאם</SelectItem>
                <SelectItem value="other">אחר</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {form.category === "other" && (
            <div>
              <Label>פירוט קטגוריה</Label>
              <Input value={form.other_category} onChange={(e) => update("other_category", e.target.value)} />
            </div>
          )}

          <div>
            <Label>אזור *</Label>
            <Select value={form.region} onValueChange={(v) => update("region", v)}>
              <SelectTrigger><SelectValue placeholder="בחרו אזור" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="north">צפון</SelectItem>
                <SelectItem value="center">מרכז</SelectItem>
                <SelectItem value="south">דרום</SelectItem>
                <SelectItem value="jerusalem">ירושלים והסביבה</SelectItem>
                <SelectItem value="sharon">השרון</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>תיאור</Label>
            <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="תארו את הפריט, מצבו, ופרטים נוספים..." rows={3} />
          </div>

          <div>
            <Label>אימייל ליצירת קשר *</Label>
            <Input type="email" value={form.contact_email} onChange={(e) => update("contact_email", e.target.value)} placeholder="your@email.com" dir="ltr" />
          </div>

          <div>
            <Label>טלפון (אופציונלי)</Label>
            <Input type="tel" value={form.contact_phone} onChange={(e) => update("contact_phone", e.target.value)} placeholder="050-0000000" dir="ltr" />
          </div>

          <div>
            <Label>גודל פריט</Label>
            <Select value={form.item_size} onValueChange={(v) => update("item_size", v)}>
              <SelectTrigger><SelectValue placeholder="בחרו גודל" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="small">קטן</SelectItem>
                <SelectItem value="medium">בינוני</SelectItem>
                <SelectItem value="large">גדול</SelectItem>
                <SelectItem value="heavy">כבד</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.shipping_available} onCheckedChange={(v) => update("shipping_available", v)} />
            <Label>משלוח אפשרי</Label>
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "מפרסם..." : "פרסמו מודעה"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewListingDialog;
