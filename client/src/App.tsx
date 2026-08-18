/** Frame Finder final-project shell: hash routing keeps movie-detail routes deployable on GitHub Pages. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CineScope from "./pages/CineScope";

function AppRoutes() {
  return <Switch><Route path="/:imdbId" component={CineScope} /><Route path="/" component={CineScope} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Router hook={useHashLocation}><AppRoutes /></Router></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
