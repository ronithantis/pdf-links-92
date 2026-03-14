import { ExternalLink, Play, FileText, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  const isPdfForm = isForm && hasUrl && resource.url!.toLowerCase().includes(".pdf");

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
      ) : isForm && isPdfForm ? (
        <div className="relative w-full h-48 bg-muted/30 overflow-hidden">
          <iframe
            src={resource.url!}
            className="absolute top-0 left-0 w-[250%] h-[250%] origin-top-left scale-[0.4] pointer-events-none"
            title={resource.title}
            loading="lazy"
          />
          <a href={resource.url!} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
        </div>
      ) : isForm ? (
        <div className="bg-primary/5 h-28 flex items-center justify-center">
          <FileText className="h-12 w-12 text-primary opacity-60" />
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
                {isVideo ? "צפייה" : isForm ? "פתיחת טופס" : isPresentation ? "פתיחת מצגת" : "פתיחה"}
              </a>
            </Button>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
