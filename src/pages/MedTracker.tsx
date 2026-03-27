import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Pill, Calendar, Settings, FileText, Plus, Trash2, Check, X, ChevronLeft, ChevronRight,
  Pause, Play, Edit, UserPlus, Printer, Mail, MessageCircle, Bell, BellOff, AlertTriangle,
  Search, Minus, Pipette
} from "lucide-react";
import {
  MED_DB, MedTrackState, Medication, EMPTY_STATE, MONTHS_HE, DAYS_HE,
  uid, todayStr, formatDateHe, getSessionLabel, getTodaySessions, getMedsForTime,
  getCurrentSessionTime, isAllDone, getDayStatus, loadState, saveState,
  DEFAULT_TIMES, DOSAGE_FORMS, ROUTES, buildReportText, getRangeKeys
} from "@/lib/medtrack-data";

// ═══════════ SETUP WIZARD ═══════════
function SetupWizard({ data, save, onDone }: { data: MedTrackState; save: (d: MedTrackState) => void; onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [patient, setPatient] = useState(data.patient);
  const [caregivers, setCaregivers] = useState(data.caregivers);
  const [cgNameHe, setCgNameHe] = useState('');
  const [cgNameEn, setCgNameEn] = useState('');
  const [medications, setMedications] = useState(data.medications);

  const addCaregiver = () => {
    if (!cgNameHe.trim()) return;
    setCaregivers(p => [...p, { id: uid(), nameHe: cgNameHe.trim(), nameEn: cgNameEn.trim() }]);
    setCgNameHe(''); setCgNameEn('');
  };

  const finishSetup = () => {
    save({ ...data, patient, caregivers, medications, setupDone: true });
    onDone();
  };

  const heroTexts = [
    { title: 'ברוכים הבאים 👋', sub: 'מעקב תרופות — הגדרת פרופיל מטופל' },
    { title: 'אחראי מתן תרופות', sub: 'הוסף לפחות אחד — השאר אופציונלי' },
    { title: 'רשימת תרופות', sub: 'הוסיפו את התרופות של המטופל' },
  ];

  return (
    <div className="flex flex-col min-h-[80vh]">
      {/* Hero */}
      <div className="bg-primary text-primary-foreground p-6 rounded-t-lg">
        <p className="text-xs opacity-80 mb-1">Medication Tracker · מעקב תרופות</p>
        <h2 className="text-xl font-extrabold">{heroTexts[step].title}</h2>
        <p className="text-sm opacity-85 mt-1">{heroTexts[step].sub}</p>
        <div className="flex gap-1.5 mt-4">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1.5 rounded-full flex-1 transition-colors ${i <= step ? 'bg-primary-foreground/90' : 'bg-primary-foreground/30'}`} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-5 space-y-4">
        {step === 0 && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold">שם המטופל (עברית) <span className="text-xs text-muted-foreground mr-1">Patient name</span></label>
              <Input value={patient.nameHe} onChange={e => setPatient(p => ({ ...p, nameHe: e.target.value }))} placeholder="למשל: יוסף כהן" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">שם המטופל (אנגלית)</label>
              <Input value={patient.nameEn} onChange={e => setPatient(p => ({ ...p, nameEn: e.target.value }))} placeholder="e.g. Yosef Cohen" dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">האם המטופל מוזן דרך צינורית PEG?</label>
              <div className="flex gap-2">
                {[{ val: 'none', label: 'לא רלוונטי' }, { val: 'peg', label: 'כן — יש PEG' }].map(opt => (
                  <button key={opt.val}
                    className={`flex-1 rounded-lg border-2 p-2.5 text-sm font-medium transition-colors ${patient.feedingType === opt.val ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted text-muted-foreground'}`}
                    onClick={() => setPatient(p => ({ ...p, feedingType: opt.val }))}
                  >{opt.label}</button>
                ))}
              </div>
              {patient.feedingType === 'peg' && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm">
                  <strong className="text-amber-700 dark:text-amber-400">🧪 הזנה דרך PEG</strong> — צינורית גמישה המוחדרת ישירות לקיבה דרך דופן הבטן. תרופות ב-PEG יסומנו בנפרד.
                </div>
              )}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold">שם אחראי/ת בעברית</label>
              <Input value={cgNameHe} onChange={e => setCgNameHe(e.target.value)} placeholder="למשל: מרים לוי" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">שם באנגלית</label>
              <Input value={cgNameEn} onChange={e => setCgNameEn(e.target.value)} placeholder="e.g. Miriam Levi" dir="ltr" />
            </div>
            <Button variant="outline" className="w-full" onClick={addCaregiver} disabled={!cgNameHe.trim()}>
              <Plus className="h-4 w-4 ml-2" /> הוסף אחראי
            </Button>
            {caregivers.length > 0 && (
              <Card>
                <CardContent className="p-3 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">אחראים שנוספו</p>
                  {caregivers.map(cg => (
                    <div key={cg.id} className="flex items-center justify-between bg-muted rounded-lg p-2.5">
                      <div>
                        <p className="font-semibold text-sm">{cg.nameHe}</p>
                        {cg.nameEn && <p className="text-xs text-muted-foreground">{cg.nameEn}</p>}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setCaregivers(p => p.filter(x => x.id !== cg.id))}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </>
        )}

        {step === 2 && (
          <MedicationAdder medications={medications} setMedications={setMedications} feedingType={patient.feedingType} />
        )}
      </div>

      {/* Footer */}
      <div className="p-5 border-t flex gap-2.5">
        {step > 0 && <Button variant="outline" className="flex-1" onClick={() => setStep(s => s - 1)}>חזרה</Button>}
        {step < 2 && (
          <Button className="flex-[2]"
            disabled={step === 0 ? !patient.nameHe.trim() : false}
            onClick={() => {
              if (step === 1 && cgNameHe.trim()) {
                setCaregivers(p => [...p, { id: uid(), nameHe: cgNameHe.trim(), nameEn: cgNameEn.trim() }]);
                setCgNameHe(''); setCgNameEn('');
              }
              setStep(s => s + 1);
            }}>
            המשך
          </Button>
        )}
        {step === 2 && (
          <Button className="flex-[2]" disabled={medications.length === 0} onClick={finishSetup}>
            סיום הגדרה ✓
          </Button>
        )}
      </div>
    </div>
  );
}

