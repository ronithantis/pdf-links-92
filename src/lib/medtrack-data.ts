// Medication Tracker data and helpers

export interface MedDBEntry {
  id: string;
  nameHe: string;
  nameEn: string;
  cat: string;
  isPeg?: boolean;
}

export const MED_DB: MedDBEntry[] = [
  {id:'1',nameHe:'דונפזיל (ממוריט, אסנטה)',nameEn:'Donepezil',cat:'אלצהיימר'},
  {id:'2',nameHe:'ריבסטיגמין (אקסלון)',nameEn:'Rivastigmine',cat:'אלצהיימר'},
  {id:'3',nameHe:'גלנטמין (רמניל)',nameEn:'Galantamine',cat:'אלצהיימר'},
  {id:'4',nameHe:'ממנטין (ממוקס, אביקסה)',nameEn:'Memantine',cat:'אלצהיימר'},
  {id:'5',nameHe:'סרטרלין (לוסטרל)',nameEn:'Sertraline',cat:'דיכאון/חרדה'},
  {id:'6',nameHe:'פלואוקסטין (פרוזק)',nameEn:'Fluoxetine',cat:'דיכאון/חרדה'},
  {id:'7',nameHe:'ציפרלקס (אסטו)',nameEn:'Escitalopram',cat:'דיכאון/חרדה'},
  {id:'8',nameHe:'ציפרמיל',nameEn:'Citalopram',cat:'דיכאון/חרדה'},
  {id:'9',nameHe:'ונלפקסין',nameEn:'Venlafaxine',cat:'דיכאון/חרדה'},
  {id:'10',nameHe:'דולוקסטין',nameEn:'Duloxetine',cat:'דיכאון/חרדה'},
  {id:'11',nameHe:'מירטזפין (רמרון)',nameEn:'Mirtazapine',cat:'דיכאון'},
  {id:'12',nameHe:'בופרופיון (וולבוטרין)',nameEn:'Bupropion',cat:'דיכאון'},
  {id:'13',nameHe:'אמיטריפטילין (אלטרול)',nameEn:'Amitriptyline',cat:'דיכאון'},
  {id:'14',nameHe:'לוראזפאם (לוריבן)',nameEn:'Lorazepam',cat:'חרדה/שינה'},
  {id:'15',nameHe:'דיאזפאם (ואליום)',nameEn:'Diazepam',cat:'חרדה/שינה'},
  {id:'16',nameHe:'נומבון (ניטראזפאם)',nameEn:'Nitrazepam',cat:'חרדה/שינה'},
  {id:'17',nameHe:'בונדורמין',nameEn:'Bromazepam',cat:'חרדה/שינה'},
  {id:'18',nameHe:'זולפידם (סטילנוקס)',nameEn:'Zolpidem',cat:'שינה'},
  {id:'19',nameHe:'בוספירון',nameEn:'Buspirone',cat:'חרדה'},
  {id:'20',nameHe:'ריספרידון',nameEn:'Risperidone',cat:'פסיכוזה'},
  {id:'21',nameHe:'קווטיאפין',nameEn:'Quetiapine',cat:'פסיכוזה'},
  {id:'22',nameHe:'ליתיום',nameEn:'Lithium',cat:'מצב רוח'},
  {id:'23',nameHe:'פניטואין',nameEn:'Phenytoin',cat:'אפילפסיה'},
  {id:'24',nameHe:'לבטיראצטם',nameEn:'Levetiracetam',cat:'אפילפסיה'},
  {id:'25',nameHe:'לבודופה/קרבידופה',nameEn:'Carbidopa/Levodopa',cat:'פרקינסון'},
  {id:'26',nameHe:"מטפורמין (גלוקופאז')",nameEn:'Metformin',cat:'סוכרת'},
  {id:'27',nameHe:'גלימפיריד (אמריל)',nameEn:'Glimepiride',cat:'סוכרת'},
  {id:'28',nameHe:'גליפיזיד',nameEn:'Glipizide',cat:'סוכרת'},
  {id:'29',nameHe:'גליבנקלמיד (גלובן)',nameEn:'Glibenclamide',cat:'סוכרת'},
  {id:'30',nameHe:"סיטגליפטין (ג'נובייה)",nameEn:'Sitagliptin',cat:'סוכרת'},
  {id:'31',nameHe:"לינגליפטין (טרג'נטה)",nameEn:'Linagliptin',cat:'סוכרת'},
  {id:'32',nameHe:'וילדגליפטין (גלבוס)',nameEn:'Vildagliptin',cat:'סוכרת'},
  {id:'33',nameHe:'סמגלוטיד (אוזמפיק)',nameEn:'Semaglutide',cat:'סוכרת'},
  {id:'34',nameHe:'לירגלוטיד (ויקטוזה)',nameEn:'Liraglutide',cat:'סוכרת'},
  {id:'35',nameHe:'דאפאגליפלוזין (פורסיגה)',nameEn:'Dapagliflozin',cat:'סוכרת'},
  {id:'36',nameHe:"אמפאגליפלוזין (ג'רדיאנס)",nameEn:'Empagliflozin',cat:'סוכרת'},
  {id:'37',nameHe:'רפאגליניד (נובונורם)',nameEn:'Repaglinide',cat:'סוכרת'},
  {id:'38',nameHe:'אקרבוז (פרנדז)',nameEn:'Acarbose',cat:'סוכרת'},
  {id:'39',nameHe:'פיוגליטזון (אקטוס)',nameEn:'Pioglitazone',cat:'סוכרת'},
  {id:'40',nameHe:'אינסולין אספרט (נובורפיד)',nameEn:'Insulin aspart',cat:'אינסולין'},
  {id:'41',nameHe:'אינסולין ליספרו (הומאלוג)',nameEn:'Insulin lispro',cat:'אינסולין'},
  {id:'42',nameHe:"אינסולין גלרג'ין (לנטוס)",nameEn:'Insulin glargine',cat:'אינסולין'},
  {id:'43',nameHe:'אינסולין דגלודק (טרגלודק)',nameEn:'Insulin degludec',cat:'אינסולין'},
  {id:'44',nameHe:'אינסולין NPH (הומולין N)',nameEn:'NPH insulin',cat:'אינסולין'},
  {id:'45',nameHe:'הידרוכלורותיאזיד',nameEn:'Hydrochlorothiazide',cat:'לחץ דם'},
  {id:'46',nameHe:'כלורתלידון',nameEn:'Chlorthalidone',cat:'לחץ דם'},
  {id:'47',nameHe:'פורוסמיד (פוסיד)',nameEn:'Furosemide',cat:'לחץ דם/לב'},
  {id:'48',nameHe:'ספירונולקטון (אלדקטון)',nameEn:'Spironolactone',cat:'לחץ דם/לב'},
  {id:'49',nameHe:'אנאלפריל',nameEn:'Enalapril',cat:'לחץ דם'},
  {id:'50',nameHe:'רמיפריל (טריטייס)',nameEn:'Ramipril',cat:'לחץ דם'},
  {id:'51',nameHe:'ליסינופריל',nameEn:'Lisinopril',cat:'לחץ דם'},
  {id:'52',nameHe:'לוסרטן (אוקסאר)',nameEn:'Losartan',cat:'לחץ דם'},
  {id:'53',nameHe:'ולסרטן (דיובן)',nameEn:'Valsartan',cat:'לחץ דם'},
  {id:'54',nameHe:'קנדסרטן (אטקנד)',nameEn:'Candesartan',cat:'לחץ דם'},
  {id:'55',nameHe:'מטופרולול',nameEn:'Metoprolol',cat:'לחץ דם'},
  {id:'56',nameHe:'ביסופרולול (קונקור)',nameEn:'Bisoprolol',cat:'לחץ דם'},
  {id:'57',nameHe:'אטנולול (נורמיטן)',nameEn:'Atenolol',cat:'לחץ דם'},
  {id:'58',nameHe:'קרבידילול',nameEn:'Carvedilol',cat:'לחץ דם/לב'},
  {id:'59',nameHe:'אמלודיפין (נורבסק)',nameEn:'Amlodipine',cat:'לחץ דם'},
  {id:'60',nameHe:'ניפדיפין',nameEn:'Nifedipine',cat:'לחץ דם'},
  {id:'61',nameHe:'דילטיאזם',nameEn:'Diltiazem',cat:'הפרעות קצב'},
  {id:'62',nameHe:'ורפמיל',nameEn:'Verapamil',cat:'הפרעות קצב'},
  {id:'63',nameHe:'דיגוקסין',nameEn:'Digoxin',cat:'לב'},
  {id:'64',nameHe:'אמיודרון',nameEn:'Amiodarone',cat:'הפרעות קצב'},
  {id:'65',nameHe:'אנטרסטו (ואלסרטן/סקוביטריל)',nameEn:'Valsartan/Sacubitril',cat:'אי-ספיקת לב'},
  {id:'66',nameHe:'ניטרוגליצרין (ספריי/תת-לשון)',nameEn:'Nitroglycerin',cat:'תעוקת חזה'},
  {id:'67',nameHe:'אטורבסטטין (ליפיטור)',nameEn:'Atorvastatin',cat:'כולסטרול'},
  {id:'68',nameHe:'רוזובסטטין (קרסטור)',nameEn:'Rosuvastatin',cat:'כולסטרול'},
  {id:'69',nameHe:'סימבסטטין',nameEn:'Simvastatin',cat:'כולסטרול'},
  {id:'70',nameHe:'פראבסטטין',nameEn:'Pravastatin',cat:'כולסטרול'},
  {id:'71',nameHe:'אזטימיב (איזטרול)',nameEn:'Ezetimibe',cat:'כולסטרול'},
  {id:'72',nameHe:'וורפרין (קומדין)',nameEn:'Warfarin',cat:'נוגדי קרישה'},
  {id:'73',nameHe:'דביגטראן (פרדקסה)',nameEn:'Dabigatran',cat:'נוגדי קרישה'},
  {id:'74',nameHe:'ריברוקסבאן (קסרלטו)',nameEn:'Rivaroxaban',cat:'נוגדי קרישה'},
  {id:'75',nameHe:'אפיקסבאן',nameEn:'Apixaban',cat:'נוגדי קרישה'},
  {id:'76',nameHe:'אספירין',nameEn:'Aspirin',cat:'נוגדי טסיות'},
  {id:'77',nameHe:'קלופידוגרל (פלאביקס)',nameEn:'Clopidogrel',cat:'נוגדי טסיות'},
  {id:'78',nameHe:'פרצטמול (אקמול)',nameEn:'Paracetamol',cat:'כאב'},
  {id:'79',nameHe:'איבופרופן',nameEn:'Ibuprofen',cat:'כאב/דלקת'},
  {id:'80',nameHe:'דיקלופנק',nameEn:'Diclofenac',cat:'כאב/דלקת'},
  {id:'81',nameHe:'נאפרוקסן',nameEn:'Naproxen',cat:'כאב/דלקת'},
  {id:'82',nameHe:'מורפין',nameEn:'Morphine',cat:'כאב חזק'},
  {id:'83',nameHe:'גבאפנטין',nameEn:'Gabapentin',cat:'כאב נוירופתי'},
  {id:'84',nameHe:'פרגאבאלין (ליריקה)',nameEn:'Pregabalin',cat:'כאב נוירופתי'},
  {id:'85',nameHe:'אומפרזול',nameEn:'Omeprazole',cat:'עיכול'},
  {id:'86',nameHe:'פנטופרזול',nameEn:'Pantoprazole',cat:'עיכול'},
  {id:'87',nameHe:'פמוטידין',nameEn:'Famotidine',cat:'עיכול'},
  {id:'88',nameHe:'לקטולוז (אבילאק)',nameEn:'Lactulose',cat:'עצירות'},
  {id:'89',nameHe:'ביסקודיל (לקסדין)',nameEn:'Bisacodyl',cat:'עצירות'},
  {id:'90',nameHe:'פגלקס (PEG פומי)',nameEn:'Polyethylene glycol',cat:'עצירות'},
  {id:'91',nameHe:'לבותירוקסין (אלטרוקסין)',nameEn:'Levothyroxine',cat:'בלוטת התריס'},
  {id:'92',nameHe:'טמסולוסין',nameEn:'Tamsulosin',cat:'ערמונית'},
  {id:'93',nameHe:'פינסטריד',nameEn:'Finasteride',cat:'ערמונית'},
  {id:'94',nameHe:'מירבגרון',nameEn:'Mirabegron',cat:'שלפוחית'},
  {id:'95',nameHe:'אלנדרונט',nameEn:'Alendronate',cat:'אוסטאופורוזיס'},
  {id:'96',nameHe:'ריזדרונט',nameEn:'Risedronate',cat:'אוסטאופורוזיס'},
  {id:'97',nameHe:'דנוסומאב (זריקה)',nameEn:'Denosumab',cat:'אוסטאופורוזיס'},
  {id:'98',nameHe:'סלבוטמול (ונטולין)',nameEn:'Salbutamol',cat:'אסתמה/COPD'},
  {id:'99',nameHe:'טיוטרופיום',nameEn:'Tiotropium',cat:'COPD'},
  {id:'100',nameHe:'קולכיצין',nameEn:'Colchicine',cat:'גאוט'},
  {id:'101',nameHe:'אלופורינול (זילופרים)',nameEn:'Allopurinol',cat:'גאוט'},
  {id:'102',nameHe:'פבוקסוסטט (פבוריק)',nameEn:'Febuxostat',cat:'גאוט'},
  {id:'103',nameHe:'לטנופרוסט (טיפות עיניים)',nameEn:'Latanoprost',cat:'גלאוקומה'},
  {id:'104',nameHe:'טימולול (טיפות עיניים)',nameEn:'Timolol',cat:'גלאוקומה'},
  {id:'105',nameHe:'הזנה/תרופות דרך פג (PEG)',nameEn:'PEG Feeding / Medications',cat:'PEG',isPeg:true},
];

