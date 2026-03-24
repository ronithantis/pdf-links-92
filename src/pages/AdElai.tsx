import { useState } from "react";
import { Maximize2, Minimize2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdElai = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        <div className="px-4 pt-3 pb-2 border-b bg-muted/30 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">עד אלי – שירותים וציוד לגיל השלישי</h1>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFullscreen(false)}>
            <Minimize2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            src="https://ad-elai.vercel.app/"
            className="w-full h-full border-0"
            title="עד אלי – שירותים וציוד לגיל השלישי"
            allow="clipboard-write"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          עד אלי — <span className="text-primary">שירותים וציוד לגיל השלישי</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          מאגר ספקי שירותים וציוד בתשלום לגיל השלישי — סיעוד, פיזיותרפיה, ציוד רפואי ועוד
        </p>
      </div>

      <div className="flex justify-end mb-2">
        <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => setIsFullscreen(true)}>
          <Maximize2 className="h-3.5 w-3.5" />
          מסך מלא
        </Button>
      </div>
      <div className="rounded-lg border overflow-hidden" style={{ height: "80vh" }}>
        <iframe
          src="https://ad-elai.vercel.app/"
          className="w-full h-full border-0"
          title="עד אלי – שירותים וציוד לגיל השלישי"
          allow="clipboard-write"
        />
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">
        עד אלי – פלטפורמה מנגישה בלבד. אין לנו אחריות לאיכות השירות של הספקים המוצגים.
      </p>
    </div>
  );
};

export default AdElai;
