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
        <p className="lp-meta">עדכון אחרון: [תאריך] · גרסה 2.0</p>
      </header>

      <main className="lp-main">

        <div className="lp-privacy-badge">
          <span className="shield">🛡️</span>
          <p>אנו מכבדים את פרטיותך. מסמך זה מסביר בשקיפות מלאה אילו נתונים אנו אוספים, כיצד משתמשים בהם, ומה הזכויות שלך.</p>
        </div>

        <div className="lp-toc">
          <div className="lp-toc-title">תוכן העניינים</div>
          <ul>
            <li><a href="#p01"><span className="lp-toc-num">01</span> כללי ותחולה</a></li>
            <li><a href="#p02"><span className="lp-toc-num">02</span> המידע שאנו אוספים</a></li>
            <li><a href="#p03"><span className="lp-toc-num">03</span> מידע מקח-תן ומודעות</a></li>
            <li><a href="#p04"><span className="lp-toc-num">04</span> כיצד משתמשים במידע</a></li>
            <li><a href="#p05"><span className="lp-toc-num">05</span> AI ועיבוד תוכן</a></li>
            <li><a href="#p06"><span className="lp-toc-num">06</span> אחסון ואבטחה</a></li>
            <li><a href="#p07"><span className="lp-toc-num">07</span> שיתוף עם צדדים שלישיים</a></li>
            <li><a href="#p08"><span className="lp-toc-num">08</span> פרסומות</a></li>
            <li><a href="#p09"><span className="lp-toc-num">09</span> שמירת מידע</a></li>
            <li><a href="#p10"><span className="lp-toc-num">10</span> זכויותיך</a></li>
            <li><a href="#p11"><span className="lp-toc-num">11</span> עוגיות</a></li>
            <li><a href="#p12"><span className="lp-toc-num">12</span> שינויים במדיניות</a></li>
            <li><a href="#p13"><span className="lp-toc-num">13</span> יצירת קשר</a></li>
          </ul>
        </div>

        <section className="lp-section" id="p01">
          <div className="lp-section-number">סעיף 01</div>
          <h2>כללי ותחולה</h2>
          <p>מדיניות פרטיות זו חלה על כל שימוש באתר <strong>hub2care</strong> — מערכת לניהול הטיפול בקשיש.</p>
          <p>המפעיל: <strong>דוד חנציס ניהול והשקעות בע"מ</strong><br />
          דוא"ל: <a href="mailto:[כתובת@דואר.אל]" className="text-primary">[כתובת@דואר.אל]</a></p>
          <p>השימוש באתר מהווה הסכמה למדיניות זו.</p>
        </section>

        <section className="lp-section" id="p02">
          <div className="lp-section-number">סעיף 02</div>
          <h2>המידע שאנו אוספים</h2>
          <div className="lp-data-grid">
            <div className="lp-data-card">
              <div className="lp-card-title">📝 מידע שמוסר המשתמש</div>
              <ul>
                <li>פרטים אישיים: שם, ת"ז, תאריך לידה, כתובת, טלפון, דוא"ל</li>
                <li>מידע פיננסי: שכר, נכסים, חובות — לצרכי הכלים בלבד</li>
                <li>מידע משפחתי: יורשים, מינויים, קרובי משפחה</li>
                <li>מידע שפורסם בקח-תן: תיאורי פריטים, תמונות</li>
                <li>פרטי כניסה לחשבון אישי</li>
              </ul>
            </div>
            <div className="lp-data-card">
              <div className="lp-card-title">🔍 מידע הנאסף אוטומטית</div>
              <ul>
                <li>כתובת IP וסוג דפדפן</li>
                <li>סוג מכשיר ומערכת הפעלה</li>
                <li>דפים שנצפו, זמן שהייה, נתיבי ניווט</li>
                <li>עוגיות לצרכי פעילות תקינה</li>
                <li>נתוני שימוש אנונימיים לשיפור</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="lp-section" id="p03">
          <div className="lp-section-number">סעיף 03</div>
          <h2>מידע מקח-תן ומודעות משתמשים</h2>
          <ul>
            <li>תוכן המודעה <strong>גלוי לכלל משתמשי האתר</strong> ועשוי להופיע בתוצאות חיפוש.</li>
            <li><strong>אל תפרסם/י מידע אישי רגיש</strong> במודעות ציבוריות (ת"ז, פרטי בנק, כתובת מלאה).</li>
            <li>המפעיל רשאי להסיר תוכן לפי שיקול דעתו ללא הודעה מוקדמת.</li>
            <li>מידע שנמחק מהאתר עשוי להישאר במטמון מנועי חיפוש חיצוניים — אין למפעיל שליטה על כך.</li>
          </ul>
        </section>

        <section className="lp-section" id="p04">
          <div className="lp-section-number">סעיף 04</div>
          <h2>כיצד אנו משתמשים במידע</h2>
          <ul>
            <li><strong>הפעלת הכלים</strong> — המידע משמש אך ורק לצורך הפקת התוצר המבוקש.</li>
            <li><strong>הפעלת מדורי האתר</strong> — קח-תן, חיפוש שירותים, ניהול חשבון.</li>
            <li><strong>שיפור השירות</strong> — ניתוח אנונימי של דפוסי שימוש.</li>
            <li><strong>תקשורת</strong> — עדכונים, תשובות לפניות (רק אם נרשמת).</li>
            <li><strong>אבטחה</strong> — זיהוי פעילות חריגה, מניעת הונאה.</li>
            <li><strong>ציות לחוק</strong> — במידה ונדרש על פי דין ישראלי.</li>
          </ul>
          <div className="lp-highlight">
            <p>אנו לא מוכרים מידע אישי. לעולם לא.</p>
          </div>
        </section>

        <section className="lp-section" id="p05">
          <div className="lp-section-number">סעיף 05</div>
          <h2>AI ועיבוד תוכן</h2>
          <p>חלק מהתכנים באתר <strong>נוצרו בסיוע טכנולוגיות AI</strong>. לצורך יצירת תכנים אלה, לא נעשה שימוש בנתונים אישיים של משתמשים.</p>
          <p>כאשר משתמש/ת מזין/ה מידע לכלי, המידע מעובד לצורך יצירת הפלט המבוקש בלבד ואינו נשמר לצרכי אימון מודלי AI.</p>
        </section>

        <section className="lp-section" id="p06">
          <div className="lp-section-number">סעיף 06</div>
          <h2>אחסון ואבטחת מידע</h2>
          <div className="lp-highlight">
            <p>מסמכים שנוצרו בכלים האתר אינם נשמרים בשרתינו לאחר סיום הסשן — אלא אם נרשמת לחשבון אישי.</p>
          </div>
          <ul>
            <li>המידע מוגן באמצעות הצפנת SSL ומדיניות גישה מוגבלת לצוות.</li>
            <li>גישה למידע אישי מוגבלת לעובדים שזקוקים לו לצורך תפקידם בלבד.</li>
            <li>אנו מיישמים נהלי אבטחה סבירים — אך <strong>אין מערכת מאובטחת לחלוטין</strong>.</li>
            <li>במקרה של פרצת אבטחה מהותית — נודיע לך בהתאם לדרישות הדין.</li>
          </ul>
        </section>

        <section className="lp-section" id="p07">
          <div className="lp-section-number">סעיף 07</div>
          <h2>שיתוף מידע עם צדדים שלישיים</h2>
          <p>אנו <strong>לא מוכרים ולא מעבירים</strong> מידע אישי לצדדים שלישיים, למעט:</p>
          <ul>
            <li><strong>ספקי שירות טכניים</strong> — אחסון, אנליטיקס, דוא"ל — המחויבים בהסכמי סודיות.</li>
            <li><strong>דרישה חוקית</strong> — צו בית משפט או רשות מוסמכת.</li>
            <li><strong>הגנה על זכויות</strong> — במקרה של הפרת תנאי שימוש חמורה.</li>
            <li><strong>העברת עסק</strong> — במקרה של מיזוג/רכישה. המשתמשים יקבלו הודעה מראש.</li>
          </ul>
        </section>

        <section className="lp-section" id="p08">
          <div className="lp-section-number">סעיף 08</div>
          <h2>פרסומות</h2>
          <div className="lp-future-box">
            🔮 <strong>שימוש עתידי:</strong> האתר עשוי לכלול בעתיד פרסומות של צדדים שלישיים.
          </div>
          <ul>
            <li>מפרסמים עשויים להשתמש בעוגיות להצגת פרסומות רלוונטיות — זהו תהליך סטנדרטי בתעשייה.</li>
            <li>אנו לא נשתף נתונים אישיים מזהים עם מפרסמים.</li>
            <li>ניתן לבטל פרסומות מותאמות דרך הגדרות הדפדפן.</li>
            <li>כשיופעל שירות הפרסומות, נעדכן מדיניות זו בהתאם.</li>
          </ul>
        </section>

        <section className="lp-section" id="p09">
          <div className="lp-section-number">סעיף 09</div>
          <h2>שמירת מידע</h2>
          <ul>
            <li><strong>משתמשים שאינם רשומים:</strong> מידע שהוזן לכלים אינו נשמר לאחר סיום הסשן.</li>
            <li><strong>משתמשים רשומים:</strong> המידע יישמר כל עוד החשבון פעיל + 3 שנים לאחר סגירתו.</li>
            <li><strong>מודעות קח-תן:</strong> יישמרו עד למחיקה על ידי המשתמש, או עד 12 חודשים מפרסום.</li>
            <li>ניתן לבקש מחיקת מידע בכל עת.</li>
          </ul>
        </section>

        <section className="lp-section" id="p10">
          <div className="lp-section-number">סעיף 10</div>
          <h2>זכויותיך</h2>
          <p>בהתאם לחוק הגנת הפרטיות הישראלי, התשמ"א-1981:</p>
          <div className="lp-rights-list">
            <div className="lp-right-item"><span className="lp-right-emoji">👁</span><div><span className="lp-right-title">עיון</span><span className="lp-right-desc">לעיין במידע הנשמר אודותיך</span></div></div>
            <div className="lp-right-item"><span className="lp-right-emoji">✏️</span><div><span className="lp-right-title">תיקון</span><span className="lp-right-desc">לדרוש תיקון מידע שגוי</span></div></div>
            <div className="lp-right-item"><span className="lp-right-emoji">🗑️</span><div><span className="lp-right-title">מחיקה</span><span className="lp-right-desc">לדרוש מחיקת המידע שלך</span></div></div>
            <div className="lp-right-item"><span className="lp-right-emoji">📭</span><div><span className="lp-right-title">ביטול דיוור</span><span className="lp-right-desc">להסרה מרשימות תפוצה</span></div></div>
            <div className="lp-right-item"><span className="lp-right-emoji">📤</span><div><span className="lp-right-title">ניידות</span><span className="lp-right-desc">לקבל עותק של המידע שלך</span></div></div>
            <div className="lp-right-item"><span className="lp-right-emoji">🚫</span><div><span className="lp-right-title">התנגדות</span><span className="lp-right-desc">להתנגד לעיבוד לצרכי שיווק</span></div></div>
          </div>
          <p>לפנייה: <a href="mailto:[כתובת@דואר.אל]" className="text-primary">📧 [כתובת@דואר.אל]</a> — נשתדל לענות תוך 14 ימי עסקים.</p>
        </section>

        <section className="lp-section" id="p11">
          <div className="lp-section-number">סעיף 11</div>
          <h2>עוגיות (Cookies)</h2>
          <table className="lp-cookie-table">
            <thead><tr><th>סוג</th><th>מטרה</th><th>תקופה</th></tr></thead>
            <tbody>
              <tr><td><strong>הכרחיות</strong></td><td>פעילות תקינה, זכירת אישור תנאים, סשן משתמש</td><td>90 יום</td></tr>
              <tr><td><strong>ניתוח</strong></td><td>Google Analytics — ניתוח שימוש אנונימי בלבד</td><td>עד 2 שנים</td></tr>
              <tr><td><strong>העדפות</strong></td><td>זכירת שפה, הגדרות תצוגה</td><td>שנה</td></tr>
              <tr><td><strong>פרסום 🔮</strong></td><td>פרסומות מותאמות — בשימוש עתידי בלבד</td><td>—</td></tr>
            </tbody>
          </table>
          <p>ניתן לבטל עוגיות בהגדרות הדפדפן.</p>
        </section>

        <section className="lp-section" id="p12">
          <div className="lp-section-number">סעיף 12</div>
          <h2>שינויים במדיניות</h2>
          <p>אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר 7 ימים לפני כניסתם לתוקף. משתמשים רשומים יקבלו הודעה בדוא"ל.</p>
        </section>

        <section className="lp-section" id="p13">
          <div className="lp-section-number">סעיף 13</div>
          <h2>יצירת קשר</h2>
          <p>לפניות בנושא פרטיות ובקשות מחיקה:</p>
          <p>📧 <a href="mailto:[כתובת@דואר.אל]" className="text-primary">[כתובת@דואר.אל]</a></p>
          <p style={{fontSize: '13.5px'}} className="text-muted-foreground">
            רשות הגנת הפרטיות: <a href="https://www.gov.il/he/departments/the_privacy_protection_authority" target="_blank" rel="noopener" className="text-primary">gov.il/privacy</a>
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
