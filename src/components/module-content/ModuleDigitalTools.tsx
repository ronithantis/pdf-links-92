import { Link } from "react-router-dom";
import { digitalTools } from "@/lib/modules-data";
import {
  Calculator, ClipboardList, RefreshCw, BookOpen, FileSignature,
  Wallet, ShieldCheck, Receipt, Handshake, Briefcase,
  CalendarDays, Compass, FolderOpen, ShieldAlert, Wrench
} from "lucide-react";

const toolIcons: Record<string, React.ElementType> = {
  Calculator, Wallet, ShieldCheck, Receipt, Handshake, RefreshCw,
  Briefcase, ClipboardList, CalendarDays, BookOpen, FileSignature,
  Compass, FolderOpen, ShieldAlert,
};

// Mapping: chapter ID → array of digital tool IDs
const chapterToolMap: Record<string, string[]> = {
  "chapter-1": [
    "nursing-claim-guide", "will-template", "life-compass",
    "blue-folder", "emergency-protocol", "printable-calendar", "interview-manager", "foreign-worker-rights", "worker-guide",
  ],
  "chapter-2": [
    "daily-care", "med-tracker", "blue-folder", "emergency-protocol",
  ],
  "chapter-3": [
    "poa-guide", "life-compass", "emergency-protocol",
  ],
  "chapter-4": [
    "will-template", "poa-guide", "life-compass",
  ],
  "chapter-5": [
    "expense-tracker", "nursing-claim-guide", "foreign-worker-rights",
  ],
  "chapter-6": [
    "contract-explanation", "daily-care", "holiday-selector",
    "med-tracker", "medicine-manager", "blue-folder", "caregiver-communicator", "printable-calendar", "interview-manager", "foreign-worker-rights", "worker-guide", "caregiver-replacement",
  ],
  "chapter-7": [
    "emergency-protocol",
  ],
  "chapter-8": [
    "salary-calculator", "expense-tracker", "final-settlement-calc",
    "expectations-alignment", "family-sync", "contract-explanation",
    "daily-care", "holiday-selector", "med-tracker", "medicine-manager", "blue-folder",
    "emergency-protocol", "caregiver-communicator", "printable-calendar", "interview-manager", "foreign-worker-rights", "worker-guide",
  ],
  "chapter-9": [
    "nursing-code-calculator", "emergency-protocol", "blue-folder", "printable-calendar", "family-sync",
  ],
  "chapter-10": [
    "family-sync",
  ],
  "chapter-11": [
    "will-template", "life-compass",
  ],
};

interface ModuleDigitalToolsProps {
  chapterId: string;
}

const ModuleDigitalTools = ({ chapterId }: ModuleDigitalToolsProps) => {
  const toolIds = chapterToolMap[chapterId];
  if (!toolIds || toolIds.length === 0) return null;

  const tools = toolIds
    .map((id) => digitalTools.find((t) => t.id === id))
    .filter(Boolean) as typeof digitalTools;

  if (tools.length === 0) return null;

  return (
    <div className="mt-8 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wrench className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold text-primary">כלים דיגיטליים רלוונטיים לעזרתכם</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tools.map((tool) => {
          const IconComp = toolIcons[tool.icon] || Wrench;
          const isInternal = !!(tool as any).isInternal;
          const isExternal = !!(tool as any).isExternal;
          const href = isInternal
            ? tool.toolUrl
            : `/tools#${tool.id}`;

          return (
            <Link
              key={tool.id}
              to={href}
              className="flex items-start gap-3 rounded-lg border bg-background p-3 hover:shadow-md hover:border-primary/40 transition-all group"
            >
              <span className="text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                <IconComp className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="font-semibold text-sm leading-snug">{tool.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{tool.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleDigitalTools;
