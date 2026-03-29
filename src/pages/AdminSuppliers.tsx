import { useState, useEffect } from "react";
import { Check, X, Eye, Search, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Supplier {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  business_name: string | null;
  phone: string;
  email: string;
  id_number: string;
  business_number: string | null;
  service_type: string[];
  region: string[];
  description: string | null;
  services_detail: string | null;
  years_experience: string | null;
  has_insurance: string | null;
  unhappy_client_policy: string | null;
  digital_presence: string[];
  digital_link: string | null;
  referral_1_name: string;
  referral_1_phone: string;
  referral_2_name: string;
  referral_2_phone: string;
  referral_verification_consent: boolean;
  price_list: any;
  has_insurance_declaration: boolean;
  status: string;
  trust_score: number;
  admin_checklist: {
    google_search: boolean;
    net_hamishpat: boolean;
    business_registry: boolean;
    referral_1_verified: boolean;
    referral_2_verified: boolean;
  };
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "ממתין", color: "bg-yellow-100 text-yellow-800" },
  approved: { label: "מאושר", color: "bg-green-100 text-green-800" },
  rejected: { label: "נדחה", color: "bg-red-100 text-red-800" },
};

const checklistLabels: Record<string, string> = {
  google_search: "חיפוש גוגל בוצע",
  net_hamishpat: "נט המשפט נבדק",
  business_registry: "רשם עוסקים אומת",
  referral_1_verified: "המלצה 1 אומתה טלפונית",
  referral_2_verified: "המלצה 2 אומתה טלפונית",
};

