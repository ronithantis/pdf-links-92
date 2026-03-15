import { useEffect, useState, useRef } from "react";
import { ExternalLink, Play, FileText, Wrench, Download, Printer, Maximize2, Minimize2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Resource {
  id: string;
  category: string;
  title: string;
  description: string | null;
  resource_type: string;
  url: string | null;
  subcategory: string | null;
}

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const isVideo = resource.category === "videos";
  const isForm = resource.category === "forms";
  const isTool = resource.resource_type === "tool";
  const isPresentation = resource.category === "presentations";
  const hasUrl = resource.url && resource.url !== "#";
  const isInternalLink = hasUrl && resource.url!.startsWith("/");

  const [formOpen, setFormOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfLoadError, setPdfLoadError] = useState(false);

  useEffect(() => {
    if (!isForm || !hasUrl || !formOpen || !resource.url) return;

    let cancelled = false;
    let objectUrl: string | null = null;

    const loadPdf = async () => {
      setPdfLoading(true);
      setPdfLoadError(false);

      try {
        const response = await fetch(resource.url, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to load PDF (${response.status})`);
        }

        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);

        if (cancelled) {
          URL.revokeObjectURL(objectUrl);
          return;
        }

        setPdfBlobUrl(objectUrl);
      } catch {
        if (!cancelled) {
          setPdfLoadError(true);
          setPdfBlobUrl(null);
        }
      } finally {
        if (!cancelled) {
          setPdfLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [formOpen, hasUrl, isForm, resource.url]);

  const handlePrint = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe?.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        return;
      }
    } catch {
      // cross-origin or blocked – fallback
    }

    if (pdfBlobUrl) {
      window.open(pdfBlobUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (hasUrl) {
      window.open(resource.url!, "_blank", "noopener,noreferrer");
    }
  };

  if (isForm) {
    return (
      <>
        <button
          type="button"
          onClick={() => hasUrl && setFormOpen(true)}
          className={`flex items-center gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow group text-right w-full ${hasUrl ? "cursor-pointer" : "opacity-60 cursor-default"}`}
        >
          <FileText className="h-5 w-5 text-primary shrink-0" />
          <span className="font-medium text-sm leading-tight flex-1 text-right">{resource.title}</span>
          {hasUrl && <Download className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />}
        </button>

        {hasUrl && (
          <Dialog open={formOpen} onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) {
              setIsFullscreen(false);
              setPdfLoading(false);
              setPdfLoadError(false);
              setPdfBlobUrl(null);
            }
          }}>
            <DialogContent
              className={
                isFullscreen
                  ? "!fixed !inset-0 !translate-x-0 !translate-y-0 !left-0 !top-0 !max-w-none !w-screen !h-screen !rounded-none p-0 flex flex-col"
                  : "max-w-5xl w-[95vw] h-[85vh] p-0 flex flex-col"
              }
            >
              <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
                <DialogHeader className="flex-1">
                  <DialogTitle className="text-base">{resource.title}</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrint} title="הדפסה">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFullscreen(!isFullscreen)}>
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <iframe
                  ref={iframeRef}
                  src={resource.url!}
                  className="w-full h-full border-0"
                  title={resource.title}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow w-full max-w-[320px]">
      {isVideo && hasUrl ? (
        <div className="relative h-48 bg-muted/30 overflow-hidden">
          <iframe
            src={`${resource.url}?badge=0&autopause=0`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            className="absolute top-0 left-0 w-full h-full"
            title={resource.title}
          />
        </div>
      ) : isVideo ? (
        <div className="bg-muted/50 h-48 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Play className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <span className="text-xs">בקרוב</span>
          </div>
        </div>
      ) : isTool ? (
        <div className="bg-muted/30 h-24 flex items-center justify-center">
          <Wrench className="h-10 w-10 text-primary opacity-50" />
        </div>
      ) : isPresentation && hasUrl ? (
        <div className="relative w-full h-48 bg-muted/30 overflow-hidden">
          <iframe
            src={resource.url!}
            className="absolute top-0 left-0 w-[250%] h-[250%] origin-top-left scale-[0.4] pointer-events-none"
            title={resource.title}
            loading="lazy"
          />
          <a href={resource.url!} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
        </div>
      ) : null}
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-bold text-sm leading-tight">{resource.title}</h4>
          {resource.subcategory && (
            <Badge variant="outline" className="text-[10px] shrink-0 mr-2">{resource.subcategory}</Badge>
          )}
        </div>
        {resource.description && (
          <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
        )}
        {hasUrl && (
          isTool && isInternalLink ? (
            <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
              <a href={resource.url!}>
                <Wrench className="h-3 w-3 ml-1" />
                מעבר לכלי
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
              <a href={resource.url!} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 ml-1" />
                {isVideo ? "צפייה" : isPresentation ? "פתיחת מצגת" : "פתיחה"}
              </a>
            </Button>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
