/**
 * Signal Ledger design: Swiss editorial portfolio, paper/ink surfaces, signal-orange accents,
 * asymmetric document spine, technical annotations, and evidence-led project storytelling.
 */
import { useTheme } from "@/contexts/ThemeContext";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Github,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: "01",
    title: "Velocity",
    eyebrow: "Operations command center",
    detail: "A responsive workspace for prioritizing work, reading live signals, and moving focus without losing context.",
    stack: ["React", "TypeScript", "State patterns"],
    interaction: "Task filtering and selected-work context",
    outcome: "Priorities remain legible across work states",
    image: "/manus-storage/kj-project-velocity_07d9ad11.jpg",
    href: "/velocity",
    status: "Live interaction study",
  },
  {
    id: "02",
    title: "Foundry",
    eyebrow: "Product discovery interface",
    detail: "A tactile storefront study built around fast filtering, cart feedback, and a deliberate mobile product journey.",
    stack: ["React", "Accessible forms", "UI systems"],
    interaction: "Category filtering, sorting, and cart feedback",
    outcome: "A product decision path with visible system states",
    image: "/manus-storage/kj-project-foundry_4d1fc7c7.jpg",
    href: "/foundry",
    status: "Live interaction study",
  },
  {
    id: "03",
    title: "Arc",
    eyebrow: "Planning and booking flow",
    detail: "A scheduling experience that makes availability, duration, and next steps legible at a glance.",
    stack: ["React", "Keyboard UX", "Responsive layout"],
    interaction: "Date, time, and confirmation state selection",
    outcome: "Booking choices stay clear from first click to confirmation",
    image: "/manus-storage/kj-project-arc_640c152c.jpg",
    href: "/arc",
    status: "Live interaction study",
  },
  {
    id: "04",
    title: "Reel Atlas",
    eyebrow: "Public API search application",
    detail: "A course-aligned JavaScript final project that turns live catalog queries into focused, stateful search results.",
    stack: ["Fetch API", "Async states", "Responsive UI"],
    interaction: "Live search, sorting, and loading-state recovery",
    outcome: "A deployable public API search experience",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85",
    href: "/reel-atlas",
    status: "Module 5 final build",
  },
  {
    id: "05",
    title: "People Atlas",
    eyebrow: "Public directory interface",
    detail: "A business-facing directory view that transforms public sample records into clear search, pending, no-match, and failure states.",
    stack: ["Fetch API", "Query state", "Directory UX"],
    interaction: "Search with pending, no-match, and failure states",
    outcome: "A readable directory workflow built around public sample data",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    href: "/people-atlas",
    status: "Take-home companion build",
  },
  {
    id: "06",
    title: "Growth Catalog",
    eyebrow: "KJDM React take-home study",
    detail: "An original service-discovery interface with route-based scope, filters, planning-cart state, and visible recovery behavior.",
    stack: ["React", "Wouter", "Client state"],
    interaction: "Routes, search, planning cart, and recovery state",
    outcome: "A documented Module 6-ready React interaction system",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    href: "/growth-catalog",
    status: "Original React take-home build",
  },
];

