import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { digitalTools } from "@/lib/modules-data";
import {
  Calculator, ClipboardList, RefreshCw, BookOpen, FileSignature,
  Lock, Wallet, ShieldCheck, Receipt, Handshake, Briefcase,
  CalendarDays, ExternalLink, Maximize2, Minimize2, X, Compass
} from "lucide-react";

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
  Compass: <Compass className="h-8 w-8" />,
};

const DigitalTools = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openTool, setOpenTool] = useState<typeof digitalTools[0] | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
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

  const handleOpenTool = (tool: typeof digitalTools[0]) => {
    if ((tool as any).isInternal && tool.toolUrl) {
      navigate(tool.toolUrl);
    } else if (tool.isExternal && tool.externalUrl) {
      window.open(tool.externalUrl, "_blank");
    } else if (tool.toolUrl) {
      setOpenTool(tool);
      setIsFullscreen(false);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-2">כלים דיגיטליים</h1>
      <p className="text-lg text-muted-foreground mb-10">כלים מעשיים לניהול הטיפול, חישובים ותכנון משפטי</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
        {digitalTools.map((tool) => {
          const hasUrl = !!(tool.toolUrl || tool.externalUrl);
          const isExternal = !!(tool as any).isExternal;

          return (
            <Card key={tool.id} id={tool.id} className="relative transition-all duration-300 hover:shadow-md flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <span className="text-primary">{toolIcons[tool.icon]}</span>
                  <div className="flex gap-1">
                    {tool.isPaid && (
                      <Badge variant="secondary" className="gap-1">
                        <Lock className="h-3 w-3" /> בתשלום
                      </Badge>
                    )}
                    {isExternal && (
                      <Badge className="gap-1 bg-rose-500/10 text-rose-600 border-rose-200 hover:bg-rose-500/20">
                        <ExternalLink className="h-3 w-3" /> כלי חיצוני
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                {isExternal ? (
                  <Button
                    onClick={() => handleOpenTool(tool)}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                  >
                    <ExternalLink className="h-4 w-4 ml-2" />
                    מעבר לכלי חיצוני
                  </Button>
                ) : hasUrl ? (
                  <Button onClick={() => handleOpenTool(tool)} className="w-full">
                    פתיחת הכלי
                  </Button>
                ) : (
                  <Button disabled className="w-full" variant="outline">
                    {tool.isPaid ? "בקרוב - בתשלום" : "בקרוב"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tool iframe dialog */}
      {openTool && (
        <Dialog open={!!openTool} onOpenChange={(open) => { if (!open) { setOpenTool(null); setIsFullscreen(false); } }}>
          <DialogContent
            className={
              isFullscreen
                ? "!fixed !inset-0 !translate-x-0 !translate-y-0 !left-0 !top-0 !max-w-none !w-screen !h-screen !rounded-none p-0 flex flex-col"
                : "max-w-5xl w-[95vw] h-[85vh] p-0 flex flex-col"
            }
          >
            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
              <DialogHeader className="flex-1">
                <DialogTitle className="text-base">{openTool.title}</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={openTool.toolUrl}
                className="w-full h-full border-0"
                title={openTool.title}
                allow="clipboard-write"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DigitalTools;
