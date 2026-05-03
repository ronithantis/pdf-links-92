import { useEffect, useState } from "react";
import { Maximize2, Minimize2, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PresentationDetail {
  url: string;
  title?: string;
}

export const openPresentation = (url: string, title?: string) => {
  window.dispatchEvent(new CustomEvent("open-presentation", { detail: { url, title } }));
};

// External guides that should open inside the floating presentation modal
// (instead of a new browser tab). Add new GitHub Pages guides here.
const MODAL_EXTERNAL_GUIDES = [
  "ronithantis.github.io/RECIPES",
];

export const shouldOpenInModal = (url: string): boolean => {
  if (!url) return false;
  if (url.startsWith("/presentations/") && url.endsWith(".html")) return true;
  return MODAL_EXTERNAL_GUIDES.some((m) => url.includes(m));
};

const PresentationModal = () => {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [data, setData] = useState<PresentationDetail | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<PresentationDetail>).detail;
      if (!detail?.url) return;
      setData(detail);
      setOpen(true);
    };
    window.addEventListener("open-presentation", handler);
    return () => window.removeEventListener("open-presentation", handler);
  }, []);

  if (!data) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setFullscreen(false);
      }}
    >
      <DialogContent
        aria-describedby="presentation-modal-desc"
        className={
          fullscreen
            ? "!fixed !inset-0 !translate-x-0 !translate-y-0 !left-0 !top-0 !max-w-none !w-screen !h-screen !rounded-none p-0 flex flex-col"
            : "max-w-6xl w-[95vw] h-[90vh] p-0 flex flex-col"
        }
      >
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
          <DialogHeader className="flex-1">
            <DialogTitle className="text-base">{data.title || "מצגת"}</DialogTitle>
            <DialogDescription id="presentation-modal-desc" className="sr-only">תצוגת מצגת בחלון צף</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
              <a href={data.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
                פתיחה בחלון חדש
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFullscreen(!fullscreen)} title="מסך מלא">
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-background">
          <iframe
            src={data.url}
            title={data.title || "מצגת"}
            className="w-full h-full border-0"
            allow="fullscreen"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PresentationModal;