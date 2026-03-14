import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";

interface CognitiveGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
}

const CognitiveGameDialog = ({ open, onOpenChange, title, url }: CognitiveGameDialogProps) => {
  const [loading, setLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const handleOpen = () => {
    setLoading(true);
    setIframeError(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { onOpenChange(val); if (val) handleOpen(); }}>
      <DialogContent className="max-w-5xl w-[95vw] h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 pb-2 border-b shrink-0">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <Button variant="outline" size="sm" className="gap-1.5 shrink-0" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                פתיחה בחלון חדש
              </a>
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 relative min-h-0">
          {loading && !iframeError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {iframeError ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
              <p className="text-lg text-muted-foreground">לא ניתן לטעון את המשחק בתוך החלון</p>
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 ml-2" />
                  פתיחה בחלון חדש
                </a>
              </Button>
            </div>
          ) : (
            <iframe
              src={url}
              className="w-full h-full border-0"
              title={title}
              allow="fullscreen"
              onLoad={() => setLoading(false)}
              onError={() => { setIframeError(true); setLoading(false); }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CognitiveGameDialog;
