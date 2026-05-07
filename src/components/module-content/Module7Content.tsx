import { CheckCircle, Music, Camera, MapPin, Dumbbell, Brain, Hand } from "lucide-react";

interface Module7ContentProps {
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

export const Module7Content = ({ subId }: Module7ContentProps) => {
  switch (subId) {
    case "3.1":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">שלבי הדמנציה והשלכותיהם על היום-יום</h3>

          <InfoBox title="עיקרון מנחה" variant="info">
            <p>המטרה היא להבין שה״התנהגות״ היא לעיתים ביטוי של בלבול, פחד, כאב או צורך – ולא ״קושי״ בלבד.</p>
          </InfoBox>

          {/* === FAST scale === */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-xl font-bold">הבנת שלבי הדמנציה: מדריך למדד FAST וזכויות החולה</h3>
            <p className="text-sm leading-relaxed">
              תהליך הירידה הקוגניטיבית בדמנציה ובאלצהיימר אינו ליניארי תמיד, אך עולם הרפואה משתמש במדדים מוסכמים כדי להבין היכן המטופל נמצא על ציר הזמן. אחד הכלים המרכזיים והמדויקים ביותר הוא סולם <strong>FAST (Functional Assessment Staging Tool)</strong>.
            </p>

            <InfoBox title="למה בכלל מבצעים מבחן להערכת שלבים?" variant="info">
              <p className="mb-2">אבחון השלב בו נמצא היקיר שלכם אינו רק עניין של הגדרה רפואית; יש לו השלכות מעשיות קריטיות:</p>
              <BulletList items={[
                "התאמת הטיפול: הבנה מהן היכולות שנשמרו ומהן אלו שאבדו, כדי להעניק סיוע מבלי לפגוע בעצמאות שנותרה.",
                "תכנון עתידי: היערכות לשינויים פיזיים (כמו אובדן שליטה על סוגרים או קשיי בליעה) לפני שהם הופכים למקרה חירום.",
                "מיצוי זכויות: מוסדות המדינה (ביטוח לאומי, חברות ביטוח וקופות החולים) מסתמכים על הגדרות תפקודיות כדי לקבוע זכאות לקצבאות וסיוע.",
              ]} />
            </InfoBox>

            <div>
              <h4 className="font-semibold mb-3">פירוט שלבי מדד FAST</h4>
              <p className="text-sm mb-3">הסולם נע בין תפקוד תקין (1) לבין דמנציה בשלב סופי (7).</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-right font-bold">שלב</th>
                      <th className="border p-2 text-right font-bold">הגדרה קלינית</th>
                      <th className="border p-2 text-right font-bold">משמעות תפקודית</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-semibold">1-3</td>
                      <td className="border p-2">שלב טרום-דמנציה</td>
                      <td className="border p-2">שכחה קלה, קושי במציאת מילים, אך תפקוד עצמאי מלא.</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-semibold">4</td>
                      <td className="border p-2">דמנציה קלה</td>
                      <td className="border p-2">קושי במשימות מורכבות (תשלום חשבונות, תכנון ארוחה חגיגית).</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-semibold">5</td>
                      <td className="border p-2">דמנציה בינונית</td>
                      <td className="border p-2">המטופל זקוק לעזרה בבחירת בגדים (התאמה לעונה/צבעים). לא יכול לשרוד ללא סיוע.</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-semibold">6</td>
                      <td className="border p-2">דמנציה בינונית-קשה</td>
                      <td className="border p-2">עזרה ברחצה, הלבשה ושימוש בשירותים. בשלב זה מופיע לעיתים קרובות אובדן שליטה על סוגרים.</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-semibold">7</td>
                      <td className="border p-2">דמנציה קשה</td>
                      <td className="border p-2">הגבלה בדיבור (מילים בודדות), אובדן יכולת הליכה, חוסר יכולת לחייך או לשבת ללא תמיכה.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">זכויות וסיוע בשלבים מתקדמים (שלב 6 ו-7)</h4>
              <p className="text-sm mb-3">כאשר המטופל מוגדר בשלבים המתקדמים של מדד FAST, נפתחות דלתות לסיוע משמעותי יותר:</p>

              <div className="space-y-3">
                <InfoBox title="1. גמלת סיעוד (ביטוח לאומי)" variant="tip">
                  <p>בשלבים אלו, המטופל בדרך כלל יקבל את הניקוד המקסימלי במבחן ה-ADL (תפקוד יומיומי), מה שמקנה זכאות לשעות טיפול רבות, אפשרות להעסקת עובד זר, או המרה של חלק מהשעות לקצבה כספית לציוד וטיפול.</p>
                </InfoBox>

                <InfoBox title="2. הוספיס בית וטיפול פליאטיבי" variant="tip">
                  <p className="mb-2">אחת התרומות החשובות של מדד FAST היא הגדרת הזכאות להוספיס. מטופל בשלב <strong>7C ומעלה</strong> (אובדן יכולת הליכה עצמאית) זכאי לליווי של צוות פליאטיבי מטעם קופת החולים.</p>
                  <p><strong>המטרה:</strong> מניעת סבל, איזון כאב וטיפול בסביבה הביתית המוכרת במקום אשפוזים חוזרים בבתי חולים.</p>
                </InfoBox>

                <InfoBox title="3. מינוי אפוטרופוס או הפעלת ייפוי כוח מתמשך" variant="warning">
                  <p>אם לא נעשה זאת בשלבים המוקדמים, שלב 5-6 הוא לרוב "קו פרשת המים" שבו המטופל כבר אינו כשיר משפטית לקבל החלטות. זהו הזמן להפעיל מנגנונים משפטיים כדי לדאוג לרווחתו הכלכלית והרפואית.</p>
                </InfoBox>

                <InfoBox title="4. קוד סיעודי (משרד הבריאות)" variant="tip">
                  <p>במידה והמשפחה מחליטה על מעבר למוסד סיעודי, המצב התפקודי (המוגדר דרך שלבי ה-FAST) הוא הקריטריון המרכזי לקבלת "קוד" – סיוע במימון האשפוז הסיעודי בהתאם להכנסות המשפחה.</p>
                </InfoBox>
              </div>
            </div>

            <InfoBox title="חשוב לזכור" variant="info">
              <p>למרות שהטבלאות נראות טכניות, מאחוריהן נמצא אדם. האבחון נועד לשרת את איכות החיים שלו ושלכם, ולא רק להגדיר את המחלה.</p>
            </InfoBox>

            <InfoBox title="📚 מקורות נוספים במרכז הידע" variant="tip">
              <div className="space-y-2">
                <a href="/knowledge-center?resource=f7c4b9f6-607c-4470-8e09-ebe43b098bee" className="flex items-center gap-2 text-primary font-medium hover:underline">
                  📊 מצגת: התמודדות עם דמנציה ←
                </a>
                <a href="/knowledge-center?resource=444603fd-d3f8-452b-a0a6-eab2766fb39d" className="flex items-center gap-2 text-primary font-medium hover:underline">
                  📊 מצגת: התמודדות עם דמנציה בבית ←
                </a>
                <a href="https://ronithantis.github.io/RECIPES/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-medium hover:underline">
                  🍲 מדריך מתכונים לאדם סיעודי (כולל התאמות לדיספגיה) ←
                </a>
              </div>
            </InfoBox>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-foreground mb-3">שלב מוקדם</h4>
              <p className="text-sm mb-3 font-medium">מאפיינים נפוצים:</p>
              <BulletList items={[
                "קושי בהתארגנות וריבוי משימות",
                "שכחה קלה–בינונית",
                "חרדה, בושה, עצבנות",
              ]} />
              <div className="mt-3 p-2 bg-background/50 rounded text-sm">
                <p className="font-semibold">מה עובד:</p>
                <p>שגרה קבועה, תזכורות, לוח פתקים, עזרי ״הצלחה״ לשימור עצמאות. פעילות קוגניטיבית יזומה (ראו 7.4).</p>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
              <h4 className="font-semibold text-foreground mb-3">שלב בינוני</h4>
              <p className="text-sm mb-3 font-medium">מאפיינים נפוצים:</p>
              <BulletList items={[
                "ירידה משמעותית בזיכרון",
                "צורך בעזרה ב-ADL",
                "נדודים, אי-שקט, חשדנות",
                "שיבוש שינה/ערב",
              ]} />
              <div className="mt-3 p-2 bg-background/50 rounded text-sm">
                <p className="font-semibold">מה עובד:</p>
                <p>משימות קצרות, מוחשיות וחזרתיות. הפחתת גירויים ומורכבות.</p>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-foreground mb-3">שלב מתקדם</h4>
              <p className="text-sm mb-3 font-medium">מאפיינים נפוצים:</p>
              <BulletList items={[
                "שינויים מוטוריים, קושי בבליעה",
                "כמעט תלות מלאה",
                "מצוקה / כאב / אי-נוחות",
                "שפת הגוף היא בעיקר ההתנהגות",
              ]} />
              <div className="mt-3 p-2 bg-background/50 rounded text-sm">
                <p className="font-semibold">מה עובד:</p>
                <p>שגרה, יציבה תומכת, מגע עדין, מוזיקה מוכרת, גירוי חושי עדין. תנועה עדינה ובטוחה למניעת נוקשות/כאב.</p>
              </div>
            </div>
          </div>
        </div>
      );

    case "3.2":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">תקשורת תומכת שמפחיתה BPSD</h3>

          <InfoBox title="עיקרון-על" variant="info">
            <p>להפחית עומס קוגניטיבי ולהגביר תחושת ביטחון.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">טכניקות בסיסיות:</h4>
            <BulletList items={[
              "קשר עין, טון רגוע, דיבור איטי וברור",
              "משפטים קצרים ושאלה אחת בכל פעם (׳רוצה לשתות מים?׳)",
              "להימנע מוויכוחים על ׳מה נכון׳ – תיקוף רגש במקום (׳זה מפחיד אותך, אני איתך׳)",
              "סביבה שקטה: פחות אנשים בחדר, בלי טלוויזיה ברקע בשיחה",
              "שיחה אחד-על-אחד, בקצב איטי, עם מינימום הסחות",
              "גם מגע עדין כדרך הרגעה",
            ]} />
          </div>

          <InfoBox title="׳אלגוריתם׳ קצר כשמתחילה הסלמה" variant="warning">
            <div className="space-y-3">
              <p className="font-semibold">1. לעצור → לנשום → להוריד טון/קצב</p>
              <p className="font-semibold">2. לבדוק צורך בסיסי:</p>
              <BulletList items={[
                "שירותים? רעב? כאב? חום/קור? עייפות?",
              ]} />
              <p className="font-semibold">3. להסיט בעדינות לפעילות קצרה/חושית:</p>
              <BulletList items={[
                "מים קרים, מוזיקה, טיול קצר בבית",
              ]} />
              <p className="font-semibold">4. אם יש סכנה (אלימות/נפילה/בריחה מהבית):</p>
              <p>בטיחות קודם, אחר כך שיחה.</p>
            </div>
          </InfoBox>

          <InfoBox title="מבוסס על" variant="tip">
            <p>National Institute on Aging ממליץ על הימנעות מוויכוח, הרגעה, ושימוש בתיקוף רגשי. Alzheimer's Association מדגישים שיחה אחד-על-אחד בסביבה שקטה.</p>
          </InfoBox>
        </div>
      );

    case "3.3":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">ניהול התנהגויות מאתגרות (BPSD)</h3>

          <InfoBox title="עיקרון מבוסס-הנחיות" variant="info">
            <p>מתחילים בהתערבויות לא-תרופתיות ומנסים להבין טריגרים. טיפול תרופתי רק אם יש סכנה מיידית.</p>
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3">א. איתור טריגרים בשיטת ABC:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-right font-bold">מרכיב</th>
                    <th className="border p-2 text-right">הסבר</th>
                    <th className="border p-2 text-right">דוגמאות</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-semibold">A – Antecedent</td>
                    <td className="border p-2">מה היה לפני?</td>
                    <td className="border p-2">רעש חזק, אורח, שינוי שגרה</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-semibold">B – Behavior</td>
                    <td className="border p-2">מה ההתנהגות?</td>
                    <td className="border p-2">צעקות, נדודים, הכאה, סירוב רחצה</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-semibold">C – Consequence</td>
                    <td className="border p-2">מה קרה אחרי?</td>
                    <td className="border p-2">קיבל תשומת לב, הפסיקו פעולה, יצא מהבית</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-2">המטרה: למצוא דפוס ולמנוע אותו מראש. למשל: ״כל יום ב-18:00 מתחיל אי-שקט → נכניס פעילות קבועה + תאורה + נשנוש קל לפני.״</p>
          </div>

          <div className="space-y-4">
            <InfoBox title="ב. נדודים (Wandering)" variant="warning">
              <p className="mb-2">נדודים שכיחים ועלולים להיות מסוכנים. ההמלצות כוללות מניעה סביבתית + פעילות יומית מובנית.</p>
              <BulletList items={[
                "׳ביטוח בית׳: מנעולים גבוהים, שערון בדלת, פעמון, תאורה במסדרון",
                "איתור GPS בהתאם ליכולת ולחוקיות",
                "פעילות מובנית בשעות ה״מועדות״ במיוחד אם יש סאנדאונינג",
              ]} />
            </InfoBox>

            <InfoBox title="ג. תוקפנות / אי-שקט" variant="warning">
              <p className="mb-2">הנחת יסוד: זו לרוב תקשורת של מצוקה.</p>
              <BulletList items={[
                "להפחית גירוי: פחות אנשים בחדר, פחות רעש, אור רך",
                "׳הסטה׳ לפעילות קצרה: לשתות, ללכת 2 דקות, לשים מוזיקה מוכרת",
                "לעצור את המשימה (למשל רחצה) ולחזור אליה מאוחר יותר",
                "לבדוק כאב/עצירות/זיהום/תופעת תרופות – טריגרים שכיחים",
              ]} />

              <InfoBox title="📖 מדריכים יישומיים להתמודדות יומיומית בדמנציה" variant="tip">
                <div className="space-y-2">
                  <a href="https://ronithantis.github.io/Bathing-Guide-/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-medium hover:underline">
                    📘 מדריך רחצה — התמודדות עם סירוב והתאמות לדמנציה ←
                  </a>
                  <a href="https://ronithantis.github.io/Feeding-Guide/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-medium hover:underline">
                    📘 מדריך האכלה — טכניקות בטוחות לאדם עם דמנציה ←
                  </a>
                  <a href="/guides/diaper-change.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-medium hover:underline">
                    📘 מדריך החלפת חיתול (PDF) ←
                  </a>
                  <a href="/guides/diaper-change-interactive.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-medium hover:underline">
                    📖 מדריך החלפת חיתול — אינטראקטיבי (אקורדיון) ←
                  </a>
                </div>
              </InfoBox>
            </InfoBox>

            <InfoBox title="ד. הזיות / אשליות" variant="warning">
              <BulletList items={[
                "׳אמת טיפולית׳ עדינה: לא להיכנס לעימות, לא ׳להוכיח׳",
                "לאשר את הרגש (׳זה נשמע מפחיד׳), להרגיע",
                "לבדוק גורמים חושיים: תאורה/צללים, משקפיים, מכשיר שמיעה",
                "מטרת המשפחה: להרגיע, לא להוכיח",
              ]} />
            </InfoBox>

            <InfoBox title="ה. Sundowning (החמרה בערב)" variant="warning">
              <BulletList items={[
                "שגרת ערב קבועה: ארוחה קלה, מוזיקה שקטה, פעילות רגועה",
                "תאורה טובה לפני החשכה, סגירת וילונות למניעת השתקפויות",
                "להימנע ממקפאין/גירוי חד בערב",
                "לזכור שלעיתים זו תגובה לצורך: רעב/כאב/שירותים + עייפות + תאורה לא טובה",
              ]} />
            </InfoBox>
          </div>
        </div>
      );

