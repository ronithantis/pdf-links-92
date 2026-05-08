import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import {
  IconUserSearch,
  IconBriefcase,
  IconHeartHandshake,
  IconArrowsExchange,
  type Icon as TablerIcon,
} from "@tabler/icons-react";

interface ServiceCard {
  to: string;
  title: string;
  description: string;
  pills: string[];
  Icon: TablerIcon;
  iconBg: string;
  iconColor: string;
}

const cards: ServiceCard[] = [
  {
    to: "/foreign-worker-search",
    title: "חיפוש עובד זר",
    description: "מאגר מטפלים ועובדי סיעוד זרים — חפשו לפי שפה, ניסיון ומיקום",
    pills: ["סינון מתקדם", "פרופילים מאומתים", "יצירת קשר ישיר"],
    Icon: IconUserSearch,
    iconBg: "#FAEEDA",
    iconColor: "#854F0B",
  },
  {
    to: "/ad-elai",
    title: "חיפוש נותני שירות",
    description: "חברות סיעוד, נותני שירות ביתיים וספקי ציוד רפואי",
    pills: ["סינון לפי איזור", "סינון לפי שירות", "השוואת מחירים"],
    Icon: IconBriefcase,
    iconBg: "#E1F5EE",
    iconColor: "#085041",
  },
  {
    to: "/organizations",
    title: "סיוע מעמותות",
    description: "עמותות שמציעות סיוע כלכלי, ייעוץ, קבוצות תמיכה וליווי משפחות",
    pills: ["סיוע כלכלי", "קבוצות תמיכה", "ייעוץ מקצועי"],
    Icon: IconHeartHandshake,
    iconBg: "#FBEAF0",
    iconColor: "#993556",
  },
  {
    to: "/give-take",
    title: "קח תן",
    description: "פרסום וחיפוש ציוד סיעודי לתרומה — מעבירים ציוד שכבר לא צריך, מוצאים מה שצריך",
    pills: ["פרסמו תרומה", "מצאו ציוד", "בחינם"],
    Icon: IconArrowsExchange,
    iconBg: "#EEEDFE",
    iconColor: "#3C3489",
  },
];

const ServicesCommunity = () => {
  return (
    <div className="container py-10">
      <div className="mb-2">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <IconArrowRight size={16} stroke={1.75} />
          חזרה לדף הבית
        </Link>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary mb-2">שירותים וקהילה</h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          מאגרים ומערכות שמחברים אתכם לעובדי סיעוד, נותני שירות, עמותות ומשפחות אחרות
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {cards.map((card) => {
          const { Icon } = card;
          return (
            <Link
              key={card.to}
              to={card.to}
              className="group block rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: card.iconBg }}
                  aria-hidden
                >
                  <Icon size={22} stroke={1.75} style={{ color: card.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-medium text-foreground mb-1.5">{card.title}</h2>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {card.pills.map((p) => (
                  <span
                    key={p}
                    className="inline-block rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border/60 flex justify-end">
                <span className="text-[13px] font-medium text-primary group-hover:underline">
                  היכנסו למערכת ←
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesCommunity;