import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  IconClipboardCheck,
  IconMessage2,
  IconChecklist,
  IconCalculator,
  IconFileText,
  IconPresentation,
  IconBook2,
  IconBrain,
  IconExternalLink,
  IconInfoCircle,
  IconSearch,
  IconArrowRight,
  type Icon as TablerIcon,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { digitalTools, digitalToolCategories } from "@/lib/modules-data";
import { resourceCounts } from "@/lib/resource-counts";

interface FeaturedTool {
  to: string;
  title: string;
  description: string;
  cta: string;
  Icon: TablerIcon;
  iconBg: string;
  iconColor: string;
  external?: boolean;
}

const featuredTools: FeaturedTool[] = [
  {
    to: "/knowledge-center?tab=questionnaire",
    title: "שאלון מיפוי צרכים",
    description: "דוח אישי מותאם למצבכם",
    cta: "התחילו",
    Icon: IconClipboardCheck,
    iconBg: "#EAF3DE",
    iconColor: "#3B6D11",
  },
  {
    to: "/scenarios",
    title: "זיהוי תרחיש",
    description: "תארו מצב — קבלו המלצות מותאמות",
    cta: "בחרו מצב",
    Icon: IconMessage2,
    iconBg: "#FAEEDA",
    iconColor: "#854F0B",
  },
  {
    to: "/tasks-list",
    title: "צעדים ראשונים",
    description: "צ'קליסט מקיף לבדיקה שלא שכחתם דבר",
    cta: "פתחו צ'קליסט",
    Icon: IconChecklist,
    iconBg: "#E6F1FB",
    iconColor: "#0C447C",
  },
  {
    to: "https://me.health.gov.il/nursing-calculator/",
    title: "מחשבון גמלת סיעוד",
    description: "בדקו לאיזו רמת גמלה אתם זכאים",
    cta: "חשבו עכשיו",
    Icon: IconCalculator,
    iconBg: "#FBEAF0",
    iconColor: "#993556",
    external: true,
  },
];

interface LibraryCard {
  to: string;
  title: string;
  description: string;
  count: number;
  Icon: TablerIcon;
}

const libraryCards: LibraryCard[] = [
  { to: "/forms", title: "טפסים", description: "טפסים ומסמכים להורדה", count: resourceCounts.forms, Icon: IconFileText },
  { to: "/resources/presentations", title: "מצגות", description: "מצגות מקצועיות על כל הנושאים", count: resourceCounts.presentations, Icon: IconPresentation },
  { to: "/resources/videos", title: "מדריכים", description: "מדריכים יישומיים למטפלים", count: resourceCounts.guides, Icon: IconBook2 },
];

