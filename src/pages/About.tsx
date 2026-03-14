import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Lightbulb, Eye, Users, Wrench } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary/5 border-b py-12 md:py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            אודות hub2care
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            פלטפורמה דיגיטלית למשפחות המטפלות בקשישים
          </p>
        </div>
      </section>

      <div className="container py-10 md:py-14 space-y-10">
        {/* מי אנחנו */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">מי אנחנו</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              hub2care היא פלטפורמה דיגיטלית למשפחות המטפלות בקשישים.
            </p>
            <p>
              היא נולדה מתוך ניסיון אישי ממושך בטיפול בקרובת משפחה סיעודית, ומתוך היכרות עמוקה עם המציאות המורכבת שבה בני משפחה נדרשים להתמודד עם סוגיות רפואיות, בירוקרטיות, משפטיות, כלכליות ורגשיות — לעיתים כולן במקביל.
            </p>
            <p>
              הקמת hub2care צמחה מתוך הבנה ברורה: משפחות מטפלות אינן זקוקות רק למידע, אלא למערכת אחת שתסייע להן להבין את המצב, להתארגן נכון, ולדעת מהו הצעד הבא בכל שלב במסע הטיפול.
            </p>
          </div>
        </section>

        {/* למה הקמנו */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">למה הקמנו את hub2care</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              הטיפול בהורה קשיש מלווה לא פעם בחוסר ודאות, מידע מפוזר, עומס משימות, קבלת החלטות בתנאי לחץ ותחושת בדידות. בני משפחה מוצאים את עצמם נדרשים בזמן קצר להבין זכויות, להתמודד עם טפסים, לתאם בין אנשי מקצוע, לאתר שירותים וספקים, לנהל מסמכים רפואיים, ולקבל החלטות משמעותיות בעלות השלכות יומיומיות ואנושיות.
            </p>
            <p>
              hub2care נבנתה כדי להפוך את המציאות הזו לברורה יותר, נגישה יותר וברת־ניהול.
            </p>
            <p>
              המטרה שלנו היא לצמצם עומס, לחסוך זמן יקר, להפחית טעויות, ולאפשר למשפחות לפעול בצורה מסודרת, מושכלת ויעילה יותר — מתוך תחושת שליטה גדולה יותר במצב.
            </p>
          </div>
        </section>

        {/* מה המערכת נותנת */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">מה המערכת נותנת</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-5">
              hub2care מרכזת במקום אחד מעטפת דיגיטלית למשפחה המטפלת, הכוללת:
            </p>
            <ul className="space-y-3 text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>מידע מקיף, נגיש ומסודר בנושאים המרכזיים הקשורים לטיפול בקשישים</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>צ׳אט מהיר לשאלות, לקבלת מענה ראשוני זמין ופשוט</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>אפשרות לקבל מתווה דרך לפי תיאור מצב וצורך, כדי להבין אילו צעדים רלוונטיים כעת</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>כלים דיגיטליים לייעול ניהול הטיפול, המעקב, הארגון וקבלת ההחלטות</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>מערכת קח־תן לחיפוש תרומות ולהצעת תרומות למשפחות אחרות</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>הנגשת ידע, משאבים וכלי עזר באופן שמחבר בין מידע, פעולה ויישום מעשי</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-5">
              המערכת נועדה לסייע למשפחות לא רק לדעת יותר, אלא גם לפעול נכון יותר — בצורה מסודרת, יעילה ובטוחה יותר.
            </p>
          </CardContent>
        </Card>

        {/* מה מייחד אותנו */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">מה מייחד אותנו</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              הייחוד של hub2care טמון בשילוב בין ניסיון חיים אמיתי, הבנה עמוקה של צורכי המשפחה המטפלת, וחשיבה מערכתית־דיגיטלית.
            </p>
            <p>
              אנחנו לא מציעים רק תוכן, ולא רק כלי בודד, אלא פלטפורמה שלמה שמחברת בין ידע, התמצאות, קבלת החלטות, ארגון ופעולה. במקום לחפש תשובות במקומות רבים, המשפחה מקבלת מרחב אחד שמסייע לה להבין את האפשרויות, לעשות סדר במידע, ולנהל טוב יותר את מסע הטיפול ביקיריה.
            </p>
          </div>
        </section>

        {/* החזון שלנו */}
        <section className="bg-primary/5 rounded-xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">החזון שלנו</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              החזון של hub2care הוא להפוך לפלטפורמה מרכזית עבור משפחות המטפלות בקשישים — מקום אחד שמרכז ידע, כלים, משאבים ותמיכה, ומאפשר למשפחות להתמודד עם המציאות המורכבת של הטיפול ביקיריהן בצורה ברורה, יעילה ואנושית יותר.
            </p>
            <p>
              אנו שואפים לבנות מערכת שתסייע למשפחות להרגיש פחות לבד, לקבל החלטות טובות יותר, לשפר את ההתארגנות היומיומית, ולשמור הן על איכות הטיפול ביקיריהן והן על יכולת ההתמודדות של בני המשפחה עצמם.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
