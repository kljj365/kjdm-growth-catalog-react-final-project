/** Signal Ledger final-project study: original API-search experience with visible query, loading, success, empty, and error states. */
import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, Film, Search, Sparkles } from "lucide-react";
import ProjectShell from "@/components/ProjectShell";

type TvMazeShow = {
  score: number;
  show: {
    id: number;
    name: string;
    premiered?: string;
    genres: string[];
    image?: { medium?: string; original?: string };
    summary?: string;
  };
};

const examples = ["slow horses", "the bear", "dark"];
type SortMode = "az" | "za" | "newest" | "oldest";

export default function ReelAtlas() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TvMazeShow[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "empty" | "error">("idle");
  const [sortMode, setSortMode] = useState<SortMode>("az");
  const [message, setMessage] = useState("Search an actual public catalog—no staging data, no mock results.");

  const sortedResults = useMemo(() => {
    const copy = [...results];
    const year = (item: TvMazeShow) => item.show.premiered ? new Date(item.show.premiered).getFullYear() : 0;
    if (sortMode === "za") return copy.sort((a, b) => b.show.name.localeCompare(a.show.name));
    if (sortMode === "newest") return copy.sort((a, b) => year(b) - year(a));
    if (sortMode === "oldest") return copy.sort((a, b) => year(a) - year(b));
    return copy.sort((a, b) => a.show.name.localeCompare(b.show.name));
  }, [results, sortMode]);

  async function searchShows(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    if (!term) {
      setStatus("empty");
      setResults([]);
      setMessage("Add a title, person, or keyword to begin the search.");
      return;
    }

    setStatus("loading");
    setResults([]);
    setMessage(`Reading the catalog for “${term}”…`);

    try {
      const [response] = await Promise.all([
        fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(term)}`),
        new Promise((resolve) => window.setTimeout(resolve, 460)),
      ]);
      if (!response.ok) throw new Error("Catalog unavailable");
      const data = (await response.json()) as TvMazeShow[];
      const cappedResults = data.slice(0, 6);
      setResults(cappedResults);
      setStatus(cappedResults.length ? "success" : "empty");
      setMessage(cappedResults.length ? `${cappedResults.length} matching titles for “${term}”.` : `No titles matched “${term}”. Try a broader phrase.`);
    } catch {
      setStatus("error");
      setResults([]);
      setMessage("The catalog could not be reached. Check your connection and try again.");
    }
  }

  function chooseExample(term: string) {
    setQuery(term);
    setStatus("idle");
    setMessage(`Ready to search for “${term}”.`);
  }

  return (
    <ProjectShell label="BUILD / 04" title="Reel Atlas" stack="React · Fetch API · TypeScript" interaction="Search → pending → results" outcome="Live public API data">
      <main className="reel-atlas-app">
        <section className="reel-atlas-hero" aria-labelledby="reel-atlas-heading">
          <div className="reel-atlas-hero-copy">
            <p className="project-kicker"><span /> MODULE 5 / API SEARCH EXERCISE</p>
            <h1 id="reel-atlas-heading">Find a title. <em>Follow the signal.</em></h1>
            <p>Reel Atlas is an original one-page search interface built against a live public catalog. It turns a query into a focused set of six results, with loading, empty, and error states made visible.</p>
          </div>
          <div className="reel-atlas-proof" aria-label="Project requirements evidence">
            <Film size={24} />
            <span>REQUIREMENT CHECK</span>
            <strong>06</strong>
            <p>result limit<br />public endpoint<br />loading skeleton</p>
          </div>
        </section>

        <section className="reel-search-surface" aria-labelledby="catalog-heading">
          <div className="reel-surface-heading">
            <div>
              <p>LIVE CATALOG / TVMAZE</p>
              <h2 id="catalog-heading">Search the archive</h2>
            </div>
            <span className={`reel-status reel-status--${status}`}>{status === "loading" ? "QUERY IN FLIGHT" : status === "success" ? "RESULTS READY" : "AWAITING QUERY"}</span>
          </div>

          <form className="reel-search-form" onSubmit={searchShows}>
            <label htmlFor="title-query">Title, person, or keyword</label>
            <div className="reel-search-control">
              <Search size={20} aria-hidden="true" />
              <input id="title-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. science fiction" autoComplete="off" />
              <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Searching" : "Search"}<ArrowUpRight size={16} /></button>
            </div>
          </form>

          <div className="reel-query-notes">
            <span>{message}</span>
            <div className="flex flex-wrap items-center justify-end gap-2" aria-label="Search controls">
              <label className="font-mono text-[0.54rem] tracking-[.06em] text-[#aeb9d1]" htmlFor="reel-sort">SORT</label>
              <select id="reel-sort" value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)} className="border border-white/20 bg-transparent px-2 py-[5px] font-mono text-[0.54rem] tracking-[.03em] text-[#d8dfed] outline-none focus:border-[#f15a24]">
                <option value="az" className="bg-[#151c35]">Alphabetical A–Z</option>
                <option value="za" className="bg-[#151c35]">Alphabetical Z–A</option>
                <option value="newest" className="bg-[#151c35]">Newest to oldest</option>
                <option value="oldest" className="bg-[#151c35]">Oldest to newest</option>
              </select>
              <div aria-label="Suggested searches">{examples.map((example) => <button type="button" key={example} onClick={() => chooseExample(example)}>{example}</button>)}</div>
            </div>
          </div>

          {status === "loading" && <div className="reel-results-grid" aria-label="Loading results">{Array.from({ length: 6 }).map((_, index) => <div className="reel-skeleton" key={index}><div /><span /><i /></div>)}</div>}

          {(status === "idle" || status === "empty" || status === "error") && <div className="reel-empty-state"><Sparkles size={24} /><h3>{status === "error" ? "The signal dropped." : status === "empty" ? "No archive match yet." : "The archive is ready."}</h3><p>{status === "error" ? "The live API did not respond. Use the search control to try again." : status === "empty" ? "Try one of the suggested searches or use a wider keyword." : "Start with any title, then inspect the real records returned by the public endpoint."}</p></div>}

          {status === "success" && <div className="reel-results-grid" aria-live="polite">{sortedResults.map(({ show }, index) => {
            const year = show.premiered ? new Date(show.premiered).getFullYear() : "—";
            return <article className="reel-result" key={show.id}>
              <div className="reel-poster">{show.image?.medium ? <img src={show.image.medium} alt={`${show.name} poster`} /> : <span>{show.name.slice(0, 1)}</span>}<small>0{index + 1}</small></div>
              <div className="reel-result-copy"><p>{show.genres.slice(0, 2).join(" / ") || "UNCLASSIFIED"}</p><h3>{show.name}</h3><span>{year}</span></div>
            </article>;
          })}</div>}
        </section>

      </main>
      <footer className="project-postscript reel-atlas-postscript">
          <p><span>IMPLEMENTATION NOTE</span>This project keeps all network work client-side, caps the rendered result set at six, and separates the query, pending, success, empty, and error states so the student can explain the flow clearly in review.</p>
          <a href="/">Return to portfolio <ArrowUpRight size={15} /></a>
      </footer>
    </ProjectShell>
  );
}
