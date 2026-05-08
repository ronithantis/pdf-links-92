import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { modules } from "@/lib/modules-data";

type Crumb = { label: string; to?: string };

const STATIC_LABELS: Record<string, string> = {
  "knowledge-center": "מרכז הידע",
  "tools": "כלים דיגיטליים",
  "tools-resources": "כלים ומשאבים",
  "services-community": "שירותים וקהילה",
  "foreign-worker-search": "חיפוש עובד זר",
  "ad-elai": "חיפוש נותני שירות",
  "organizations": "סיוע מעמותות",
  "give-take": "קח ותן",
  "cognitive-training": "תרגול קוגניטיבי",
  "tasks-list": "רשימת משימות",
  "contact": "צור קשר",
  "about": "אודות",
  "auth": "התחברות",
  "forms": "טפסים",
  "med-tracker": "מעקב תרופות",
  "printable-calendar": "לוח חודשי להדפסה",
  "salary-calculator": "מחשבון שכר",
  "rights": "זכויות וחובות",
  "terms": "תנאי שימוש",
  "privacy": "מדיניות פרטיות",
  "glossary": "מילון מושגים",
  "technical-spec": "מפרט טכני",
  "premium": "Premium",
  "admin": "ניהול",
  "knowledge": "מרכז הידע",
  "suppliers": "ספקים",
  "module": "מרכז הידע",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const params = useParams();
  const path = location.pathname;

  if (path === "/" || path === "") return null;

  const segments = path.split("/").filter(Boolean);
  const crumbs: Crumb[] = [{ label: "בית", to: "/" }];

  if (segments[0] === "module" && params.moduleId) {
    const mod = modules.find((m) => m.id === params.moduleId);
    crumbs.push({ label: "מרכז הידע", to: "/knowledge-center" });
    if (mod) {
      crumbs.push({ label: `פרק ${mod.partNumber}: ${mod.title}` });
    } else {
      crumbs.push({ label: "פרק" });
    }
  } else if (segments[0] === "admin") {
    crumbs.push({ label: "ניהול", to: "/admin/knowledge" });
    if (segments[1]) {
      crumbs.push({ label: STATIC_LABELS[segments[1]] || segments[1] });
    }
  } else {
    let acc = "";
    segments.forEach((seg, idx) => {
      acc += `/${seg}`;
      const isLast = idx === segments.length - 1;
      const label = STATIC_LABELS[seg] || seg;
      crumbs.push(isLast ? { label } : { label, to: acc });
    });
  }

  return (
    <nav aria-label="breadcrumb" className="border-b bg-background/80">
      <div className="container py-2">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronLeft className="h-3 w-3 opacity-60" />}
                {c.to && !isLast ? (
                  <Link to={c.to} className="hover:text-foreground transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-foreground" : ""}>{c.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;