/** Signal Ledger project: Foundry demonstrates an accessible product discovery flow with evidence-led filters, sorting, loading, and cart state. */
import ProjectShell from "@/components/ProjectShell";
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const products = [
  { id: 1, name: "Monument Note", type: "Objects", price: 28, rating: 4.5, color: "Cobalt", swatch: "#214879", visual: "foundry-object foundry-object--notebook" },
  { id: 2, name: "Trace Vessel", type: "Objects", price: 46, rating: 4.0, color: "Clay", swatch: "#d78161", visual: "foundry-object foundry-object--vessel" },
  { id: 3, name: "Field Form", type: "Paper", price: 18, rating: 5.0, color: "Natural", swatch: "#d9c8ad", visual: "foundry-object foundry-object--paper" },
  { id: 4, name: "Blue Hour Tray", type: "Home", price: 64, rating: 4.5, color: "Ink", swatch: "#142a4b", visual: "foundry-object foundry-object--tray" },
  { id: 5, name: "Line Lamp", type: "Home", price: 92, rating: 5.0, color: "Sage", swatch: "#7c8c73", visual: "foundry-object foundry-object--lamp" },
  { id: 6, name: "Study Cards", type: "Paper", price: 16, rating: 4.0, color: "Stone", swatch: "#c9c4bd", visual: "foundry-object foundry-object--cards" },
];

export default function Foundry() {
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const types = ["All", "Objects", "Paper", "Home"];
  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, [type, sort]);
  const filtered = useMemo(() => {
    const collection = products.filter((product) => type === "All" || product.type === type);
    if (sort === "price-asc") return [...collection].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...collection].sort((a, b) => b.price - a.price);
    if (sort === "rating") return [...collection].sort((a, b) => b.rating - a.rating);
    return collection;
  }, [sort, type]);
  const cartProducts = products.filter((product) => cart.includes(product.id));
  const cartTotal = cartProducts.reduce((total, product) => total + product.price, 0);
  const add = (id: number) => setCart((current) => current.includes(id) ? current : [...current, id]);
  const remove = (id: number) => setCart((current) => current.filter((item) => item !== id));

  return (
    <ProjectShell label="LIVE BUILD / 02" title="Foundry" stack="React · CSS system" interaction="Filters + cart feedback" outcome="Faster product decisions">
      <main className="foundry-app">
        <section className="foundry-announcement">SUMMER EDITION / OBJECTS FOR DAILY RITUALS <span>Free domestic shipping over $75</span></section>
        <header className="foundry-header"><a href="#catalog" className="foundry-wordmark">FOUNDRY<span>—</span></a><nav><a href="#catalog">Shop</a><a href="#story">Story</a><a href="#journal">Journal</a></nav><button type="button" className="foundry-cart-button" onClick={() => setShowCart(true)}><ShoppingBag size={17} /> Cart <span>{cart.length}</span></button></header>
        <section className="foundry-hero"><div className="foundry-hero-copy"><p>THE OBJECTS EDIT</p><h1>See the object.<br /><em>Keep the context.</em></h1><a href="#catalog">Explore the collection <ArrowRight size={17} /></a></div><div className="foundry-hero-art" aria-hidden="true"><div className="arch arch--1" /><div className="arch arch--2" /><div className="orb" /><div className="line-grid" /></div></section>
        <section id="catalog" className="foundry-catalog"><div className="catalog-intro"><p>01 — CATALOG</p><h2>Keep the useful.<br />Make it considered.</h2></div><div className="catalog-controls"><div className="type-filters">{types.map((item) => <button type="button" className={type === item ? "selected" : ""} onClick={() => setType(item)} key={item}>{item}</button>)}</div><label className="foundry-sort-label">Sort collection<select className="foundry-sort-select" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="rating">Highest rated</option></select></label></div><p className="catalog-evidence" aria-live="polite">{isLoading ? "Loading the collection…" : `${filtered.length} objects / ${sort === "featured" ? "featured sequence" : sort.replace("-", " ")}`}</p><div className="product-grid" aria-busy={isLoading}>{isLoading ? Array.from({ length: 6 }).map((_, index) => <div className="foundry-skeleton" key={index}><span /><i /><b /></div>) : filtered.map((product) => <article className="product-card" key={product.id}><div className="product-visual"><div className={product.visual}><span /><i /></div><button type="button" onClick={() => add(product.id)} className={cart.includes(product.id) ? "product-add added" : "product-add"} aria-label={`Add ${product.name} to cart`}>{cart.includes(product.id) ? <Check size={15} /> : <Plus size={17} />}</button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.type} / {product.color}</p><span className="product-rating" aria-label={`${product.rating} out of 5 stars`}><Star size={12} fill="currentColor" /> {product.rating.toFixed(1)}</span></div><strong>${product.price.toFixed(2)}</strong></div></article>)}</div></section>
        <section id="story" className="foundry-story"><div className="story-label">02 — INTERACTION NOTE</div><p>Filtering remains visible, product details hold their place, and cart feedback confirms the decision without interrupting the browse.</p><div className="story-swatch"><span /><span /><span /></div></section>
        {showCart && <aside className="cart-drawer" aria-label="Shopping cart"><div className="cart-drawer-head"><div><p>YOUR SELECTION</p><h2>Cart ({cart.length})</h2></div><button type="button" onClick={() => setShowCart(false)} aria-label="Close cart"><X size={20} /></button></div>{cartProducts.length ? <><div className="cart-lines">{cartProducts.map((product) => <div className="cart-line" key={product.id}><div className="mini-product" style={{ background: product.swatch }} /><div><strong>{product.name}</strong><span>${product.price}</span></div><button type="button" onClick={() => remove(product.id)} aria-label={`Remove ${product.name}`}><Minus size={16} /></button></div>)}</div><div className="cart-total"><span>Total</span><strong>${cartTotal}</strong></div><button type="button" className="checkout-button">Continue to checkout <ArrowRight size={17} /></button></> : <div className="empty-cart"><ShoppingBag size={25} /><p>Your selection is still empty.</p><button type="button" onClick={() => setShowCart(false)}>Browse objects</button></div>}</aside>}
        {showCart && <button type="button" className="drawer-scrim" aria-label="Close cart" onClick={() => setShowCart(false)} />}
        <section className="project-postscript foundry-postscript"><p><span>INTERACTION NOTES</span> Filters, immutable price/rating sorting, skeleton state, accessible rating output, and persistent cart feedback are managed with React state and semantic controls.</p><a href="/">Return to portfolio <ArrowRight size={15} /></a></section>
      </main>
    </ProjectShell>
  );
}
