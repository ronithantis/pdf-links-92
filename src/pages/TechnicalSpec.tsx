import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Printer, FileText } from "lucide-react";

const TechnicalSpec = () => {
  const handlePrint = () => window.print();

  return (
    <div className="container py-10 max-w-5xl print:max-w-none print:py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 print:mb-4">
        <div>
          <h1 className="text-3xl font-bold text-primary print:text-2xl">
            מסמך טכני ותפעולי – מערכת SeniorSense
          </h1>
          <p className="text-muted-foreground mt-2">
            מרכז הידע למשפחות מטפלות בהורה קשיש
          </p>
        </div>
        <Button onClick={handlePrint} className="print:hidden gap-2">
          <Printer className="h-4 w-4" />
          הדפסה / שמירה כ-PDF
        </Button>
      </div>

      <Separator className="mb-8 print:mb-4" />

      {/* 1. System Description */}
      <Section num={1} title="תיאור המערכת / המוצר">
        <p className="mb-4 leading-relaxed">
          SeniorSense הינה מערכת ווב מסוג SPA (Single Page Application) המיועדת
          למשפחות המטפלות בהורה קשיש בישראל. המערכת מספקת פורטל ידע מרכזי הכולל
          מדריכים, כלים דיגיטליים, שאלוני מיפוי צרכים וליווי מקצועי.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">פרמטר</TableHead>
              <TableHead className="text-right">פירוט</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">סוג אפליקציה</TableCell>
              <TableCell>Single Page Application (SPA)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">ארכיטקטורה</TableCell>
              <TableCell>Frontend: React + Backend: Lovable Cloud (Supabase)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">מסד נתונים</TableCell>
              <TableCell>PostgreSQL מנוהל בענן</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">שפת ממשק</TableCell>
              <TableCell>עברית (RTL מלא)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">קהל יעד</TableCell>
              <TableCell>משפחות מטפלות, עובדים סוציאליים, רשויות מקומיות</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      {/* 2. Capabilities */}
      <Section num={2} title="תיאור יכולות המערכת">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">#</TableHead>
              <TableHead className="text-right">יכולת</TableHead>
              <TableHead className="text-right">תיאור</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["מרכז ידע", "11 מודולים מקצועיים הכוללים מדריכים, צ'קליסטים וטיפים מעשיים"],
              ["שאלון מיפוי צרכים", "שאלון אינטייק מקיף עם ניקוד ב-14 ממדים והמלצות מותאמות אישית"],
              ["רשימת מטלות", "ניהול משימות אישיות עם סינון ומעקב"],
              ["צ'קליסט", "רשימות בדיקה מובנות להתמצאות בתהליכי טיפול"],
              ["חיפוש עובד זר", "מנוע חיפוש ייעודי למציאת עובדי סיעוד"],
              ["כלים דיגיטליים", "מחשבונים, מדריכים אינטראקטיביים וכלי עזר"],
              ["תרגול קוגניטיבי", "משחקי חשיבה ותרגילי זיכרון לקשיש"],
              ["נגישות", "תפריט נגישות מובנה (גודל גופן, ניגודיות, מרווחים) – תקן WCAG 2.1 AA"],
            ].map(([name, desc], i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* 3. Technical Spec */}
      <Section num={3} title="מפרט טכני">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">רכיב</TableHead>
              <TableHead className="text-right">טכנולוגיה</TableHead>
              <TableHead className="text-right">גרסה</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["Frontend Framework", "React", "18.3"],
              ["Build Tool", "Vite", "5.x"],
              ["שפת תכנות", "TypeScript", "5.x"],
              ["עיצוב", "Tailwind CSS", "3.x"],
              ["UI Components", "shadcn/ui + Radix", "Latest"],
              ["Backend", "Lovable Cloud (Supabase)", "Managed"],
              ["מסד נתונים", "PostgreSQL", "15+"],
              ["Edge Functions", "Deno Runtime", "1.x"],
              ["ניהול State", "TanStack React Query", "5.x"],
              ["ניתוב", "React Router", "6.x"],
              ["אנימציות", "Framer Motion (אופציונלי)", "—"],
              ["גרפים", "Recharts", "2.x"],
            ].map(([comp, tech, ver], i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{comp}</TableCell>
                <TableCell>{tech}</TableCell>
                <TableCell>{ver}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* 4. Infrastructure Requirements */}
      <Section num={4} title="דרישות תשתית וחומרה">
        <p className="mb-4 leading-relaxed">
          המערכת מבוססת ענן מנוהל (Lovable Cloud) ואינה דורשת שרתים פיזיים,
          התקנה מקומית או תחזוקת חומרה.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">דרישה</TableHead>
              <TableHead className="text-right">פירוט</TableHead>
              <TableHead className="text-right">סטטוס</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["אירוח (Hosting)", "ענן מנוהל עם CDN גלובלי ו-Auto-scaling", "כלול"],
              ["SSL/TLS", "תעודת אבטחה אוטומטית (Let's Encrypt)", "כלול"],
              ["DNS", "הפניית CNAME לדומיין מותאם אישית", "נדרש מהלקוח"],
              ["דפדפנים נתמכים", "Chrome, Firefox, Safari, Edge (2 גרסאות אחרונות)", "—"],
              ["מכשירים", "Desktop, Tablet, Mobile (Responsive)", "כלול"],
              ["גיבויים", "גיבוי אוטומטי יומי של מסד הנתונים", "כלול"],
              ["זמינות (Uptime)", "99.9% SLA", "כלול"],
            ].map(([req, detail, status], i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{req}</TableCell>
                <TableCell>{detail}</TableCell>
                <TableCell>{status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* 5. Security */}
      <Section num={5} title="דרישות אבטחה">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">שכבת אבטחה</TableHead>
              <TableHead className="text-right">מנגנון</TableHead>
              <TableHead className="text-right">סטטוס</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["הצפנה בתעבורה", "HTTPS/TLS 1.3 בכל התקשורת", "✅ פעיל"],
              ["הצפנה במנוחה", "הצפנת AES-256 למסד הנתונים", "✅ פעיל"],
              ["אימות משתמשים", "JWT Tokens עם תוקף מוגבל", "✅ זמין"],
              ["הרשאות ברמת שורה", "Row Level Security (RLS) ב-PostgreSQL", "✅ פעיל"],
              ["הגנת API", "Rate Limiting + API Key Authentication", "✅ פעיל"],
              ["הגנת XSS/CSRF", "React Auto-escaping + SameSite Cookies", "✅ מובנה"],
              ["ניהול סודות", "Secrets Manager מוצפן (לא בקוד מקור)", "✅ פעיל"],
              ["מדיניות סיסמאות", "מינימום 8 תווים, מורכבות מותאמת", "✅ ניתן להגדרה"],
            ].map(([layer, mechanism, status], i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{layer}</TableCell>
                <TableCell>{mechanism}</TableCell>
                <TableCell>{status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* 6. API Integration */}
      <Section num={6} title="יכולת התממשקות (API)">
        <p className="mb-4 leading-relaxed">
          המערכת חושפת REST API מבוסס PostgREST באופן אוטומטי לכל טבלה במסד
          הנתונים, בנוסף ליכולת יצירת Edge Functions מותאמות אישית.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">סוג ממשק</TableHead>
              <TableHead className="text-right">פרוטוקול</TableHead>
              <TableHead className="text-right">שימוש</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["REST API", "HTTPS / JSON", "קריאה וכתיבה לטבלאות מסד הנתונים (CRUD)"],
              ["Edge Functions", "HTTPS / JSON", "לוגיקה עסקית מותאמת, חיבור ל-APIs חיצוניים"],
              ["Webhooks", "HTTPS POST", "שליחת נתונים אוטומטית בעקבות אירועים (Trigger)"],
              ["Realtime", "WebSocket", "עדכונים בזמן אמת לטבלאות נבחרות"],
              ["Storage API", "HTTPS / Multipart", "העלאה והורדה של קבצים ומסמכים"],
            ].map(([type, protocol, usage], i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{type}</TableCell>
                <TableCell>{protocol}</TableCell>
                <TableCell>{usage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* 7. CRM Integration */}
      <Section num={7} title="התממשקות למערכות CRM">
        <p className="mb-4 leading-relaxed">
          המערכת תומכת בחיבור למערכות CRM מובילות באמצעות Edge Functions
          ו-Webhooks. החיבור מתבצע ברמת ה-Backend ואינו דורש שינויים ב-Frontend.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">מערכת CRM</TableHead>
              <TableHead className="text-right">שיטת חיבור</TableHead>
              <TableHead className="text-right">נתונים מועברים</TableHead>
              <TableHead className="text-right">מורכבות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["Salesforce", "REST API + OAuth 2.0", "לידים, תוצאות שאלון, פניות", "בינונית"],
              ["HubSpot", "REST API + API Key", "לידים, פניות, אירועים", "נמוכה"],
              ["Monday.com", "GraphQL API + Token", "משימות, סטטוסים, עדכונים", "נמוכה"],
              ["מערכת מותאמת", "Webhook POST / REST", "JSON מותאם לפי דרישה", "לפי הממשק"],
            ].map(([crm, method, data, complexity], i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{crm}</TableCell>
                <TableCell>{method}</TableCell>
                <TableCell>{data}</TableCell>
                <TableCell>{complexity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* 8. Privacy Law Compliance */}
      <Section num={8} title="עמידה בחוק הגנת הפרטיות">
        <p className="mb-4 leading-relaxed">
          סקירת עמידה מול חוק הגנת הפרטיות, התשמ&quot;א-1981 ותקנות אבטחת מידע.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">דרישה</TableHead>
              <TableHead className="text-right">סטטוס</TableHead>
              <TableHead className="text-right">הערות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["מזעור מידע (Data Minimization)", "✅ מיושם", "נאסף רק מידע הנדרש לצורך השירות"],
              ["הצפנת מידע בתעבורה", "✅ מיושם", "HTTPS/TLS 1.3 בכל התקשורת"],
              ["הצפנת מידע במנוחה", "✅ מיושם", "AES-256 במסד הנתונים"],
              ["בקרת גישה", "✅ מיושם", "RLS + JWT Authentication"],
              ["מדיניות פרטיות", "⚠️ נדרש השלמה", "יש ליצור דף מדיניות פרטיות באתר"],
              ["באנר הסכמה (Consent)", "⚠️ נדרש השלמה", "יש להוסיף באנר הסכמה בכניסה ראשונה"],
              ["זכות מחיקת מידע", "⚠️ נדרש השלמה", "יש לבנות ממשק בקשת מחיקה למשתמש"],
              ["רישום מאגר מידע", "⚠️ נדרש מהרשות", "רישום ברשם מאגרי המידע (אם רלוונטי)"],
              ["מינוי ממונה אבטחת מידע", "⚠️ נדרש מהרשות", "מינוי ממונה בהתאם לתקנות"],
            ].map(([req, status, notes], i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{req}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* 9. 90-Day Implementation Plan */}
      <Section num={9} title="תכנית הטמעה ל-90 יום">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">שלב</TableHead>
              <TableHead className="text-right">שבועות</TableHead>
              <TableHead className="text-right">משימות עיקריות</TableHead>
              <TableHead className="text-right">אחראי</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["שלב 1 – הקמה", "1-3", "הגדרת דומיין (DNS/CNAME), מיתוג (לוגו, צבעים), הכנת מדיניות פרטיות ותנאי שימוש", "מנהל פרויקט + IT"],
              ["שלב 2 – התאמה", "4-6", "עדכון תכנים מקומיים (כתובות, טלפונים, שירותים), התאמת מודולי ידע לצרכי הרשות", "אחראי תוכן + מנהל פרויקט"],
              ["שלב 3 – בדיקות", "7-9", "בדיקות נגישות WCAG 2.1 AA, בדיקות QA על כל הדפדפנים והמכשירים, בדיקות אבטחה", "IT + QA"],
              ["שלב 4 – השקה", "10-12", "העלאה לייצור, הדרכת צוות, ניטור ביצועים, תמיכה שוטפת", "כל הצוות"],
            ].map(([phase, weeks, tasks, owner], i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{phase}</TableCell>
                <TableCell>{weeks}</TableCell>
                <TableCell>{tasks}</TableCell>
                <TableCell>{owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* 10. Required Interfaces */}
      <Section num={10} title="ממשקים נדרשים להטמעה">
        <div className="space-y-4">
          <h4 className="font-semibold text-primary">ממשקי חובה</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">ממשק</TableHead>
                <TableHead className="text-right">סוג</TableHead>
                <TableHead className="text-right">פירוט</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">DNS / CNAME</TableCell>
                <TableCell>תשתית</TableCell>
                <TableCell>הפניית דומיין מותאם אישית לשרתי הענן</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h4 className="font-semibold text-primary mt-6">ממשקים אופציונליים</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">ממשק</TableHead>
                <TableHead className="text-right">סוג</TableHead>
                <TableHead className="text-right">פירוט</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["CRM (Salesforce/HubSpot)", "API", "העברת לידים ונתוני שאלונים למערכת CRM"],
                ["Google Analytics", "Script Tag", "מעקב וניתוח התנהגות משתמשים"],
                ["כלי נגישות חיצוני", "Script Tag", "שכבת נגישות נוספת (Nagich, UserWay)"],
                ["SSO / SAML", "API", "כניסה אחידה דרך מערכת הרשות"],
                ["מערכת דיוור", "API / Webhook", "שליחת ניוזלטרים ועדכונים (Mailchimp, SendGrid)"],
              ].map(([iface, type, detail], i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{iface}</TableCell>
                  <TableCell>{type}</TableCell>
                  <TableCell>{detail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* 11. Personnel Requirements */}
      <Section num={11} title="דרישות כוח אדם מצד הרשות המטמיעה">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">תפקיד</TableHead>
              <TableHead className="text-right">היקף משרה</TableHead>
              <TableHead className="text-right">תקופה</TableHead>
              <TableHead className="text-right">תחומי אחריות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["מנהל/ת פרויקט", "20%", "90 יום", "תיאום, ליווי הטמעה, קבלת החלטות, בקרת לו\"ז"],
              ["איש/אשת IT", "2-3 ימים", "שלב 1", "הגדרת DNS, בדיקות אבטחה, חיבור CRM (אם נדרש)"],
              ["אחראי/ת תוכן מקצועי", "10%", "שלבים 1-3", "התאמת תכנים, עדכון כתובות ושירותים מקומיים"],
              ["עו\"ד / יועץ פרטיות", "חד-פעמי", "שלב 1", "אישור מדיניות פרטיות ותנאי שימוש"],
            ].map(([role, scope, period, responsibility], i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{role}</TableCell>
                <TableCell>{scope}</TableCell>
                <TableCell>{period}</TableCell>
                <TableCell>{responsibility}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* Footer */}
      <Separator className="my-8 print:my-4" />
      <div className="text-center text-muted-foreground text-sm print:text-xs">
        <p className="flex items-center justify-center gap-2">
          <FileText className="h-4 w-4" />
          מסמך זה הופק אוטומטית ממערכת SeniorSense | תאריך: {new Date().toLocaleDateString("he-IL")}
        </p>
      </div>
    </div>
  );
};

const Section = ({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="mb-6 print:mb-4 print:shadow-none print:border-none">
    <CardHeader className="pb-3">
      <CardTitle className="text-xl text-primary">
        {num}. {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default TechnicalSpec;
