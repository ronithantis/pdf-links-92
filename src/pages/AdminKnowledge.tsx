import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, LogOut, ToggleRight } from "lucide-react";

const AdminKnowledge = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [resources, setResources] = useState<any[]>([]);
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [editResource, setEditResource] = useState<any>(null);
  const [editScenario, setEditScenario] = useState<any>(null);
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [scenarioDialogOpen, setScenarioDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchResources();
      fetchScenarios();
      fetchDonations();
    }
  }, [isAdmin]);

  const fetchResources = async () => {
    const { data } = await supabase
      .from("knowledge_resources")
      .select("*")
      .order("sort_order");
    setResources(data || []);
  };

  const fetchScenarios = async () => {
    const { data } = await supabase
      .from("scenarios")
      .select("*")
      .order("sort_order");
    setScenarios(data || []);
  };

  const fetchDonations = async () => {
    const { data } = await supabase
      .from("donation_listings")
      .select("*")
      .order("created_at", { ascending: false });
    setDonations(data || []);
  };

  const saveResource = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload: any = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      category: form.get("category") as string,
      resource_type: form.get("resource_type") as string,
      url: form.get("url") as string,
      subcategory: form.get("subcategory") as string,
      sort_order: parseInt(form.get("sort_order") as string) || 0,
      is_published: form.get("is_published") === "true",
      scenario_tags: (form.get("scenario_tags") as string).split(",").map((s) => s.trim()).filter(Boolean),
    };

    if (editResource?.id) {
      const { error } = await supabase.from("knowledge_resources").update(payload).eq("id", editResource.id);
      if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("knowledge_resources").insert(payload);
      if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: "נשמר בהצלחה" });
    setResourceDialogOpen(false);
    setEditResource(null);
    fetchResources();
  };

  const deleteResource = async (id: string) => {
    if (!confirm("למחוק?")) return;
    await supabase.from("knowledge_resources").delete().eq("id", id);
    fetchResources();
  };

  const saveScenario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      title: form.get("title") as string,
      trigger_phrases: (form.get("trigger_phrases") as string).split(",").map((s) => s.trim()).filter(Boolean),
      questions: (form.get("questions") as string).split("\n").filter(Boolean),
      recommended_actions: (form.get("recommended_actions") as string).split("\n").filter(Boolean),
      tags: (form.get("tags") as string).split(",").map((s) => s.trim()).filter(Boolean),
      sort_order: parseInt(form.get("sort_order") as string) || 0,
      is_published: form.get("is_published") === "true",
    };

    if (editScenario?.id) {
      const { error } = await supabase.from("scenarios").update(payload).eq("id", editScenario.id);
      if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("scenarios").insert(payload);
      if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: "נשמר בהצלחה" });
    setScenarioDialogOpen(false);
    setEditScenario(null);
    fetchScenarios();
  };

  const deleteScenario = async (id: string) => {
    if (!confirm("למחוק?")) return;
    await supabase.from("scenarios").delete().eq("id", id);
    fetchScenarios();
  };

  const deleteDonation = async (id: string) => {
    if (!confirm("למחוק מודעה זו?")) return;
    const { error } = await supabase.from("donation_listings").delete().eq("id", id);
    if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); return; }
    toast({ title: "המודעה נמחקה" });
    fetchDonations();
  };

  const toggleDonationStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "closed" : "active";
    const { error } = await supabase.from("donation_listings").update({ status: newStatus }).eq("id", id);
    if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); return; }
    toast({ title: `סטטוס שונה ל-${newStatus === "active" ? "פעיל" : "סגור"}` });
    fetchDonations();
  };

  if (loading) return <div className="container py-20 text-center">טוען...</div>;
  if (!isAdmin) return null;

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ניהול מרכז הידע</h1>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="h-4 w-4 ml-1" />
          התנתק
        </Button>
      </div>

      <Tabs defaultValue="resources" dir="rtl">
        <TabsList>
          <TabsTrigger value="resources">משאבים ({resources.length})</TabsTrigger>
          <TabsTrigger value="scenarios">תרחישים ({scenarios.length})</TabsTrigger>
          <TabsTrigger value="donations">קח ותן ({donations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="mt-4">
          <div className="flex justify-end mb-4">
            <Dialog open={resourceDialogOpen} onOpenChange={(open) => { setResourceDialogOpen(open); if (!open) setEditResource(null); }}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 ml-1" />הוסף משאב</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editResource ? "עריכת משאב" : "הוספת משאב"}</DialogTitle></DialogHeader>
                <form onSubmit={saveResource} className="space-y-3">
                  <div><Label>כותרת</Label><Input name="title" defaultValue={editResource?.title || ""} required /></div>
                  <div><Label>תיאור</Label><Textarea name="description" defaultValue={editResource?.description || ""} /></div>
                  <div><Label>קטגוריה</Label>
                    <Select name="category" defaultValue={editResource?.category || "presentations"}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="presentations">מצגות</SelectItem>
                        <SelectItem value="videos">סרטונים</SelectItem>
                        <SelectItem value="forms">טפסים</SelectItem>
                        <SelectItem value="other">אחר</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>סוג (link/file/embed)</Label><Input name="resource_type" defaultValue={editResource?.resource_type || "link"} /></div>
                  <div><Label>URL</Label><Input name="url" defaultValue={editResource?.url || ""} /></div>
                  <div><Label>תת-קטגוריה</Label><Input name="subcategory" defaultValue={editResource?.subcategory || ""} /></div>
                  <div><Label>סדר</Label><Input name="sort_order" type="number" defaultValue={editResource?.sort_order || 0} /></div>
                  <div><Label>תגיות תרחישים (מופרדות בפסיק)</Label><Input name="scenario_tags" defaultValue={editResource?.scenario_tags?.join(", ") || ""} /></div>
                  <div><Label>מפורסם</Label>
                    <Select name="is_published" defaultValue={editResource?.is_published !== false ? "true" : "false"}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">כן</SelectItem>
                        <SelectItem value="false">לא</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">שמור</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>כותרת</TableHead>
                <TableHead>קטגוריה</TableHead>
                <TableHead>תגיות</TableHead>
                <TableHead>מפורסם</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.title}</TableCell>
                  <TableCell><Badge variant="outline">{r.category}</Badge></TableCell>
                  <TableCell className="text-xs">{r.scenario_tags?.join(", ")}</TableCell>
                  <TableCell>{r.is_published ? "✓" : "✗"}</TableCell>
                  <TableCell className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditResource(r); setResourceDialogOpen(true); }}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteResource(r.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="scenarios" className="mt-4">
          <div className="flex justify-end mb-4">
            <Dialog open={scenarioDialogOpen} onOpenChange={(open) => { setScenarioDialogOpen(open); if (!open) setEditScenario(null); }}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 ml-1" />הוסף תרחיש</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editScenario ? "עריכת תרחיש" : "הוספת תרחיש"}</DialogTitle></DialogHeader>
                <form onSubmit={saveScenario} className="space-y-3">
                  <div><Label>כותרת</Label><Input name="title" defaultValue={editScenario?.title || ""} required /></div>
                  <div><Label>ביטויי הפעלה (מופרדים בפסיק)</Label><Input name="trigger_phrases" defaultValue={editScenario?.trigger_phrases?.join(", ") || ""} /></div>
                  <div><Label>שאלות (שאלה בכל שורה)</Label><Textarea name="questions" defaultValue={(editScenario?.questions as string[])?.join("\n") || ""} /></div>
                  <div><Label>פעולות מומלצות (פעולה בכל שורה)</Label><Textarea name="recommended_actions" defaultValue={(editScenario?.recommended_actions as string[])?.join("\n") || ""} /></div>
                  <div><Label>תגיות (מופרדות בפסיק)</Label><Input name="tags" defaultValue={editScenario?.tags?.join(", ") || ""} /></div>
                  <div><Label>סדר</Label><Input name="sort_order" type="number" defaultValue={editScenario?.sort_order || 0} /></div>
                  <div><Label>מפורסם</Label>
                    <Select name="is_published" defaultValue={editScenario?.is_published !== false ? "true" : "false"}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">כן</SelectItem>
                        <SelectItem value="false">לא</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">שמור</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>כותרת</TableHead>
                <TableHead>תגיות</TableHead>
                <TableHead>מפורסם</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.title}</TableCell>
                  <TableCell className="text-xs">{s.tags?.join(", ")}</TableCell>
                  <TableCell>{s.is_published ? "✓" : "✗"}</TableCell>
                  <TableCell className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditScenario(s); setScenarioDialogOpen(true); }}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteScenario(s.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="donations" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>כותרת</TableHead>
                <TableHead>סוג</TableHead>
                <TableHead>קטגוריה</TableHead>
                <TableHead>אזור</TableHead>
                <TableHead>סטטוס</TableHead>
                <TableHead>תאריך</TableHead>
                <TableHead>פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.title}</TableCell>
                  <TableCell>
                    <Badge variant={d.type === "donate" ? "default" : "secondary"}>
                      {d.type === "donate" ? "תרומה" : "בקשה"}
                    </Badge>
                  </TableCell>
                  <TableCell>{d.category}</TableCell>
                  <TableCell>{d.region}</TableCell>
                  <TableCell>
                    <Badge variant={d.status === "active" ? "default" : "outline"}>
                      {d.status === "active" ? "פעיל" : "סגור"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">{new Date(d.created_at).toLocaleDateString("he-IL")}</TableCell>
                  <TableCell className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleDonationStatus(d.id, d.status)} title="שנה סטטוס">
                      <ToggleRight className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteDonation(d.id)} title="מחק">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {donations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">אין מודעות</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminKnowledge;
