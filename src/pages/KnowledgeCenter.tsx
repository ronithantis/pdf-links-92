import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FileText, ExternalLink, Heart, Home, Users, Scale, Stethoscope, Brain, ClipboardList, Building, Sparkles } from "lucide-react";

const presentationCategories = [
  {
    id: "getting-started",
    title: "התחלת הדרך",
    icon: Sparkles,
    presentations: [
      { title: "הערכות מוקדמת והבנת המציאות", description: "צעדים ראשונים בהבנת המצב החדש", link: "https://khkhhxal.gensparkspace.com/" },
    ]
  },
  {
    id: "medical",
    title: "אבחון וטיפול רפואי",
    icon: Stethoscope,
    presentations: [
      { title: "אבחון רפואי", description: "תהליך האבחון והבדיקות הנדרשות", link: "https://emwihndv.gensparkspace.com/" },
    ]
  },
  {
    id: "dementia",
    title: "התמודדות עם דמנציה",
    icon: Brain,
    presentations: [
      { title: "התמודדות עם דמנציה", description: "כלים וטכניקות להתמודדות יומיומית", link: "https://ezsqylhq.gensparkspace.com/" },
    ]
  },
  {
    id: "legal-planning",
    title: "תכנון משפטי ועתידי",
    icon: Scale,
    presentations: [
      { title: "תכנון העתיד בזמן כשירות", description: "ייפוי כוח, צוואה והכנה משפטית", link: "https://sqnqrelp.gensparkspace.com/" },
    ]
  },
  {
    id: "rights",
    title: "זכויות וגמלאות",
    icon: ClipboardList,
    presentations: [
      { title: "תנאים סוציאליים וזכויות", description: "גמלאות, הטבות ומימוש זכויות", link: "https://phltpztv.gensparkspace.com/" },
    ]
  },
  {
    id: "workforce",
    title: "כוח אדם וטיפול ביתי",
    icon: Users,
    presentations: [
      { title: "מערך הטיפול הביתי", description: "ארגון והקמת מערך טיפול בבית", link: "https://kdybovnv.gensparkspace.com/" },
      { title: "העסקת עובד זר וניהול ההעסקה", description: "תנאים, חוזה וניהול הקשר", link: "https://jzdqbcbp.gensparkspace.com/" },
      { title: "העסקה ישירה מול חברת סיעוד", description: "השוואה מפורטת בין שני מסלולי ההעסקה", link: "https://www.genspark.ai/agents?id=b36d78e4-00c6-4c5b-8991-d5d8faaf929d" },
    ]
  },
  {
    id: "care-management",
    title: "ניהול הטיפול",
    icon: ClipboardList,
    presentations: [
      { title: "לנהל את הטיפול ולהבין את המצב", description: "כלים לניהול טיפול יעיל", link: "https://afrroluf.gensparkspace.com/" },
      { title: "היבטים קליניים וניהול הטיפול הפיסי", description: "טיפול פיזי יומיומי והיבטים רפואיים", link: "https://dtkqhgor.gensparkspace.com/" },
    ]
  },
  {
    id: "housing",
    title: "דיור וחלופות מגורים",
    icon: Building,
    presentations: [
      { title: "מדריך למשפחה - דיור מוגן", description: "בחירת דיור מוגן והתאמה למשפחה", link: "https://cjtnsspg.gensparkspace.com/" },
    ]
  },
  {
    id: "caregiver-wellbeing",
    title: "רווחת המטפל",
    icon: Heart,
    presentations: [
      { title: "מי מטפל במטפל", description: "שמירה על עצמך בתהליך הטיפול", link: "https://mievqvjc.gensparkspace.com/" },
    ]
  },
  {
    id: "end-of-life",
    title: "סוף החיים",
    icon: Sparkles,
    presentations: [
      { title: "היבטים רוחניים ורגשיים בסוף החיים", description: "ליווי רגשי ורוחני בתקופה הקשה", link: "https://ajgeszgj.gensparkspace.com/" },
      { title: "סידורים לאחר פטירה", description: "מדריך מעשי לטיפול בענייני פטירה", link: "https://iysvulru.gensparkspace.com/" },
    ]
  },
];

const videos = [
  { id: 1, title: "סרטון פתיח – כאן מתחילה העזרה", type: "סרטון", description: "היכרות עם מרכז הידע והשירותים", embedUrl: "https://player.vimeo.com/video/1159512126" },
  { id: 2, title: "איך מגישים תביעה לגמלת סיעוד", type: "סרטון", description: "מדריך צעד אחר צעד", embedUrl: "#" },
  { id: 3, title: "התמודדות עם דמנציה בבית", type: "סרטון", description: "טכניקות מעשיות לטיפול יומיומי", embedUrl: "#" },
  { id: 4, title: "שיחת משפחה – איך מתנהלים נכון", type: "סרטון", description: "כלים לחלוקת תפקידים ומניעת קונפליקטים", embedUrl: "#" },
];

const KnowledgeCenter = () => {
  return (
    <div className="container py-10 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">מרכז הידע</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          מצגות, סרטונים וחומרי העשרה לליווי המשפחה המטפלת
        </p>
      </div>

      {/* Videos Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Play className="h-6 w-6 text-primary" />
          סרטונים
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden w-full max-w-[280px]">
              {video.embedUrl !== "#" ? (
                <div className="relative h-52 bg-muted/30 overflow-hidden">
                  <iframe
                    src={`${video.embedUrl}?badge=0&autopause=0`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="absolute top-0 left-0 w-full h-full"
                    title={video.title}
                  />
                </div>
              ) : (
                <div className="bg-muted/50 h-52 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Play className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <span className="text-xs">בקרוב</span>
                  </div>
                </div>
              )}
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-bold text-xs leading-tight">{video.title}</h4>
                  <Badge variant="secondary" className="text-[10px] shrink-0 mr-1">סרטון</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground">{video.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Presentations by Category */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          מצגות לפי נושא
        </h2>
        <div className="space-y-8">
          {presentationCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
                  <Icon className="h-5 w-5" />
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center">
                  {category.presentations.map((pres, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-shadow overflow-hidden w-full max-w-[280px]">
                      <div className="relative w-full h-52 bg-muted/30 overflow-hidden">
                        <iframe
                          src={pres.link}
                          className="absolute top-0 left-0 w-[250%] h-[250%] origin-top-left scale-[0.4] pointer-events-none"
                          title={pres.title}
                          loading="lazy"
                        />
                        <a
                          href={pres.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-10"
                        />
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-bold text-xs leading-tight">{pres.title}</h4>
                          <Badge variant="outline" className="text-[10px] shrink-0 mr-1">מצגת</Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground mb-2">{pres.description}</p>
                        <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
                          <a href={pres.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 ml-1" />
                            צפייה במצגת
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default KnowledgeCenter;
