import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { modules, digitalTools } from "@/lib/modules-data";
import NeedsQuestionnaire from "@/components/NeedsQuestionnaire";
import ChecklistSection from "@/components/ChecklistSection";
import heroImage from "@/assets/hero-family.jpg";
import {
  ArrowLeft,
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="בת מחבקת את הוריה המבוגרים" className="w-full h-full object-cover object-[30%_center]" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/75 to-background/40" />
        </div>
        <div className="relative container py-28 md:py-40">
          <div className="max-w-2xl mr-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-4">
              מרכז הידע והכלים
              <br />
              <span className="text-primary">למשפחות מטפלות</span>
              <br />
              בהורה מבוגר
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              מרכז ידע מקיף, זכויות, כלים פרקטיים והכוונה מעשית למשפחות המטפלות בהורה מבוגר.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <a href="#pathway">
                  התחילו מכאן
                  <ArrowLeft className="h-4 w-4 mr-1" />
                </a>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="ghost" className="text-sm text-muted-foreground">
                    <Play className="h-4 w-4 ml-1" />
                    צפו בסרטון פתיח
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                  <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                    <iframe
                      src="https://player.vimeo.com/video/1159512126?badge=0&autopause=0&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                      title="סרטון פתיח"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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
                    תארו את המצב שלכם בכמה מילים וקבלו המלצות מותאמות אישית, פעולות מומלצות ומשאבים רלוונטיים
                  </p>
                  <Button size="sm" variant="secondary" className="mt-2">תארו את המצב</Button>
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
        <h2 className="text-3xl font-bold text-center mb-3">11 פרקים</h2>
        <p className="text-center text-muted-foreground mb-10">מידע מקצועי מאורגן בצורה ברורה ונגישה</p>
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
      <section className="py-16 bg-muted/30">
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
