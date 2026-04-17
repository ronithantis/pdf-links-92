import { useState, useMemo, useEffect, ReactNode, ChangeEvent } from "react";
import { Info } from "lucide-react";

const K = {
  SAL: 6443.85, REST: 439.74, HI_CAP: 168.80, INCID: 94.34,
  FOOD: 0.10, CAP: 0.25, PEN: 0.065, SEV6: 0.06, NI: 0.036,
  HAV: 418, PS: 7,
  A: {
    jerusalem: { o: 254.31, r: 508.62, he: "ירושלים", en: "Jerusalem" },
    tel_aviv:  { o: 289.18, r: 578.36, he: "תל אביב", en: "Tel Aviv" },
    haifa:     { o: 192.81, r: 385.61, he: "חיפה והמרכז", en: "Haifa & Center" },
    north:     { o: 157.71, r: 315.41, he: "צפון", en: "North" },
    south:     { o: 171.40, r: 342.80, he: "דרום", en: "South" },
  } as Record<string, { o: number; r: number; he: string; en: string }>,
};

const f2 = (n: number) => `₪${Math.abs(n).toLocaleString("he-IL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fe = (n: number) => `₪${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function Tip({ text, children }: { text: string; children: ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      {children}
      <button
        type="button"
        onClick={() => setShow(!show)}
        onBlur={() => setShow(false)}
        className="bg-transparent border-none cursor-pointer text-muted-foreground mr-1 p-0.5 inline-flex"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {show && (
        <span className="absolute z-10 top-6 right-0 bg-foreground text-background text-xs rounded-md p-2 max-w-[220px] shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}

function NumIn({ label, value, onChange, sfx = "₪", tip, min }: {
  label: string; value: number; onChange: (v: number) => void; sfx?: string; tip?: string; min?: number;
}) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1.5 text-foreground">
        {tip ? <Tip text={tip}>{label}</Tip> : label}
      </label>
      <div className="flex items-center border-2 border-border rounded-xl bg-background overflow-hidden">
        <span className="px-3 text-muted-foreground text-sm">{sfx}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          className="flex-1 border-0 outline-none px-2.5 py-3 text-base font-semibold bg-transparent text-right text-foreground"
          dir="ltr"
        />
      </div>
    </div>
  );
}

function Tog({ label, value, onChange, tip }: {
  label: string; value: boolean; onChange: (v: boolean) => void; tip?: string;
}) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1.5 text-foreground">
        {tip ? <Tip text={tip}>{label}</Tip> : label}
      </label>
      <div className="flex gap-2">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => onChange(v)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${
              value === v
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground"
            }`}
          >
            {v ? "כן" : "לא"}
          </button>
        ))}
      </div>
    </div>
  );
}

function Card({ title, children, badge, sub }: {
  title?: string; children: ReactNode; badge?: string; sub?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 mb-4 shadow-sm">
      {title && (
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-foreground">{title}</h3>
          {badge && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{badge}</span>}
        </div>
      )}
      {sub && <p className="text-xs text-muted-foreground mb-3">{sub}</p>}
      {children}
    </div>
  );
}

interface DocItem {
  name: string; type: string; desc: string;
  date: string; dateEn: string; time: string; sz: string; mo: string;
}

export default function SalaryCalculator() {
  const [loaded, setLoaded] = useState(false);
  const [role, setRole] = useState<null | "emp" | "wrk">(null);
  const [scr, setScr] = useState("setup");
  const [wScr, setWScr] = useState("slip");
  const [sd, setSd] = useState("2026-04-01");
  const [area, setArea] = useState("haifa");
  const [owned, setOwned] = useState(true);
  const [food, setFood] = useState(false);
  const [sal, setSal] = useState(K.SAL);
  const [hiC, setHiC] = useState(337);
  const [incD, setIncD] = useState(true);
  const [rst, setRst] = useState(0);
  const [hol, setHol] = useState(0);
  const [sick, setSick] = useState(0);
  const [ulv, setUlv] = useState(0);
  const [pkt, setPkt] = useState(0);
  const [pktT, setPktT] = useState<"adv" | "bon">("adv");
  const [tax, setTax] = useState(0);
  const [uni, setUni] = useState(0);
  const [dbt, setDbt] = useState(0);
  const [vis, setVis] = useState(0);
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [wOk, setWOk] = useState(false);
  const [wTime, setWT] = useState<string | null>(null);
  const [otherDesc, setOtherDesc] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hub2care-data");
      if (raw) {
        const d = JSON.parse(raw);
        if (d.sd) setSd(d.sd);
        if (d.area) setArea(d.area);
        if (d.owned !== undefined) setOwned(d.owned);
        if (d.food !== undefined) setFood(d.food);
        if (d.sal) setSal(d.sal);
        if (d.hiC) setHiC(d.hiC);
        if (d.incD !== undefined) setIncD(d.incD);
        if (d.docs) setDocs(d.docs);
      }
    } catch { /* noop */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("hub2care-data", JSON.stringify({ sd, area, owned, food, sal, hiC, incD, docs }));
    } catch { /* noop */ }
  }, [loaded, sd, area, owned, food, sal, hiC, incD, docs]);

  const mHe = new Date().toLocaleDateString("he-IL", { month: "long", year: "numeric" });
  const mEn = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const mos = useMemo(() => {
    const s = new Date(sd), n = new Date();
    return Math.max(1, Math.floor((n.getTime() - s.getTime()) / (1000 * 60 * 60 * 24 * 30.44)));
  }, [sd]);
  const yrs = mos / 12;

  const cc = useMemo(() => {
    const s = Math.max(sal, K.SAL), d = s / 25;
    const rp = rst * K.REST, hp = hol * K.REST;
    let sd2 = 0;
    if (sick >= 1) sd2 += d;
    if (sick >= 2) sd2 += d * 0.5;
    if (sick >= 3) sd2 += d * 0.5;
    const ud = ulv * d, gr = s + rp + hp - sd2 - ud;
    const ar = K.A[area], hs = owned ? ar.o : ar.r;
    const he = Math.min(hiC / 2, K.HI_CAP);
    const ic = incD ? K.INCID : 0, fd = food ? s * K.FOOD : 0;
    const et = hs + he + ic + fd, ec = s * K.CAP, ev = Math.min(et, ec), cp = et > ec;
    const ex = tax + uni + dbt + vis;
    const adv = pktT === "adv" ? pkt : 0, bon = pktT === "bon" ? pkt : 0;
    const net = gr - ev - ex - adv + bon;
    const pn = mos >= K.PS ? s * K.PEN : 0;
    const sv = s * K.SEV6;
    const ni = s * K.NI;
    const aside = pn + sv;
    const vacPerYr = yrs <= 5 ? 14 : yrs <= 6 ? 16 : 18;
    const vacAccrued = Math.floor(vacPerYr * (mos / 12));
    const sickAccrued = Math.min(Math.floor(1.5 * mos), 90);
    const havYr = Math.ceil(yrs);
    const havDays = havYr <= 1 ? 5 : havYr <= 3 ? 6 : 7;
    const havAmount = mos >= 12 ? havDays * K.HAV : 0;
    return { s, d, gr, rp, hp, sd2, ud, hs, he, ic, fd, ev, cp, ex, adv, bon, net, pn, sv, ni, aside, vacAccrued, vacPerYr, sickAccrued, havDays, havAmount };
  }, [sal, area, owned, food, hiC, incD, rst, hol, sick, ulv, pkt, pktT, tax, uni, dbt, vis, mos, yrs]);

  const upld = (e: ChangeEvent<HTMLInputElement>, type: string, desc?: string) => {
    const fs = Array.from(e.target.files || []);
    setDocs((p) => [
      ...fs.map((f) => ({
        name: f.name, type, desc: desc || "",
        date: new Date().toLocaleDateString("he-IL"),
        dateEn: new Date().toLocaleDateString("en-US"),
        time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
        sz: (f.size / 1024).toFixed(0) + "KB",
        mo: mHe,
      })),
      ...p,
    ]);
  };

  // ========== LANDING ==========
  if (!role) {
    return (
      <div className="container max-w-2xl py-8" dir="rtl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-3">Hub2Care</h1>
          <p className="text-lg text-foreground mb-4 whitespace-pre-line">
            כלי לחישוב שכר חודשי, תשלומים והוצאות{"\n"}
            העסקת עובד זר לתקופת ההעסקה,{"\n"}
            כולל חישוב גמר חשבון
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            המידע המוצג בכלי זה, לרבות הסכומים הכלולים בו, לקוח מפרסומים רשמיים ומיועד לשמש כעזר לחישוב שכר ומעקב אחר תשלומים בלבד.
            אין באמור כדי להוות ייעוץ משפטי, חשבונאי או תחליף להתייעצות עם גורם מקצועי.
            על המעסיק לוודא עמידה בהוראות החוק ובנהלי הגופים המוסמכים.
          </p>
        </div>

        <Card title="למה להשתמש בכלי?">
          <ul className="space-y-2 text-sm text-foreground">
            {[
              "מחשב שכר נטו חודשי כולל ימי מנוחה, חגים ומחלה",
              "מנהל קופת גמר חשבון — פיצויים ופנסיה",
              "מתעד העברות בנקאיות ותשלומי מזומן עם אישור דיגיטלי",
              "מגן על המשפחה — אוכף תקרת 25%, איסור ניכוי ביט״ל",
              "ממשק עצמאי לעובד באנגלית — רכיבי שכר, העברות ויתרות",
            ].map((t, i) => (
              <li key={i}>· {t}</li>
            ))}
          </ul>
        </Card>

        <Card title="פרטיות ואבטחת מידע">
          <p className="text-sm text-muted-foreground">
            פועל בהתאם לתיקון 13 לחוק הגנת הפרטיות (התשפ"ה-2025). מיועד להעסקה ישירה בלבד. אינו מהווה ייעוץ משפטי.
          </p>
        </Card>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4 text-xs text-foreground">
          שמירה אוטומטית: הנתונים נשמרים בדפדפן זה ונגישים בכניסה מחדש מאותו מכשיר.
        </div>

        <div className="grid gap-3">
          <button
            onClick={() => { setRole("emp"); setScr("setup"); }}
            className="py-4 bg-primary text-primary-foreground rounded-2xl text-base font-bold"
          >
            כניסת משפחה / מעסיק
          </button>
          <button
            onClick={() => { setRole("wrk"); setWScr("slip"); }}
            className="py-4 bg-emerald-600 text-white rounded-2xl text-base font-bold"
          >
            Worker / Caregiver Login
          </button>
        </div>
      </div>
    );
  }

  const Header = () => (
    <div className="bg-foreground text-background rounded-xl p-3 mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button onClick={() => setRole(null)} className="bg-white/10 rounded-md px-2 py-1 text-sm">←</button>
        <h2 className="font-bold">Hub2Care</h2>
      </div>
      <span className="text-xs opacity-80">{role === "emp" ? "מעסיק" : "Worker"}</span>
    </div>
  );

  // ========== EMPLOYER ==========
  if (role === "emp") {
    const tabs = [
      { id: "setup", l: "הגדרות" },
      { id: "calc", l: "מחשבון" },
      { id: "docs", l: "תיעוד" },
      { id: "funds", l: "קופת גמר" },
    ];
    return (
      <div className="container max-w-2xl py-6" dir="rtl">
        <Header />
        {role === "emp" && (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive text-xs rounded-lg px-3 py-2 mb-3">
            איסור: חל איסור מוחלט לנכות ביטוח לאומי (3.6%) משכר העובד.
          </div>
        )}

        <div className="flex border-b border-border mb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setScr(t.id)}
              className={`flex-1 py-3 text-sm font-semibold border-b-[3px] transition-colors ${
                scr === t.id ? "text-primary border-primary" : "text-muted-foreground border-transparent"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>

        {scr === "setup" && (
          <>
            <Card title="הגדרות חוזה">
              <label className="block text-sm font-medium mb-1.5">תאריך תחילת העסקה</label>
              <input type="date" value={sd} onChange={(e) => setSd(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-border text-sm mb-3" />
              <label className="block text-sm font-medium mb-1.5">אזור מגורים</label>
              <select value={area} onChange={(e) => setArea(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-border text-sm mb-3">
                {Object.entries(K.A).map(([k, v]) => <option key={k} value={k}>{v.he}</option>)}
              </select>
              <NumIn label="שכר חודשי" value={sal} onChange={(v) => setSal(Math.max(K.SAL, v))} min={K.SAL} tip={`שכר מינימום: ${f2(K.SAL)}`} />
              <NumIn label="עלות ביטוח בריאות" value={hiC} onChange={setHiC} tip={`עד מחצית, מקס׳ ${K.HI_CAP}`} />
              <Tog label="הדירה בבעלות המעסיק" value={owned} onChange={setOwned} />
              <Tog label="הוצאות אגב (חשמל/מים)" value={incD} onChange={setIncD} />
              <Tog label="המעסיק מספק כלכלה" value={food} onChange={setFood} />
              <div className="mt-2 text-sm">
                ניכויי מעטפת: <strong>{f2(cc.ev)}</strong>
                {cc.cp && <span className="text-destructive"> — חסום בתקרת 25%!</span>}
              </div>
            </Card>
            <button onClick={() => setScr("calc")} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold">
              שמור והמשך למחשבון
            </button>
          </>
        )}

        {scr === "calc" && (
          <>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { l: "חודש העסקה", v: String(mos) },
                { l: "שכר בסיס", v: f2(sal) },
                { l: "פנסיה 6.5%", v: mos >= K.PS ? "פעילה" : "מחודש 7" },
              ].map((x, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-2.5 text-center">
                  <p className="text-[10px] text-muted-foreground">{x.l}</p>
                  <p className="text-sm font-bold">{x.v}</p>
                </div>
              ))}
            </div>
            <Card title="רכיבים חיוביים">
              <NumIn label="ימי מנוחה שבועיים שבוצעו" value={rst} onChange={setRst} sfx="ימים" tip="כל יום מנוחה: ₪439.74" />
              <NumIn label="חגים שבוצעו" value={hol} onChange={setHol} sfx="ימים" />
              <NumIn label={pktT === "adv" ? "מקדמה (קיזוז)" : "בונוס (תוספת)"} value={pkt} onChange={setPkt} />
              <div className="flex gap-2 mt-2">
                {[{ v: "adv", l: "מקדמה (קיזוז)" }, { v: "bon", l: "בונוס (תוספת)" }].map((b) => (
                  <button key={b.v} onClick={() => setPktT(b.v as "adv" | "bon")}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold border-2 ${
                      pktT === b.v ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"
                    }`}>
                    {b.l}
                  </button>
                ))}
              </div>
            </Card>
            <Card title="ניכויים">
              <NumIn label="ימי מחלה שנלקחו" value={sick} onChange={setSick} sfx="ימים" />
              <NumIn label="ימי חופשה ללא תשלום" value={ulv} onChange={setUlv} sfx="ימים" />
              <NumIn label="מס הכנסה" value={tax} onChange={setTax} />
              <NumIn label="ויזה" value={vis} onChange={setVis} />
            </Card>
            <Card>
              <p className="text-sm text-muted-foreground">נטו לעובד — {mHe}</p>
              <p className="text-3xl font-extrabold text-primary">{f2(cc.net)}</p>
            </Card>
            <Card title="לשים בצד — פיצויים ופנסיה (חודשי)">
              <p className="text-2xl font-bold mb-2">{f2(cc.aside)}</p>
              <div className="space-y-1.5 text-sm">
                {[
                  { l: "פיצויים 6%", v: cc.sv },
                  { l: `פנסיה 6.5%${mos < K.PS ? " (טרם)" : ""}`, v: cc.pn },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between border-b border-border py-1">
                    <span>{r.l}</span><span className="font-semibold">{f2(r.v)}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="ביטוח לאומי (3.6%)">
              <p className="font-bold">{f2(cc.ni)}</p>
              <p className="text-xs text-muted-foreground mt-1">תשלום חובה על המעסיק — לא מנוכה מהעובד, לא חלק מקופת גמר חשבון</p>
            </Card>
          </>
        )}

        {scr === "docs" && (
          <>
            <Card title="תיעוד תשלומים ומסמכים">
              <label className="block text-sm font-medium mb-1.5">העברה בנקאית</label>
              <input type="file" onChange={(e) => upld(e, "bank")} className="mb-3 text-xs" />
              <label className="block text-sm font-medium mb-1.5">תשלום מזומן</label>
              <input type="file" onChange={(e) => upld(e, "cash")} className="mb-3 text-xs" />
              <label className="block text-sm font-medium mb-1.5">חוזה</label>
              <input type="file" onChange={(e) => upld(e, "contract")} className="mb-3 text-xs" />
              <label className="block text-sm font-medium mb-1.5">אחר</label>
              <input type="text" value={otherDesc} onChange={(e) => setOtherDesc(e.target.value)}
                placeholder="תאר את המסמך..." className="w-full px-3 py-2 mb-2 rounded-lg border-2 border-border text-sm" />
              <input type="file" onChange={(e) => { upld(e, "other", otherDesc); setOtherDesc(""); }} className="text-xs" />
              <div className="mt-3 p-2 rounded-lg bg-muted text-xs">
                {wOk ? <span className="text-emerald-600 font-semibold">העובד אישר קבלת תשלום — {wTime}</span> : "ממתין לאישור העובד"}
              </div>
            </Card>
            <Card title="היסטוריה">
              {docs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-3">טרם הועלו מסמכים</p>
              ) : (
                <div className="space-y-2">
                  {docs.map((d, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-border py-2">
                      <div>
                        <p className="text-sm font-semibold">{d.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {{ bank: "העברה בנקאית", cash: "תשלום מזומן", contract: "חוזה", other: d.desc || "אחר" }[d.type]} — {d.date} {d.time}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">{d.sz}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}

        {scr === "funds" && (
          <>
            <Card title={`סה״כ נצבר — פיצויים ופנסיה — ${mos} חודשים`}>
              <p className="text-3xl font-extrabold text-primary">
                {`₪${(cc.aside * mos).toLocaleString("he-IL", { maximumFractionDigits: 0 })}`}
              </p>
            </Card>
            <Card title="פירוט">
              {[
                { l: "פיצויים 6% (בסיס)", v: cc.sv * mos },
                { l: "פיצויים 8.33% (במקרה פיטורים)", v: sal * yrs },
                { l: `פנסיה 6.5% (${Math.max(0, mos - 6)} חודשים)`, v: cc.pn * Math.max(0, mos - 6) },
              ].map((r, i) => (
                <div key={i} className="flex justify-between border-b border-border py-2 text-sm">
                  <span>{r.l}</span><span className="font-semibold">{f2(r.v)}</span>
                </div>
              ))}
              {mos >= 12 ? (
                <div className="flex justify-between py-2 text-sm">
                  <span>דמי הבראה ({cc.havDays} ימים × {K.HAV})</span>
                  <span className="font-semibold">{f2(cc.havAmount)}</span>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground py-2">דמי הבראה — עוד {12 - mos} חודשים</p>
              )}
            </Card>
            <Card title="ביטוח לאומי">
              <p className="text-sm">{f2(cc.ni)}/חודש, סה״כ: <strong>{f2(cc.ni * mos)}</strong></p>
              <p className="text-xs text-muted-foreground mt-1">תשלום חובה של המעסיק. לא חלק מקופת גמר חשבון.</p>
            </Card>
          </>
        )}
      </div>
    );
  }

  // ========== WORKER ==========
  const tabs = [
    { id: "slip", l: "Pay Slip" },
    { id: "savings", l: "Savings" },
    { id: "balance", l: "Balances" },
    { id: "docs", l: "Documents" },
  ];
  const wDocs = docs.filter((d) => d.type === "bank" || d.type === "contract");
  return (
    <div className="container max-w-2xl py-6" dir="ltr">
      <Header />
      <div className="flex border-b border-border mb-4">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setWScr(t.id)}
            className={`flex-1 py-3 text-xs font-semibold border-b-[3px] ${
              wScr === t.id ? "text-emerald-600 border-emerald-600" : "text-muted-foreground border-transparent"
            }`}>
            {t.l}
          </button>
        ))}
      </div>

      {wScr === "slip" && (
        <>
          <Card>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold">Monthly Pay Slip</h3>
                <p className="text-xs text-muted-foreground">{mEn}</p>
              </div>
              <span className="text-xs text-emerald-600 font-bold">Hub2Care</span>
            </div>
            <p className="text-xs text-muted-foreground">Net Payment</p>
            <p className="text-3xl font-extrabold text-emerald-600">{fe(cc.net)}</p>
          </Card>
          <Card title="Earnings">
            {[
              { l: "Base Salary", v: cc.s, show: true },
              { l: `Rest Days (${rst} × ${fe(K.REST)})`, v: cc.rp, show: cc.rp > 0, p: "+" },
              { l: `Holidays (${hol})`, v: cc.hp, show: cc.hp > 0, p: "+" },
              { l: "Bonus", v: cc.bon, show: cc.bon > 0, p: "+" },
            ].filter((r) => r.show).map((r, i) => (
              <div key={i} className="flex justify-between text-sm border-b border-border py-1.5">
                <span>{r.l}</span><span>{r.p || ""}{fe(r.v)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-2 mt-1 border-t-2 border-border">
              <span>Gross</span><span>{fe(cc.gr)}</span>
            </div>
          </Card>
          <Card title="Deductions">
            {[
              { l: "Housing", v: cc.hs },
              { l: "Health Insurance", v: cc.he },
              cc.ic > 0 && { l: "Utilities", v: cc.ic },
              cc.fd > 0 && { l: "Food", v: cc.fd },
              cc.sd2 > 0 && { l: "Sick Leave", v: cc.sd2 },
              cc.ud > 0 && { l: "Unpaid Leave", v: cc.ud },
              cc.adv > 0 && { l: "Advance", v: cc.adv },
              tax > 0 && { l: "Income Tax", v: tax },
              uni > 0 && { l: "Union", v: uni },
              dbt > 0 && { l: "Debt", v: dbt },
              vis > 0 && { l: "Visa Fee", v: vis },
            ].filter(Boolean).map((r, i) => {
              const row = r as { l: string; v: number };
              return (
                <div key={i} className="flex justify-between text-sm border-b border-border py-1.5">
                  <span>{row.l}</span><span>-{fe(row.v)}</span>
                </div>
              );
            })}
          </Card>
          <Card>
            <p className="text-xs text-muted-foreground">NET PAY — Transferred to your account</p>
            <p className="text-2xl font-extrabold">{fe(cc.net)}</p>
          </Card>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-4 text-xs">
            This month your employer paid {fe(cc.ni)} for National Insurance on your behalf (required by law).
          </div>
          <Card>
            {wOk ? (
              <div className="text-center">
                <p className="font-bold text-emerald-600">Payment Confirmed</p>
                <p className="text-xs text-muted-foreground">{fe(cc.net)} — {wTime}</p>
              </div>
            ) : (
              <>
                <p className="text-sm mb-3">Confirm you received {fe(cc.net)} for {mEn}.</p>
                <button onClick={() => { setWOk(true); setWT(new Date().toLocaleString("en-US")); }}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold">
                  I Confirm Payment Received
                </button>
                <p className="text-xs text-muted-foreground mt-2 text-center">Digital signature for record-keeping</p>
              </>
            )}
          </Card>
        </>
      )}

      {wScr === "savings" && (
        <>
          <Card title={`Total Saved — Severance and Pension (${mos} months)`}>
            <p className="text-3xl font-extrabold text-emerald-600">{fe(cc.aside * mos)}</p>
            <p className="text-xs text-muted-foreground mt-1">Paid to you when employment ends.</p>
          </Card>
          {[
            { l: "Severance (6%)", v: cc.sv, n: "Always accrued", t: `Total: ${fe(cc.sv * mos)}` },
            { l: "Pension (6.5%)", v: cc.pn, n: mos < K.PS ? "Starts from month 7" : "Active", t: `Total: ${fe(cc.pn * Math.max(0, mos - 6))}` },
          ].map((r, i) => (
            <Card key={i}>
              <div className="flex justify-between"><span className="font-semibold">{r.l}</span><span>{fe(r.v)}/mo</span></div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>{r.n}</span><span>{r.t}</span></div>
            </Card>
          ))}
          {mos >= 12 && (
            <Card title="Recuperation">
              <div className="flex justify-between"><span>{cc.havDays} days × {K.HAV}</span><span className="font-semibold">{fe(cc.havAmount)}</span></div>
              <p className="text-xs text-muted-foreground mt-1">Paid annually at end of employment year.</p>
            </Card>
          )}
        </>
      )}

      {wScr === "balance" && (
        <>
          <h2 className="text-lg font-bold mb-3">Your Balances</h2>
          {[
            { title: "Annual Vacation", accrued: `${cc.vacAccrued} days accrued`, rate: `${cc.vacPerYr} days/year`, note: "Payout only at end of employment. Min 7 days must be taken per year." },
            { title: "Sick Days", accrued: `${cc.sickAccrued} days accrued`, rate: "1.5 days/month (max 90)", note: "Day 1: no pay. Days 2-3: 50%. Day 4+: full pay." },
            { title: "Holiday Days", accrued: "9 days / year", rate: "Set in contract", note: "Full salary on holidays. If worked: additional 150%." },
            { title: "Recuperation", accrued: mos >= 12 ? `${cc.havDays} days = ${fe(cc.havAmount)}` : "Not yet eligible", rate: `${K.HAV}/day`, note: mos < 12 ? `Eligible after 12 months (${12 - mos} remaining)` : "Paid annually." },
          ].map((b, i) => (
            <Card key={i} title={b.title}>
              <div className="flex justify-between text-sm border-b border-border py-1.5"><span>Accrued</span><span className="font-semibold">{b.accrued}</span></div>
              <div className="flex justify-between text-sm border-b border-border py-1.5"><span>Rate</span><span>{b.rate}</span></div>
              <p className="text-xs text-muted-foreground pt-2">{b.note}</p>
            </Card>
          ))}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-xs">
            Your Rights: Employer cannot deduct National Insurance. Rest day pay (150%) is on top of full salary.
          </div>
        </>
      )}

      {wScr === "docs" && (
        <Card title="Your Documents">
          {wDocs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No documents available yet.</p>
          ) : (
            wDocs.map((d, i) => (
              <div key={i} className="flex justify-between items-center border-b border-border py-2">
                <div>
                  <p className="text-sm font-semibold">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.type === "bank" ? "Bank Transfer" : "Employment Contract"} — {d.dateEn}</p>
                </div>
                <span className="text-xs text-muted-foreground">{d.sz}</span>
              </div>
            ))
          )}
        </Card>
      )}
    </div>
  );
}
