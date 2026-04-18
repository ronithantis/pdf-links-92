import { useState } from "react";
import { ExternalLink, Play, FileText, Wrench, Download, Printer, Maximize2, Minimize2, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PdfViewer, { downloadPdf, printPdf } from "@/components/PdfViewer";

interface Resource {
  id: string;
  category: string;
  title: string;
  description: string | null;
  resource_type: string;
  url: string | null;
  subcategory: string | null;
}
const normalizePublicPath = (url: string) => {
  if (url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `/${url}`;
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const isGuide = resource.resource_type === "guide";
  const isVideo = resource.category === "videos" && !isGuide;
  const isForm = resource.category === "forms";
  const isTool = resource.resource_type === "tool";
  const isPresentation = resource.category === "presentations";
  const hasUrl = resource.url && resource.url !== "#";
  const isInternalLink = hasUrl && resource.url!.startsWith("/");
  const formUrl = hasUrl && resource.url ? normalizePublicPath(resource.url) : null;
  const isPdfGuide = isGuide && hasUrl && resource.url!.toLowerCase().endsWith(".pdf");

  // PDF guides → open in PdfViewer dialog (like forms)
  if (isPdfGuide) {
    // fall through to the form-style dialog below by treating it as form-like
  }

  const [formOpen, setFormOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrint = () => {
    if (!formUrl) return;
    printPdf(formUrl);
  };

  const handleDownload = () => {
    if (!formUrl) return;
    downloadPdf(formUrl, resource.title + ".pdf");
  };

  if (isForm || isPdfGuide) {
    const Icon = isPdfGuide ? BookOpen : FileText;
    return (
      <>
        <button
          type="button"
          onClick={() => hasUrl && setFormOpen(true)}
          className={`flex items-center gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow group text-right w-full ${hasUrl ? "cursor-pointer" : "opacity-60 cursor-default"}`}
        >
          <Icon className="h-5 w-5 text-primary shrink-0" />
          <span className="font-medium text-sm leading-tight flex-1 text-right">{resource.title}</span>
          {hasUrl && <Download className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />}
        </button>

        {hasUrl && (
          <Dialog
            open={formOpen}
            onOpenChange={(open) => {
              setFormOpen(open);
              if (!open) setIsFullscreen(false);
            }}
          >
            <DialogContent
              aria-describedby="form-dialog-desc"
              className={
                isFullscreen
                  ? "!fixed !inset-0 !translate-x-0 !translate-y-0 !left-0 !top-0 !max-w-none !w-screen !h-screen !rounded-none p-0 flex flex-col"
                  : "max-w-5xl w-[95vw] h-[85vh] p-0 flex flex-col"
              }
            >
              <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
                <DialogHeader className="flex-1">
                  <DialogTitle className="text-base">{resource.title}</DialogTitle>
                  <DialogDescription id="form-dialog-desc" className="sr-only">תצוגת טופס</DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-1">
                  {formUrl && (
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={handleDownload}>
                      <Download className="h-3.5 w-3.5 ml-1" />
                      הורד
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrint} title="הדפסה">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFullscreen(!isFullscreen)} title="מסך מלא">
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto bg-background">
                {formUrl && <PdfViewer url={formUrl} title={resource.title} isFullscreen={isFullscreen} />}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow w-full">
      {isGuide && hasUrl ? (
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-32 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-primary opacity-70" />
        </div>
      ) : isVideo && hasUrl ? (
        <div className="relative h-32 bg-muted/30 overflow-hidden">
        <iframe
            src={resource.url!.includes('drive.google.com') ? resource.url! : `${resource.url}?badge=0&autopause=0`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            className="absolute top-0 left-0 w-full h-full"
            title={resource.title}
          />
        </div>
      ) : isVideo ? (
        <div className="bg-muted/50 h-32 flex items-center justify-center">
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
        (() => {
          const isDriveUrl = resource.url!.includes('drive.google.com');
          const driveFileId = isDriveUrl ? resource.url!.match(/\/d\/([^/]+)/)?.[1] : null;
          const thumbnailUrl = driveFileId ? `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w800` : null;
          return (
            <div className="relative w-full h-32 bg-muted/30 overflow-hidden">
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={resource.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <iframe
                  src={resource.url!}
                  className="absolute top-0 left-0 w-[250%] h-[250%] origin-top-left scale-[0.4] pointer-events-none"
                  title={resource.title}
                  loading="lazy"
                />
              )}
              <a href={resource.url!} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
            </div>
          );
        })()
      ) : null}
      <CardContent className="p-3">
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
                {isGuide ? <BookOpen className="h-3 w-3 ml-1" /> : <ExternalLink className="h-3 w-3 ml-1" />}
                {isGuide ? "פתיחת מדריך" : isVideo ? "צפייה" : isPresentation ? "פתיחת מצגת" : "פתיחה"}
              </a>
            </Button>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