const capabilities = [
  "Semantic HTML & accessible UI",
  "Responsive CSS systems",
  "JavaScript and React components",
  "Client-side state & interaction design",
  "Git-based delivery workflow",
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="ledger-page">
      <header className="ledger-header">
        <a className="brand-lockup" href="#top" aria-label="Kyle Johnson frontend portfolio home">
          <img src="/manus-storage/kj-signal-mark_52c941f0.png" alt="" className="brand-mark" />
          <span className="brand-name">KJ</span>
          <span className="brand-tag">// FRONTEND</span>
        </a>

        <nav className={menuOpen ? "site-nav site-nav--open" : "site-nav"} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#approach" onClick={closeMenu}>Approach</a>
          <a href="#results" onClick={closeMenu}>Results</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="https://github.com/kljj365" target="_blank" rel="noreferrer" onClick={closeMenu}>GitHub <ArrowUpRight size={13} /></a>
        </nav>

        <div className="header-actions">
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle color mode">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-index" aria-hidden="true">
            <span>INDEX</span>
            <span>01—24</span>
          </div>
          <div className="hero-copy">
            <p className="kicker"><span className="signal-dot" /> FRONTEND ENGINEER / PORTFOLIO</p>
            <h1 id="hero-heading">Interfaces that make <em>complex work</em> feel obvious.</h1>
            <p className="hero-summary">Kyle Johnson builds responsive, accessible frontends with purposeful interaction design and a preference for clarity over decoration.</p>
            <div className="hero-actions">
              <a className="primary-link" href="#work">Inspect the live builds <ArrowDownRight size={18} /></a>
              <a className="secondary-link" href="#approach">Read the approach <ArrowDownRight size={18} /></a>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/manus-storage/kj-signal-ledger-hero_438e2adb.jpg" alt="Editorial technical desk composition with layered interface materials" />
            <div className="image-note image-note--top">CURRENT SET / 2026</div>
            <div className="image-note image-note--bottom">DESIGN × BUILD</div>
          </div>
          <div className="scroll-cue" aria-hidden="true"><span>SCROLL TO REVIEW</span><div /></div>
        </section>

        <section className="proof-strip" aria-label="Portfolio context">
          <p>BUILDING IN PUBLIC</p>
          <span />
          <p>REACT / TYPESCRIPT / CSS</p>
          <span />
          <p>ACCESSIBILITY MINDED</p>
          <span />
          <p>DETAIL ORIENTED</p>
        </section>

        <section id="work" className="work-section" aria-labelledby="work-heading">
          <div className="section-rail">
            <span>01</span>
            <span>SELECTED BUILDS</span>
            <i className="rail-signal" aria-hidden="true" />
          </div>
          <div className="section-heading">
            <p className="kicker"><span className="signal-dot" /> LIVE INTERACTION STUDIES</p>
            <h2 id="work-heading">Each build is an argument for thoughtful UI.</h2>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className={index % 2 === 1 ? "project-card project-card--offset" : "project-card"} key={project.id}>
                <a className="project-image-wrap" href={project.href} aria-label={`Open ${project.title} live project`}>
                  <img src={project.image} alt="" />
                  <span className="project-id">{project.id}</span>
                  <span className="image-evidence"><i /> EVIDENCE FRAME / {project.id}</span>
                  <span className="project-arrow"><ArrowUpRight size={19} /></span>
                </a>
                <div className="project-info">
                  <div className="project-meta"><span>{project.eyebrow}</span><span>{project.status}</span></div>
                  <h3><a href={project.href}>{project.title}</a></h3>
                  <p>{project.detail}</p>
                  <dl className="project-evidence" aria-label={`${project.title} documented evidence`}>
                    <div><dt>STACK</dt><dd>{project.stack.join(" / ")}</dd></div>
                    <div><dt>INTERACTION</dt><dd>{project.interaction}</dd></div>
                    <div><dt>OUTCOME</dt><dd>{project.outcome}</dd></div>
                  </dl>
                  <a className="text-link" href={project.href}>Open the build <ArrowUpRight size={15} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="approach" className="approach-section" aria-labelledby="approach-heading">
          <div className="approach-grid">
            <div className="approach-statement">
              <p className="kicker"><span className="signal-dot" /> HOW THE WORK IS MADE</p>
              <h2 id="approach-heading">Clear systems. Deliberate details. No mystery meat UI.</h2>
              <p>Good frontend work balances visual judgment, semantics, and the small interaction choices that reduce friction. The goal is not an impressive screenshot—it is a page that makes sense in motion.</p>
            </div>
            <div className="method-card">
              <span className="method-number">/ 01</span>
              <h3>Frame the job</h3>
              <p>Understand the user’s next action before choosing the interface pattern.</p>
              <span className="method-number">/ 02</span>
              <h3>Build the system</h3>
              <p>Use reusable components, responsive rules, and a visible hierarchy.</p>
              <span className="method-number">/ 03</span>
              <h3>Test the edges</h3>
              <p>Check empty states, keyboard flows, contrast, and smaller screens.</p>
            </div>
          </div>

          <div className="capability-grid">
            <div className="capability-lead"><Code2 size={24} /><span>CORE PRACTICE</span></div>
            {capabilities.map((item, index) => <div className="capability" key={item}><span>0{index + 1}</span>{item}</div>)}
          </div>
        </section>

        <section id="results" className="results-section" aria-labelledby="results-heading">
          <div className="section-rail">
            <span>03</span>
            <span>VERIFIED PROOF</span>
            <i className="rail-signal" aria-hidden="true" />
          </div>
          <div className="results-content">
            <div className="section-heading">
              <p className="kicker"><span className="signal-dot" /> OWNER-AUTHORED CASE STUDIES</p>
              <h2 id="results-heading">Proof of practice, not borrowed praise.</h2>
              <p className="results-intro">Each entry below names a live interaction a reviewer can test. These are owner-authored technical case studies—not client testimonials, customer reviews, or claims about outcomes that have not been independently verified.</p>
            </div>

            <div className="results-ledger">
              <article className="result-entry result-entry--featured">
                <span className="result-index">R/01</span>
                <div>
                  <p className="result-label">COURSE DELIVERY / MODULE 5</p>
                  <h3>Reel Atlas</h3>
                  <p>Public GitHub Pages deployment with live API search, six-result display, deterministic sorting, pending states, and responsive interaction checks.</p>
                </div>
                <div className="result-actions">
                  <a href="https://kljj365.github.io/reel-atlas-module5-final-project/" target="_blank" rel="noreferrer">Test live build <ArrowUpRight size={15} /></a>
                  <a href="https://github.com/kljj365/reel-atlas-module5-final-project" target="_blank" rel="noreferrer">Review source <ArrowUpRight size={15} /></a>
                </div>
              </article>
              <article className="result-entry">
                <span className="result-index">R/02</span>
                <div>
                  <p className="result-label">COMMERCE INTERACTION STUDY</p>
                  <h3>Foundry</h3>
                  <p>Data-driven catalog sorting, loading placeholders, accessible ratings, category filters, and client-side cart feedback in an original commerce-interface study.</p>
                </div>
                <div className="result-actions"><a href="/foundry">Open evidence <ArrowUpRight size={15} /></a></div>
              </article>
              <article className="result-entry">
                <span className="result-index">R/03</span>
                <div>
                  <p className="result-label">PUBLIC-DATA DIRECTORY STUDY</p>
                  <h3>People Atlas</h3>
                  <p>Search, pending, no-match, and endpoint-failure states that demonstrate a business-facing directory interface without representing sample records as customers.</p>
                </div>
                <div className="result-actions"><a href="/people-atlas">Open evidence <ArrowUpRight size={15} /></a></div>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-heading">
          <div className="contact-signal"><Sparkles size={34} /></div>
          <div>
            <p className="kicker">AVAILABLE FOR FRONTEND OPPORTUNITIES</p>
            <h2 id="contact-heading">Let’s build something that earns a second look.</h2>
          </div>
          <div className="contact-actions">
            <a className="primary-link" href="mailto:contact@email.kljj365.com">Start a conversation <ArrowUpRight size={18} /></a>
            <a className="secondary-link" href="https://github.com/kljj365" target="_blank" rel="noreferrer"><Github size={17} /> Browse GitHub</a>
          </div>
        </section>
      </main>

      <footer className="ledger-footer">
        <span>© 2026 KYLE JOHNSON</span>
        <span>DESIGNED AS A SIGNAL LEDGER</span>
        <a href="#top">BACK TO TOP <ArrowUpRight size={13} /></a>
      </footer>
    </div>
  );
}
