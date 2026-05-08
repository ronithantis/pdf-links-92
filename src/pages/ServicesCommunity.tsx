import { Link } from "react-router-dom";

const links = [
  { to: "/foreign-worker-search", label: "חיפוש עובד זר" },
  { to: "/ad-elai", label: "חיפוש נותני שירות" },
  { to: "/organizations", label: "סיוע מעמותות" },
  { to: "/give-take", label: "קח ותן" },
];

const ServicesCommunity = () => {
  return (
    <div className="container py-12 text-center">
      <h1 className="text-2xl font-bold text-primary mb-3">שירותים וקהילה</h1>
      <p className="text-muted-foreground mb-6">
        מאגרים ומערכות שמחברים אתכם לעובדי סיעוד, נותני שירות, עמותות ומשפחות אחרות.
      </p>
      <ul className="inline-flex flex-col gap-3 text-primary">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:underline">{l.label} ←</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesCommunity;