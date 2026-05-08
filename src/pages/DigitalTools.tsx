import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { digitalTools, digitalToolCategories } from "@/lib/modules-data";
import {
  Calculator, ClipboardList, RefreshCw, BookOpen, FileSignature,
  Lock, Wallet, ShieldCheck, Receipt, Handshake, Briefcase,
  CalendarDays, ExternalLink, Maximize2, Minimize2, X, Compass, FolderOpen, ShieldAlert, Info
} from "lucide-react";

const toolIcons: Record<string, React.ReactNode> = {
  Calculator: <Calculator className="h-8 w-8" />,
  Wallet: <Wallet className="h-8 w-8" />,
  ShieldCheck: <ShieldCheck className="h-8 w-8" />,
  Receipt: <Receipt className="h-8 w-8" />,
  Handshake: <Handshake className="h-8 w-8" />,
  RefreshCw: <RefreshCw className="h-8 w-8" />,
  Briefcase: <Briefcase className="h-8 w-8" />,
  ClipboardList: <ClipboardList className="h-8 w-8" />,
  CalendarDays: <CalendarDays className="h-8 w-8" />,
  BookOpen: <BookOpen className="h-8 w-8" />,
  FileSignature: <FileSignature className="h-8 w-8" />,
  Compass: <Compass className="h-8 w-8" />,
  FolderOpen: <FolderOpen className="h-8 w-8" />,
  ShieldAlert: <ShieldAlert className="h-8 w-8" />,
};