// ═══════════ MEDICATION ADDER ═══════════
function MedicationAdder({ medications, setMedications, feedingType }: {
  medications: Medication[];
  setMedications: React.Dispatch<React.SetStateAction<Medication[]>>;
  feedingType: string;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button className="w-full" onClick={() => setShowModal(true)}>
        <Pill className="h-4 w-4 ml-2" /> הוסף תרופה
      </Button>
      {medications.length > 0 && (
        <div className="space-y-2">
          {medications.map(m => (
            <MedListItem key={m.id} med={m}
              onDelete={() => setMedications(p => p.filter(x => x.id !== m.id))}
              onToggle={() => setMedications(p => p.map(x => x.id === m.id ? { ...x, active: !x.active } : x))}
            />
          ))}
        </div>
      )}
      {showModal && (
        <AddMedModal
          feedingType={feedingType}
          existing={medications}
          onAdd={med => { setMedications(p => [...p, med]); setShowModal(false); }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

// ═══════════ MED LIST ITEM ═══════════
function MedListItem({ med, onDelete, onToggle }: { med: Medication; onDelete: () => void; onToggle: () => void }) {
  return (
    <div className={`bg-card rounded-lg border p-3 flex items-center gap-3 transition-opacity ${med.active ? 'opacity-100' : 'opacity-55'}`}>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{med.nameHe}</p>
        <p className="text-xs text-muted-foreground">{med.nameEn}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {med.dosageAmount} {med.dosageForm} · {med.timesPerDay}×/יום · {med.times.join(', ')}
          {med.isPeg && <Badge variant="secondary" className="mr-2 text-xs">PEG</Badge>}
        </p>
      </div>
      <div className="flex gap-1.5">
        <Button variant="ghost" size="icon" className="h-8 w-8" title={med.active ? 'השהה' : 'הפעל'} onClick={onToggle}>
          {med.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ═══════════ ADD MED MODAL ═══════════
function AddMedModal({ onAdd, onClose, feedingType, existing }: {
  onAdd: (med: Medication) => void;
  onClose: () => void;
  feedingType: string;
  existing: Medication[];
}) {
  const [mode, setMode] = useState<'list' | 'custom'>('list');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof MED_DB[0] | null>(null);
  const [customNameHe, setCustomNameHe] = useState('');
  const [customNameEn, setCustomNameEn] = useState('');
  const [dosageForm, setDosageForm] = useState('כדור');
  const [customDosageForm, setCustomDosageForm] = useState('');
  const [dosageAmount, setDosageAmount] = useState('');
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [times, setTimes] = useState(['08:00']);
  const [routeAdmin, setRouteAdmin] = useState('דרך הפה');
  const [customRouteAdmin, setCustomRouteAdmin] = useState('');

  const handleTimesPerDay = (n: number) => {
    setTimesPerDay(n);
    if (DEFAULT_TIMES[n]) setTimes(DEFAULT_TIMES[n]);
    else { const cur = [...times]; while (cur.length < n) cur.push('08:00'); setTimes(cur.slice(0, n)); }
  };

  const filteredMeds = useMemo(() => {
    const q = search.toLowerCase();
    const existingIds = new Set(existing.map(m => m.dbId));
    const pool = feedingType === 'peg' ? MED_DB : MED_DB.filter(m => !m.isPeg);
    return pool.filter(m => !existingIds.has(m.id) && (m.nameHe.includes(q) || m.nameEn.toLowerCase().includes(q) || m.cat.includes(q)));
  }, [search, existing, feedingType]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof MED_DB> = {};
    filteredMeds.forEach(m => { if (!g[m.cat]) g[m.cat] = []; g[m.cat].push(m); });
    return g;
  }, [filteredMeds]);

  const canAdd = (mode === 'list' ? !!selected : !!customNameHe.trim()) && !!dosageAmount.trim();

  const handleAdd = () => {
    onAdd({
      id: uid(),
      dbId: selected?.id || null,
      nameHe: mode === 'list' ? (selected?.nameHe || '') : customNameHe,
      nameEn: mode === 'list' ? (selected?.nameEn || '') : customNameEn,
      cat: selected?.cat || 'אחר',
      dosageForm,
      dosageAmount: dosageAmount.trim(),
      routeAdmin: routeAdmin === 'אחר' && customRouteAdmin.trim() ? `אחר: ${customRouteAdmin.trim()}` : routeAdmin,
      dosageFormFull: dosageForm === 'אחר' && customDosageForm.trim() ? `אחר: ${customDosageForm.trim()}` : dosageForm,
      timesPerDay,
      times,
      notes: '',
      active: true,
      isPeg: selected?.isPeg || false,
    });
  };

  return (
    <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>הוספת תרופה</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mb-3">
          {[{ val: 'list' as const, label: 'מרשימה' }, { val: 'custom' as const, label: 'הקלדה ידנית' }].map(opt => (
            <button key={opt.val}
              className={`flex-1 rounded-lg border-2 p-2 text-sm font-medium transition-colors ${mode === opt.val ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted text-muted-foreground'}`}
              onClick={() => setMode(opt.val)}
            >{opt.label}</button>
          ))}
        </div>

        {mode === 'list' && (
          <>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pr-9" placeholder="🔍  חיפוש תרופה..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="max-h-52 overflow-y-auto space-y-1 mt-2">
              {Object.entries(grouped).map(([cat, meds]) => (
                <div key={cat}>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider py-1">{cat}</p>
                  {meds.map(m => (
                    <button key={m.id}
                      className={`w-full text-right p-3 rounded-lg border flex items-center gap-2 mb-1 transition-colors ${selected?.id === m.id ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'}`}
                      onClick={() => setSelected(m)}
                    >
                      {m.isPeg && <Pipette className="h-4 w-4 text-muted-foreground shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{m.nameHe}</p>
                        <p className="text-[11px] text-muted-foreground">{m.nameEn}</p>
                      </div>
                      {selected?.id === m.id && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                </div>
              ))}
              {filteredMeds.length === 0 && <p className="text-center text-muted-foreground py-5 text-sm">לא נמצאו תרופות — נסה הקלדה ידנית</p>}
            </div>
          </>
        )}

        {mode === 'custom' && (
          <div className="space-y-2.5">
            <Input placeholder="שם התרופה בעברית *" value={customNameHe} onChange={e => setCustomNameHe(e.target.value)} />
            <Input placeholder="Name in English" value={customNameEn} onChange={e => setCustomNameEn(e.target.value)} dir="ltr" />
          </div>
        )}

        {(selected || mode === 'custom') && (
          <div className="mt-3 space-y-3 border-t pt-3">
            <div className="space-y-2">
              <label className="text-sm font-semibold">דרך מתן התרופה</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ROUTES.map(r => (
                  <button key={r.val}
                    className={`rounded-lg border-2 p-2 text-center text-xs font-medium transition-colors ${routeAdmin === r.val ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted text-muted-foreground'}`}
                    onClick={() => setRouteAdmin(r.val)}
                  >
                    <span className="block">{r.label}</span>
                    <span className="text-[10px] opacity-70">{r.desc}</span>
                  </button>
                ))}
              </div>
              {routeAdmin === 'אחר' && <Input className="mt-1" placeholder="תאר את דרך המתן..." value={customRouteAdmin} onChange={e => setCustomRouteAdmin(e.target.value)} />}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">צורת מינון / אריזה</label>
              <div className="flex flex-wrap gap-1.5">
                {DOSAGE_FORMS.map(f => (
                  <button key={f}
                    className={`rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-colors ${dosageForm === f ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted text-muted-foreground'}`}
                    onClick={() => setDosageForm(f)}
                  >{f}</button>
                ))}
              </div>
              {dosageForm === 'אחר' && <Input className="mt-1" placeholder="תאר את צורת המינון..." value={customDosageForm} onChange={e => setCustomDosageForm(e.target.value)} />}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">כמות / מינון</label>
              <Input placeholder='למשל: 1 כדור, 5 מ"ל' value={dosageAmount} onChange={e => setDosageAmount(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">כמה פעמים ביום · {timesPerDay}× ביום</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(n => (
                  <button key={n}
                    className={`flex-1 rounded-lg border-2 p-2 text-sm font-medium transition-colors ${timesPerDay === n ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted text-muted-foreground'}`}
                    onClick={() => handleTimesPerDay(n)}
                  >{n}×</button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">שעות נתינה</label>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => { setTimesPerDay(p => p + 1); setTimes(p => [...p, '08:00']); }}>
                  + הוסף שעה
                </Button>
              </div>
              <div className="space-y-1.5">
                {times.map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary rounded-md px-2 py-1 text-xs font-bold min-w-[24px] text-center">{i + 1}</span>
                    <input type="time" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" value={t}
                      onChange={e => { const copy = [...times]; copy[i] = e.target.value; setTimes(copy); }} />
                    <span className="text-xs text-muted-foreground min-w-[60px]">{getSessionLabel(t)}</span>
                    {times.length > 1 && (
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => { const c = [...times]; c.splice(i, 1); setTimes(c); setTimesPerDay(p => p - 1); }}>
                        <Minus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <Button className="w-full mt-3" disabled={!canAdd} onClick={handleAdd}>
          הוסף תרופה ✓
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// ═══════════ TODAY VIEW ═══════════
function TodayView({ data, save }: { data: MedTrackState; save: (d: MedTrackState) => void }) {
  const today = todayStr();
  const todayLog = data.logs?.[today] || { sessions: {}, confirmed: false };
  const activeMeds = data.medications.filter(m => m.active);
  const sessions = getTodaySessions(activeMeds);
  const currentTime = getCurrentSessionTime(activeMeds, todayLog);
  const allDone = isAllDone(activeMeds, todayLog);

  const [selectedCg, setSelectedCg] = useState<string | null>(null);
  const [noteModal, setNoteModal] = useState<{ medId: string; time: string } | null>(null);
  const [noteText, setNoteText] = useState('');

  const updateLog = (updates: typeof todayLog) => {
    const newLogs = { ...data.logs, [today]: updates };
    save({ ...data, logs: newLogs });
  };

  const markMed = (time: string, medId: string, given: boolean) => {
    const newLog = { ...todayLog, sessions: { ...todayLog.sessions } };
    if (!newLog.sessions[time]) newLog.sessions[time] = {};
    newLog.sessions[time] = {
      ...newLog.sessions[time],
      [medId]: { given, caregiverId: selectedCg || undefined, givenAt: new Date().toISOString() }
    };
    updateLog(newLog);
  };

  const confirmDay = () => {
    updateLog({ ...todayLog, confirmed: true });
  };

  const totalMeds = sessions.reduce((sum, time) => sum + getMedsForTime(activeMeds, time).length, 0);
  const doneMeds = sessions.reduce((sum, time) => {
    const slot = todayLog.sessions?.[time] || {};
    return sum + getMedsForTime(activeMeds, time).filter(m => slot[m.id]?.given !== undefined).length;
  }, 0);
  const progressPct = totalMeds ? Math.round((doneMeds / totalMeds) * 100) : 0;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">מעקב יומי · {formatDateHe(today)}</h2>
        <p className="text-sm text-muted-foreground">מטופל: {data.patient.nameHe}</p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">{doneMeds}/{totalMeds} תרופות סומנו</span>
            <span className="text-sm text-muted-foreground">{progressPct}%</span>
          </div>
          <Progress value={progressPct} className="h-2" />
        </CardContent>
      </Card>

      {/* Caregiver selection */}
      {data.caregivers.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">מי נותן/ת עכשיו?</p>
            <div className="flex flex-wrap gap-2">
              {data.caregivers.map(cg => (
                <button key={cg.id}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${selectedCg === cg.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'}`}
                  onClick={() => setSelectedCg(selectedCg === cg.id ? null : cg.id)}
                >{cg.nameHe}</button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sessions */}
      {sessions.map(time => {
        const meds = getMedsForTime(activeMeds, time);
        const slot = todayLog.sessions?.[time] || {};
        const sessionDone = meds.every(m => slot[m.id]?.given !== undefined);
        const isCurrent = time === currentTime;

        return (
          <Card key={time} className={isCurrent ? 'ring-2 ring-primary' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{getSessionLabel(time)}</CardTitle>
                {sessionDone && <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200">✓ הושלם</Badge>}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {meds.map(m => {
                const entry = slot[m.id];
                const isDone = entry?.given === true;
                const isSkipped = entry?.given === false;
                const cg = data.caregivers.find(c => c.id === entry?.caregiverId);

                return (
                  <div key={m.id}
                    className={`rounded-lg border-2 p-3 transition-colors ${isDone ? 'bg-green-50 dark:bg-green-950/30 border-green-300' : isSkipped ? 'bg-red-50 dark:bg-red-950/30 border-red-300 opacity-70' : 'border-border'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${isDone ? 'bg-green-500' : isSkipped ? 'bg-destructive' : 'border-2 border-border'}`}>
                        {isDone && <Check className="h-4 w-4 text-white" />}
                        {isSkipped && <X className="h-4 w-4 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{m.nameHe}</p>
                        <p className="text-xs text-muted-foreground">{m.nameEn}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{m.dosageAmount} {m.dosageForm}</p>
                        {cg && <p className="text-xs text-muted-foreground mt-1">👤 {cg.nameHe} · {entry?.givenAt ? new Date(entry.givenAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }) : ''}</p>}
                      </div>
                      {!isDone && !isSkipped && (
                        <div className="flex gap-1.5">
                          <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700" onClick={() => markMed(time, m.id, true)}>
                            <Check className="h-3.5 w-3.5 ml-1" /> ניתן
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 text-destructive border-destructive/30" onClick={() => markMed(time, m.id, false)}>
                            <X className="h-3.5 w-3.5 ml-1" /> דולג
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}

      {/* Confirm day */}
      {allDone && !todayLog.confirmed && (
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-base font-bold shadow-lg" onClick={confirmDay}>
          <Check className="h-5 w-5 ml-2" /> אישור יום — כל התרופות סומנו
        </Button>
      )}
      {todayLog.confirmed && (
        <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-400 rounded-lg p-4 text-center text-green-700 dark:text-green-400 font-bold">
          ✅ היום אושר — כל הנתונים נשמרו
        </div>
      )}
    </div>
  );
}

// ═══════════ CALENDAR VIEW ═══════════
function CalendarView({ data }: { data: MedTrackState }) {
  const today = todayStr();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getDayStr = (d: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const getDayClass = (d: number) => {
    const ds = getDayStr(d);
    if (ds === today) return 'ring-2 ring-primary font-extrabold text-primary';
    if (ds > today) return 'text-muted-foreground/50';
    const status = getDayStatus(data.medications, data.logs?.[ds]);
    if (status === 'ok') return 'bg-green-500 text-white';
    if (status === 'partial') return 'bg-amber-500 text-white';
    return '';
  };

  const selectedLog = selectedDay ? data.logs?.[getDayStr(selectedDay)] : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setViewDate(new Date(year, month + 1, 1))}><ChevronRight className="h-5 w-5" /></Button>
        <div className="text-center">
          <h2 className="text-lg font-bold">{MONTHS_HE[month]} {year}</h2>
          <p className="text-xs text-muted-foreground">לוח מעקב חודשי</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setViewDate(new Date(year, month - 1, 1))}><ChevronLeft className="h-5 w-5" /></Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS_HE.map(d => <div key={d} className="text-center text-[11px] font-bold text-muted-foreground py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => d === null
              ? <div key={`e${i}`} className="aspect-square" />
              : (
                <button key={d}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${getDayClass(d)} ${selectedDay === d ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedDay(selectedDay === d ? null : d)}
                >{d}</button>
              )
            )}
          </div>
          <div className="flex gap-3 mt-3 justify-center flex-wrap">
            {[{ c: 'bg-green-500', l: 'כל התרופות ✓' }, { c: 'bg-amber-500', l: 'חלקי' }, { c: 'bg-destructive', l: 'לא אושר' }].map(({ c, l }) => (
              <div key={l} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <div className={`w-3 h-3 rounded-sm ${c}`} />
                {l}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedDay && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{formatDateHe(getDayStr(selectedDay))}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLog ? (
              <div className="space-y-3">
                {getTodaySessions(data.medications.filter(m => m.active)).map(time => {
                  const slot = selectedLog.sessions?.[time] || {};
                  const meds = getMedsForTime(data.medications.filter(m => m.active), time);
                  return (
                    <div key={time}>
                      <p className="text-xs font-bold text-muted-foreground mb-1">{getSessionLabel(time)}</p>
                      {meds.map(m => {
                        const e = slot[m.id];
                        const cg = data.caregivers.find(c => c.id === e?.caregiverId);
                        return (
                          <div key={m.id} className="border rounded-lg p-2.5 mb-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-sm">{m.nameHe}</span>
                              {e?.given === true && <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">✓ ניתן</Badge>}
                              {e?.given === false && <Badge variant="destructive" className="text-xs">✗ דולג</Badge>}
                              {!e && <Badge variant="secondary" className="text-xs">לא סומן</Badge>}
                            </div>
                            {cg && <p className="text-xs text-muted-foreground mt-1">👤 {cg.nameHe}</p>}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                {selectedLog.confirmed && <p className="text-center text-green-600 text-sm font-semibold pt-2">✅ היום אושר</p>}
              </div>
            ) : <p className="text-center text-muted-foreground py-4 text-sm">אין נתונים ליום זה</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ═══════════ MEDS VIEW ═══════════
function MedsView({ data, save }: { data: MedTrackState; save: (d: MedTrackState) => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const setMeds = (fn: ((prev: Medication[]) => Medication[]) | Medication[]) => {
    const next = typeof fn === 'function' ? fn(data.medications) : fn;
    save({ ...data, medications: next });
  };
  const activeMeds = data.medications.filter(m => m.active);
  const inactiveMeds = data.medications.filter(m => !m.active);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">תרופות · Medications</h2>
          <p className="text-sm text-muted-foreground">{activeMeds.length} פעילות · {inactiveMeds.length} מושהות</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Pill className="h-4 w-4 ml-1" /> הוסף
        </Button>
      </div>

      {data.medications.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <p className="text-4xl mb-2">💊</p>
          <p className="font-bold">אין תרופות עדיין</p>
          <p className="text-sm mt-1">לחץ "הוסף" להתחיל</p>
        </div>
      )}

      {activeMeds.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">פעילות · Active</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {activeMeds.map(m => (
              <MedListItem key={m.id} med={m}
                onDelete={() => setMeds(p => p.filter(x => x.id !== m.id))}
                onToggle={() => setMeds(p => p.map(x => x.id === m.id ? { ...x, active: !x.active } : x))}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {inactiveMeds.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">מושהות · Paused</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {inactiveMeds.map(m => (
              <MedListItem key={m.id} med={m}
                onDelete={() => setMeds(p => p.filter(x => x.id !== m.id))}
                onToggle={() => setMeds(p => p.map(x => x.id === m.id ? { ...x, active: !x.active } : x))}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {showAdd && (
        <AddMedModal
          feedingType={data.patient.feedingType}
          existing={data.medications}
          onAdd={med => { setMeds(p => [...p, med]); setShowAdd(false); }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}

// ═══════════ REPORTS VIEW ═══════════
function ReportsView({ data }: { data: MedTrackState }) {
  const [period, setPeriod] = useState('daily');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState('');

  const periodKeys = getRangeKeys(data, period);

  const handlePrint = () => {
    const txt = buildReportText(data, period);
    const patientName = data.patient.nameHe || 'מטופל';
    const w = window.open('', '_blank', 'width=700,height=800');
    if (w) {
      w.document.write(`<html dir="rtl"><head><meta charset="UTF-8"><title>דוח תרופות — ${patientName}</title>
      <style>body{font-family:Arial,sans-serif;padding:32px;direction:rtl;font-size:14px;line-height:1.8;white-space:pre-wrap;}</style></head>
      <body>${txt.replace(/\n/g, '<br>')}<script>window.onload=()=>window.print();<\/script></body></html>`);
      w.document.close();
    }
  };

  const handleEmail = () => {
    if (!email.trim()) return;
    const txt = buildReportText(data, period);
    const patientName = data.patient.nameHe || 'מטופל';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`דוח מעקב תרופות — ${patientName}`)}&body=${encodeURIComponent(txt)}`;
    setSent('mail');
  };

  const handleWhatsApp = () => {
    if (!phone.trim()) return;
    const txt = buildReportText(data, period);
    let num = phone.replace(/\D/g, '');
    if (num.startsWith('0')) num = '972' + num.slice(1);
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(txt)}`, '_blank');
    setSent('wa');
  };

  const periodLabel = period === 'daily' ? 'יומי' : period === 'weekly' ? 'שבועי' : 'חודשי';

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">דוחות · Reports</h2>
        <p className="text-sm text-muted-foreground">הפקת דוח מעקב תרופות</p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground">תקופת הדוח</p>
          <div className="flex gap-2">
            {[{ v: 'daily', l: 'יומי' }, { v: 'weekly', l: 'שבועי' }, { v: 'monthly', l: 'חודשי' }].map(({ v, l }) => (
              <button key={v}
                className={`flex-1 rounded-lg border-2 p-2 text-sm font-medium transition-colors ${period === v ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted text-muted-foreground'}`}
                onClick={() => { setPeriod(v); setSent(''); }}
              >{l}</button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {periodKeys.length > 0 ? `נמצאו ${periodKeys.length} ימים עם נתונים` : <span className="text-destructive">אין נתונים לתקופה זו</span>}
          </p>
        </CardContent>
      </Card>

      {periodKeys.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">תצוגה מקדימה</p>
            <div className="bg-muted rounded-lg p-3 max-h-44 overflow-y-auto text-xs leading-relaxed whitespace-pre-wrap font-mono">
              {buildReportText(data, period)}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground">🖨 הדפסה</p>
          <Button className="w-full" onClick={handlePrint} disabled={!periodKeys.length}>
            <Printer className="h-4 w-4 ml-2" /> הדפס דוח {periodLabel}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground">📧 שליחה במייל</p>
          <Input type="email" placeholder="name@example.com" value={email} onChange={e => { setEmail(e.target.value); setSent(''); }} dir="ltr" />
          <Button className="w-full" onClick={handleEmail} disabled={!periodKeys.length || !email.trim()}>
            <Mail className="h-4 w-4 ml-2" /> שלח דוח במייל
          </Button>
          {sent === 'mail' && <p className="text-xs text-green-600 text-center">✓ נפתח לקוח המייל שלך</p>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground">💬 שליחה בוואטסאפ</p>
          <Input type="tel" placeholder="050-0000000" value={phone} onChange={e => { setPhone(e.target.value); setSent(''); }} dir="ltr" />
          <p className="text-[11px] text-muted-foreground">ניתן עם 0 בהתחלה — יוסב אוטומטית ל-972</p>
          <Button className="w-full bg-[#25D366] hover:bg-[#1da851] text-white" onClick={handleWhatsApp} disabled={!periodKeys.length || !phone.trim()}>
            <MessageCircle className="h-4 w-4 ml-2" /> שלח בוואטסאפ
          </Button>
          {sent === 'wa' && <p className="text-xs text-green-600 text-center">✓ נפתח וואטסאפ</p>}
        </CardContent>
      </Card>
    </div>
  );
}

// ═══════════ SETTINGS VIEW ═══════════
function SettingsView({ data, save, onReset }: { data: MedTrackState; save: (d: MedTrackState) => void; onReset: () => void }) {
  const [editPatient, setEditPatient] = useState(false);
  const [patient, setPatient] = useState(data.patient);
  const [showAddCg, setShowAddCg] = useState(false);
  const [cgHe, setCgHe] = useState('');
  const [cgEn, setCgEn] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const savePatient = () => { save({ ...data, patient }); setEditPatient(false); };

  const addCg = () => {
    if (!cgHe.trim()) return;
    save({ ...data, caregivers: [...data.caregivers, { id: uid(), nameHe: cgHe.trim(), nameEn: cgEn.trim() }] });
    setCgHe(''); setCgEn(''); setShowAddCg(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">הגדרות · Settings</h2>

      {/* Patient */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground">פרטי מטופל</p>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditPatient(!editPatient)}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          {editPatient ? (
            <div className="space-y-2.5">
              <Input value={patient.nameHe} onChange={e => setPatient(p => ({ ...p, nameHe: e.target.value }))} placeholder="שם בעברית" />
              <Input value={patient.nameEn} onChange={e => setPatient(p => ({ ...p, nameEn: e.target.value }))} placeholder="Name in English" dir="ltr" />
              <div className="flex gap-2">
                {[{ val: 'oral', label: 'פומי' }, { val: 'peg', label: 'PEG' }].map(opt => (
                  <button key={opt.val}
                    className={`flex-1 rounded-lg border-2 p-2 text-sm font-medium transition-colors ${patient.feedingType === opt.val ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-muted text-muted-foreground'}`}
                    onClick={() => setPatient(p => ({ ...p, feedingType: opt.val }))}
                  >{opt.label}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setEditPatient(false)}>ביטול</Button>
                <Button className="flex-1" onClick={savePatient}>שמור</Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-bold text-base">{data.patient.nameHe}</p>
              {data.patient.nameEn && <p className="text-xs text-muted-foreground">{data.patient.nameEn}</p>}
              <Badge variant="secondary" className="mt-2">{data.patient.feedingType === 'peg' ? '🧪 PEG' : 'פומי'}</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Caregivers */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground">אחראי מתן תרופות</p>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowAddCg(!showAddCg)}>
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
          {showAddCg && (
            <div className="space-y-2 mb-3 p-3 bg-muted rounded-lg">
              <Input value={cgHe} onChange={e => setCgHe(e.target.value)} placeholder="שם בעברית *" />
              <Input value={cgEn} onChange={e => setCgEn(e.target.value)} placeholder="Name in English" dir="ltr" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowAddCg(false)}>ביטול</Button>
                <Button size="sm" className="flex-1" onClick={addCg}>הוסף</Button>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {data.caregivers.map(cg => (
              <div key={cg.id} className="flex items-center justify-between py-2.5 border-b last:border-b-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {cg.nameHe[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{cg.nameHe}</p>
                    {cg.nameEn && <p className="text-xs text-muted-foreground">{cg.nameEn}</p>}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => save({ ...data, caregivers: data.caregivers.filter(x => x.id !== cg.id) })}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardContent className="p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-3">סטטיסטיקה</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'ימים במעקב', val: Object.keys(data.logs || {}).length },
              { label: 'ימים אושרו', val: Object.values(data.logs || {}).filter(l => l.confirmed).length },
              { label: 'תרופות פעילות', val: data.medications.filter(m => m.active).length },
              { label: 'אחראים', val: data.caregivers.length },
            ].map(({ label, val }) => (
              <div key={label} className="bg-muted rounded-lg p-3 text-center">
                <p className="text-2xl font-extrabold text-primary">{val}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reset */}
      <Card className="border-destructive/30">
        <CardContent className="p-4">
          <p className="text-xs font-semibold text-destructive mb-3">אזור מסוכן</p>
          {confirmReset ? (
            <div>
              <p className="text-sm text-destructive font-semibold mb-3">⚠️ כל הנתונים יימחקו לצמיתות. האם אתה בטוח?</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setConfirmReset(false)}>ביטול</Button>
                <Button variant="destructive" size="sm" className="flex-1" onClick={() => { localStorage.removeItem('medtrack_v2'); onReset(); }}>מחק הכל</Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" className="w-full text-destructive border-destructive/30" onClick={() => setConfirmReset(true)}>
              🗑 איפוס כל הנתונים
            </Button>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground py-2">
        מעקב תרופות · גיל הזהב · v2.0<br />הנתונים שמורים בדפדפן שלך בלבד
      </p>
    </div>
  );
}

// ═══════════ MAIN PAGE ═══════════
const MedTracker = () => {
  const [data, setData] = useState<MedTrackState>(loadState);
  const [activeTab, setActiveTab] = useState('today');

  const save = useCallback((newData: MedTrackState) => {
    setData(newData);
    saveState(newData);
  }, []);

  const isSetupDone = data.patient?.nameHe && data.caregivers?.length > 0 && data.medications?.length > 0;

  return (
    <div className="container py-6 max-w-2xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Pill className="h-6 w-6 text-primary" /> ניהול ומעקב מתן תרופות
        </h1>
        <p className="text-sm text-muted-foreground">מעקב יומי, לוח שנה, דוחות והגדרות</p>
      </div>

      {!isSetupDone ? (
        <Card>
          <CardContent className="p-0">
            <SetupWizard data={data} save={save} onDone={() => setActiveTab('today')} />
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-5 mb-4">
            <TabsTrigger value="today" className="text-xs gap-1">
              <Calendar className="h-3.5 w-3.5" /> היום
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs gap-1">
              <Calendar className="h-3.5 w-3.5" /> לוח
            </TabsTrigger>
            <TabsTrigger value="meds" className="text-xs gap-1">
              <Pill className="h-3.5 w-3.5" /> תרופות
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs gap-1">
              <FileText className="h-3.5 w-3.5" /> דוחות
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs gap-1">
              <Settings className="h-3.5 w-3.5" /> הגדרות
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today"><TodayView data={data} save={save} /></TabsContent>
          <TabsContent value="calendar"><CalendarView data={data} /></TabsContent>
          <TabsContent value="meds"><MedsView data={data} save={save} /></TabsContent>
          <TabsContent value="reports"><ReportsView data={data} /></TabsContent>
          <TabsContent value="settings"><SettingsView data={data} save={save} onReset={() => { save(EMPTY_STATE); setActiveTab('today'); }} /></TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default MedTracker;
