import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { modules, digitalTools } from "@/lib/modules-data";
import NeedsQuestionnaire from "@/components/NeedsQuestionnaire";
import ChecklistSection from "@/components/ChecklistSection";


import heroVideo from "@/assets/hero-video.mp4";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  Eye,
  Stethoscope,
  Scale,
  Shield,
  Users,
  HeartHandshake,
  Calculator,
  ClipboardList,
  RefreshCw,
  BookOpen,
  FileSignature,
  Home,
  Moon,
  Heart,
  Building,
  Sunset,
  Play,
  MessageSquare,
  Compass,
  Info,
} from "lucide-react";

const moduleIcons: Record<string, React.ReactNode> = {
  Eye: <Eye className="h-6 w-6" />,
  Stethoscope: <Stethoscope className="h-6 w-6" />,
  Scale: <Scale className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  HeartHandshake: <HeartHandshake className="h-6 w-6" />,
  Home: <Home className="h-6 w-6" />,
  Moon: <Moon className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  Building: <Building className="h-6 w-6" />,
  Sunset: <Sunset className="h-6 w-6" />,
};

const toolIcons: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="h-5 w-5" />,
  ClipboardList: <ClipboardList className="h-5 w-5" />,
  RefreshCw: <RefreshCw className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
  FileSignature: <FileSignature className="h-5 w-5" />,
};

const partColors = [
  "border-l-4 border-l-primary",
  "border-l-4 border-l-accent",
  "border-l-4 border-l-warm",
  "border-l-4 border-l-success",
  "border-l-4 border-l-primary",
  "border-l-4 border-l-accent",
  "border-l-4 border-l-warm",
  "border-l-4 border-l-success",
  "border-l-4 border-l-primary",
  "border-l-4 border-l-accent",
  "border-l-4 border-l-warm",
];

