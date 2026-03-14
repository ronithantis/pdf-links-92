import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Listing } from "./ListingCard";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: Listing | null;
}

const ContactDialog = ({ open, onOpenChange, listing }: ContactDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!listing) return null;

  const handleSend = () => {
    if (!name || !email || !message) {
      toast({ title: "יש למלא את כל השדות", variant: "destructive" });
      return;
    }
    // For now, open mailto. In the future, this will go through an edge function.
    const subject = encodeURIComponent(`בנוגע ל: ${listing.title} — קח ותן`);
    const body = encodeURIComponent(`שם: ${name}\nאימייל: ${email}\n\n${message}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
    toast({ title: "הודעה נשלחה! 📬" });
    onOpenChange(false);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>יצירת קשר — {listing.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>השם שלכם *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>אימייל שלכם *</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" />
          </div>
          <div>
            <Label>הודעה *</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="היי, ראיתי את המודעה שלכם ואשמח לשמוע עוד פרטים..." />
          </div>
          <Button onClick={handleSend} className="w-full">שלח הודעה</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
