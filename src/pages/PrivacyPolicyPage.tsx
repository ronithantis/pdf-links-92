import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../legal-pages.css';

export default function PrivacyPolicyPage() {
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
        <h1>מדיניות פרטיות</h1>
        <p className="lp-meta">עדכון אחרון: [תאריך] · גרסה [מספר גרסה]</p>
      </header>

      <main className="lp-main">

        <div className="lp-privacy-badge">
          <span className="shield">🛡️</span>
          <p>מדיניות פרטיות זו מסבירה כיצד hub2care אוסף, שומר, משתמש, מעבד ומשתף מידע במסגרת השימוש באתר, ביועץ החכם, בכלים הדיגיטליים, במסמכים, בטפסים, באזור האישי ובשירותים הנלווים.</p>
        </div>

        <div className="lp-toc">
          <div className="lp-toc-title">תוכן העניינים</div>
          <ul>
            <li><a href="#p01"><span className="lp-toc-num">01</span> כללי</a></li>
            <li><a href="#p02"><span className="lp-toc-num">02</span> המידע שאנו עשויים לאסוף</a></li>
            <li><a href="#p03"><span className="lp-toc-num">03</span> מקורות המידע</a></li>
            <li><a href="#p04"><span className="lp-toc-num">04</span> מטרות השימוש במידע</a></li>
            <li><a href="#p05"><span className="lp-toc-num">05</span> AI וספקי טכנולוגיה</a></li>
            <li><a href="#p06"><span className="lp-toc-num">06</span> שיתוף מידע עם צדדים שלישיים</a></li>
            <li><a href="#p07"><span className="lp-toc-num">07</span> העברת מידע מחוץ לישראל</a></li>
            <li><a href="#p08"><span className="lp-toc-num">08</span> שמירת מידע</a></li>
            <li><a href="#p09"><span className="lp-toc-num">09</span> אבטחת מידע</a></li>
            <li><a href="#p10"><span className="lp-toc-num">10</span> Cookies וטכנולוגיות דומות</a></li>
            <li><a href="#p11"><span className="lp-toc-num">11</span> מידע על אדם אחר</a></li>
            <li><a href="#p12"><span className="lp-toc-num">12</span> קטינים</a></li>
            <li><a href="#p13"><span className="lp-toc-num">13</span> דיוור והודעות</a></li>
            <li><a href="#p14"><span className="lp-toc-num">14</span> זכויות המשתמש/ת</a></li>
            <li><a href="#p15"><span className="lp-toc-num">15</span> שינויים במדיניות</a></li>
            <li><a href="#p16"><span className="lp-toc-num">16</span> יצירת קשר</a></li>
          </ul>
        </div>

        <section className="lp-section" id="p01">
          <div className="lp-section-number">סעיף 01</div>
          <h2>כללי</h2>
          <p>מדיניות פרטיות זו מסבירה כיצד <strong>hub2care</strong> אוסף, שומר, משתמש, מעבד ומשתף מידע במסגרת השימוש באתר, ביועץ החכם, בכלים הדיגיטליים, במסמכים, בטפסים, באזור האישי ובשירותים הנלווים.</p>
          <p>האתר מופעל על ידי <strong>דוד חנציס ניהול והשקעות בע"מ</strong>, ח.פ. [להשלים], כתובת: [להשלים], דוא"ל: <a href="mailto:[להשלים]" className="text-primary">[להשלים]</a> (להלן: "המפעיל" או "אנו").</p>
          <p>השימוש באתר מהווה הסכמה למדיניות פרטיות זו, ככל שהסכמה כאמור נדרשת לפי דין.</p>
        </section>

        <section className="lp-section" id="p02">
          <div className="lp-section-number">סעיף 02</div>
          <h2>המידע שאנו עשויים לאסוף</h2>
          <p>אנו עשויים לאסוף מידע שהמשתמש/ת מוסר/ת לנו ישירות, וכן מידע הנאסף אוטומטית בעת השימוש באתר.</p>
          <div className="lp-data-grid">
            <div className="lp-data-card">
              <div className="lp-card-title">📝 מידע שנמסר על ידי המשתמש/ת</div>
              <ul>
                <li>שם מלא, מספר טלפון, כתובת דוא"ל, כתובת, תאריך לידה</li>
                <li>מספר תעודת זהות, ככל שהוזן</li>
                <li>פרטי חשבון משתמש</li>
                <li>תוכן פניות, שאלות והודעות</li>
                <li>מידע שהוזן במסגרת שימוש ביועץ החכם</li>
                <li>מידע שהוזן לצורך הפקת מסמכים, טפסים, טיוטות או תוצרים</li>
                <li>מידע משפחתי, פיננסי ותעסוקתי</li>
                <li>תמונות, מסמכים, קבצים, מודעות ותוכן משתמשים</li>
              </ul>
            </div>
            <div className="lp-data-card">
              <div className="lp-card-title">⚕️ מידע רגיש</div>
              <ul>
                <li>מידע רפואי, תפקודי או סיעודי</li>
                <li>מידע על קשיש/ה או בן/בת משפחה</li>
                <li>מידע פיננסי</li>
                <li>מידע על ירושה, צוואה, ייפוי כוח, תביעות, זכויות, מצב אישי או משפחתי</li>
              </ul>
              <p style={{marginTop: '8px', fontSize: '13px'}}>הזנת מידע רגיש נעשית ביוזמת המשתמש/ת ועל אחריותו/ה.</p>
            </div>
            <div className="lp-data-card">
              <div className="lp-card-title">🔍 מידע טכני ואוטומטי</div>
              <ul>
                <li>כתובת IP, סוג דפדפן, סוג מכשיר, מערכת הפעלה, שפה</li>
                <li>עמודים שנצפו, נתיבי גלישה, זמני שימוש, פעולות שבוצעו</li>
                <li>לוגים טכניים</li>
                <li>עוגיות (Cookies) וטכנולוגיות דומות</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="lp-section" id="p03">
          <div className="lp-section-number">סעיף 03</div>
          <h2>מקורות המידע</h2>
          <p>המידע עשוי להיאסף:</p>
          <ul>
            <li>ישירות מהמשתמש/ת</li>
            <li>ממידע שמוזן על ידי המשתמש/ת ביחס לאדם אחר</li>
            <li>באופן אוטומטי במהלך השימוש באתר</li>
            <li>מספקי שירות או מצדדים שלישיים, ככל שהדבר נדרש להפעלת השירות או לפי דין</li>
          </ul>
          <p>אם המשתמש/ת מזין/ה מידע על אדם אחר, המשתמש/ת מצהיר/ה כי הוא/היא מוסמך/ת לעשות כן.</p>
        </section>

        <section className="lp-section" id="p04">
          <div className="lp-section-number">סעיף 04</div>
          <h2>מטרות השימוש במידע</h2>
          <ul>
            <li>הפעלת האתר והשירותים</li>
            <li>הפקת מסמכים, טיוטות ותוצרים לבקשת המשתמש/ת</li>
            <li>הפעלת היועץ החכם ושירותי AI</li>
            <li>ניהול חשבון משתמש</li>
            <li>מענה לפניות</li>
            <li>שיפור השירות וחוויית המשתמש</li>
            <li>אבטחת מידע, מניעת הונאה וזיהוי שימוש אסור</li>
            <li>ניתוח תפעולי, סטטיסטי ואנליטי</li>
            <li>עמידה בדרישות דין</li>
            <li>שליחת הודעות שירותיות, תפעוליות או שיווקיות, בכפוף לדין</li>
          </ul>
        </section>

        <section className="lp-section" id="p05">
          <div className="lp-section-number">סעיף 05</div>
          <h2>AI וספקי טכנולוגיה</h2>
          <p>חלק מן השירותים באתר עשויים להתבסס על ספקי טכנולוגיה חיצוניים, לרבות שירותי ענן, אחסון, אבטחה, אנליטיקה, דיוור או בינה מלאכותית.</p>
          <p>לצורך אספקת השירותים, ייתכן שמידע שהוזן באתר יעובד באמצעות ספקים כאמור, בהתאם לצורך התפעולי ובכפוף להסדרים מתאימים.</p>
          <p>אנו נוקטים מאמצים סבירים להתקשר עם ספקים המתחייבים לרמת אבטחה וסודיות נאותה. עם זאת, איננו יכולים להבטיח חסינות מוחלטת מפני סיכוני מידע.</p>
          <div className="lp-highlight">
            <p>ככלל, המידע שהוזן לכלים באתר אינו נמסר על ידינו לצורך אימון מודלי AI כלליים, אלא אם צוין אחרת במפורש או אם הדבר נדרש על פי תנאי ספק חיצוני, ובמקרה כזה נפעל לעדכן את המדיניות בהתאם ככל שיידרש.</p>
          </div>
        </section>

        <section className="lp-section" id="p06">
          <div className="lp-section-number">סעיף 06</div>
          <h2>שיתוף מידע עם צדדים שלישיים</h2>
          <div className="lp-highlight">
            <p>אנו לא מוכרים מידע אישי של משתמשים לצדדים שלישיים.</p>
          </div>
          <p>עם זאת, אנו עשויים לשתף מידע במקרים הבאים:</p>
          <ul>
            <li>עם ספקי שירות טכנולוגיים, תפעוליים, משפטיים, חשבונאיים, אנליטיים או שירותי AI</li>
            <li>כאשר הדבר נדרש לפי דין, צו שיפוטי או דרישת רשות מוסמכת</li>
            <li>לצורך הגנה על זכויותינו או על ביטחון המשתמשים</li>
            <li>במקרה של הפרת תנאי שימוש, חשד להונאה או שימוש אסור</li>
            <li>במסגרת מיזוג, מכירת פעילות, השקעה או שינוי מבני אחר, בכפוף לדין</li>
          </ul>
        </section>

        <section className="lp-section" id="p07">
          <div className="lp-section-number">סעיף 07</div>
          <h2>העברת מידע מחוץ לישראל</h2>
          <p>ייתכן שחלק מן המידע יעובד, יאוחסן או יועבר אל מחוץ לישראל, לרבות באמצעות ספקי ענן, אנליטיקה או AI.</p>
          <p>בשימוש באתר, המשתמש/ת מסכים/ה לכך שמידע עשוי להיות מועבר או נשמר מחוץ לישראל, בכפוף לאמצעים סבירים להגנת המידע.</p>
        </section>

        <section className="lp-section" id="p08">
          <div className="lp-section-number">סעיף 08</div>
          <h2>שמירת מידע</h2>
          <ul>
            <li>אנו שומרים מידע לפרק הזמן הנדרש לצורך אספקת השירותים, תפעול האתר, אבטחת מידע, עמידה בדרישות הדין, פתרון מחלוקות והגנה משפטית.</li>
            <li>מידע של משתמשים לא רשומים עשוי להימחק לאחר סיום הסשן או בתוך זמן סביר לאחריו, אלא אם נדרש אחרת.</li>
            <li>מידע של משתמשים רשומים עשוי להישמר כל עוד החשבון פעיל ובמשך תקופה נוספת סבירה לאחר סגירתו.</li>
            <li>מסמכים, טפסים, תוצרים ונתוני שימוש עשויים להישמר לצורכי שירות, גיבוי, בקרה, אבטחה והגנה משפטית.</li>
            <li>גם אם תוגש בקשת מחיקה, ייתכן שחלק מן המידע יישמר אם הדבר דרוש לפי דין, לצורך גיבוי, ניהול הליכים, מניעת הונאה, אכיפת זכויות או אינטרסים לגיטימיים אחרים.</li>
          </ul>
        </section>

        <section className="lp-section" id="p09">
          <div className="lp-section-number">סעיף 09</div>
          <h2>אבטחת מידע</h2>
          <p>אנו נוקטים אמצעי אבטחת מידע סבירים ומקובלים לצורך הגנה על המידע.</p>
          <div className="lp-highlight">
            <p>עם זאת, אין מערכת המאובטחת באופן מוחלט, ואיננו יכולים להבטיח חסינות מלאה מפני חדירה, גישה בלתי מורשית, אובדן מידע או אירועי סייבר.</p>
          </div>
        </section>

        <section className="lp-section" id="p10">
          <div className="lp-section-number">סעיף 10</div>
          <h2>Cookies וטכנולוגיות דומות</h2>
          <p>האתר משתמש או עשוי להשתמש בקובצי Cookies ובטכנולוגיות דומות לצורך:</p>
          <ul>
            <li>תפעול תקין של האתר</li>
            <li>אבטחה</li>
            <li>ניהול סשן והתחברות</li>
            <li>שמירת העדפות משתמש</li>
            <li>מדידת שימושים</li>
            <li>ניתוח תנועה באתר</li>
            <li>שיפור חוויית השימוש</li>
          </ul>
          <p>Cookies הם קבצים קטנים הנשמרים בדפדפן או במכשיר של המשתמש/ת. חלק מן העוגיות עשויות להיות עוגיות הכרחיות, עוגיות העדפה, עוגיות מדידה או עוגיות של צדדים שלישיים.</p>
          <p>חלק מן העוגיות עשויות להיות מוצבות על ידי צדדים שלישיים המספקים לנו שירותים, והשימוש בהן עשוי להיות כפוף גם למדיניות של אותם צדדים שלישיים.</p>
          <p>ניתן לשנות את הגדרות הדפדפן כך שיחסום עוגיות, כולן או חלקן, או יתריע לפני שמירתן. עם זאת, חסימה או מחיקה של Cookies עשויה לפגוע בתפקוד האתר או בחלק מן השירותים.</p>
          <p>ככל שבעתיד ייעשה שימוש בעוגיות לצורכי פרסום מותאם, רימרקטינג או שימושים לא הכרחיים נוספים, נהיה רשאים לעדכן מדיניות זו ולהוסיף מנגנוני הודעה או ניהול הסכמה בהתאם לדין.</p>
        </section>

        <section className="lp-section" id="p11">
          <div className="lp-section-number">סעיף 11</div>
          <h2>מידע על אדם אחר</h2>
          <p>האתר עשוי לשמש בני משפחה, מלווים או מטפלים המזינים מידע על קשיש/ה או על אדם אחר. במקרה כזה, האחריות לוודא כי קיימת הרשאה מתאימה למסירת המידע ולעיבודו חלה על המשתמש/ת המזין/ה.</p>
          <p>אנו ממליצים שלא להזין מידע אישי או רפואי רגיש מעבר לנדרש לצורך השימוש בכלי המסוים.</p>
        </section>

        <section className="lp-section" id="p12">
          <div className="lp-section-number">סעיף 12</div>
          <h2>קטינים</h2>
          <p>האתר אינו מיועד לקטינים לשימוש עצמאי בכלים רגישים, משפטיים או אחרים המחייבים שיקול דעת בוגר. אם המשתמש/ת מתחת לגיל 18, יש להשתמש באתר רק באמצעות הורה, אפוטרופוס או גורם מוסמך אחר ובכפוף לדין.</p>
        </section>

        <section className="lp-section" id="p13">
          <div className="lp-section-number">סעיף 13</div>
          <h2>דיוור והודעות</h2>
          <p>אנו עשויים לשלוח הודעות תפעוליות, הודעות שירות, הודעות אבטחה ועדכונים הקשורים לשירות, וכן דיוור שיווקי בכפוף לדין.</p>
          <p>ניתן לבקש הסרה מדיוור שיווקי בכל עת באמצעות קישור ההסרה או בפנייה אלינו.</p>
        </section>

        <section className="lp-section" id="p14">
          <div className="lp-section-number">סעיף 14</div>
          <h2>זכויות המשתמש/ת</h2>
          <p>בכפוף לדין החל, המשתמש/ת עשוי/ה להיות זכאי/ת:</p>
          <div className="lp-rights-list">
            <div className="lp-right-item"><span className="lp-right-emoji">👁</span><div><span className="lp-right-title">עיון</span><span className="lp-right-desc">לעיין במידע אישי הנשמר אודותיו/ה</span></div></div>
            <div className="lp-right-item"><span className="lp-right-emoji">✏️</span><div><span className="lp-right-title">תיקון</span><span className="lp-right-desc">לבקש תיקון של מידע שגוי</span></div></div>
            <div className="lp-right-item"><span className="lp-right-emoji">🗑️</span><div><span className="lp-right-title">מחיקה</span><span className="lp-right-desc">לבקש מחיקה של מידע, במקרים המתאימים</span></div></div>
            <div className="lp-right-item"><span className="lp-right-emoji">📭</span><div><span className="lp-right-title">הסרה מדיוור</span><span className="lp-right-desc">לבקש הסרה מדיוור שיווקי</span></div></div>
          </div>
          <p>פניות בנושא זה ניתן לשלוח לכתובת: <a href="mailto:[להשלים]" className="text-primary">[להשלים]</a></p>
          <p>אנו נבחן כל פנייה בהתאם לדין החל, אך ייתכן שלא נוכל להיעתר לכל בקשה, בין היתר כאשר קיימת חובה חוקית או אינטרס לגיטימי להמשיך ולעבד או לשמור את המידע.</p>
        </section>

        <section className="lp-section" id="p15">
          <div className="lp-section-number">סעיף 15</div>
          <h2>שינויים במדיניות</h2>
          <p>אנו רשאים לעדכן מדיניות פרטיות זו מעת לעת. הנוסח המעודכן יפורסם באתר וייכנס לתוקף במועד פרסומו או במועד אחר שייקבע בו.</p>
        </section>

        <section className="lp-section" id="p16">
          <div className="lp-section-number">סעיף 16</div>
          <h2>יצירת קשר</h2>
          <p>לשאלות, בירורים או בקשות בנושא פרטיות, ניתן לפנות אלינו:</p>
          <p>
            <strong>דוד חנציס ניהול והשקעות בע"מ</strong><br />
            ח.פ.: [להשלים]<br />
            כתובת: [להשלים]<br />
            דוא"ל: <a href="mailto:[להשלים]" className="text-primary">[להשלים]</a><br />
            טלפון: [להשלים]
          </p>
        </section>

      </main>

      <footer className="lp-footer">
        <p>hub2care · <Link to="/terms">תנאי שימוש</Link> · <Link to="/privacy">מדיניות פרטיות</Link></p>
        <p style={{marginTop: '8px'}}>© 2025 דוד חנציס ניהול והשקעות בע"מ. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}