export interface Medication {
  id: string;
  dbId: string | null;
  nameHe: string;
  nameEn: string;
  cat: string;
  dosageForm: string;
  dosageAmount: string;
  routeAdmin: string;
  dosageFormFull: string;
  timesPerDay: number;
  times: string[];
  notes: string;
  active: boolean;
  isPeg: boolean;
}

export interface Caregiver {
  id: string;
  nameHe: string;
  nameEn: string;
}

export interface Patient {
  nameHe: string;
  nameEn: string;
  feedingType: string;
}

export interface MedLogEntry {
  given?: boolean;
  caregiverId?: string;
  givenAt?: string;
  note?: string;
}

export interface DayLog {
  sessions: Record<string, Record<string, MedLogEntry>>;
  confirmed: boolean;
}

export interface MedTrackState {
  patient: Patient;
  caregivers: Caregiver[];
  medications: Medication[];
  logs: Record<string, DayLog>;
  remindersEnabled: boolean;
  setupDone?: boolean;
}

export const EMPTY_STATE: MedTrackState = {
  patient: { nameHe: '', nameEn: '', feedingType: 'oral' },
  caregivers: [],
  medications: [],
  logs: {},
  remindersEnabled: false,
};

export const MONTHS_HE = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
export const DAYS_HE = ['א','ב','ג','ד','ה','ו','ש'];

