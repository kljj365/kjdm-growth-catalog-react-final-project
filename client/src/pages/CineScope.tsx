/** Frame Finder: a React movie-search final project using the OMDb API, hash-safe routes, and an editorial cinema-system visual language. */
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { AlertCircle, ArrowLeft, ArrowUpRight, CalendarDays, Clapperboard, Clock3, Film, RefreshCw, Search, SlidersHorizontal, Star } from "lucide-react";

const OMDB_API_KEY = "trilogy";
const OMDB_BASE_URL = "https://www.omdbapi.com/";

type SearchMovie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type MovieDetail = SearchMovie & {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  imdbRating: string;
  imdbVotes: string;
};

type ApiSearchResponse = { Search?: SearchMovie[]; totalResults?: string; Response: "True" | "False"; Error?: string };
type ApiDetailResponse = MovieDetail & { Response: "True" | "False"; Error?: string };
type RequestState = "loading" | "success" | "empty" | "error";
type SortMode = "year-desc" | "year-asc" | "title";
type YearFilter = "all" | "classic" | "2000s" | "2010s" | "2020s";

function hasPoster(movie: SearchMovie) {
  return Boolean(movie.Poster && movie.Poster !== "N/A");
}

function releaseYear(movie: SearchMovie) {
  const match = movie.Year.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

function MoviePoster({ movie, priority = false }: { movie: SearchMovie; priority?: boolean }) {
  if (!hasPoster(movie)) {
    return <div className="cine-poster cine-poster--missing" aria-label={`${movie.Title} poster unavailable`}><Film aria-hidden="true" /><span>{movie.Title.slice(0, 1)}</span></div>;
  }

  return <div className="cine-poster"><img src={movie.Poster} alt={`${movie.Title} poster`} loading={priority ? "eager" : "lazy"} /></div>;
}

function SiteHeader({ onBrowse }: { onBrowse?: () => void }) {
  return <header className="cine-header">
    <nav className="cine-nav" aria-label="Primary navigation">
      <Link href="/" className="cine-brand"><span aria-hidden="true">FF</span><strong>Frame Finder</strong></Link>
      <div className="cine-nav-links">
        <button type="button" onClick={onBrowse}>Browse movies</button>
        <a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">Data source <ArrowUpRight size={13} /></a>
        <a href="https://github.com/kljj365" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
      </div>
    </nav>
  </header>;
}

function SiteFooter() {
  return <footer className="cine-footer">
    <p><span>REACT FINAL PROJECT</span> Live movie search, route-based detail views, client-side year controls, and responsive frontend delivery.</p>
    <a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">Powered by OMDb <ArrowUpRight size={14} /></a>
  </footer>;
}

export default function CineScope() {
  const params = useParams<{ imdbId?: string }>();
  const [, setLocation] = useLocation();
  const imdbId = params.imdbId;
  const [query, setQuery] = useState("Batman");
  const [activeQuery, setActiveQuery] = useState("Batman");
  const [movies, setMovies] = useState<SearchMovie[]>([]);
  const [searchState, setSearchState] = useState<RequestState>("loading");
  const [searchMessage, setSearchMessage] = useState("Loading movies from the live OMDb catalogue…");
  const [totalResults, setTotalResults] = useState(0);
  const [sortMode, setSortMode] = useState<SortMode>("year-desc");
  const [yearFilter, setYearFilter] = useState<YearFilter>("all");
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [detailState, setDetailState] = useState<RequestState>("loading");
  const [detailMessage, setDetailMessage] = useState("Loading movie details…");

  const browseMovies = () => document.getElementById("movie-search")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });

  const runSearch = useCallback(async (term: string) => {
    const sanitized = term.trim();
    if (!sanitized) {
      setMovies([]);
      setTotalResults(0);
      setSearchState("empty");
      setSearchMessage("Enter a movie title to search the catalogue.");
      return;
    }

    setSearchState("loading");
    setSearchMessage(`Searching OMDb for “${sanitized}”…`);
    setActiveQuery(sanitized);
    try {
      const response = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(sanitized)}&type=movie`);
      if (!response.ok) throw new Error("The movie service returned an unexpected response.");
      const data = await response.json() as ApiSearchResponse;
      if (data.Response === "False" || !data.Search?.length) {
        setMovies([]);
        setTotalResults(0);
        setSearchState("empty");
        setSearchMessage(data.Error || `No movie titles matched “${sanitized}”.`);
        return;
      }

      setMovies(data.Search);
      setTotalResults(Number(data.totalResults) || data.Search.length);
      setSearchState("success");
      setSearchMessage(`${data.Search.length} matching movies shown from ${Number(data.totalResults) || data.Search.length} results.`);
    } catch {
      setMovies([]);
      setTotalResults(0);
      setSearchState("error");
      setSearchMessage("The movie service could not be reached. Try the search again.");
    }
  }, []);

  useEffect(() => {
    if (!imdbId) runSearch("Batman");
  }, [imdbId, runSearch]);

  useEffect(() => {
    const detailId = imdbId ?? "";
    if (!detailId) return;
    const controller = new AbortController();
    setDetail(null);
    setDetailState("loading");
    setDetailMessage("Loading movie details from OMDb…");

    async function loadDetail() {
      try {
        const response = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${encodeURIComponent(detailId)}&plot=full`, { signal: controller.signal });
        if (!response.ok) throw new Error("The movie service returned an unexpected response.");
        const data = await response.json() as ApiDetailResponse;
        if (data.Response === "False") throw new Error(data.Error || "Movie details were not found.");
        setDetail(data);
        setDetailState("success");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setDetailState("error");
        setDetailMessage(error instanceof Error ? error.message : "Movie details could not be loaded.");
      }
    }

    loadDetail();
    return () => controller.abort();
  }, [imdbId]);

  const visibleMovies = useMemo(() => {
    const filtered = movies.filter((movie) => {
      const year = releaseYear(movie);
      if (yearFilter === "classic") return year > 0 && year < 2000;
      if (yearFilter === "2000s") return year >= 2000 && year < 2010;
      if (yearFilter === "2010s") return year >= 2010 && year < 2020;
      if (yearFilter === "2020s") return year >= 2020;
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (sortMode === "year-asc") return releaseYear(a) - releaseYear(b);
      if (sortMode === "title") return a.Title.localeCompare(b.Title);
      return releaseYear(b) - releaseYear(a);
    });
  }, [movies, sortMode, yearFilter]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runSearch(query);
  };

  if (imdbId) {
    return <div className="cine-app">
      <SiteHeader onBrowse={() => setLocation("/")} />
      <main className="cine-detail-main">
        <button type="button" className="cine-back" onClick={() => setLocation("/")}><ArrowLeft size={16} /> Back to movie search</button>
        {detailState === "loading" && <section className="cine-detail-loading" aria-live="polite"><RefreshCw size={26} className="cine-spin" /><p>Loading the detail page…</p></section>}
        {detailState === "error" && <section className="cine-state-card"><AlertCircle size={30} /><h1>That movie detail is unavailable.</h1><p>{detailMessage}</p><button type="button" className="cine-action" onClick={() => setLocation("/")}>Return to search <ArrowUpRight size={15} /></button></section>}
        {detailState === "success" && detail && <article className="cine-detail-layout">
          <MoviePoster movie={detail} priority />
          <div className="cine-detail-copy">
            <p className="cine-eyebrow"><span /> MOVIE DETAILS / OMDb LIVE DATA</p>
            <h1>{detail.Title}<em>.</em></h1>
            <div className="cine-detail-facts"><span><CalendarDays size={15} /> {detail.Year}</span><span><Clock3 size={15} /> {detail.Runtime !== "N/A" ? detail.Runtime : "Runtime unavailable"}</span><span><Star size={15} /> {detail.imdbRating !== "N/A" ? `${detail.imdbRating} / 10 IMDb` : "Rating unavailable"}</span></div>
            <p className="cine-genre">{detail.Genre !== "N/A" ? detail.Genre : "Genre unavailable"}</p>
            <p className="cine-plot">{detail.Plot !== "N/A" ? detail.Plot : "A plot summary was not provided by the live catalogue."}</p>
            <dl className="cine-detail-ledger"><div><dt>DIRECTOR</dt><dd>{detail.Director}</dd></div><div><dt>CAST</dt><dd>{detail.Actors}</dd></div><div><dt>RELEASED</dt><dd>{detail.Released}</dd></div><div><dt>AWARDS</dt><dd>{detail.Awards}</dd></div></dl>
          </div>
        </article>}
      </main>
      <SiteFooter />
    </div>;
  }

  return <div className="cine-app">
    <SiteHeader onBrowse={browseMovies} />
    <main>
      <section className="cine-hero" aria-labelledby="cine-heading">
        <div>
          <p className="cine-eyebrow"><span /> REACT / OMDb / RESPONSIVE SEARCH</p>
          <h1 id="cine-heading">Find the frame.<br /><em>Read the story.</em></h1>
          <p>Frame Finder is a live movie-search interface built for the React Final Project. Search the OMDb catalogue, refine the release window, and open a route-based detail page for any result.</p>
          <button type="button" className="cine-action" onClick={browseMovies}>Search the catalogue <ArrowUpRight size={15} /></button>
        </div>
        <aside className="cine-hero-index" aria-label="Project requirements"><span>PROJECT CHECK</span><strong>05</strong><p>SEARCH<br />API<br />DETAILS<br />FILTER<br />RESPONSIVE</p></aside>
      </section>

      <section id="movie-search" className="cine-search-section" aria-labelledby="search-heading">
        <div className="cine-section-heading"><div><p className="cine-eyebrow"><span /> MOVIE CATALOGUE</p><h2 id="search-heading">Search, then narrow the cut.</h2></div><p className={`cine-request-status cine-request-status--${searchState}`}>{searchState === "loading" ? "QUERY IN FLIGHT" : searchState === "success" ? "LIVE RESULTS" : searchState === "error" ? "REQUEST FAILED" : "NO RESULTS"}</p></div>
        <form className="cine-search-form" onSubmit={submitSearch}>
          <label htmlFor="movie-query">Movie title</label>
          <div><Search size={19} aria-hidden="true" /><input id="movie-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Inception, Parasite, Dune…" autoComplete="off" /><button type="submit" disabled={searchState === "loading"}>{searchState === "loading" ? "Searching…" : "Search"}</button></div>
        </form>
        <div className="cine-controls" aria-label="Movie result controls">
          <p aria-live="polite">{searchMessage}</p>
          <div><label><SlidersHorizontal size={15} /> Release window <select value={yearFilter} onChange={(event) => setYearFilter(event.target.value as YearFilter)}><option value="all">All years</option><option value="classic">Before 2000</option><option value="2000s">2000–2009</option><option value="2010s">2010–2019</option><option value="2020s">2020 onward</option></select></label><label>Sort <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}><option value="year-desc">Newest first</option><option value="year-asc">Oldest first</option><option value="title">Title A–Z</option></select></label></div>
        </div>

        {searchState === "loading" && <div className="cine-movie-grid cine-movie-grid--loading" aria-label="Loading movie results">{Array.from({ length: 6 }).map((_, index) => <div className="cine-skeleton" key={index}><i /><b /><span /></div>)}</div>}
        {searchState === "success" && visibleMovies.length > 0 && <div className="cine-movie-grid" aria-live="polite">{visibleMovies.map((movie, index) => <article className="cine-movie-card" key={movie.imdbID}><MoviePoster movie={movie} priority={index < 3} /><div><p>{movie.Type.toUpperCase()} / {movie.Year}</p><h3>{movie.Title}</h3><Link href={`/${movie.imdbID}`} className="cine-detail-link">Open details <ArrowUpRight size={15} /></Link></div></article>)}</div>}
        {searchState === "success" && visibleMovies.length === 0 && <section className="cine-state-card"><Film size={29} /><h3>No movies match these year controls.</h3><p>Clear the release filter to see all live results for “{activeQuery}”.</p><button type="button" className="cine-text-control" onClick={() => setYearFilter("all")}>Clear release filter <ArrowUpRight size={14} /></button></section>}
        {searchState === "empty" && <section className="cine-state-card"><Film size={29} /><h3>No movie titles found.</h3><p>{searchMessage}</p></section>}
        {searchState === "error" && <section className="cine-state-card"><AlertCircle size={29} /><h3>The live movie request did not finish.</h3><p>{searchMessage}</p><button type="button" className="cine-action" onClick={() => runSearch(activeQuery)}>Try again <RefreshCw size={15} /></button></section>}
      </section>
    </main>
    <SiteFooter />
  </div>;
}
