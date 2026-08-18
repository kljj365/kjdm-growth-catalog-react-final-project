/** Signal Ledger × KJDM Growth Catalog: evidence-led React take-home study with original sample service data and planning-only cart behavior. */
import ProjectShell from "@/components/ProjectShell";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  DatabaseZap,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "wouter";

type Service = {
  id: number;
  slug: string;
  title: string;
  category: "Strategy" | "Content" | "Automation";
  label: string;
  summary: string;
  detail: string;
  planningValue: number;
  scope: string[];
  accent: string;
};

const services: Service[] = [
  { id: 1, slug: "conversion-blueprint", title: "Conversion Blueprint", category: "Strategy", label: "Offer architecture", summary: "Map the path from first signal to a clearer next action.", detail: "A planning sprint for shaping offers, landing-page hierarchy, and an evidence-led conversion path.", planningValue: 320, scope: ["Audience map", "Offer structure", "Action hierarchy"], accent: "cobalt" },
  { id: 2, slug: "content-signal-system", title: "Content Signal System", category: "Content", label: "Editorial operating system", summary: "Turn isolated topics into a visible, reusable publishing system.", detail: "A content-planning interface that turns core offers into a prioritized message and distribution sequence.", planningValue: 240, scope: ["Topic architecture", "Content brief", "Channel sequence"], accent: "signal" },
  { id: 3, slug: "lead-qualifier", title: "Lead Qualifier", category: "Automation", label: "Intent sorting", summary: "Define useful intake paths before automation makes the wrong assumptions.", detail: "A planning scope for intake questions, qualification thresholds, and the handoffs that keep follow-up relevant.", planningValue: 280, scope: ["Intake logic", "Lead stages", "Follow-up boundaries"], accent: "sage" },
  { id: 4, slug: "launch-message-kit", title: "Launch Message Kit", category: "Content", label: "Campaign communications", summary: "Organize the language a launch needs without turning the plan into noise.", detail: "A structured planning package for launch messages, page sections, and reusable outreach directions.", planningValue: 180, scope: ["Message angles", "Landing sections", "Email sequence"], accent: "clay" },
  { id: 5, slug: "service-page-refresh", title: "Service Page Refresh", category: "Strategy", label: "Decision interface", summary: "Clarify scope, proof, and the reason a visitor should take the next step.", detail: "A page-level planning scope for service positioning, information hierarchy, and action-path friction.", planningValue: 220, scope: ["Page audit", "Wireframe notes", "CTA logic"], accent: "ink" },
  { id: 6, slug: "follow-up-flow", title: "Follow-up Flow", category: "Automation", label: "Response workflow", summary: "Plan the smaller actions that keep qualified conversations from going cold.", detail: "A follow-up planning flow covering response classification, owner visibility, and a deliberate recovery path.", planningValue: 260, scope: ["Response matrix", "Status workflow", "Recovery rules"], accent: "amber" },
];

const categories = ["All", "Strategy", "Content", "Automation"] as const;
type Category = (typeof categories)[number];
type Sort = "featured" | "title-asc" | "title-desc" | "value-asc" | "value-desc";
type CartItem = { id: number; quantity: number };

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function CatalogGlyph({ accent }: { accent: string }) {
  return <div className={`growth-glyph growth-glyph--${accent}`} aria-hidden="true"><span /><i /><b /></div>;
}

