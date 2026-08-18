/** KJDM Growth Catalog submission shell: standalone hash routing keeps dynamic service routes deployable on GitHub Pages. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import GrowthCatalog from "./pages/GrowthCatalog";

function AppRoutes() {
  return <Switch><Route path="/:slug" component={GrowthCatalog} /><Route path="/" component={GrowthCatalog} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light" switchable><TooltipProvider><Toaster /><Router hook={useHashLocation}><AppRoutes /></Router></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
