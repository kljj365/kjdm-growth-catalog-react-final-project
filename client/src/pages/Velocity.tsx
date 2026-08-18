/** Signal Ledger project: Velocity demonstrates a responsive operations dashboard with focus selection and interaction state. */
import ProjectShell from "@/components/ProjectShell";
import { ArrowRight, Check, ChevronRight, CircleDotDashed, Clock3, MoreHorizontal, Plus, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

type TaskStatus = "Today" | "Blocked" | "Review";
type Task = { id: number; title: string; team: string; status: TaskStatus; owner: string; priority: "High" | "Medium" | "Low" };

const tasks: Task[] = [
  { id: 1, title: "Refine mobile navigation states", team: "Product", status: "Today", owner: "Maya", priority: "High" },
  { id: 2, title: "Verify empty-state keyboard flow", team: "Core UI", status: "Today", owner: "Jon", priority: "Medium" },
  { id: 3, title: "Resolve checkout loading edge case", team: "Commerce", status: "Blocked", owner: "Kai", priority: "High" },
  { id: 4, title: "Document reusable filter controls", team: "System", status: "Review", owner: "Ana", priority: "Low" },
];

export default function Velocity() {
  const [filter, setFilter] = useState<TaskStatus | "All">("All");
  const [selected, setSelected] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const visibleTasks = useMemo(() => tasks.filter((task) => filter === "All" || task.status === filter), [filter]);
  const activeTask = tasks.find((task) => task.id === selected) ?? tasks[0];
  const toggleComplete = (id: number) => setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <ProjectShell label="LIVE BUILD / 01" title="Velocity" stack="React · TypeScript" interaction="Filters + review state" outcome="One clear next action">
      <main className="velocity-app">
        <section className="velocity-hero">
          <div>
            <p className="project-kicker"><span /> OPERATIONS WORKSPACE</p>
            <h1>Keep the signal.<br /><em>Lose the noise.</em></h1>
            <p>Velocity makes work queue state visible: what needs attention, who owns it, and what should move next.</p>
          </div>
          <div className="velocity-hero-stat"><span>WEEKLY RHYTHM</span><strong>72<small>%</small></strong><p>work completed before its planned handoff</p></div>
        </section>

        <section className="velocity-board" aria-label="Velocity project dashboard">
          <aside className="velocity-sidebar">
            <div className="velocity-wordmark"><span className="velocity-mark" /> velocity</div>
            <nav aria-label="Workspace areas">
              <a className="active" href="#overview"><CircleDotDashed size={17} /> Overview</a>
              <a href="#today"><Clock3 size={17} /> Today <span>04</span></a>
              <a href="#insights"><Sparkles size={17} /> Insights</a>
            </nav>
            <div className="sidebar-note"><span>TEAM FOCUS</span><strong>Frontend system<br />maintenance</strong><i /></div>
          </aside>

          <div className="velocity-main" id="overview">
            <div className="velocity-main-head"><div><p>MONDAY / 17 AUG</p><h2>What needs your eyes?</h2></div><button type="button" className="velocity-add"><Plus size={16} /> Add signal</button></div>
            <div className="velocity-metrics">
              <div><span>FOCUS TIME</span><strong>05h 40m</strong><p><i className="up" /> 18% from last week</p></div>
              <div><span>OPEN HANDOFFS</span><strong>03</strong><p>Two due before 3 PM</p></div>
              <div><span>TEAM HEALTH</span><strong>Good</strong><p><i className="up" /> Clear runway</p></div>
            </div>

            <div className="velocity-task-heading" id="today"><div><span>WORK QUEUE</span><h3>Today’s signal</h3></div><div className="velocity-filter-group" aria-label="Filter tasks">{(["All", "Today", "Blocked", "Review"] as const).map((item) => <button type="button" className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div>
            <div className="velocity-task-list">
              {visibleTasks.map((task) => <button type="button" onClick={() => setSelected(task.id)} className={selected === task.id ? "velocity-task is-selected" : "velocity-task"} key={task.id}><span className={`task-priority task-priority--${task.priority.toLowerCase()}`} /><span className="task-copy"><strong>{task.title}</strong><small>{task.team} · {task.owner}</small></span><span className={`task-status task-status--${task.status.toLowerCase()}`}>{task.status}</span><ChevronRight size={18} /></button>)}
            </div>
          </div>

          <aside className="velocity-detail">
            <button className="detail-menu" type="button" aria-label="More options"><MoreHorizontal size={20} /></button>
            <p>SELECTED SIGNAL</p><h3>{activeTask.title}</h3><span className={`task-status task-status--${activeTask.status.toLowerCase()}`}>{activeTask.status}</span>
            <div className="detail-divider" />
            <dl><div><dt>OWNER</dt><dd><span className="avatar">{activeTask.owner.slice(0, 1)}</span>{activeTask.owner}</dd></div><div><dt>PRIORITY</dt><dd>{activeTask.priority}</dd></div><div><dt>HANDOFF</dt><dd>Today, 2:30 PM</dd></div></dl>
            <button type="button" onClick={() => toggleComplete(activeTask.id)} className={completed.includes(activeTask.id) ? "complete-task done" : "complete-task"}>{completed.includes(activeTask.id) ? <><Check size={16} /> Marked reviewed</> : <>Mark reviewed <ArrowRight size={16} /></>}</button>
          </aside>
        </section>
        <section className="project-postscript"><p><span>INTERACTION NOTES</span> Filtered state, selected-task context, and completion feedback are implemented with React state.</p><a href="/">Return to portfolio <ArrowRight size={15} /></a></section>
      </main>
    </ProjectShell>
  );
}