export const uid = () => Math.random().toString(36).slice(2, 9);
export const todayStr = () => new Date().toISOString().slice(0, 10);

export function formatDateHe(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return `${d.getDate()} ${MONTHS_HE[d.getMonth()]} ${d.getFullYear()}`;
}

export function getSessionLabel(time: string) {
  const h = parseInt(time.split(':')[0]);
  if (h < 10) return '🌅 בוקר';
  if (h < 14) return '☀️ צהריים';
  if (h < 18) return '🌤 אחה"צ';
  return '🌙 ערב';
}

export function getTodaySessions(medications: Medication[]): string[] {
  const s = new Set<string>();
  medications.filter(m => m.active).forEach(m => m.times.forEach(t => s.add(t)));
  return [...s].sort();
}

export function getMedsForTime(medications: Medication[], time: string): Medication[] {
  return medications.filter(m => m.active && m.times.includes(time));
}

export function getCurrentSessionTime(medications: Medication[], todayLog: DayLog | undefined): string | null {
  const sessions = getTodaySessions(medications);
  for (const time of sessions) {
    const meds = getMedsForTime(medications, time);
    const slot = todayLog?.sessions?.[time] || {};
    if (!meds.every(m => slot[m.id]?.given !== undefined)) return time;
  }
  return null;
}

