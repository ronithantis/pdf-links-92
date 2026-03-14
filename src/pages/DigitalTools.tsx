import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { digitalTools } from "@/lib/modules-data";
import { Calculator, ClipboardList, RefreshCw, BookOpen, FileSignature, Lock, Wallet, ShieldCheck, Receipt, Handshake, Briefcase, CalendarDays } from "lucide-react";

const toolIcons: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="h-8 w-8" />,
  Wallet: <Wallet className="h-8 w-8" />,
  ShieldCheck: <ShieldCheck className="h-8 w-8" />,
  Receipt: <Receipt className="h-8 w-8" />,
  Handshake: <Handshake className="h-8 w-8" />,
  RefreshCw: <RefreshCw className="h-8 w-8" />,
  Briefcase: <Briefcase className="h-8 w-8" />,
  ClipboardList: <ClipboardList className="h-8 w-8" />,
  CalendarDays: <CalendarDays className="h-8 w-8" />,
  BookOpen: <BookOpen className="h-8 w-8" />,
  FileSignature: <FileSignature className="h-8 w-8" />,
};

const DigitalTools = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-2", "ring-primary", "ring-offset-2");
          setTimeout(() => el.classList.remove("ring-2", "ring-primary", "ring-offset-2"), 3000);
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">כלים דיגיטליים</h1>
      <p className="text-lg text-muted-foreground mb-10">כלים מעשיים לניהול הטיפול, חישובים ותכנון משפטי</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
        {digitalTools.map((tool) => (
          <Card key={tool.id} id={tool.id} className="relative transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <span className="text-primary">{toolIcons[tool.icon]}</span>
                {tool.isPaid && <Badge variant="secondary" className="gap-1"><Lock className="h-3 w-3" /> בתשלום</Badge>}
              </div>
              <CardTitle className="text-lg">{tool.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
              <Button disabled className="w-full" variant="outline">
                {tool.isPaid ? "בקרוב - בתשלום" : "בקרוב"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DigitalTools;