    case "3.4":
      return (
        <div className="space-y-6 text-foreground">
          <h3 className="text-xl font-bold">פעילויות ושימור איכות חיים</h3>

          <InfoBox title="עקרונות בחירה" variant="info">
            <BulletList items={[
              "קצר ומצליח: 5–15 דקות, סיום בתחושת הצלחה",
              "פחות מבחנים, יותר חוויה: לא ׳לבחון זיכרון׳ אלא לעורר מעורבות",
              "משמעות אישית: תחביבים מהעבר, מוזיקה מוכרת, נושאים אהובים",
              "בטיחות = כושר: בעדינות, עם השגחה, שיווי משקל/כוח לפי צורך",
            ]} />
          </InfoBox>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              בנק פעילויות מדורג – כושר וקוגניציה
            </h4>
            <p className="text-sm mb-3">ארגון הבריאות העולמי (WHO) ממליץ על 150–300 דקות פעילות אירובית שבועית למבוגרים, וכן פעילות רב-רכיבית לכוח ושיווי משקל למניעת נפילות. גם 10 דקות ביום מועילות בדמנציה.</p>
            
            <div className="grid gap-3 md:grid-cols-2">
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">1. הליכה מונחית בבית (״מסלול״)</h5>
                <p className="text-xs mb-1">5–10 דקות הליכה עם תחנות: ״שותה מים״, ״נוגע בחפץ״, ״יושב בכיסא״</p>
                <p className="text-xs text-muted-foreground">טוב ל: אירובי + קשב + תכנון</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">2. כוח רגליים (קימה-ישיבה)</h5>
                <p className="text-xs mb-1">1–3 סטים של 5–10 חזרות, כיסא יציב, נעליים סגורות</p>
                <p className="text-xs text-muted-foreground">טוב ל: מניעת נפילות + כוח</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">3. שיווי משקל ליד השיש</h5>
                <p className="text-xs mb-1">עמידה עם יד על משטח, העברת משקל, עקב-אצבע (בהשגחה)</p>
                <p className="text-xs text-muted-foreground">5–3 דקות, בהשגחה</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">4. ״ריקוד ישיבה״</h5>
                <p className="text-xs mb-1">פלייליסט מוכר, תנועות ידיים/כתפיים/מחיאות כף</p>
                <p className="text-xs text-muted-foreground">מפחיתה מתח, מעלה שיתוף פעולה, מעודדת תנועה</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              פעילויות קוגניטיביות
            </h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">5. ״קופסת זיכרונות״</h5>
                <p className="text-xs mb-1">קופסה עם 10–15 חפצים מהעבר: תמונות, מזכרות, כרטיסים</p>
                <p className="text-xs text-muted-foreground">מטרה: שפה, רגש, זהות – בלי לחץ ״לזכור נכון״</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">6. גירוי קוגניטיבי בסגנון CST</h5>
                <p className="text-xs mb-1">פעילות מובנית (10–20 דקות) סביב נושא: ״אוכל״, ״מזג אוויר״, ״מקומות בארץ״</p>
                <p className="text-xs text-muted-foreground">נמצאה כמועילה לקוגניציה ואיכות חיים בדמנציה קלה-בינונית</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">7. ״סיווג וחוקים״</h5>
                <p className="text-xs mb-1">כרטיסיות/חפצים: פירות-ירקות, בגדים, כלי מטבח – למיין לקבוצות</p>
                <p className="text-xs text-muted-foreground">תפקוד ניהולי בסיסי (מוקדם-בינוני)</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">8. משחקי ״אימון קשב״</h5>
                <p className="text-xs mb-1">למצוא 3 חפצים בצבע אדום, לספור יחד עד 10, להצביע על תמונות</p>
                <p className="text-xs text-muted-foreground">עיקרון: קצר, חד, בלי תסכול. בקצב איטי</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              פעילויות משמעותיות שמפחיתות BPSD
            </h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">9. משימות בית מוכרות</h5>
                <p className="text-xs">ערבוב סלט / סידור ירקות (בהשגחה), ניגוב שולחן, קיפול מגבות/גרביים</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">10. גינון / אדניות</h5>
                <p className="text-xs">השקיה, שתילה, קטיף נענע/בזיליקום. בונוס: פעילות בחוץ מפחיתה אי-שקט ומסייעת לשינה</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">11. ״יציאה קצרה עם מטרה״</h5>
                <p className="text-xs">5–20 דקות: ״להביא עיתון״, ״לראות את הפארק״, ״לשמוע ציפורים״. תמיד בליווי, לשקול תעודת זיהוי/צמיד</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Hand className="h-5 w-5 text-primary" />
              גירוי חושי והרגעה (למתקדם)
            </h4>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">12. טיפול ידיים</h5>
                <p className="text-xs">קרם ידיים, עיסוי קצר, מגבת חמה (לא מדי). מטרה: הרגעה, קשר, הפחתת אי-שקט</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">13. שקית מרקמים</h5>
                <p className="text-xs">Sensory bag: בד קטיפה, כדור לחץ רך, מברשת שיער, ספוג. גירוי עדין במקום חיטוט/שיטוט</p>
              </div>
              <div className="border rounded-lg p-3 bg-card">
                <h5 className="font-semibold text-sm mb-2">14. מוזיקה + תמונות אישיות</h5>
                <p className="text-xs">פלייליסט מוכר + תמונות. הנחיה: ״זה עושה לך נעים?״ ״איזו תמונה הכי אהובה?״ (לא ״מי זה?״)</p>
              </div>
            </div>
          </div>

          <InfoBox title="דגשי בטיחות חשובים" variant="warning">
            <BulletList items={[
              "בכל פעילות תנועה: נעליים סגורות, כיסא יציב, השגחה אם יש חוסר יציבות",
              "אם מופיעים כאב חדש, סחרחורת, קוצר נשימה, בלבול חריף – עוצרים ופונים לרופא",
              "בפעילות קוגניטיבית: ברגע שנוצר תסכול – עוברים לפעילות חושית/מוזיקה",
            ]} />
          </InfoBox>

          <InfoBox title="לו״ז שבועי מומלץ (מסגרת)" variant="tip">
            <div className="grid gap-2 text-sm">
              <div><span className="font-semibold">בוקר:</span> תנועה קצרה + פעילות קוגניטיבית + משימה משמעותית</div>
              <div><span className="font-semibold">צהריים:</span> מנוחה + ארוחה/שתייה + יציאה קצרה</div>
              <div><span className="font-semibold">אחה״צ:</span> מוזיקה/אומנות + קיפול/גינון</div>
              <div><span className="font-semibold">ערב:</span> תאורה טובה + פעילות רגועה + שגרה קבועה</div>
            </div>
          </InfoBox>
        </div>
      );

    default:
      return (
        <div>
          <p>תוכן מפורט עבור נושא זה יתווסף בקרוב.</p>
        </div>
      );
  }
};
