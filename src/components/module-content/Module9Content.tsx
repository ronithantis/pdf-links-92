import { CheckCircle, AlertTriangle, Shield, Users, Home, Smartphone, FileText, Heart } from "lucide-react";

interface Module9ContentProps {
  subId: string;
}

const InfoBox = ({ title, children, variant = "info" }: { title: string; children: React.ReactNode; variant?: "info" | "warning" | "tip" }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800",
    warning: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
    tip: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800",
  };
  return (
    <div className={`border rounded-lg p-4 ${styles[variant]}`}>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
};

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 pr-4">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const Module9Content = ({ subId }: Module9ContentProps) => {
  switch (subId) {
    case "8.1":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">חברות סיעוד לעומת תאגידי כוח אדם</h3>

          <p>כשמגיעים לנקודה שבה צריך לגייס מטפל מקצועי לבית, עומדות בפניכם שתי מסגרות עיקריות. ההבדל ביניהן אינו רק טכני — הוא משפיע ישירות על איכות הטיפול, הליווי שתקבלו וכאשר דברים לא מתנהלים כצפוי.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-3 text-right font-semibold">קריטריון</th>
                  <th className="border p-3 text-right font-semibold">חברת סיעוד</th>
                  <th className="border p-3 text-right font-semibold">תאגיד כוח אדם</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">התמחות</td>
                  <td className="border p-2">טיפול ישיר וסיעוד</td>
                  <td className="border p-2">גיוס והשמה (בעיקר עובדים זרים)</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">סוג עובדים</td>
                  <td className="border p-2">מטפלים ישראלים (לרוב)</td>
                  <td className="border p-2">עובדים זרים מחו"ל</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">ליווי מקצועי</td>
                  <td className="border p-2">ליווי שוטף ע"י אחות או עו"ס, פיקוח בבית המטופל</td>
                  <td className="border p-2">פחות ליווי קליני/טיפולי שוטף</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">התאמה אישית</td>
                  <td className="border p-2">התאמת מטפל אישית לצרכי המטופל</td>
                  <td className="border p-2">מסדיר אשרות (ויזות) ואישורי כניסה</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">אחריות</td>
                  <td className="border p-2">אחריות מקצועית ישירה מול המשפחה, כתובת לפתרון בעיות תפקוד</td>
                  <td className="border p-2">אחריות בעיקר חוזית וחוקית מול המעסיק והרשויות</td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">עלות ניהול חודשית</td>
                  <td className="border p-2">70–150 ₪</td>
                  <td className="border p-2">70–150 ₪ (חובה להירשם בתאגיד להעסקת עובד זר)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <InfoBox title="⚠️ חשוב לזכור" variant="warning">
            <p>כדי להעסיק עובד זר, חובה להירשם ולפעול דרך תאגיד כוח אדם מורשה. העסקה ישירה ללא תאגיד עלולה לגרור קנסות משמעותיים.</p>
          </InfoBox>

          <InfoBox title="מתי לבחור בכל אחת?" variant="tip">
            <BulletList items={[
              "חברת סיעוד — כשרוצים מטפל ישראלי עם ליווי מקצועי צמוד ופיקוח שוטף",
              "תאגיד כוח אדם — כשצריכים עובד/ת זר/ה שיגור/תגור בבית 24/7",
              "ניתן לעבוד עם שניהם במקביל — חברת סיעוד לליווי + תאגיד לגיוס עובד זר",
            ]} />
          </InfoBox>

          <p className="text-xs text-muted-foreground">* העלויות והנהלים נכונים לפברואר 2026 ועשויים להשתנות.</p>
        </div>
      );

    case "8.2":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">בחירת ספק שירות — קריטריונים וטיפים</h3>

          <p>הבחירה בחברת סיעוד היא אחת ההחלטות המשמעותיות שתקבלו בתהליך. איכות השירות והאמינות הן הגורמים הקריטיים לרווחת יקירכם — חשוב לא להסתפק בהצעת המחיר הזולה ביותר.</p>

          <div>
            <h4 className="font-semibold mb-3">קריטריונים לבחירה נבונה:</h4>
            <BulletList items={[
              "מוניטין ואמינות — בדקו ביקורות ברשת, שאלו ברשתות חברתיות של משפחות מטפלות",
              "איכות השירות וזמינות — האם ניתן מענה לאדם אחראי גם בשעות לא שגרתיות?",
              "שקיפות פיננסית — דרשו פירוט מלא של עמלות, תשלומים ותנאי התקשרות",
              "פריסה גאוגרפית — קרבה למקום המגורים מבטיחה מענה מהיר בשעת צורך",
              "שיחות המלצה — דברו עם משפחות שמשתמשות בשירות. המלצות אנושיות שוות יותר מכל פרסומת",
              "דרישת אסמכתאות — חברה טובה לא תחשוש מלהציג ממליצים",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">הזכויות שלכם ושל יקירכם:</h4>
            <BulletList items={[
              "זכות להחליף מטפל — אם הטיפול אינו עומד בציפיות, ללא קנס",
              "קראו בעיון את סעיפי החוזה — מדיניות ביטולים ברורה והוגנת",
              "קבלת פירוט מלא על תשלומים, שעות ביצוע ושינויים",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">מסמכים שכדאי להכין מראש:</h4>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="border rounded-lg p-3 bg-card text-center">
                <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
                <h5 className="font-semibold text-sm">רשימת בדיקה</h5>
                <p className="text-xs text-muted-foreground">שאלות מנחות לבחירת חברת סיעוד</p>
              </div>
              <div className="border rounded-lg p-3 bg-card text-center">
                <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
                <h5 className="font-semibold text-sm">טופס השוואת מחירים</h5>
                <p className="text-xs text-muted-foreground">דמי ניהול, עמלות נוספות ותנאי תשלום</p>
              </div>
              <div className="border rounded-lg p-3 bg-card text-center">
                <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
                <h5 className="font-semibold text-sm">הסכם התקשרות</h5>
                <p className="text-xs text-muted-foreground">אחריות, תנאים ומנגנוני סיום</p>
              </div>
            </div>
          </div>

          <InfoBox title="💡 טיפ מנוסה" variant="tip">
            <p>מומלץ לשמור עותק חתום מכל מסמך — בתיקייה פיזית ובגיבוי דיגיטלי. זה יחסוך לכם עגמת נפש רבה בהמשך.</p>
          </InfoBox>
        </div>
      );

    case "8.3":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">העסקת עובד/ת זר/ה</h3>

          <p>העסקת עובד זר היא אחת הפתרונות הנפוצים ביותר לטיפול מתמשך בבית. מדובר בתהליך הכולל כמה שלבים בירוקרטיים, אך בסיומו תוכלו לקבל מטפל צמוד ומסור שיעניק ליווי צמוד לאורך היממה.</p>

          <div>
            <h4 className="font-semibold mb-3">תנאי הזכאות:</h4>
            <BulletList items={[
              "גיל 85 ומעלה",
              "לקות תפקוד ב-3 או יותר פעולות ADL בסיסיות (אכילה, ניידות, לבישה, רחצה, שליטה בהפרשות)",
              "ניתן לקבל גם בגיל צעיר יותר — בנסיבות רפואיות מיוחדות. בדקו עם הגורמים המקצועיים",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">תהליך ההעסקה — שלב אחר שלב:</h4>
            <div className="space-y-3">
              {[
                { step: 1, title: "בדיקת זכאות", desc: "ווידוא שיקירכם עומד בקריטריונים הנדרשים" },
                { step: 2, title: "הגשת בקשה", desc: "מילוי והגשת הטפסים הנדרשים לרשות האוכלוסין וההגירה" },
                { step: 3, title: "קבלת היתר", desc: "אישור רשמי להעסקת עובד זר, תקף לרוב ל-4 שנים ולעתים לצמיתות" },
                { step: 4, title: "גיוס עובד", desc: "איתור עובד מתאים דרך תאגיד מורשה, ראיונות ובדיקת רקע" },
                { step: 5, title: "קליטה", desc: "חתימה על חוזה, קבלת פנים והסתגלות העובד לבית" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 border rounded-lg p-3 bg-card">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">{s.step}</div>
                  <div>
                    <h5 className="font-semibold text-sm">{s.title}</h5>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <InfoBox title="⏱️ חשוב" variant="warning">
            <p>התהליך עשוי להימשך מספר שבועות עד חודשים. תכננו מראש ואל תמתינו למצב של משבר.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">טבלת שכר וניכויים (עדכני לפברואר 2026):</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-right">רכיב</th>
                    <th className="border p-2 text-right">סכום</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2 font-semibold">שכר ברוטו (כולל 4 שבתות)</td><td className="border p-2">6,247.67 ₪</td></tr>
                  <tr><td className="border p-2">עבודה ביום שבת (4 ימים)</td><td className="border p-2">1,705.40 ₪</td></tr>
                  <tr><td className="border p-2">מקדמות ששולמו</td><td className="border p-2">400.00 ₪</td></tr>
                  <tr className="bg-muted/50"><td className="border p-2 font-bold">סה"כ ברוטו לתשלום</td><td className="border p-2 font-bold">7,553.07 ₪</td></tr>
                  <tr><td className="border p-2 text-destructive">ניכוי: מגורים (אזור המרכז)</td><td className="border p-2">192.81 ₪−</td></tr>
                  <tr><td className="border p-2 text-destructive">ניכוי: הוצאות נלוות למגורים</td><td className="border p-2">94.34 ₪−</td></tr>
                  <tr><td className="border p-2 text-destructive">ניכוי: ביטוח רפואי (חלק עובד)</td><td className="border p-2">142.00 ₪−</td></tr>
                  <tr><td className="border p-2 text-destructive">ניכוי: כלכלה (אוכל)</td><td className="border p-2">500.00 ₪−</td></tr>
                  <tr className="bg-muted/50"><td className="border p-2 font-bold text-destructive">סה"כ ניכויים מותרים</td><td className="border p-2 font-bold">929.15 ₪−</td></tr>
                  <tr className="bg-primary/10"><td className="border p-2 font-bold">נטו לתשלום (משוער)</td><td className="border p-2 font-bold">~6,624 ₪</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <InfoBox title="📌 עדכון צפוי באפריל 2026" variant="info">
            <p>שכר המינימום צפוי לעלות לכ-6,443 ₪ (תוספת של כ-200 ₪). עדכנו את חישוביכם בהתאם.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">ימי חופשה לפי ותק:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-right">ותק בעבודה</th>
                    <th className="border p-2 text-right">ימי חופשה</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">שנה 1</td><td className="border p-2">5 ימים</td></tr>
                  <tr><td className="border p-2">שנים 2–3</td><td className="border p-2">6 ימים</td></tr>
                  <tr><td className="border p-2">שנים 4–7</td><td className="border p-2">7 ימים</td></tr>
                  <tr><td className="border p-2">שנים 8–9</td><td className="border p-2">8 ימים</td></tr>
                  <tr><td className="border p-2">שנה 10+</td><td className="border p-2">10 ימים</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">הוצאות נוספות שכדאי להכיר:</h4>
            <BulletList items={[
              "אגרת בקשה (חד-פעמי): כ-2,000 ₪",
              "כרטיס טיסה: עלות הטסת העובד ארצה",
              "הדרכה מקצועית: השקעה חיונית לתחילת עבודה מוצלחת",
              "ביטוח רפואי: כ-1,370 ₪ לחודש (חובה חוקית)",
              "ביטוח לאומי: כ-660 ₪ לחודש",
              "תאגיד כוח אדם: כ-70 ₪ לחודש",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">מסמכים חיוניים לתהליך:</h4>
            <BulletList items={[
              "בקשה להיתר העסקה — טופס רשמי לרשות האוכלוסין וההגירה",
              "הסכם העסקה דו-לשוני — חוזה חובה בין המעסיק לעובד, בעברית ובשפת העובד",
              "דיווח לביטוח לאומי — פתיחת תיק מעסיק ותשלום דמי ביטוח עבור העובד",
              "הסכם עם תאגיד כוח אדם — חוזה מול התאגיד המורשה",
            ]} />
          </div>

          <InfoBox title="💡 שימו לב" variant="warning">
            <p>הגישו את הבקשה להיתר לפני תחילת העסקת העובד! העסקה ללא היתר עלולה לגרור קנסות.</p>
          </InfoBox>
        </div>
      );

    case "8.4":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">העסקת בן משפחה בתשלום</h3>

          <p>לעתים הפתרון הנכון ביותר נמצא בתוך המשפחה עצמה — העסקת בן משפחה (ילד בוגר, אח, בן זוג) בתשלום יכולה להיות ברכה גדולה, אך גם מורכבות שלא תמיד רואים מראש.</p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 text-primary">✅ יתרונות מובהקים</h4>
              <BulletList items={[
                "אמון מלא ותחושת ביטחון אישי למטופל",
                "היכרות עמוקה עם הרגליו, רצונותיו ועולמו",
                "רציפות טיפולית ומחויבות רגשית גבוהה",
                "חיסכון כלכלי יחסי — שיעור תשלום מקובל: 75%–85% משכר מטפל רגיל",
              ]} />
            </div>
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 text-destructive">⚠️ אתגרים שכדאי להכיר</h4>
              <BulletList items={[
                "קושי בהפרדת גבולות: ״אני בנו״ לעומת ״אני המטפל שלו״",
                "שחיקה רגשית גבוהה לאורך זמן",
                "פוטנציאל למתחים משפחתיים על רקע תפקודי",
                "מורכבות בירוקרטית סביב זכויות סוציאליות (דמי אבטלה, פיצויים)",
                "חובת הסדרה חוקית מדויקת — אישור מיוחד מהביטוח הלאומי",
              ]} />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">תנאים הכרחיים להעסקת בן משפחה:</h4>
            <BulletList items={[
              "רישום מסודר בתאגיד סיעוד מורשה",
              "חתימה על הסכם העסקה רשמי מפורט",
              "הגדרת תפקיד ברורה — כדי למנוע עמימות",
              "הסדרה מול הביטוח הלאומי",
            ]} />
          </div>

          <InfoBox title="💡 המלצה חשובה" variant="tip">
            <p>ערכו הסכם כתוב ומפורט — גם אם מדובר בבן משפחה קרוב. הבהירות הכתובה מגינה על כל הצדדים ומונעת סכסוכים עתידיים.</p>
          </InfoBox>

          <p className="text-xs text-muted-foreground">* העסקה כזו דורשת אישור מיוחד מהביטוח הלאומי והסדרה מול חברות הסיעוד.</p>
        </div>
      );

    case "8.5":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">שירותים קהילתיים תומכים</h3>

          <p>אל תסתפקו רק במטפל בבית — קיימת רשת מגוון שירותים קהילתיים שיכולה לתמוך, להשלים ולהקל משמעותית גם על המטופל וגם עליכם כמשפחה.</p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                🏠 מרכזי יום לתשושי נפש
              </h4>
              <p className="text-sm mb-3">מסגרת שמספקת מענה טיפולי יומי, מביאה חיוניות ומשמעות לחיי המטופל ומעניקה למשפחה הכרחית.</p>
              <BulletList items={[
                "פעילויות תעסוקה, חברה וגירוי קוגניטיבי — אמנות, מוזיקה, משחקים",
                "הסעות מותאמות מהבית ובחזרה",
                "ארוחות חמות ומזינות",
                "שעות טיפוליות יומיות — הקלה משמעותית על המטפל הביתי",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                🤝 קהילה תומכת
              </h4>
              <p className="text-sm mb-3">שירותים קהילתיים מגוונים שמסייעים בצרכים יומיומיים שאינם דורשים מטפל מקצועי:</p>
              <BulletList items={[
                "סיוע לוגיסטי בקניות ובסידורים",
                "ליווי אישי לבנק, קופת חולים ומוסדות",
                "שירותי חירום רפואיים — כולל רופא בבית",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                🏥 אשפוז בית
              </h4>
              <p className="text-sm mb-3">אחת האפשרויות הפחות מוכרות אך בעלות הערך הרב ביותר — טיפול רפואי-סיעודי אינטנסיבי בבית המטופל ללא צורך בעזיבת הסביבה המוכרת:</p>
              <BulletList items={[
                "חלופה ממשית לאשפוז בבתי חולים — עם יתרון ניכר במניעת זיהומים",
                "צוות רפואי (רופא ואחות) זמין ומבקר באופן קבוע",
              ]} />
            </div>
          </div>
        </div>
      );

    case "8.6":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">טכנולוגיה מסייעת ובטיחות בבית</h3>

          <p>השקעה בפתרונות הנכונים מגדילה את הבטיחות ומפחיתה משמעותית את החרדה של המשפחה. הטכנולוגיה יכולה להיות שכבת הגנה נוספת ומשמעותית — בין אם המטפל נמצא בבית ובין אם לא.</p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3">🚨 מכשירי חירום וניטור בריאות</h4>
              <BulletList items={[
                "לחצן מצוקה — נייח (אדום) על הצוואר או צמיד, שמעביר התרעה מיידית",
                "שעון חכם עם GPS — מאפשר איתור מיקום בזמן אמת",
                "סנסורים חכמים — מזהים חוסר תנועה, מתריעים על נפילות וחריגות באופן אוטומטי",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3">🏡 בית חכם ובטיחות יומיומית</h4>
              <BulletList items={[
                "מצלמות לניטור מרחוק — מעניקות שקט נפשי (תוך שמירה קפדנית על פרטיות, ראו סעיף 8.7)",
                "גלאים אוטומטיים — גלאי עשן, גז חד-חמצני למניעת סכנות",
                "תאורה חכמה אוטומטית — למניעת נפילות בלילה, דרך מוארת לשירותים",
              ]} />
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <h4 className="font-semibold mb-3">💊 ניהול תרופות חכם</h4>
              <BulletList items={[
                "אפליקציות תזכורת — מתריעות על כל מנה בזמן",
                "קופסאות תרופות חכמות — מנפיקות את המנה הנכונה בזמן הנכון ומתריעות על פספוס",
                "דיווח אוטומטי — מאפשר מעקב מרחוק למטפל",
              ]} />
            </div>
          </div>
        </div>
      );

    case "8.7":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">ניהול הקשר עם העובד/ת הזר/ה</h3>

          <InfoBox title="🤝 עיקרון מרכזי" variant="info">
            <p>יחסים תקינים = טיפול איכותי למטופל + שקט נפשי למשפחה</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">הבנת העובד — נקודת המבט שלו:</h4>
            <p className="mb-3">אחת הטעויות הנפוצות שמשפחות עושות היא לראות את העובד הזר רק כ"כוח עבודה". כדי לנהל קשר בריא ויעיל, חיוני להבין מי עומד מולנו ואיזו מציאות הוא חווה:</p>
            <BulletList items={[
              "ריחוק משמעותי מהמשפחה — מדינה זרה, שפה זרה, תרבות שונה",
              "עבודה אינטנסיבית 24/6 עם אחריות כבדה סביב אדם פגיע",
              "לחץ כלכלי — ציפייה לשלוח כסף הביתה למשפחה",
              "הצורך ביציבות ושקיפות — לדעת מה מצפים ממנו, מה זכויותיו",
              "כבוד בסיסי — יחס אנושי, פנייה בשם, ״תודה״ ו-״בבקשה״",
              "פרטיות — זמן אישי אמיתי ושיחות עם הבית",
              "תנאי מחיה הולמים — חדר פרטי (מומלץ מאוד), מיטה נוחה, ארון אישי, אוכל מתאים",
            ]} />
          </div>

          <InfoBox title="💡 עיקרון ניהולי" variant="tip">
            <p>עובד שמרגיש מוגן ומכובד → פחות שחיקה, פחות עימותים, יותר סבלנות ויותר אהבה למטופל. זו לא רכות — זוהי חשיבה מעשית.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">תיאום ציפיות מהיום הראשון:</h4>
            <p className="mb-3 text-sm">״השקעה של שעתיים ביום הראשון חוסכת חודשים של תסכול״ — מנטרה שמשפחות שעברו את הדרך חוזרות עליה שוב ושוב.</p>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">📋 פגישת קליטה מובנית</h5>
                <BulletList items={[
                  "סיור בבית — חדרים, ציוד, מותר/אסור, ערכת עזרה ראשונה",
                  "היכרות עם המטופל — מצב בריאותי, אופי, הרגלים, מה מרגיע ומה מלחיץ",
                  "הסבר על מחלות — דמנציה/פרקינסון/סוכרת ומה זה אומר בהתנהגות יומיומית",
                ]} />
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">📝 הגדרת תפקיד ברורה</h5>
                <BulletList items={[
                  "רשימת תרופות כתובה עם שעות מדויקות — ״אפס שינויים״ ללא אישור",
                  "כללי תקשורת — מי איש הקשר הראשי, מתי מדווחים, מה דחוף",
                  "מה כן ומה לא — תחומי האחריות של העובד בבירור",
                ]} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">זכויות העובד על פי חוק:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-right">זכות</th>
                    <th className="border p-2 text-right">פירוט</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2 font-semibold">מנוחה שבועית</td><td className="border p-2">25 שעות רצופות (לרוב שישי-שבת)</td></tr>
                  <tr><td className="border p-2 font-semibold">מנוחה יומית</td><td className="border p-2">8 שעות בכל יממה (לרוב בלילה)</td></tr>
                  <tr><td className="border p-2 font-semibold">תקופת ניסיון</td><td className="border p-2">עד 3 חודשים</td></tr>
                  <tr><td className="border p-2 font-semibold">הסכם עבודה</td><td className="border p-2">חייב להימסר בכתב תוך 30 יום</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <InfoBox title="⚠️ שעות מנוחה" variant="warning">
            <p>אם שעות המנוחה קוצרו, ייתכן שהעובד זכאי לתשלום בגין שעות אלו. תכננו מראש מי מחליף בזמן המנוחה.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">מצלמות אבטחה בבית — איזון עדין:</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2 text-primary">✅ יתרונות</h5>
                <BulletList items={[
                  "שקט נפשי למשפחה — ניטור מרחוק",
                  "בטיחות: זיהוי נפילות ומקרי חירום",
                  "הגנה על העובד מהאשמות שווא",
                ]} />
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2 text-destructive">⚠️ חסרונות וסיכונים</h5>
                <BulletList items={[
                  "פגיעה בפרטיות ותחושת אי-אמון",
                  "לחץ פסיכולוגי מתמיד על העובד",
                  "פגיעה בכבוד המטופל במצבים אינטימיים",
                ]} />
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <p className="text-sm font-semibold">⚖️ המסגרת החוקית (חוק הגנת הפרטיות, 1981):</p>
              <BulletList items={[
                "מותר — סלון, מטבח, כניסה, מסדרונות (עם הסכמה ושקיפות)",
                "אסור — חדר שינה של העובד, שירותים ומקלחת, מקומות אינטימיים",
                "חובה — הודעה בכתב לעובד בשפתו, חתימה על טופס הסכמה מדעת",
              ]} />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">כללי יחסים מקצועיים ופידבק:</h4>
            <BulletList items={[
              "כבוד — פנייה בשם, ״תודה״ ו-״בבקשה״ בכל אינטראקציה",
              "גבולות — העובד הוא עובד מקצועי, לא בן משפחה אך גם לא עבד",
              "אמפתיה — הבנה כנה של הקושי בעבודה 24/6 עם אדם פגיע",
              "תקשורת ישירה — מדברים, לא צוברים ומתפוצצים",
              "פידבק חיובי — ״שמתי לב שאבא יותר רגוע היום — תודה רבה״",
              "פידבק מתקן — תמיד בפרטיות ועם דרך פעולה: ״שמתי לב שהתרופות ניתנו מאוחר — בוא נמצא פתרון יחד״",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">הסלמה — תהליך מדורג לטיפול בבעיות:</h4>
            <div className="space-y-2">
              {[
                { step: 1, title: "שיחה אישית", desc: "הסבר מחדש, הבנה הדדית" },
                { step: 2, title: "תיעוד בכתב", desc: "הגדרת ציפייה ברורה (וואטסאפ/דף)" },
                { step: 3, title: "התראה רשמית", desc: "יעד שיפור מוגדר" },
                { step: 4, title: "התייעצות", desc: "עם התאגיד, עו״ד או לשכת עבודה לפני צעד דרמטי" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 border rounded-lg p-2 bg-card">
                  <div className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">{s.step}</div>
                  <div>
                    <span className="font-semibold text-sm">{s.title}</span>
                    <span className="text-xs text-muted-foreground"> — {s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-destructive">🚨 סימני אזהרה שמחייבים פעולה מיידית:</h4>
            <BulletList items={[
              "חשד לאלימות מילולית או פיזית כלפי המטופל — פעלו מיידית",
              "הזנחה של המטופל — אל תמתינו",
              "שימוש באלכוהול או סמים",
              "גניבה — תעדו בזהירות לפני נקיטת פעולה",
              "היעלמות ללא הודעה מוקדמת",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">פיטורים — הליך תקין ומכובד:</h4>
            <BulletList items={[
              "הודעה מוקדמת — 11 ימי הודעה מראש לאחר 8 חודשי עבודה",
              "גמר חשבון — חישוב מלא של פיצויים, פדיון חופשה והחזרי הוצאות",
              "הודעה לגורמים — עדכון הביטוח הלאומי והתאגיד",
            ]} />
          </div>

          <div>
            <h4 className="font-semibold mb-3">תמיכה בעובד — השקעה שמשתלמת:</h4>
            <BulletList items={[
              "ביטוח בריאות פרטי — חובה חוקית, כ-168 ₪ לחודש",
              "ליווי לרופא אם העובד חולה — מניעת הדבקה ושמירה על כושר עבודה",
              "עידוד שימוש מלא בשעות המנוחה — יציאה, מפגשים, מנוחה אמיתית",
              "פרטיות לשיחות טלפון עם המשפחה",
              "עידוד לימוד עברית בסיסית — מקטין טעויות ומגדיל אמון",
              "תנאי מגורים הולמים — חדר פרטי מומלץ, ארון עם אפשרות נעילה",
            ]} />
          </div>
        </div>
      );

    case "8.8":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">מסמכים וטפסים נדרשים</h3>

          <p>מומלץ ליצור קלסר ייעודי לכל המסמכים — ריכוז כל המסמכים הנדרשים לניהול תקין, חוקי ומקצועי של העסקת עובד זר.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-right">קטגוריה</th>
                  <th className="border p-2 text-right">מסמך</th>
                  <th className="border p-2 text-right">מטרה</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2 font-semibold">קליטה</td><td className="border p-2">רשימת בדיקה — יום ראשון</td><td className="border p-2">וידוא כיסוי כל הנושאים</td></tr>
                <tr><td className="border p-2 font-semibold">קליטה</td><td className="border p-2">הסכם תיאור תפקיד דו-לשוני</td><td className="border p-2">הגדרה ברורה של תחומי האחריות</td></tr>
                <tr><td className="border p-2 font-semibold">ניהול</td><td className="border p-2">לוח זמנים שבועי</td><td className="border p-2">תיאום שעות עבודה ומנוחה</td></tr>
                <tr><td className="border p-2 font-semibold">בטיחות</td><td className="border p-2">רשימת תרופות + תמונות</td><td className="border p-2">מניעת טעויות במתן תרופות</td></tr>
                <tr><td className="border p-2 font-semibold">פרטיות</td><td className="border p-2">הסכמה ומדיניות מצלמות</td><td className="border p-2">עמידה בחוק הגנת הפרטיות</td></tr>
                <tr><td className="border p-2 font-semibold">חובה חוקית</td><td className="border p-2">הסכם העסקה דו-לשוני</td><td className="border p-2">הגנה משפטית לשני הצדדים</td></tr>
                <tr><td className="border p-2 font-semibold">שכר</td><td className="border p-2">תלוש שכר + יומן תשלומים</td><td className="border p-2">שקיפות וחוקיות</td></tr>
                <tr><td className="border p-2 font-semibold">רגולציה</td><td className="border p-2">דיווח לביטוח לאומי</td><td className="border p-2">חובה חוקית עד ה-15 לחודש</td></tr>
                <tr><td className="border p-2 font-semibold">סיום עבודה</td><td className="border p-2">הודעת פיטורים + גמר חשבון</td><td className="border p-2">הליך תקין ומחושב</td></tr>
              </tbody>
            </table>
          </div>

          <InfoBox title="ערכת קליטה מומלצת — יום ראשון:" variant="tip">
            <BulletList items={[
              "רשימת בדיקה (Checklist) לקליטה",
              "תיאור תפקיד דו-לשוני (עברית + שפת העובד)",
              "לוח זמנים שבועי כולל שעות מנוחה ומי מחליף",
              "רשימת תרופות עם שעות (ומומלץ עם תמונות/צבעים)",
              "כללי בית: אוכל, כשרות, שימוש בטלפון, אורחים, עישון",
            ]} />
          </InfoBox>

          <InfoBox title="🤝 אתם לא לבד בדרך" variant="info">
            <p>הניהול המקצועי של מערך הטיפול הביתי הוא מסע מורכב, אך עם הכלים הנכונים, הידע המעשי והגישה האנושית הנכונה — ניתן לבנות מערכת שמיטיבה עם המטופל, עם העובד ועם כל המשפחה.</p>
          </InfoBox>

          <p className="text-xs text-muted-foreground">* העלויות, השכר, הנהלים וסכומי הניכוי המצוינים במסמך זה נכונים לפברואר 2026 ועשויים להשתנות. מומלץ לאמת נתונים פיננסיים עם רואה חשבון, לשכת עבודה או הביטוח הלאומי.</p>
        </div>
      );

    default:
      return null;
  }
};
