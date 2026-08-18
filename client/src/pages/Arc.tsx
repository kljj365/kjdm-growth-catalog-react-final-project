/** Signal Ledger project: Arc demonstrates a progressive booking flow with availability and confirmation states. */
import ProjectShell from "@/components/ProjectShell";
import { ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

const days = [
  { day: "MON", date: 17 }, { day: "TUE", date: 18 }, { day: "WED", date: 19 }, { day: "THU", date: 20 }, { day: "FRI", date: 21 }, { day: "SAT", date: 22 }, { day: "SUN", date: 23 },
];
const slots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

export default function Arc() {
  const [selectedDay, setSelectedDay] = useState(18);
  const [selectedSlot, setSelectedSlot] = useState("10:30 AM");
  const [confirmed, setConfirmed] = useState(false);
  const dayLabel = useMemo(() => days.find((day) => day.date === selectedDay), [selectedDay]);

  return (
    <ProjectShell label="LIVE BUILD / 03" title="Arc" stack="React · Responsive UI" interaction="Selection + confirmation" outcome="A confident booked time">
      <main className="arc-app">
        <section className="arc-topline"><span>ARC / APPOINTMENT DESIGN</span><span>ONE GOOD HOUR, CLEARLY PLANNED</span></section>
        <section className="arc-hero"><div><p className="project-kicker"><span /> BOOK WITH INTENTION</p><h1>Read availability.<br /><em>Choose with confidence.</em></h1><p>Arc uses progressive disclosure so a visitor can understand availability, choose a time, and confirm the next step without second-guessing.</p></div><div className="arc-hero-shape" aria-hidden="true"><div /><i /><span /></div></section>
        <section className="arc-booking" aria-label="Booking flow"><div className="arc-service"><p>SELECTED SESSION</p><h2>Interface review</h2><div className="service-rule" /><dl><div><dt><Clock3 size={17} /> Duration</dt><dd>45 minutes</dd></div><div><dt><MapPin size={17} /> Location</dt><dd>Google Meet</dd></div><div><dt><ShieldCheck size={17} /> Format</dt><dd>Focused 1:1</dd></div></dl><p className="service-detail">Bring a current screen or user flow. We will leave with a short set of high-leverage interface decisions.</p></div><div className="arc-selector"><div className="selector-step"><span>01 / DATE</span><h2>Choose a day</h2><div className="date-strip"><button type="button" aria-label="Previous dates"><ChevronLeft size={17} /></button>{days.map((day) => <button type="button" onClick={() => { setSelectedDay(day.date); setConfirmed(false); }} className={selectedDay === day.date ? "date-button active" : "date-button"} key={day.date}><small>{day.day}</small><strong>{day.date}</strong></button>)}<button type="button" aria-label="Next dates"><ChevronRight size={17} /></button></div></div><div className="selector-step"><span>02 / TIME</span><h2>Available slots</h2><div className="slot-grid">{slots.map((slot) => <button type="button" onClick={() => { setSelectedSlot(slot); setConfirmed(false); }} className={selectedSlot === slot ? "slot-button active" : "slot-button"} key={slot}>{slot}</button>)}</div></div></div><div className={confirmed ? "arc-summary confirmed" : "arc-summary"}><p>03 / CONFIRM</p>{confirmed ? <><div className="confirmation-mark"><Check size={26} /></div><h2>Time held.</h2><span>{dayLabel?.day}, Aug {dayLabel?.date} · {selectedSlot}</span><p className="summary-copy">A calendar note and meeting link would arrive next.</p><button type="button" onClick={() => setConfirmed(false)} className="summary-secondary">Choose another slot</button></> : <><div className="summary-row"><CalendarDays size={20} /><span>{dayLabel?.day}, AUG {dayLabel?.date}<br /><strong>{selectedSlot}</strong></span></div><button type="button" onClick={() => setConfirmed(true)} className="arc-confirm">Confirm this time <ArrowRight size={17} /></button><p className="summary-copy">Free to reschedule up to 24 hours ahead.</p></>}</div></section>
        <section className="arc-bottom"><span>BUILD FOCUS</span><p>Progressive disclosure, selection feedback, and confirmation state make a high-stakes next action feel compact and understandable.</p><a href="/">Return to portfolio <ArrowRight size={15} /></a></section>
      </main>
    </ProjectShell>
  );
}