export function isAllDone(medications: Medication[], todayLog: DayLog | undefined): boolean {
  const sessions = getTodaySessions(medications);
  if (!sessions.length) return false;
  return sessions.every(time => {
    const meds = getMedsForTime(medications, time);
    const slot = todayLog?.sessions?.[time] || {};
    return meds.every(m => slot[m.id]?.given !== undefined);
  });
}

export function getDayStatus(medications: Medication[], log: DayLog | undefined): string {
  if (!log) return 'empty';
  if (log.confirmed) return 'ok';
  const sessions = getTodaySessions(medications);
  let total = 0, given = 0, skipped = 0;
  sessions.forEach(time => {
    const meds = getMedsForTime(medications, time);
    const slot = log.sessions?.[time] || {};
    meds.forEach(m => {
      total++;
      if (slot[m.id]?.given === true) given++;
      if (slot[m.id]?.given === false) skipped++;
    });
  });
  if (total === 0) return 'empty';
  if (given === total) return 'ok';
  if (given === 0 && skipped === 0) return 'empty';
  return 'partial';
}

export function loadState(): MedTrackState {
  try {
    return JSON.parse(localStorage.getItem('medtrack_v2') || '') || EMPTY_STATE;
  } catch {
    return EMPTY_STATE;
  }
}