const ToolsResources = () => {
  const [search, setSearch] = useState("");

  const filteredTools = useMemo(() => {
    const q = search.trim();
    if (q.length < 2) return digitalTools;
    return digitalTools.filter(
      (t) => t.title.includes(q) || t.description.includes(q)
    );
  }, [search]);

  const showAllTools = search.trim().length >= 2;

  return (
    <div className="container py-10 max-w-6xl">
      <div className="mb-2">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <IconArrowRight size={16} stroke={1.75} />
          חזרה לדף הבית
        </Link>
      </div>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">כלים ומשאבים</h1>
        <p className="text-sm text-muted-foreground">
          שאלונים, מחשבונים, טפסים ומצגות לשימוש מיידי
        </p>

        <div className="mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-transparent px-4 py-2 text-sm text-primary hover:bg-primary/5 transition-colors">
                <IconInfoCircle size={16} stroke={1.75} />
                מה יש בכלים? — מדריך מהיר
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>מה יש בכלים?</DialogTitle>
              </DialogHeader>
              <div className="space-y-5 mt-3">
                {digitalToolCategories.map((cat) => {
                  const count = digitalTools.filter((t) => t.category === cat.id).length;
                  return (
                    <div key={cat.id}>
                      <h3 className="font-semibold text-primary mb-1">
                        {cat.title} <span className="text-xs text-muted-foreground">({count})</span>
                      </h3>
                      <p className="text-sm text-muted-foreground">{cat.description}</p>
                    </div>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Local search */}
        <div className="mt-5 max-w-md mx-auto">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <IconSearch size={16} stroke={1.75} className="text-muted-foreground shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="חיפוש בכלים ובמשאבים..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-y border-border bg-card my-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border [direction:ltr]">
          {[
            { n: resourceCounts.tools, label: "כלים אינטראקטיביים" },
            { n: resourceCounts.presentations, label: "מצגות" },
            { n: resourceCounts.forms, label: "טפסים" },
            { n: resourceCounts.guides, label: "מדריכים" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center py-5 px-2 [direction:rtl]">
              <div className="text-3xl font-medium text-primary leading-none">{s.n}</div>
              <div className="mt-2 text-xs text-muted-foreground text-center">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section A: Interactive tools */}
      <section className="mb-12">
        {showAllTools ? (
          <>
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="text-base font-semibold">תוצאות חיפוש</h2>
              <span className="text-xs text-muted-foreground">{filteredTools.length} כלים</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {filteredTools.map((tool) => {
                const isHttp = tool.toolUrl?.startsWith("http") || (tool as any).externalUrl?.startsWith("http");
                const href = (tool as any).externalUrl || tool.toolUrl || "#";
                const Tag = isHttp ? "a" : Link;
                const props: any = isHttp
                  ? { href, target: "_blank", rel: "noopener" }
                  : { to: href };
                return (
                  <Tag
                    key={tool.id}
                    {...props}
                    className="block rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <h3 className="text-sm font-medium">{tool.title}</h3>
                      {isHttp && <IconExternalLink size={12} stroke={1.75} className="text-muted-foreground" />}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tool.description}</p>
                  </Tag>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-base font-semibold mb-1">כלים אינטראקטיביים</h2>
            <p className="text-xs text-muted-foreground mb-5">
              השתמשו ישירות באתר — שאלונים, מחשבונים וצ'קליסטים
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredTools.map((tool) => {
                const { Icon } = tool;
                const inner = (
                  <>
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full mb-3"
                      style={{ backgroundColor: tool.iconBg }}
                    >
                      <Icon size={18} stroke={1.75} style={{ color: tool.iconColor }} />
                    </div>
                    <h3 className="text-sm font-medium mb-1 flex items-center gap-1">
                      {tool.title}
                      {tool.external && <IconExternalLink size={12} stroke={1.75} className="text-muted-foreground" />}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                    {tool.external && (
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-rose-300 bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-600">
                        <IconExternalLink size={11} stroke={2} />
                        כלי חיצוני
                      </div>
                    )}
                    <div className="mt-3 text-xs font-medium text-primary">{tool.cta} ←</div>
                  </>
                );
                return tool.external ? (
                  <a
                    key={tool.to}
                    href={tool.to}
                    target="_blank"
                    rel="noopener"
                    className="block rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    key={tool.to}
                    to={tool.to}
                    className="block rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 text-center">
              <Link to="/tools" className="text-sm text-primary hover:underline">
                לכל {resourceCounts.tools} הכלים ←
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Section B: Resource library (3 cards) */}
      {!showAllTools && (
        <section className="mb-12">
          <h2 className="text-base font-semibold mb-1">ספריית משאבים</h2>
          <p className="text-xs text-muted-foreground mb-5">תכנים מוכנים לעיון או הורדה</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {libraryCards.map((card) => {
              const { Icon } = card;
              return (
                <Link
                  key={card.title}
                  to={card.to}
                  className="block rounded-xl bg-muted/60 p-5 text-center hover:bg-muted transition-colors"
                >
                  <Icon size={28} stroke={1.5} className="mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-sm font-medium mb-1">{card.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{card.description}</p>
                  <div className="text-[11px] text-muted-foreground/80">{card.count} פריטים</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Section C: Cognitive training */}
      {!showAllTools && (
        <section>
          <h2 className="text-base font-semibold mb-1">תרגול קוגניטיבי</h2>
          <p className="text-xs text-muted-foreground mb-5">
            מאגר משחקים לשמירה על חדות מחשבה אצל קשישים
          </p>

          <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: "#E6F1FB" }}>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="shrink-0">
                <IconBrain size={72} stroke={1.5} style={{ color: "#0C447C" }} />
              </div>
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-lg font-medium mb-2" style={{ color: "#0C447C" }}>
                  מאגר התרגול הקוגניטיבי
                </h3>
                <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                  אוסף משחקים מעוצבים במיוחד לקשישים — זיכרון, ריכוז, חשיבה לוגית, ועוד.
                  מותאם לרמות שונות ולצרכים שונים.
                </p>
                <Link
                  to="/cognitive-training"
                  className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  כניסה למאגר המשחקים ←
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ToolsResources;