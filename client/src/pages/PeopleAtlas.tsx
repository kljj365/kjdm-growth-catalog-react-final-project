/** Signal Ledger project detail: paper/ink evidence frame, document spine, and explicit public-directory API states. */
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Building2, Globe2, Mail, Search, UsersRound } from "lucide-react";
import ProjectShell from "@/components/ProjectShell";

type DirectoryPerson = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string };
};

const evidence = [
  ["SOURCE", "JSONPlaceholder public sample endpoint"],
  ["STATE MAP", "Boot → query → match / no match / failure"],
  ["SCOPE", "Interface evidence, not a client database"],
];

export default function PeopleAtlas() {
  const [records, setRecords] = useState<DirectoryPerson[]>([]);
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    async function loadDirectory() {
      setStatus("loading");
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal });
        if (!response.ok) throw new Error("Directory unavailable");
        setRecords((await response.json()) as DirectoryPerson[]);
        setStatus("ready");
      } catch (error) {
        if ((error as Error).name !== "AbortError") setStatus("error");
      }
    }
    loadDirectory();
    return () => controller.abort();
  }, []);

  const visibleRecords = useMemo(() => {
    const term = submittedQuery.trim().toLowerCase();
    if (!term) return records;
    return records.filter((record) => [record.name, record.company.name, record.email, record.website].some((value) => value.toLowerCase().includes(term)));
  }, [records, submittedQuery]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query);
  }

  const statusLabel = status === "loading" ? "BOOTING DIRECTORY" : status === "error" ? "ENDPOINT UNAVAILABLE" : submittedQuery ? `FILTER / ${visibleRecords.length} MATCHES` : `${visibleRecords.length} SAMPLE RECORDS READY`;

  return (
    <ProjectShell label="BUILD / 05" title="People Atlas" stack="React · Fetch API · TypeScript" interaction="Load → query → directory view" outcome="Clear public-data states">
      <main className="min-h-screen bg-[#f3f0ea] text-[#101b33]">
        <section className="mx-auto grid max-w-[1440px] grid-cols-[56px_minmax(0,1fr)] border-b border-[#cbd1d9] px-5 py-14 sm:px-8 lg:grid-cols-[88px_minmax(0,1fr)_238px] lg:px-[4.75vw] lg:py-24">
          <aside className="border-r border-[#cbd1d9] pr-3 pt-1 font-mono text-[10px] tracking-[0.1em] text-[#647089] lg:pr-7"><span className="block">INDEX</span><span className="mt-2 block">05—05</span><span className="mt-11 hidden text-[#f15a24] lg:block">●</span></aside>
          <div className="border-r border-[#cbd1d9] pl-5 pr-6 sm:pl-8 lg:pl-10 lg:pr-16">
            <p className="mb-5 font-mono text-[10px] tracking-[0.14em] text-[#647089]"><span className="mr-2 inline-block h-2 w-2 rotate-45 bg-[#f15a24]" />PUBLIC DIRECTORY / INTERACTION STUDY</p>
            <h1 className="max-w-4xl font-[Space_Grotesk] text-5xl font-semibold leading-[0.9] tracking-[-0.08em] sm:text-7xl lg:text-8xl">Find the right <em className="font-serif font-normal">signal.</em></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#647089]">People Atlas turns a public data response into a searchable relationship view. The interface surfaces its source, its query logic, and every meaningful state rather than disguising sample records as business data.</p>
          </div>
          <aside className="col-start-2 mt-10 max-w-[260px] border-t border-[#101b33] pt-5 text-[#647089] lg:col-start-3 lg:row-start-1 lg:mt-0 lg:ml-8">
            <UsersRound className="text-[#f15a24]" size={23} />
            <p className="mt-8 font-mono text-[10px] tracking-[0.1em]">BUILD EVIDENCE</p>
            <strong className="mt-2 block font-[Space_Grotesk] text-6xl leading-none tracking-[-0.1em] text-[#101b33]">10</strong>
            <p className="mt-3 font-mono text-[10px] leading-5">records rendered<br />live query filter<br />failure handling</p>
          </aside>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-[4.75vw]">
          <div className="grid border-y border-[#cbd1d9] sm:grid-cols-3">{evidence.map(([label, detail]) => <div className="border-b border-[#cbd1d9] px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0" key={label}><p className="font-mono text-[10px] tracking-[0.1em] text-[#f15a24]">{label}</p><p className="mt-2 max-w-xs text-sm leading-5 text-[#647089]">{detail}</p></div>)}</div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-[4.75vw] lg:pb-28">
          <div className="grid grid-cols-[56px_minmax(0,1fr)] lg:grid-cols-[88px_minmax(0,1fr)]">
            <aside className="border-r border-[#cbd1d9] pr-3 pt-2 font-mono text-[10px] tracking-[0.1em] text-[#647089] lg:pr-7"><span>QUERY</span><span className="mt-2 block">/ 01</span></aside>
            <div className="pl-5 sm:pl-8 lg:pl-10">
              <div className="border-b border-[#cbd1d9] pb-6 sm:flex sm:items-end sm:justify-between">
                <div><p className="font-mono text-[10px] tracking-[0.12em] text-[#647089]">DIRECTORY / PUBLIC SAMPLE DATA</p><h2 className="mt-2 font-[Space_Grotesk] text-4xl font-semibold tracking-[-0.07em] sm:text-5xl">Search the evidence</h2></div>
                <p className="mt-4 max-w-sm text-sm leading-6 text-[#647089] sm:text-right">Sample records are shown only to demonstrate API retrieval, query filtering, and resilient interface states.</p>
              </div>

              <form className="mt-7 grid gap-3 border border-[#bfc7d0] bg-[#fffdfa] p-3 sm:grid-cols-[1fr_auto]" onSubmit={handleSearch}>
                <label className="sr-only" htmlFor="directory-query">Search sample records by name, company, email, or website</label>
                <div className="flex items-center gap-3 px-3"><Search size={19} className="text-[#f15a24]" /><input id="directory-query" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent py-3 font-[Space_Grotesk] text-lg tracking-[-0.03em] outline-none placeholder:text-[#9aa4b5]" placeholder="Search name, company, email, or website" /></div>
                <button type="submit" className="inline-flex items-center justify-center gap-2 bg-[#101b33] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#f15a24] active:scale-[0.97]">Run query <ArrowUpRight size={15} /></button>
              </form>

              <div className="mt-5 flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.08em] text-[#647089]" aria-live="polite"><span><span className="mr-2 text-[#f15a24]">●</span>{statusLabel}</span>{submittedQuery && <button className="border-b border-current pb-1" type="button" onClick={() => { setQuery(""); setSubmittedQuery(""); }}>CLEAR FILTER</button>}</div>

              {status === "loading" && <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading public directory">{Array.from({ length: 6 }).map((_, index) => <div className="h-64 animate-pulse border border-[#d2d7df] bg-[#fffdfa]" key={index} />)}</div>}
              {status === "error" && <div className="mt-6 border border-dashed border-[#aeb7c5] bg-[#fffdfa] p-10 text-center"><Building2 className="mx-auto text-[#f15a24]" size={27} /><h3 className="mt-4 font-[Space_Grotesk] text-2xl font-semibold tracking-[-0.05em]">The endpoint did not respond.</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#647089]">This documented failure state avoids invented replacement records. Refreshing the route re-attempts the public request.</p></div>}
              {status === "ready" && visibleRecords.length === 0 && <div className="mt-6 border border-dashed border-[#aeb7c5] bg-[#fffdfa] p-10 text-center"><Search className="mx-auto text-[#f15a24]" size={27} /><h3 className="mt-4 font-[Space_Grotesk] text-2xl font-semibold tracking-[-0.05em]">No matching signal.</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#647089]">Try a broader term or clear the filter to return to the documented sample set.</p></div>}
              {status === "ready" && visibleRecords.length > 0 && <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{visibleRecords.map((record, index) => <article className="group border border-[#d2d7df] bg-[#fffdfa] p-5 transition hover:-translate-y-1 hover:border-[#f15a24]" key={record.id}><div className="flex items-start justify-between gap-4"><span className="font-mono text-[10px] text-[#647089]">SAMPLE / {String(index + 1).padStart(2, "0")}</span><span className="grid h-9 w-9 place-items-center rounded-full bg-[#eef0f4] font-[Space_Grotesk] text-sm font-semibold">{record.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span></div><h3 className="mt-8 font-[Space_Grotesk] text-2xl font-semibold tracking-[-0.06em]">{record.name}</h3><p className="mt-1 text-sm text-[#647089]">{record.company.name}</p><p className="mt-5 border-t border-[#e2e5ea] pt-4 font-mono text-[10px] tracking-[0.08em] text-[#647089]">PUBLIC DIRECTORY RECORD / QUERYABLE FIELDS</p><div className="mt-5 grid gap-2 text-xs text-[#30415b]"><a className="flex items-center gap-2 hover:text-[#f15a24]" href={`mailto:${record.email}`}><Mail size={14} />{record.email}</a><a className="flex items-center gap-2 hover:text-[#f15a24]" href={`https://${record.website}`} target="_blank" rel="noreferrer"><Globe2 size={14} />{record.website}</a></div></article>)}</div>}
            </div>
          </div>
        </section>
      </main>
    </ProjectShell>
  );
}