export function saveState(data: MedTrackState) {
  try {
    localStorage.setItem('medtrack_v2', JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

export const DEFAULT_TIMES: Record<number, string[]> = {
  1: ['08:00'],
  2: ['08:00', '20:00'],
  3: ['08:00', '13:00', '20:00'],
  4: ['08:00', '12:00', '16:00', '20:00'],
  5: ['06:00', '10:00', '14:00', '18:00', '22:00'],
  6: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
};

export const DOSAGE_FORMS = ['כדור', 'מ"ג', 'מ"ל', 'זריקה', 'טיפות', 'קפסולה', 'מדבקה', 'אחר'];

export const ROUTES = [
  { val: 'דרך הפה', label: 'דרך הפה', desc: 'בליעה רגילה' },
  { val: 'תת-עורי', label: 'זריקה', desc: 'תת-עורי / שריר' },
  { val: 'PEG', label: 'דרך PEG', desc: 'דרך הצינורית' },
  { val: 'אחר', label: 'אחר', desc: 'פרט בשדה' },
];

export function buildReportText(data: MedTrackState, period: string): string {
  const today = new Date();
  const todayStr2 = today.toISOString().slice(0, 10);
  
  const getRangeKeys = (p: string) => {
    const keys: string[] = [];
    const d = new Date(today);
    const n = p === 'daily' ? 1 : p === 'weekly' ? 7 : 30;
    for (let i = 0; i < n; i++) {
      keys.push(new Date(d.getFullYear(), d.getMonth(), d.getDate() - i).toISOString().slice(0, 10));
    }
    return keys.filter(k => data.logs?.[k]);
  };

  const keys = getRangeKeys(period).sort();
  const patientName = data.patient.nameHe || data.patient.nameEn || 'המטופל';
  const periodLabel = period === 'daily' ? 'יומי' : period === 'weekly' ? 'שבועי' : 'חודשי';
  let txt = `דוח מעקב תרופות ${periodLabel}\n`;
  txt += `מטופל: ${patientName}\n`;
  txt += `הופק: ${today.toLocaleDateString('he-IL')}\n`;
  txt += `${'─'.repeat(40)}\n\n`;

  if (!keys.length) { txt += 'אין נתונים לתקופה זו.\n'; return txt; }

  keys.forEach(dateKey => {
    const log = data.logs[dateKey];
    const sessions = getTodaySessions(data.medications.filter(m => m.active));
    txt += `📅 ${formatDateHe(dateKey)}${log.confirmed ? ' ✅ אושר' : ''}\n`;
    sessions.forEach(time => {
      const meds = getMedsForTime(data.medications.filter(m => m.active), time);
      const slot = log.sessions?.[time] || {};
      txt += `  ${getSessionLabel(time).replace(/[🌅☀️🌤🌙]/u, '')} (${time}):\n`;
      meds.forEach(m => {
        const e = slot[m.id];
        const cg = data.caregivers.find(c => c.id === e?.caregiverId);
        const status = e?.given === true ? '✓ ניתן' : e?.given === false ? '✗ דולג' : '— לא סומן';
        const cgName = cg ? ` (${cg.nameHe})` : '';
        const t = e?.givenAt ? ` בשעה ${new Date(e.givenAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}` : '';
        txt += `    • ${m.nameHe} — ${status}${cgName}${t}\n`;
      });
    });
    txt += '\n';
  });

  let total = 0, given = 0;
  keys.forEach(dk => {
    const log = data.logs[dk];
    getTodaySessions(data.medications.filter(m => m.active)).forEach(t => {
      getMedsForTime(data.medications.filter(m => m.active), t).forEach(m => {
        total++;
        if (log.sessions?.[t]?.[m.id]?.given === true) given++;
      });
    });
  });
  txt += `${'─'.repeat(40)}\n`;
  txt += `סיכום: ${given}/${total} מנות ניתנו (${total ? Math.round(given / total * 100) : 0}%)\n`;
  return txt;
}

export function getRangeKeys(data: MedTrackState, period: string): string[] {
  const today = new Date();
  const keys: string[] = [];
  const n = period === 'daily' ? 1 : period === 'weekly' ? 7 : 30;
  for (let i = 0; i < n; i++) {
    keys.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i).toISOString().slice(0, 10));
  }
  return keys.filter(k => data.logs?.[k]);
}