const DigitalTools = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openTool, setOpenTool] = useState<typeof digitalTools[0] | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-2", "ring-primary", "ring-offset-2");
          setTimeout(() => el.classList.remove("ring-2", "ring-primary", "ring-offset-2"), 3000);
        }
      }, 100);
    }
  }, [location.hash]);

  const handleOpenTool = (tool: typeof digitalTools[0]) => {
    if ((tool as any).isInternal && tool.toolUrl) {
      navigate(tool.toolUrl);
    } else if (tool.isExternal && tool.externalUrl) {
      window.open(tool.externalUrl, "_blank");
    } else if (tool.toolUrl) {
      setOpenTool(tool);
      setIsFullscreen(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
        <h1 className="text-3xl font-bold">כלים דיגיטליים</h1>
        <Button variant="outline" size="sm" onClick={() => setAboutOpen(true)} className="gap-2">
          <Info className="h-4 w-4" />
          הסבר אודות הכלים
        </Button>
      </div>
      <p className="text-lg text-muted-foreground mb-10">כלים מעשיים לניהול הטיפול, חישובים ותכנון משפטי</p>

      <div className="space-y-12 max-w-5xl">
        {digitalToolCategories.map((cat) => {
          const toolsInCat = digitalTools.filter((t) => (t as any).category === cat.id && !(t as any).hidden);
          if (toolsInCat.length === 0) return null;
          return (
            <section key={cat.id} id={`category-${cat.id}`}>
              <div className="mb-4 border-r-4 border-primary pr-3">
                <h2 className="text-2xl font-bold text-primary">{cat.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolsInCat.map((tool) => {
                  const hasUrl = !!(tool.toolUrl || (tool as any).externalUrl);
                  const isExternal = !!(tool as any).isExternal;
                  return (
                    <Card key={tool.id} id={tool.id} className="relative transition-all duration-300 hover:shadow-md flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <span className="text-primary">{toolIcons[tool.icon]}</span>
                          <div className="flex gap-1">
                            {tool.isPaid && (
                              <Badge variant="secondary" className="gap-1">
                                <Lock className="h-3 w-3" /> בתשלום
                              </Badge>
                            )}
                            {isExternal && (
                              <Badge className="gap-1 bg-rose-500/10 text-rose-600 border-rose-200 hover:bg-rose-500/20">
                                <ExternalLink className="h-3 w-3" /> כלי חיצוני
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-1">
                        <p className="text-sm text-muted-foreground mb-4 flex-1">{tool.description}</p>
                        {isExternal ? (
                          <Button
                            onClick={() => handleOpenTool(tool)}
                            className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                          >
                            <ExternalLink className="h-4 w-4 ml-2" />
                            מעבר לכלי חיצוני
                          </Button>
                        ) : hasUrl ? (
                          <Button onClick={() => handleOpenTool(tool)} className="w-full">
                            פתיחת הכלי
                          </Button>
                        ) : (
                          <Button disabled className="w-full" variant="outline">
                            {tool.isPaid ? "בקרוב - בתשלום" : "בקרוב"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Tool iframe dialog */}
      {openTool && (
        <Dialog open={!!openTool} onOpenChange={(open) => { if (!open) { setOpenTool(null); setIsFullscreen(false); } }}>
          <DialogContent
            className={
              isFullscreen
                ? "!fixed !inset-0 !translate-x-0 !translate-y-0 !left-0 !top-0 !max-w-none !w-screen !h-screen !rounded-none p-0 flex flex-col"
                : "max-w-5xl w-[95vw] h-[85vh] p-0 flex flex-col"
            }
          >
            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
              <DialogHeader className="flex-1">
                <DialogTitle className="text-base">{openTool.title}</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={openTool.toolUrl}
                className="w-full h-full border-0"
                title={openTool.title}
                allow="clipboard-write"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* About-tools dialog */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="max-w-3xl w-[95vw] max-h-[85vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl">הסבר אודות הכלים הדיגיטליים</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h3 className="font-bold text-base text-primary mb-2">1. גיוס, חוזים וקליטת עובד</h3>
              <p className="text-muted-foreground mb-2">ריכוז כלל הכלים הדרושים בשלב תחילת ההעסקה או החלפת מטפל.</p>
              <ul className="list-disc pr-5 space-y-1">
                <li><strong>ניהול ראיון לגיוס עובד זר:</strong> כלי להכנה וניהול ראיון עבודה עם מועמדים לתפקיד מטפל/ת.</li>
                <li><strong>מדריך לעובד זר חדש:</strong> הסבר לעובד על זכויות, חובות, תרבות ושפה עם הגעתו לארץ.</li>
                <li><strong>תאום ציפיות עם עובד זר:</strong> טופס מובנה לניסוח והפקת מסמך מוסכם בין המשפחה לעובד.</li>
                <li><strong>מדריך לחוזה העסקת עובד זר:</strong> כלי להבנת היבטים חשובים לקראת חתימה על חוזה העסקה.</li>
                <li><strong>חוזה להעסקת עובד/ת מחליף/ה:</strong> כלי להפקה וחתימה על חוזה לתקופת חופשת המטפל הקבוע.</li>
                <li><strong>בחירת ימי חג לעובד זר:</strong> כלי לבחירת 9 ימי חג שנתיים והדפסתם עבור העובד.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-base text-primary mb-2">2. זכויות, כספים והטבות</h3>
              <p className="text-muted-foreground mb-2">הכלים המעניקים מענה לדרישות החוק, מיצוי זכויות וניהול תקציב.</p>
              <ul className="list-disc pr-5 space-y-1">
                <li><strong>מדריך להוצאת תו נכה לקשיש לא נייד:</strong> מדריך אינטראקטיבי שלב אחר שלב להוצאת תו חניה לנכה עבור קשיש מוגבל בניידות.</li>
                <li><strong>מחשבון שכר עובד זר (Hub2Care):</strong> חישוב שכר חודשי והוצאות העסקה, המבוסס על שכר מינימום של 6,443.85 ש"ח (אפריל 2026).</li>
                <li><strong>זכויות עובד זר – מחשבון ומדריך:</strong> כלי אינטראקטיבי לבדיקת זכויות המטפל בשכר, חופשות ופנסיה.</li>
                <li><strong>מחשבון גמר חשבון:</strong> חישוב מדויק של פיצויים, דמי הבראה וימי חופשה בסיום ההעסקה.</li>
                <li><strong>מדריך להגשת תביעת סיעוד:</strong> ליווי שלב אחר שלב בהגשת תביעת הסיעוד, איסוף מסמכים והפקת דוחות.</li>
                <li><strong>ניהול הוצאות הטיפול:</strong> מערכת למעקב אחר הוצאות בבית המטופל והפקת דוחות משפחתיים.</li>
                <li><strong>מחשבון קוד סיעודי:</strong> כלי חיצוני (משרד הבריאות) להערכת רמת הסיעוד וגובה ההשתתפות העצמית.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-base text-primary mb-2">3. ניהול הטיפול השוטף</h3>
              <p className="text-muted-foreground mb-2">כלים דיגיטליים המסייעים בתפעול היום-יומי ובקשר עם המטפל והמשפחה.</p>
              <ul className="list-disc pr-5 space-y-1">
                <li><strong>מעקב ודיווח יומי:</strong> מערכת לדיווח על משימות הטיפול ומצבו של המטופל בשפות שונות.</li>
                <li><strong>ניהול ומעקב מתן תרופות:</strong> מערכת יומית להגדרת תרופות, סימון מתן ושליחת דוחות למשפחה.</li>
                <li><strong>תרופות – תזכורות ומעקב כולל תמונות לזיהוי:</strong> כלי לניהול תרופות מרובות עם תזכורות ותמונות חזותיות של כל תרופה — מפחית טעויות ומקל על הפיקוח כשמטפל זר נותן תרופות.</li>
                <li><strong>סנכרון הטיפול המשפחתי:</strong> מערכת לתכנון מטלות וחלוקת תפקידים בין בני המשפחה המטפלת.</li>
                <li><strong>תקשורת מטפל-מטופל:</strong> כלי המשתמש בתמונות ובסמלים לגישור על פערי שפה בסיטואציות טיפוליות.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-base text-primary mb-2">4. תכנון משפטי ועתידי</h3>
              <p className="text-muted-foreground mb-2">הסדרת הרצונות וההגנות המשפטיות של המטופל לטווח הארוך.</p>
              <ul className="list-disc pr-5 space-y-1">
                <li><strong>מדריך לייפוי כוח מתמשך:</strong> מדריך אינטראקטיבי המכין את המשפחה לקראת עריכת המסמך.</li>
                <li><strong>כתיבת צוואה:</strong> כלי לניסוח טיוטת צוואה עם הדרכה שלב אחר שלב.</li>
                <li><strong>מצפן חיים:</strong> כלי לתיעוד רצונות המטופל כחלופה לא פורמלית לייפוי כוח מתמשך.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-base text-primary mb-2">5. כלים נוספים</h3>
              <p className="text-muted-foreground mb-2">קטגוריה המיועדת לכלים כלליים, כלי עזר לוגיסטיים וכלים חדשים שיצטרפו בעתיד.</p>
              <ul className="list-disc pr-5 space-y-1">
                <li><strong>תיק כחול:</strong> ניהול דיגיטלי מסודר של כלל המסמכים, התשלומים והאישורים במקום אחד.</li>
                <li><strong>פרוטוקול חירום:</strong> כרטיס מטופל דיגיטלי הכולל נתונים רפואיים חיוניים לזמן חירום.</li>
                <li><strong>לוח חודשי להדפסה:</strong> עריכה והדפסה של לוח חודשי עברי-לועזי עם תזכורות לאירועים חשובים.</li>
              </ul>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DigitalTools;
