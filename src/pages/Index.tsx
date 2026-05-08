import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { digitalTools } from "@/lib/modules-data";
import NeedsQuestionnaire from "@/components/NeedsQuestionnaire";
import AdvisorSearchBar from "@/components/layout/AdvisorSearchBar";
import heroVideo from "@/assets/hero-video.mp4";
import { ArrowLeft, Info, Calculator, Wallet, RefreshCw, ClipboardList } from "lucide-react";
import {
  IconClipboardCheck,
  IconMessage2,
  IconBook2,
  IconUserSearch,
  IconBriefcase,
  IconHeartHandshake,
  IconArrowsExchange,
} from "@tabler/icons-react";

const toolIconMap: Record<string, any> = {
  Calculator,
  Wallet,
  RefreshCw,
  ClipboardList,
};

const featuredToolIds = ["salary-calculator", "expense-tracker", "family-sync", "daily-care"];

const entryCards = [
  {
    title: "שאלון מיפוי צרכים",
    description: "ענו על שאלון קצר וקבלו דוח אישי עם המלצות מותאמות",
    cta: "התחילו בשאלון",
    Icon: IconClipboardCheck,
    iconBg: "hsl(var(--primary) / 0.1)",
    action: "questionnaire",
  },
  {
    title: "זיהוי תרחיש",
    description: "תארו את המצב ליועץ החכם וקבלו פעולות מומלצות מיידית",
    cta: "בחרו תרחיש",
    Icon: IconMessage2,
    iconBg: "hsl(var(--accent) / 0.1)",
    to: "/scenarios",
  },
  {
    title: "מרכז הידע",
    description: "מצגות, מדריכים וטפסים מסודרים לפי נושאים — ללמוד בקצב שלכם",
    cta: "כנסו למרכז",
    Icon: IconBook2,
    iconBg: "hsl(var(--warm) / 0.15)",
    to: "/knowledge-center",
  },
];

const systems = [
  { to: "/foreign-worker-search", title: "חיפוש עובד זר", desc: "מאגר מטפלים", Icon: IconUserSearch },
  { to: "/ad-elai", title: "נותני שירות", desc: "חברות וספקים", Icon: IconBriefcase },
  { to: "/organizations", title: "סיוע מעמותות", desc: "תמיכה וייעוץ", Icon: IconHeartHandshake },
  { to: "/give-take", title: "קח תן", desc: "ציוד סיעודי בחינם", Icon: IconArrowsExchange },
];

const Index = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const featuredTools = featuredToolIds
    .map((id) => digitalTools.find((t) => t.id === id))
    .filter(Boolean) as typeof digitalTools;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="relative w-full" style={{ maxHeight: "60vh" }}>
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="מרכז הידע והכלים למשפחות מטפלות בהורה מבוגר"
            className="w-full h-auto block max-h-[60vh] object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none h-1/3" />
          <div className="hidden md:flex absolute bottom-6 right-6 z-10 items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="shadow-lg text-sm">
                  אודות האתר - סרטון
                  <ArrowLeft className="h-4 w-4 mr-1" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden">
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    src="https://player.vimeo.com/video/1188476851?badge=0&autopause=0&player_id=0&app_id=58479"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    title="ברוכים הבאים"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="shadow-lg">
                  <Info className="h-4 w-4 ml-1" />
                  מה יש באתר
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto" dir="rtl">
                <div className="space-y-4 text-right pt-2">
                  <h3 className="text-xl font-bold">מטפלים בהורה או בן משפחה סיעודי?</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    פלטפורמה אחת שמרכזת עבורכם את כל מה שצריך — משלב ההבנה ועד הביצוע.
                  </p>
                  <ul className="text-sm space-y-1.5 leading-relaxed">
                    <li>🔹 בדיקת זכאות לסיעוד והכוונה לתביעות</li>
                    <li>🔹 מחשבונים לניהול שכר עובד זר והוצאות טיפול</li>
                    <li>🔹 מדריכים פשוטים וברורים לכל שלב בתהליך</li>
                    <li>🔹 כלים לניהול ותיאום בין בני המשפחה</li>
                    <li>🔹 צ'ק-ליסטים למצבי חירום והחלטות חשובות</li>
                    <li>🔹 מאגר שירותים, ספקים ואנשי מקצוע</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Smart Advisor */}
      <section className="py-10 bg-muted/30">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-2">יש שאלה? היועץ החכם כאן</h2>
          <p className="text-muted-foreground text-sm mb-5">
            כתבו שאלה במילים שלכם וקבלו תשובה ופעולות מומלצות
          </p>
          <AdvisorSearchBar variant="hero" />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {["איך מבקשים גמלת סיעוד?", "מה הזכויות של עובד זר?", "איך מתמודדים עם דמנציה?"].map((q) => (
              <Link
                key={q}
                to={`/knowledge-center?tab=advisor&q=${encodeURIComponent(q)}`}
                className="text-xs bg-card border border-border rounded-full px-3 py-1.5 hover:border-primary/50 transition-colors"
              >
                {q}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setShowQuestionnaire(true)}
            className="mt-4 text-xs text-primary underline-offset-2 hover:underline"
          >
            או מלאו שאלון מיפוי צרכים מקיף ←
          </button>
        </div>
      </section>

      {/* Entry cards: Don't know where to start */}
      <section className="py-12 container">
        <h2 className="text-2xl font-bold text-center mb-2">לא יודעים מאיפה להתחיל?</h2>
        <p className="text-center text-muted-foreground mb-8 text-sm">בחרו את הנתיב המתאים לכם</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {entryCards.map((c) => {
            const Icon = c.Icon;
            const inner = (
              <div className="h-full rounded-xl border border-border bg-card p-6 text-center hover:border-primary/50 hover:shadow-md transition-all flex flex-col items-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: c.iconBg }}
                >
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="font-bold text-lg">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{c.description}</p>
                <span className="text-sm text-primary font-medium">{c.cta} ←</span>
              </div>
            );
            if (c.action === "questionnaire") {
              return (
                <button key={c.title} onClick={() => setShowQuestionnaire(true)} className="text-right">
                  {inner}
                </button>
              );
            }
            return (
              <Link key={c.title} to={c.to!}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {showQuestionnaire && (
        <section className="py-12 bg-background">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-2">שאלון מיפוי צרכים</h2>
            <p className="text-center text-muted-foreground mb-8 text-sm">
              ענו על מספר שאלות קצרות וקבלו דוח מותאם
            </p>
            <NeedsQuestionnaire />
          </div>
        </section>
      )}

      {/* Top tools strip */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex items-end justify-between mb-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold">כלים מובילים</h2>
            <Link to="/tools-resources" className="text-sm text-primary hover:underline">
              לכל הכלים ←
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {featuredTools.map((tool) => {
              const Icon = toolIconMap[tool.icon] || Calculator;
              const content = (
                <div className="h-full rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                </div>
              );
              const url = tool.toolUrl || "/tools";
              return tool.isInternal || url.startsWith("/") ? (
                <Link key={tool.id} to={url}>{content}</Link>
              ) : (
                <a key={tool.id} href={url} target="_blank" rel="noreferrer">{content}</a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our systems strip */}
      <section className="py-12 container">
        <div className="flex items-end justify-between mb-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold">המערכות שלנו</h2>
          <Link to="/services-community" className="text-sm text-primary hover:underline">
            לכל השירותים ←
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {systems.map((s) => {
            const Icon = s.Icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="rounded-xl bg-muted/50 p-5 hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center mb-3">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Index;
