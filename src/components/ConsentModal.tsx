import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_NAME = 'hub2care_terms_v3';

function getCookie(name: string): boolean {
  return document.cookie.split(';').some(c => c.trim().startsWith(name + '='));
}

function setCookie(name: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=1; expires=${d.toUTCString()}; path=/`;
}

export default function ConsentModal() {
  const [visible, setVisible] = useState(false);
  const [canCheck, setCanCheck] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getCookie(COOKIE_NAME)) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible || !scrollRef.current) return;
    const el = scrollRef.current;
    if (el.scrollHeight <= el.clientHeight + 5) {
      setCanCheck(true);
      setShowHint(false);
    }
  }, [visible]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 5) {
      setCanCheck(true);
      setShowHint(false);
    }
  };

  const handleConfirm = () => {
    if (!checked) return;
    setCookie(COOKIE_NAME, 90);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes consent-slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes consent-bounceArrow {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(4px); }
        }
        .consent-arrow { animation: consent-bounceArrow 1.2s infinite; display: inline-block; }
      `}</style>
      <div
        className="fixed inset-0 z-[9999] flex items-end justify-center backdrop-blur-sm"
        style={{ background: 'rgba(0,0,0,0.55)', direction: 'rtl' }}
      >
        <div
          className="w-full max-w-[600px] rounded-t-2xl bg-background p-7 pb-8 shadow-[0_-8px_40px_rgba(0,0,0,0.15)]"
          style={{ animation: 'consent-slideUp 0.35s ease' }}
        >
          <div className="text-xl font-bold text-foreground mb-3">
            חשוב לדעת: לפני שממשיכים - חשוב לדעת
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="max-h-52 overflow-y-auto border border-border rounded-lg p-4 text-sm text-muted-foreground leading-7 mb-2.5"
          >
            hub2care מספקת מידע, תכנים וכלים דיגיטליים לצורכי למידה, הכוונה כללית ושימוש עצמי בלבד.
            <br /><br />
            חלק מהתכנים והשירותים באתר נוצרו או פועלים בסיוע טכנולוגיות בינה מלאכותית (AI). מידע זה עשוי לכלול אי-דיוקים, השמטות או להיות בלתי מותאם לנסיבות האישיות של כל משתמש/ת, ולכן אינו מהווה תחליף לייעוץ משפטי, רפואי, סיעודי, פיננסי, ביטוחי, חשבונאי או מקצועי אחר.
            <br /><br />
            כל מסמך, טיוטה, תבנית, חישוב, סימולציה, שאלון, הכוונה או תוצר אחר המופק באמצעות האתר - לרבות צוואה, תיעוד רצונות, ייפוי כוח, מחשבונים, מדריכים או כלים להגשת תביעה - נועדו לצורכי מידע, הכנה והתרשמות בלבד, ואינם מהווים מסמך מחייב, ייעוץ מקצועי או תחליף לבדיקה פרטנית של איש מקצוע מוסמך.
            <br /><br />
            האתר משמש כפלטפורמה טכנולוגית בלבד. מפעיל האתר אינו צד לכל עסקה, התקשרות או הסכמה בין משתמשים לבין נותני שירות, ואינו אחראי לטיב השירותים, לאיכותם, לזמינותם או לתוצאותיהם.
            <br /><br />
            האתר משתמש גם בקובצי Cookies ובטכנולוגיות דומות לצורך תפעול תקין, אבטחה, שמירת העדפות, מדידה ושיפור חוויית השימוש, כמפורט במדיניות הפרטיות.
            <br /><br />
            סימון התיבה מהווה אישור לכך שקראת, הבנת והסכמת לתנאי השימוש ולמדיניות הפרטיות של hub2care.
          </div>

          {showHint && (
            <div className="text-center text-xs text-muted-foreground mb-3 flex items-center justify-center gap-1.5">
              <span className="consent-arrow">⬇</span> גלול/י לסוף כדי לאפשר אישור
            </div>
          )}

          {!showHint && (
            <p className="text-sm text-muted-foreground mb-2.5">
              אני מאשר/ת כי קראתי והבנתי את תנאי השימוש ואת מדיניות הפרטיות של hub2care, וכי ידוע לי שהאתר מספק מידע, תכנים וכלים דיגיטליים לצורכי למידה, הכוונה כללית ושימוש עצמי בלבד.
            </p>
          )}

          <div className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              className="w-[18px] h-[18px] accent-primary flex-shrink-0 mt-0.5 cursor-pointer"
              id="consent-cb"
              disabled={!canCheck}
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
            />
            <label htmlFor="consent-cb" className="text-sm leading-relaxed cursor-pointer text-foreground">
              אני מאשר/ת כי קראתי והבנתי את{' '}
              <Link to="/terms" target="_blank" className="text-primary underline">תנאי השימוש</Link>
              {' '}ואת{' '}
              <Link to="/privacy" target="_blank" className="text-primary underline">מדיניות הפרטיות</Link>
              {' '}של hub2care, וכי ידוע לי שהאתר מספק מידע, תכנים וכלים דיגיטליים לצורכי למידה, הכוונה כללית ושימוש עצמי בלבד.
            </label>
          </div>

          <button
            className="w-full p-3.5 bg-primary text-primary-foreground border-none rounded-lg text-base font-bold transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            onClick={handleConfirm}
            disabled={!checked}
          >
            אישור וכניסה לאתר ←
          </button>
        </div>
      </div>
    </>
  );
}
