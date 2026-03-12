import { useState } from "react";
import { Accessibility, Plus, Minus, Type, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const changeFontSize = (delta: number) => {
    const newSize = Math.max(80, Math.min(150, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div className="mb-3 bg-card border rounded-lg shadow-lg p-4 w-56 space-y-3">
          <h3 className="text-sm font-bold text-foreground">הגדרות נגישות</h3>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">גודל טקסט</span>
            <div className="flex gap-1">
              <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => changeFontSize(-10)} aria-label="הקטן טקסט">
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-xs flex items-center px-2">{fontSize}%</span>
              <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => changeFontSize(10)} aria-label="הגדל טקסט">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full text-xs h-9 justify-start gap-2" onClick={toggleContrast}>
            {highContrast ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {highContrast ? "ניגודיות רגילה" : "ניגודיות גבוהה"}
          </Button>

          <Button variant="outline" className="w-full text-xs h-9 justify-start gap-2" onClick={() => { setFontSize(100); document.documentElement.style.fontSize = "100%"; }}>
            <Type className="h-4 w-4" />
            איפוס הגדרות
          </Button>
        </div>
      )}
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="תפריט נגישות"
      >
        <Accessibility className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default AccessibilityMenu;