const Index = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  return (
    <div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="relative w-full">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="מרכז הידע והכלים למשפחות מטפלות בהורה מבוגר"
            className="w-full h-auto block"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none h-1/3" />
          {/* Bottom-right overlay buttons: "מה יש באתר" + "אודות האתר- סרטון" */}
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="shadow-lg text-sm">
                  אודות האתר- סרטון
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
                    פתאום מצאתם את עצמכם מתמודדים עם בירוקרטיה, זכויות, החלטות מורכבות וניהול יומיומי — בלי שמישהו באמת הסביר איך עושים את זה נכון?
                  </p>
                  <p className="text-sm leading-relaxed font-semibold">אתם לא לבד.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    ברגעים כאלה, משפחות רבות נאלצות ללמוד תוך כדי תנועה, לחפש מידע מפוזר ולקבל החלטות תחת לחץ — מה שמוביל לא פעם לטעויות, בזבוז זמן ועומס רגשי גדול.
                  </p>
                  <p className="text-sm leading-relaxed">
                    בדיוק בשביל זה יצרנו את <strong>hub2care</strong> — פלטפורמה אחת שמרכזת עבורכם את כל מה שצריך, משלב ההבנה ועד הביצוע.
                  </p>
                  <ul className="text-sm space-y-1.5 leading-relaxed">
                    <li>🔹 בדיקת זכאות לסיעוד והכוונה לתביעות</li>
                    <li>🔹 מחשבונים לניהול שכר עובד זר והוצאות טיפול</li>
                    <li>🔹 מדריכים פשוטים וברורים לכל שלב בתהליך</li>
                    <li>🔹 כלים לניהול ותיאום בין בני המשפחה</li>
                    <li>🔹 צ'ק-ליסטים למצבי חירום והחלטות חשובות</li>
                    <li>🔹 מאגר שירותים, ספקים ואנשי מקצוע</li>
                  </ul>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="text-sm font-semibold">ואיך מתחילים?</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      מצגות ופרקי מידע, יועץ חכם לכל שאלה. אפשר להיכנס למרכז המידע וללמוד לפי שלבים, להשתמש בחיפוש כדי למצוא תשובה מהירה, להיכנס לכלים הדיגיטליים ולבחור כלי שיעזור לכם בפועל, או לגשת לתרחישים ולקבל המלצה מה כדאי לעשות במקרה שלכם, צעד אחר צעד.
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed font-medium text-primary">
                    במקום לרדוף אחרי מידע — מקבלים סדר, שליטה ותוכנית פעולה ברורה במקום אחד.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="absolute inset-x-0 bottom-6 md:bottom-10 flex items-center justify-center px-4">
            <Button size="lg" asChild>
              <a href="#pathway">
                הקליקו כאן להתחיל בניווט
                <ArrowLeft className="h-4 w-4 mr-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>


      {/* Pathway Cards */}
      <section id="pathway" className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-2">איך תרצו להתחיל?</h2>
          <p className="text-center text-muted-foreground mb-8">בחרו את הנתיב המתאים לכם</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 - Questionnaire */}
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group" onClick={() => setShowQuestionnaire(true)}>
              <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ClipboardCheck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg">שאלון מיפוי צרכים</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  שאלון מקיף שיאפשר להפיק דוח אישי, למקד בצרכים, בפעולות נדרשות ולראות אילו נתונים כבר אספתם
                </p>
                <Button size="sm" className="mt-2">התחילו בשאלון</Button>
              </CardContent>
            </Card>

            {/* Card 2 - Smart Advisor */}
            <Link to="/knowledge-center?tab=scenarios">
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <MessageSquare className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="font-bold text-lg">זיהוי מצב והמלצת פעולה</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    בחרו תרחיש או תארו את המצב ליועץ החכם וקבלו המלצות מותאמות אישית ופעולות מומלצות
                  </p>
                  <Button size="sm" variant="secondary" className="mt-2">זהו את המצב</Button>
                </CardContent>
              </Card>
            </Link>

            {/* Card 3 - Self Navigation */}
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <a href="#modules">
                <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-warm/10 flex items-center justify-center group-hover:bg-warm/20 transition-colors">
                    <Compass className="h-7 w-7 text-warm" />
                  </div>
                  <h3 className="font-bold text-lg">ניווט עצמי באתר</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    דפדפו בין 11 הפרקים, מרכז הידע, כלים דיגיטליים ומידע מקצועי — בקצב שלכם
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    התחילו לחפש
                    <ArrowLeft className="h-4 w-4 mr-1" />
                  </Button>
                </CardContent>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Questionnaire Section */}
      {showQuestionnaire && (
        <section className="py-12 bg-background">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-2">שאלון מיפוי צרכים</h2>
            <p className="text-center text-muted-foreground mb-2">ענו על מספר שאלות קצרות ונפנה אתכם למידע הרלוונטי ביותר</p>
            <p className="text-center text-muted-foreground mb-8 text-sm">תוכלו להפיק לעצמכם דו״ח ולמקד בצרכים, בפעולות נדרשות ואיזה נתונים אספתם כבר</p>
            <NeedsQuestionnaire />
          </div>
        </section>
      )}

      {/* Quick Navigation - Modules */}
      <section id="modules" className="py-16 container">
        <h2 className="text-3xl font-bold text-center mb-3">בחרו הפרק הרלוונטי לכם כדי להרחיב את הידע</h2>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <span className="text-muted-foreground">או עברו ל</span>
          <Link to="/#checklist">
            <Button variant="outline" size="sm" className="gap-2">
              <ClipboardCheck className="h-4 w-4" />
              צעדים ראשונים
            </Button>
          </Link>
          <span className="text-muted-foreground">או</span>
          <Link to="/tools">
            <Button variant="outline" size="sm" className="gap-2">
              <Compass className="h-4 w-4" />
              כלים יישומיים
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <Link key={mod.id} to={`/module/${mod.id}`}>
              <Card className={`h-full hover:shadow-md transition-all hover:-translate-y-1 ${partColors[(mod.partNumber - 1) % partColors.length]}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">{moduleIcons[mod.icon] || <Eye className="h-6 w-6" />}</span>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">פרק {mod.partNumber}: {mod.partTitle}</div>
                      <h3 className="font-bold text-base mb-1">{mod.title}</h3>
                      <p className="text-sm text-muted-foreground">{mod.description}</p>
                      <p className="text-xs text-primary mt-2">{mod.subModules.length} נושאים</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Checklist Section */}
      <section id="checklist" className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ClipboardCheck className="h-7 w-7 text-primary" />
            <h2 className="text-3xl font-bold text-center">צעדים ראשונים – מה חשוב להסדיר</h2>
          </div>
          <p className="text-center text-muted-foreground mb-10">צ'ק ליסט מעשי לבדיקה שלא שכחתם דבר</p>
          <ChecklistSection />
        </div>
      </section>

      {/* Digital Tools */}
      <section className="py-16 container">
        <h2 className="text-3xl font-bold text-center mb-3">כלים דיגיטליים</h2>
        <p className="text-center text-muted-foreground mb-10">כלים מעשיים לניהול הטיפול וההיבטים המשפטיים</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {digitalTools.map((tool) => (
            <Card key={tool.id} className="hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-primary">{toolIcons[tool.icon]}</span>
                  {tool.isPaid && (
                    <span className="text-xs bg-warm/10 text-warm px-2 py-0.5 rounded-full font-medium">בתשלום</span>
                  )}
                </div>
                <h3 className="font-bold text-sm mb-1">{tool.title}</h3>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button variant="outline" asChild>
            <Link to="/tools">
              כל הכלים
              <ArrowLeft className="h-4 w-4 mr-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
