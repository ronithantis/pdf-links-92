import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">צור קשר</h1>
      <p className="text-lg text-muted-foreground mb-10">יש לכם שאלה? נשמח לעזור</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              שלחו לנו הודעה
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">שם מלא</Label>
              <Input id="name" placeholder="השם שלכם" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">אימייל</Label>
              <Input id="email" type="email" placeholder="your@email.com" dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">הודעה</Label>
              <Textarea id="message" placeholder="כתבו את ההודעה שלכם כאן..." rows={5} />
            </div>
            <Button className="w-full">שלח הודעה</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">אימייל</h3>
              <p className="text-sm text-muted-foreground">info@family-care.co.il</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">טלפון</h3>
              <p className="text-sm text-muted-foreground" dir="ltr">03-1234567</p>
            </div>
          </div>
          <Card className="bg-muted/50">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-2">שעות מענה</h3>
              <p className="text-sm text-muted-foreground">ימים א׳-ה׳: 09:00-17:00</p>
              <p className="text-sm text-muted-foreground">נשתדל לחזור אליכם תוך 24 שעות</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