export default function GrowthCatalog() {
  const [, setLocation] = useLocation();
  const params = useParams<{ slug?: string }>();
  const selectedService = services.find((service) => service.slug === params.slug);
  const hasUnknownRoute = Boolean(params.slug && !selectedService);
  const [category, setCategory] = useState<Category>("All");
  const [sort, setSort] = useState<Sort>("featured");
  const [query, setQuery] = useState("");
  const [dataState, setDataState] = useState<"loading" | "ready" | "failure">("loading");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("Catalog sample data is ready to review.");

  useEffect(() => {
    const saved = window.localStorage.getItem("kjdm-growth-plan-cart");
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch { window.localStorage.removeItem("kjdm-growth-plan-cart"); }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("kjdm-growth-plan-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setDataState("loading");
    const timer = window.setTimeout(() => setDataState("ready"), 420);
    return () => window.clearTimeout(timer);
  }, [category, sort, query]);

  const visibleServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = services.filter((service) => (category === "All" || service.category === category) && (!normalizedQuery || `${service.title} ${service.category} ${service.label}`.toLowerCase().includes(normalizedQuery)));
    if (sort === "title-asc") return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "title-desc") return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "value-asc") return [...filtered].sort((a, b) => a.planningValue - b.planningValue);
    if (sort === "value-desc") return [...filtered].sort((a, b) => b.planningValue - a.planningValue);
    return filtered;
  }, [category, query, sort]);

  const cartLines = cart.map((line) => ({ ...line, service: services.find((service) => service.id === line.id) })).filter((line): line is CartItem & { service: Service } => Boolean(line.service));
  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cartLines.reduce((total, line) => total + line.service.planningValue * line.quantity, 0);

  const addToPlan = (id: number) => {
    setCart((current) => current.some((line) => line.id === id) ? current.map((line) => line.id === id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { id, quantity: 1 }]);
    setNotice("Added to the planning cart. No payment is processed in this study.");
  };
  const updateQuantity = (id: number, change: number) => setCart((current) => current.flatMap((line) => line.id !== id ? [line] : line.quantity + change < 1 ? [] : [{ ...line, quantity: line.quantity + change }]));
  const retryCatalog = () => { setDataState("loading"); window.setTimeout(() => { setDataState("ready"); setNotice("Catalog recovered. Sample planning data is ready again."); }, 560); };
  const scrollToCatalog = () => document.getElementById("catalog")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });

  const detailRecommendations = selectedService ? services.filter((service) => service.category === selectedService.category && service.id !== selectedService.id).slice(0, 2) : [];

  return (
    <ProjectShell label="MODULE 6 / ORIGINAL BUILD" title="KJDM Growth Catalog" stack="React · TypeScript · Wouter" interaction="Routes + filters + planning cart" outcome="Service discovery with explicit state evidence">
      <main className="growth-app">
        {hasUnknownRoute ? (
          <section className="growth-route-miss">
            <p className="project-kicker"><span /> ROUTE RECOVERY / NO MATCH</p>
            <h1>That planning path is <em>not in the catalog.</em></h1>
            <p>The route parameter did not resolve to an original sample service. Return to the catalog to continue the planning flow.</p>
            <button type="button" className="growth-primary-button" onClick={() => setLocation("/growth-catalog")}>Return to catalog <ArrowLeft size={16} /></button>
          </section>
        ) : selectedService ? (
          <>
            <section className="growth-detail-hero">
              <button className="growth-back-button" type="button" onClick={() => setLocation("/growth-catalog")}><ArrowLeft size={16} /> Back to catalog</button>
              <div className="growth-detail-grid">
                <div>
                  <p className="project-kicker"><span /> SERVICE DETAIL / {selectedService.category.toUpperCase()}</p>
                  <h1>{selectedService.title}<em>.</em></h1>
                  <p>{selectedService.detail}</p>
                  <div className="growth-detail-actions"><button type="button" className="growth-primary-button" onClick={() => addToPlan(selectedService.id)}>Add to planning cart <Plus size={16} /></button><span>Sample planning value / {money(selectedService.planningValue)}</span></div>
                </div>
                <div className="growth-detail-evidence"><CatalogGlyph accent={selectedService.accent} /><p>DELIVERY SCOPE</p><ul>{selectedService.scope.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul></div>
              </div>
            </section>
            <section className="growth-recommendations">
              <div className="growth-section-head"><div><p>RELATED PATHS</p><h2>Keep the plan connected.</h2></div><span>{detailRecommendations.length} recommendations</span></div>
              <div className="growth-recommendation-grid">{detailRecommendations.map((service) => <button type="button" className="growth-recommendation" onClick={() => setLocation(`/growth-catalog/${service.slug}`)} key={service.id}><CatalogGlyph accent={service.accent} /><span>{service.category}</span><strong>{service.title}</strong><ChevronRight size={17} /></button>)}</div>
            </section>
          </>
        ) : (
          <>
            <section className="growth-hero">
              <div className="growth-hero-copy">
                <p className="project-kicker"><span /> ORIGINAL REACT COMMERCE STUDY / SAMPLE PLANNING DATA</p>
                <h1>Build the path.<br /><em>Keep the signal.</em></h1>
                <p>A service-discovery and planning interface for Kyle Johnson Digital Marketing. Explore original sample offers, inspect route-based scope, and assemble a working plan without processing a payment.</p>
                <div className="growth-hero-actions"><button type="button" className="growth-primary-button" onClick={scrollToCatalog}>Explore catalog <ArrowRight size={16} /></button><button type="button" className="growth-text-button" onClick={() => setCartOpen(true)}>Open planning cart / {cartCount} <ShoppingBag size={15} /></button></div>
              </div>
              <div className="growth-hero-proof"><p>BUILD EVIDENCE</p><strong>06</strong><span>ROUTES / FILTERS / CART / RECOVERY</span><div className="growth-proof-lines"><i /><i /><i /></div></div>
            </section>

            <section id="catalog" className="growth-catalog">
              <div className="growth-section-head"><div><p>CATALOG / SAMPLE DATA</p><h2>Choose what deserves a next step.</h2></div><button type="button" className="growth-recovery-button" onClick={() => setDataState("failure")}><DatabaseZap size={15} /> Test recovery state</button></div>
              <div className="growth-controls">
                <label className="growth-search"><Search size={17} /><span className="sr-only">Search KJDM services</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search strategy, content, automation…" /></label>
                <div className="growth-filter-row" aria-label="Filter catalog category">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={category === item ? "active" : ""}>{item}</button>)}</div>
                <label className="growth-sort"><SlidersHorizontal size={15} /><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value as Sort)}><option value="featured">Featured</option><option value="title-asc">A to Z</option><option value="title-desc">Z to A</option><option value="value-asc">Planning value: low to high</option><option value="value-desc">Planning value: high to low</option></select></label>
              </div>
              <div className="growth-status" aria-live="polite"><span className={`growth-status-dot growth-status-dot--${dataState}`} />{dataState === "loading" ? "Refreshing catalog state…" : dataState === "failure" ? "Catalog connection is unavailable — use the recovery control to retry." : `${visibleServices.length} original planning services / ${category.toLowerCase()} view`}</div>
              {dataState === "loading" ? <div className="growth-grid" aria-busy="true">{Array.from({ length: 6 }).map((_, index) => <div className="growth-skeleton" key={index}><i /><b /><span /></div>)}</div> : dataState === "failure" ? <div className="growth-state-card growth-state-card--failure"><DatabaseZap size={28} /><h3>Catalog state needs recovery.</h3><p>This visible failure state is part of the React take-home evidence. No data has been lost.</p><button type="button" className="growth-primary-button" onClick={retryCatalog}>Retry catalog <ArrowRight size={15} /></button></div> : visibleServices.length === 0 ? <div className="growth-state-card"><Search size={28} /><h3>No planning services match that view.</h3><p>Clear the query or change the category to return to the sample catalog.</p><button type="button" className="growth-text-button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear controls <X size={15} /></button></div> : <div className="growth-grid">{visibleServices.map((service) => <article className="growth-card" key={service.id}><div className="growth-card-art"><CatalogGlyph accent={service.accent} /><span>{service.category}</span><button type="button" onClick={() => addToPlan(service.id)} aria-label={`Add ${service.title} to planning cart`}><Plus size={17} /></button></div><div className="growth-card-copy"><p>{service.label}</p><h3>{service.title}</h3><span>{service.summary}</span><div><strong>Sample planning value / {money(service.planningValue)}</strong><button type="button" onClick={() => setLocation(`/growth-catalog/${service.slug}`)}>View scope <ArrowRight size={15} /></button></div></div></article>)}</div>}
            </section>
          </>
        )}
        <p className="growth-announcement" aria-live="polite"><Sparkles size={15} /> {notice}</p>
        <section className="project-postscript growth-postscript"><p><span>TAKE-HOME EVIDENCE</span> Original sample catalog data, route parameters, derived filters, non-payment cart state, recovery control, and explicit pending/empty/failure views document the required React interaction patterns without claiming a real checkout or customer data.</p><a href="/">Return to portfolio <ArrowRight size={15} /></a></section>
      </main>

      {cartOpen && <><aside className="growth-cart" aria-label="Planning cart"><div className="growth-cart-head"><div><p>PLANNING CART</p><h2>{cartCount} selections</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Close planning cart"><X size={20} /></button></div>{cartLines.length ? <><div className="growth-cart-lines">{cartLines.map((line) => <div className="growth-cart-line" key={line.id}><CatalogGlyph accent={line.service.accent} /><div><strong>{line.service.title}</strong><span>{money(line.service.planningValue)} / sample value</span></div><div className="growth-quantity"><button type="button" onClick={() => updateQuantity(line.id, -1)} aria-label={`Reduce ${line.service.title} quantity`}><Minus size={13} /></button><span>{line.quantity}</span><button type="button" onClick={() => updateQuantity(line.id, 1)} aria-label={`Increase ${line.service.title} quantity`}><Plus size={13} /></button></div></div>)}</div><div className="growth-cart-total"><span>Planning subtotal</span><strong>{money(cartTotal)}</strong></div><p className="growth-cart-boundary">No payment or order processing occurs in this planning study.</p><button type="button" className="growth-primary-button" onClick={() => { setNotice("Plan saved locally in this browser. No checkout was initiated."); setCartOpen(false); }}>Save planning view <Check size={15} /></button></> : <div className="growth-empty-cart"><ShoppingBag size={27} /><h3>Nothing is in the plan yet.</h3><p>Add a service to see cart state, quantities, and a planning subtotal.</p></div>}</aside><button type="button" className="growth-cart-scrim" onClick={() => setCartOpen(false)} aria-label="Close planning cart" /></>}
    </ProjectShell>
  );
}
