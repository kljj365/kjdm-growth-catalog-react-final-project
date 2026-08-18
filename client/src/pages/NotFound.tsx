/** Signal Ledger fallback: provides an explicit return path if a project route is unavailable. */
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="not-found"><p>404 / ROUTE NOT FOUND</p><h1>This page is outside the ledger.</h1><a href="/"><ArrowLeft size={17} /> Return to portfolio</a></main>;
}
