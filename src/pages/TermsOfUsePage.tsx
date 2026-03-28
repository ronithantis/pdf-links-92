import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../legal-pages.css';

export default function TermsOfUsePage() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100;
      if (progressRef.current) progressRef.current.style.width = scrolled + '%';
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="legal-page">
      <div className="lp-progress" ref={progressRef} />

      <header className="lp-header">
        <h1>תנאי שימוש</h1>
        <p className="lp-meta">עדכון אחרון: [תאריך] · גרסה 2.0</p>
      </header>

      <main className="lp-main">

        <div className="lp-warning-box">
          <span className="lp-warning-icon">⚠️</span>
          <p>האתר אינו מספק ייעוץ מקצועי מכל סוג. האתר אינו צד בעסקאות בין משתמשים. יש לפנות לאיש מקצוע לפני כל פעולה משפטית, פיננסית או רפואית.</p>
        </div>

        <div className="lp-toc">
          <div className="lp-toc-title">תוכן העניינים</div>
          <ul>
            <li><a href="#s01"><span className="lp-toc-num">01</span> כללי ומבוא</a></li>
            <li><a href="#s02"><span className="lp-toc-num">02</span> מידע, כלים ותוכן AI</a></li>
            <li><a href="#s03"><span className="lp-toc-num">03</span> פלטפורמת שירותים</a></li>
            <li><a href="#s04"><span className="lp-toc-num">04</span> קח-תן — מודעות משתמשים</a></li>
            <li><a href="#s05"><span className="lp-toc-num">05</span> תוכן שמייצרים משתמשים</a></li>
            <li><a href="#s06"><span className="lp-toc-num">06</span> רישום חשבון ואחריות המשתמש</a></li>
            <li><a href="#s07"><span className="lp-toc-num">07</span> פרסומות וצדדים שלישיים</a></li>
            <li><a href="#s08"><span className="lp-toc-num">08</span> עובד זר</a></li>
            <li><a href="#s09"><span className="lp-toc-num">09</span> הגבלת אחריות כספית</a></li>
            <li><a href="#s10"><span className="lp-toc-num">10</span> זמינות האתר</a></li>
            <li><a href="#s11"><span className="lp-toc-num">11</span> קניין רוחני</a></li>
            <li><a href="#s12"><span className="lp-toc-num">12</span> שינויים בתנאים</a></li>
            <li><a href="#s13"><span className="lp-toc-num">13</span> שיפוט וסמכות</a></li>
            <li><a href="#s14"><span className="lp-toc-num">14</span> יצירת קשר</a></li>
          </ul>
        </div>

        <section className="lp-section" id="s01">
          <div className="lp-section-number">סעיף 01</div>
          <h2>כללי ומבוא</h2>
          <p>ברוכים הבאים ל־<strong>hub2care</strong> — מערכת לניהול הטיפול בקשיש. האתר מופעל על ידי <strong>דוד חנציס ניהול והשקעות בע"מ</strong> (להלן: "המפעיל").</p>
          <p>השימוש באתר מהווה הסכמה מלאה לתנאי שימוש אלה. אם אינך מסכים/ה — אנא הפסק/י את השימוש.</p>
          <p>תנאים אלה מנוסחים בשפה ברורה וידידותית ככל האפשר, אך הם מחייבים מבחינה משפטית.</p>
        </section>

        <section className="lp-section" id="s02">
          <div className="lp-section-number">סעיף 02</div>
          <h2>מידע, כלים ותוכן בסיוע AI</h2>
          <div className="lp-highlight">
            <p>האתר מספק מידע וכלים דיגיטליים לצרכי למידה ושימוש עצמי בלבד. אין לראות בתכני האתר כתחליף לייעוץ מקצועי מוסמך.</p>
          </div>
          <p>חלק מהתכנים באתר — מאמרים, הסברים, מדריכים — <strong>נוצרו בסיוע טכנולוגיות AI</strong>. תכנים אלה עברו עריכה, אך ייתכנו אי-דיוקים. השימוש בכל מידע באתר הוא על אחריות המשתמש/ת, ומומלץ לאמת מידע מקצועי מול מקורות ראשוניים או איש מקצוע.</p>
          <ul>
            <li>כל מסמך שמופק דרך האתר — צוואה, ייפוי כוח, הסכם וכדומה — הוא <strong>טיוטה לצרכי מידע בלבד</strong>, ואינו תקף משפטית ללא בדיקת עורך/ת דין.</li>
            <li>מחשבוני שכר ותנאי עבודה הם לצרכי הערכה בלבד ואינם חוות דעת חשבונאית או משפטית.</li>
            <li>חוקי ירושה, ייפוי כוח מתמשך ודיני עבודה בישראל מחייבים עמידה בדרישות פורמליות קפדניות — <strong>אל תסתמך/י על הכלים שלנו ללא בדיקה עצמאית.</strong></li>
            <li>המפעיל אינו אחראי לכל נזק, הפסד או תוצאה שנגרמו מהסתמכות על תכני האתר.</li>
          </ul>
          <p style={{marginTop: '16px', fontWeight: 600}}>הכלים הקיימים באתר:</p>
          <div className="lp-tool-card"><span className="lp-tool-label">מחשבוני שכר</span><span className="lp-tool-desc">הערכה בלבד — לא חוות דעת מקצועית.</span></div>
          <div className="lp-tool-card"><span className="lp-tool-label">טיוטת צוואה</span><span className="lp-tool-desc">אינה תחליף לצוואה ערוכה כדין בפני עורך/ת דין או נוטריון.</span></div>
          <div className="lp-tool-card"><span className="lp-tool-label">טיוטת ייפוי כוח</span><span className="lp-tool-desc">ייפוי כוח מתמשך מחייב עריכה בפני עורך/ת דין ורישום אצל האפוטרופוס הכללי.</span></div>
          <div className="lp-tool-card"><span className="lp-tool-label">כלי מידע משפטי</span><span className="lp-tool-desc">הסבר כללי בלבד — לא ייעוץ.</span></div>
        </section>

        <section className="lp-section" id="s03">
          <div className="lp-section-number">סעיף 03</div>
          <h2>פלטפורמת שירותים — האתר כמתווך בלבד</h2>
          <div className="lp-highlight">
            <p>hub2care היא פלטפורמה טכנולוגית בלבד. המפעיל אינו סוכנות, אינו מתווך, ואינו ממליץ על נותני שירות כלשהם.</p>
          </div>
          <ul>
            <li><strong>המפעיל אינו צד</strong> לשום הסכם, עסקה או התקשרות בין משתמשים לנותני שירות.</li>
            <li>המפעיל <strong>אינו בודק, מאמת, או מעניק תעודת כשירות</strong> לנותני שירות. כישורים, רישיונות, ביטוחים ורקע — באחריות המשתמש לבדוק.</li>
            <li>המפעיל <strong>אינו אחראי</strong> לאיכות השירות, נזקים, תאונות, גניבות, רשלנות, או כל עניין הנובע מהתקשרות עם נותן שירות שנמצא דרך האתר.</li>
            <li>על המשתמש לבצע <strong>בדיקת נאותות מלאה</strong> לפני כל התקשרות — לרבות בדיקת ביטוח, הסכמה בכתב, ואימות זהות.</li>
            <li>נותן שירות המפרסם באתר מצהיר כי הוא בעל הכישורים, הרישיונות והביטוחים הנדרשים על פי דין.</li>
          </ul>
        </section>

        <section className="lp-section" id="s04">
          <div className="lp-section-number">סעיף 04</div>
          <h2>קח-תן — מודעות משתמשים</h2>
          <ul>
            <li><strong>המפעיל אינו צד</strong> לעסקאות בין משתמשים.</li>
            <li>המפעיל <strong>אינו אחראי</strong> לאמיתות, מצב, בטיחות, תקינות, בעלות חוקית, או כל היבט אחר של פריטים המפורסמים.</li>
            <li><strong>חל איסור מוחלט</strong> על פרסום: פריטים גנובים, נשק, תרופות מרשם, חומרים מסוכנים, פריטים הדורשים רישיון, תוכן פורנוגרפי, או כל פריט שמסירתו אסורה על פי חוק.</li>
            <li>המשתמש <strong>אחראי לבדוק</strong> פריטים לפני קבלתם — בטיחות, תקינות, והתאמה לשימוש.</li>
            <li>כל מחלוקת בין משתמשים תוסדר ישירות ביניהם. המפעיל אינו חייב להתערב.</li>
            <li>המפעיל רשאי להסיר מודעה לפי שיקול דעתו, ללא הודעה מוקדמת.</li>
          </ul>
        </section>

        <section className="lp-section" id="s05">
          <div className="lp-section-number">סעיף 05</div>
          <h2>תוכן שמייצרים משתמשים</h2>
          <p>בפרסום כל תוכן באתר — מודעה, תגובה, תמונה, ביקורת — המשתמש מצהיר ומתחייב כי:</p>
          <ul>
            <li>התוכן נכון, מדויק, ואינו מטעה.</li>
            <li>אין בתוכן הפרת זכויות יוצרים, סימן מסחרי, פרטיות, או כל זכות של צד שלישי.</li>
            <li>אין בתוכן לשון הרע, הסתה, גזענות, תוכן מיני, פגיעה בפרטיות, או תוכן אסור על פי דין.</li>
            <li>המפעיל רשאי להסיר כל תוכן לפי שיקול דעתו, ללא הודעה מוקדמת וללא חבות.</li>
            <li>בפרסום תוכן, המשתמש מעניק למפעיל רישיון חינמי, לא בלעדי, להציג את התוכן באתר.</li>
          </ul>
        </section>

        <section className="lp-section" id="s06">
          <div className="lp-section-number">סעיף 06</div>
          <h2>רישום חשבון ואחריות המשתמש</h2>
          <ul>
            <li>המשתמש מתחייב למסור פרטים נכונים ומדויקים בעת ההרשמה.</li>
            <li>שמירת הסיסמה וסודיות פרטי הגישה היא <strong>באחריות המשתמש בלבד</strong>.</li>
            <li>בגילוי חשש לפריצה לחשבון — יש לדווח למפעיל מיידית.</li>
            <li>חל איסור על: פרסום מידע שקרי, התחזות, ניסיון לפרוץ למערכות, שימוש בבוטים, הפצת ספאם.</li>
            <li>השימוש באתר הוא <strong>אישי בלבד</strong> ואינו ניתן להעברה.</li>
            <li>המפעיל רשאי לחסום חשבון שהפר תנאי שימוש, ללא התראה מוקדמת.</li>
            <li>על המשתמש להיות בן/בת 18 לפחות לשימוש בכלים המשפטיים.</li>
          </ul>
        </section>

        <section className="lp-section" id="s07">
          <div className="lp-section-number">סעיף 07</div>
          <h2>פרסומות וקישורים לצדדים שלישיים</h2>
          <div className="lp-future-box">
            🔮 <strong>שימוש עתידי:</strong> האתר עשוי לכלול בעתיד פרסומות של צדדים שלישיים.
          </div>
          <ul>
            <li>פרסומות שיופיעו באתר הן של <strong>צדדים שלישיים בלבד</strong> ואינן מהוות המלצה או אחריות של המפעיל.</li>
            <li>המפעיל <strong>אינו אחראי</strong> לתוכן הפרסומות, למוצרים, לשירותים, או לכל נזק שנגרם משימוש בהם.</li>
            <li>קישורים לאתרים חיצוניים — המפעיל אינו אחראי לתוכנם, מדיניות פרטיות, או פעולותיהם.</li>
            <li>כל עסקה עם מפרסם נעשית ישירות מול המפרסם בלבד.</li>
          </ul>
        </section>

        <section className="lp-section" id="s08">
          <div className="lp-section-number">סעיף 08</div>
          <h2>עובד זר — חיפוש ומידע</h2>
          <div className="lp-future-box">
            🔮 <strong>שימוש עתידי:</strong> האתר עתיד לכלול כלי לחיפוש עובד/ת זר/ה.
          </div>
          <ul>
            <li>hub2care <strong>אינה חברת השמה</strong> ואינה מורשית כסוכנות העסקה לעובדים זרים על פי חוק עובדים זרים, תשנ"א-1991.</li>
            <li>האתר יספק <strong>פלטפורמת חיפוש בלבד</strong> — המפעיל אינו צד להעסקה.</li>
            <li>על <strong>המעסיק בלבד</strong> מוטלת האחריות לעמידה בכל דיני העסקת עובדים זרים: אשרות, ביטוח, שכר, מגורים.</li>
            <li>המפעיל <strong>אינו בודק</strong> את חוקיות שהיית עובד/ת כלשהו/י.</li>
            <li>המפעיל אינו אחראי לנזקים הנובעים מהעסקת עובד/ת שנמצא/ה דרך האתר.</li>
          </ul>
        </section>

        <section className="lp-section" id="s09">
          <div className="lp-section-number">סעיף 09</div>
          <h2>הגבלת אחריות כספית</h2>
          <p>בכל מקרה לא תעלה אחריות המפעיל על הסכום ששולם בפועל על ידי המשתמש עבור השירות הספציפי. <strong>שירות חינמי = אפס אחריות כספית.</strong></p>
          <p>המפעיל לא יישא בנזקים עקיפים, תוצאתיים, מיוחדים, עונשיים, אקראיים, אובדן רווח, או אובדן מידע — בין אם הוזהר מפניהם ובין אם לאו.</p>
        </section>

        <section className="lp-section" id="s10">
          <div className="lp-section-number">סעיף 10</div>
          <h2>זמינות האתר ורציפות השירות</h2>
          <ul>
            <li>המפעיל <strong>אינו מתחייב</strong> לזמינות רציפה, ללא תקלות, או ל-24/7.</li>
            <li>האתר עשוי לרדת לתחזוקה מדי פעם, ללא הודעה מוקדמת.</li>
            <li>המפעיל רשאי לשנות, להגביל, להשהות, או להפסיק שירות כלשהו בכל עת.</li>
            <li>המפעיל אינו אחראי לנזקים שנגרמו עקב הפסקת שירות או תקלה טכנית.</li>
          </ul>
        </section>

        <section className="lp-section" id="s11">
          <div className="lp-section-number">סעיף 11</div>
          <h2>קניין רוחני</h2>
          <p>כל תכני האתר — עיצוב, טקסטים, לוגו, כלים, מסמכים, ממשק משתמש — שייכים למפעיל ומוגנים בזכויות יוצרים.</p>
          <p>אין להעתיק, לשכפל, לפרסם, להפיץ, לתרגם, לבצע הנדסה לאחור, או לעשות שימוש מסחרי בכל חלק מהאתר — ללא אישור מפורש ובכתב.</p>
        </section>

        <section className="lp-section" id="s12">
          <div className="lp-section-number">סעיף 12</div>
          <h2>שינויים בתנאים</h2>
          <p>המפעיל רשאי לעדכן תנאים אלה בכל עת. שינויים מהותיים יפורסמו באתר ויכנסו לתוקף 7 ימים לאחר פרסומם. המשך שימוש = הסכמה לתנאים המעודכנים.</p>
        </section>

        <section className="lp-section" id="s13">
          <div className="lp-section-number">סעיף 13</div>
          <h2>שיפוט וסמכות</h2>
          <p>על תנאים אלה יחול הדין הישראלי בלבד. סמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים במחוז <strong>[מחוז]</strong>.</p>
        </section>

        <section className="lp-section" id="s14">
          <div className="lp-section-number">סעיף 14</div>
          <h2>יצירת קשר</h2>
          <p>שאלות, פניות, דיווח על תוכן פוגעני:</p>
          <p>📧 <a href="mailto:[כתובת@דואר.אל]" className="text-primary">[כתובת@דואר.אל]</a></p>
        </section>

      </main>

      <footer className="lp-footer">
        <p>hub2care · <Link to="/terms">תנאי שימוש</Link> · <Link to="/privacy">מדיניות פרטיות</Link></p>
        <p style={{marginTop: '8px'}}>© 2025 דוד חנציס ניהול והשקעות בע"מ. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}
