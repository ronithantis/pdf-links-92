import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 mt-16">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">מרכז הידע למשפחות מטפלות</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              פורטל ידע מרכזי למשפחות המטפלות בהורה קשיש בישראל. מידע, מדריכים, כלים וליווי מקצועי.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">קישורים מהירים</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">דף הבית</Link></li>
              <li><Link to="/tools-resources" className="text-muted-foreground hover:text-primary transition-colors">כלים ומשאבים</Link></li>
              <li><Link to="/services-community" className="text-muted-foreground hover:text-primary transition-colors">שירותים וקהילה</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">אודות</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">צור קשר</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">תנאי שימוש</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">מדיניות פרטיות</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">נגישות</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              אתר זה עומד בתקן WCAG 2.1 AA. אם נתקלתם בבעיית נגישות, אנא{" "}
              <Link to="/contact" className="text-primary hover:underline">צרו קשר</Link>.
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            נבנה באהבה <Heart className="h-4 w-4 text-destructive" /> למען המשפחות המטפלות בישראל
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