const AdminSuppliers = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) loadSuppliers();
  }, [isAdmin]);

  const loadSuppliers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSuppliers(data as unknown as Supplier[]);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("suppliers")
      .update({ status } as any)
      .eq("id", id);

    if (error) {
      toast({ title: "שגיאה", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "עודכן", description: `הסטטוס עודכן ל${statusLabels[status]?.label}` });
      loadSuppliers();
    }
  };

  const updateChecklist = async (id: string, key: string, value: boolean) => {
    const supplier = suppliers.find((s) => s.id === id);
    if (!supplier) return;
    const newChecklist = { ...supplier.admin_checklist, [key]: value };

    const { error } = await supabase
      .from("suppliers")
      .update({ admin_checklist: newChecklist } as any)
      .eq("id", id);

    if (!error) {
      setSuppliers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, admin_checklist: newChecklist } : s))
      );
      if (selectedSupplier?.id === id) {
        setSelectedSupplier({ ...selectedSupplier, admin_checklist: newChecklist });
      }
    }
  };

  const filtered = suppliers.filter((s) => {
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        s.first_name.toLowerCase().includes(q) ||
        s.last_name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.business_name || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (authLoading || loading) {
    return <div className="flex items-center justify-center min-h-screen text-muted-foreground">טוען...</div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">ניהול ספקים – עד אלי</h1>
          <p className="text-muted-foreground mt-1">סה"כ {suppliers.length} ספקים רשומים</p>
        </div>
        <div className="flex items-center gap-3">
          {Object.entries(statusLabels).map(([key, { label }]) => {
            const count = suppliers.filter((s) => s.status === key).length;
            return (
              <Badge key={key} variant="outline" className="text-sm">
                {label}: {count}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="חפש ספק..." className="pr-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((s) => (
            <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(s)}>
              {s === "all" ? "הכל" : statusLabels[s]?.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">לא נמצאו ספקים</p>
          </div>
        ) : (
          filtered.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg">
                        {supplier.business_name || `${supplier.first_name} ${supplier.last_name}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {supplier.first_name} {supplier.last_name} · {supplier.email} · {supplier.phone}
                      </p>
                      <div className="flex gap-1.5 mt-1 flex-wrap">
                        {supplier.service_type?.slice(0, 3).map((s) => (
                          <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                        ))}
                        {supplier.region?.slice(0, 2).map((r) => (
                          <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={statusLabels[supplier.status]?.color || "bg-gray-100"}>
                      {statusLabels[supplier.status]?.label || supplier.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ציון: {supplier.trust_score}%
                    </Badge>

                    <div className="flex gap-1.5">
                      <Button size="sm" variant="outline" onClick={() => { setSelectedSupplier(supplier); setDetailOpen(true); }}>
                        <Eye className="h-4 w-4 ml-1" /> פרטים
                      </Button>
                      {supplier.status !== "approved" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => updateStatus(supplier.id, "approved")}>
                          <Check className="h-4 w-4 ml-1" /> אשר
                        </Button>
                      )}
                      {supplier.status !== "rejected" && (
                        <Button size="sm" variant="destructive" onClick={() => updateStatus(supplier.id, "rejected")}>
                          <X className="h-4 w-4 ml-1" /> דחה
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inline checklist */}
                <div className="mt-3 pt-3 border-t flex gap-3 flex-wrap">
                  {Object.entries(checklistLabels).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-green-600"
                        checked={supplier.admin_checklist?.[key as keyof typeof supplier.admin_checklist] || false}
                        onChange={(e) => updateChecklist(supplier.id, key, e.target.checked)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto text-right" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              פרטי ספק: {selectedSupplier?.business_name || `${selectedSupplier?.first_name} ${selectedSupplier?.last_name}`}
            </DialogTitle>
          </DialogHeader>
          {selectedSupplier && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-muted-foreground">שם</span><p className="font-semibold">{selectedSupplier.first_name} {selectedSupplier.last_name}</p></div>
                <div><span className="text-xs text-muted-foreground">עסק</span><p className="font-semibold">{selectedSupplier.business_name || "—"}</p></div>
                <div><span className="text-xs text-muted-foreground">טלפון</span><p className="font-semibold">{selectedSupplier.phone}</p></div>
                <div><span className="text-xs text-muted-foreground">אימייל</span><p className="font-semibold">{selectedSupplier.email}</p></div>
                <div><span className="text-xs text-muted-foreground">ת.ז.</span><p className="font-semibold">{selectedSupplier.id_number}</p></div>
                <div><span className="text-xs text-muted-foreground">מס' עוסק</span><p className="font-semibold">{selectedSupplier.business_number || "—"}</p></div>
                <div><span className="text-xs text-muted-foreground">שנות ניסיון</span><p className="font-semibold">{selectedSupplier.years_experience || "—"}</p></div>
                <div><span className="text-xs text-muted-foreground">ביטוח</span><p className="font-semibold">{selectedSupplier.has_insurance || "—"}</p></div>
              </div>

              <div>
                <span className="text-xs text-muted-foreground">תיאור</span>
                <p className="text-sm">{selectedSupplier.description || "—"}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">פירוט שירותים</span>
                <p className="text-sm">{selectedSupplier.services_detail || "—"}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">מדיניות לקוח לא מרוצה</span>
                <p className="text-sm">{selectedSupplier.unhappy_client_policy || "—"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground">שירותים</span>
                  <div className="flex flex-wrap gap-1 mt-1">{selectedSupplier.service_type?.map((s) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}</div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">אזורים</span>
                  <div className="flex flex-wrap gap-1 mt-1">{selectedSupplier.region?.map((r) => <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground">ממליץ 1</span>
                  <p className="font-semibold text-sm">{selectedSupplier.referral_1_name} – {selectedSupplier.referral_1_phone}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">ממליץ 2</span>
                  <p className="font-semibold text-sm">{selectedSupplier.referral_2_name} – {selectedSupplier.referral_2_phone}</p>
                </div>
              </div>

              {selectedSupplier.digital_link && (
                <div>
                  <span className="text-xs text-muted-foreground">קישור דיגיטלי</span>
                  <a href={selectedSupplier.digital_link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline block">{selectedSupplier.digital_link}</a>
                </div>
              )}

              {selectedSupplier.price_list && Array.isArray(selectedSupplier.price_list) && selectedSupplier.price_list.length > 0 && (
                <div>
                  <span className="text-xs text-muted-foreground">מחירון</span>
                  <div className="mt-1 border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted"><tr><th className="p-2 text-right">שירות</th><th className="p-2 text-center">מחיר רגיל</th><th className="p-2 text-center">מחיר מאגר</th></tr></thead>
                      <tbody>
                        {(selectedSupplier.price_list as any[]).map((row: any, i: number) => (
                          <tr key={i} className="border-t"><td className="p-2">{row.service}</td><td className="p-2 text-center">₪{row.regular_price}</td><td className="p-2 text-center">₪{row.discount_price}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Checklist */}
              <div className="rounded-lg p-4 border bg-muted/50">
                <h4 className="font-bold mb-3 flex items-center gap-2"><Shield className="h-4 w-4" /> צ'קליסט בדיקה ידנית</h4>
                <div className="space-y-2">
                  {Object.entries(checklistLabels).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-green-600 h-4 w-4"
                        checked={selectedSupplier.admin_checklist?.[key as keyof typeof selectedSupplier.admin_checklist] || false}
                        onChange={(e) => updateChecklist(selectedSupplier.id, key, e.target.checked)}
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button className="bg-green-600 hover:bg-green-700 text-white flex-1" onClick={() => { updateStatus(selectedSupplier.id, "approved"); setDetailOpen(false); }}>
                  <Check className="h-4 w-4 ml-1" /> אשר ספק
                </Button>
                <Button variant="destructive" className="flex-1" onClick={() => { updateStatus(selectedSupplier.id, "rejected"); setDetailOpen(false); }}>
                  <X className="h-4 w-4 ml-1" /> דחה ספק
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSuppliers;
