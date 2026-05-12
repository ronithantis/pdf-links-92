import { useState, useEffect } from "react";
import {
  Accessibility, Plus, Minus, RotateCcw, Contrast, Link2, Type,
  MousePointer2, Pause, Eye, X, FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "hub2care_a11y_v1";

type Settings = {
  fontSize: number;
  contrast: boolean;
  invert: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  bigCursor: boolean;
  pauseAnimations: boolean;
  focusVisible: boolean;
};

const DEFAULT: Settings = {
  fontSize: 100,
  contrast: false,
  invert: false,
  highlightLinks: false,
  readableFont: false,
  bigCursor: false,
  pauseAnimations: false,
  focusVisible: false,
};

const CLASS_MAP: Record<keyof Settings, string> = {
  fontSize: "",
  contrast: "a11y-contrast",
  invert: "a11y-invert",
  highlightLinks: "a11y-highlight-links",
  readableFont: "a11y-readable-font",
  bigCursor: "a11y-big-cursor",
  pauseAnimations: "a11y-pause-animations",
  focusVisible: "a11y-focus-visible",
};

const apply = (s: Settings) => {
  document.documentElement.style.fontSize = `${s.fontSize}%`;
  (Object.keys(CLASS_MAP) as (keyof Settings)[]).forEach((k) => {
    const cls = CLASS_MAP[k];
    if (!cls) return;
    document.body.classList.toggle(cls, Boolean(s[k]));
  });
};

const load = (): Settings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT;
};

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT);

  useEffect(() => {
    const s = load();
    setSettings(s);
    apply(s);
  }, []);

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    apply(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const reset = () => {
    setSettings(DEFAULT);
    apply(DEFAULT);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const changeFont = (delta: number) => {
    update({ fontSize: Math.max(80, Math.min(160, settings.fontSize + delta)) });
  };

  const ToggleBtn = ({
    active, onClick, icon: Icon, label,
  }: { active: boolean; onClick: () => void; icon: any; label: string }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-col items-center justify-center gap-1 p-2 rounded-md border text-xs transition-colors ${
        active ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted border-border text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden />
      <span className="leading-tight text-center">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      {isOpen && (
        <div
          role="dialog"
          aria-label="תפריט נגישות"
          className="mb-3 bg-card border rounded-lg shadow-2xl p-4 w-72 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">הגדרות נגישות</h3>
            <button onClick={() => setIsOpen(false)} aria-label="סגור תפריט נגישות" className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-3 p-2 bg-muted rounded-md">
            <span className="text-xs font-medium text-foreground">גודל טקסט</span>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => changeFont(-10)} aria-label="הקטן טקסט">
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-xs w-10 text-center font-medium">{settings.fontSize}%</span>
              <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => changeFont(10)} aria-label="הגדל טקסט">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <ToggleBtn active={settings.contrast} onClick={() => update({ contrast: !settings.contrast, invert: false })} icon={Contrast} label="ניגודיות גבוהה" />
            <ToggleBtn active={settings.invert} onClick={() => update({ invert: !settings.invert, contrast: false })} icon={Eye} label="היפוך צבעים" />
            <ToggleBtn active={settings.highlightLinks} onClick={() => update({ highlightLinks: !settings.highlightLinks })} icon={Link2} label="הדגשת קישורים" />
            <ToggleBtn active={settings.readableFont} onClick={() => update({ readableFont: !settings.readableFont })} icon={Type} label="גופן קריא" />
            <ToggleBtn active={settings.bigCursor} onClick={() => update({ bigCursor: !settings.bigCursor })} icon={MousePointer2} label="סמן גדול" />
            <ToggleBtn active={settings.pauseAnimations} onClick={() => update({ pauseAnimations: !settings.pauseAnimations })} icon={Pause} label="עצירת אנימציות" />
            <ToggleBtn active={settings.focusVisible} onClick={() => update({ focusVisible: !settings.focusVisible })} icon={Accessibility} label="הדגשת פוקוס" />
          </div>

          <Button variant="outline" className="w-full text-xs h-8 justify-start gap-2 mb-2" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" />
            איפוס כל ההגדרות
          </Button>

          <Link
            to="/accessibility-statement"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-xs text-primary hover:underline px-2 py-1"
          >
            <FileText className="h-3.5 w-3.5" />
            הצהרת נגישות
          </Link>
        </div>
      )}
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="פתח תפריט נגישות"
        aria-expanded={isOpen}
      >
        <Accessibility className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default AccessibilityMenu;
