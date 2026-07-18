import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { captureUtms } from "@/lib/utms";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SkipLink } from "@/components/SkipLink";
import { LocaleLayout } from "@/i18n/LocaleLayout";
import { CookieBanner } from "@/components/CookieBanner";

// Carregado imediatamente — é a entrada do site
import Index from "./pages/Index.tsx";

// Demais páginas: carregamento sob demanda (chunks separados)
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Cpaas = lazy(() => import("./pages/Cpaas.tsx"));
const Ads = lazy(() => import("./pages/Ads.tsx"));
const Marketing = lazy(() => import("./pages/Marketing.tsx"));
const Crm = lazy(() => import("./pages/Crm.tsx"));
const Agents = lazy(() => import("./pages/Agents.tsx"));
const Cloud = lazy(() => import("./pages/Cloud.tsx"));
const QuemSomos = lazy(() => import("./pages/QuemSomos.tsx"));
const BlogIndex = lazy(() => import("./pages/BlogIndex.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const BlogCategory = lazy(() => import("./pages/BlogCategory.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const AdsEmpreendeBrasil = lazy(() => import("./pages/AdsEmpreendeBrasil.tsx"));
const CpaasEmpreendeBrasil = lazy(() => import("./pages/CpaasEmpreendeBrasil.tsx"));
const CampanhaAgentsCopa50 = lazy(() => import("./pages/CampanhaAgentsCopa50.tsx"));
const Campanha2AgentsCopa50 = lazy(() => import("./pages/Campanha2AgentsCopa50.tsx"));
const CampanhaCpaas261 = lazy(() => import("./pages/CampanhaCpaas261.tsx"));
const CampanhaAds261 = lazy(() => import("./pages/CampanhaAds261.tsx"));

const queryClient = new QueryClient();

// Conjunto de rotas compartilhado entre os 3 locales — montado sob cada
// prefixo (`/`, `/en`, `/es`) pelo `LocaleLayout`. Paths são RELATIVOS para
// que o React Router herde o prefixo do `<Route path="/en/*">` pai.
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="cpaas" element={<Cpaas />} />
    <Route path="ads" element={<Ads />} />
    <Route path="marketing" element={<Marketing />} />
    <Route path="crm" element={<Crm />} />
    <Route path="agents" element={<Agents />} />
    <Route path="cloud" element={<Cloud />} />
    <Route path="quem-somos" element={<QuemSomos />} />
    <Route path="contato" element={<Contact />} />

    {/* Blog Routes */}
    <Route path="blog" element={<BlogIndex />} />
    <Route path="blog/:slug" element={<BlogPost />} />
    <Route path="blog/categoria/:category" element={<BlogCategory />} />

    {/* Landing Pages */}
    <Route path="ads-empreendebrasil" element={<AdsEmpreendeBrasil />} />
    <Route path="cpaas-empreendebrasil" element={<CpaasEmpreendeBrasil />} />
    <Route path="campanha-agents-copa50" element={<CampanhaAgentsCopa50 />} />
    <Route path="campanha2-agents-copa50" element={<Campanha2AgentsCopa50 />} />
    <Route path="campanha-cpaas-261" element={<CampanhaCpaas261 />} />
    <Route path="campanha-ads-261" element={<CampanhaAds261 />} />

    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  useEffect(() => {
    captureUtms();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <SkipLink />
          <ScrollToTop />
          <CookieBanner />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route
                path="/en/*"
                element={
                  <LocaleLayout lang="en">
                    <AppRoutes />
                  </LocaleLayout>
                }
              />
              <Route
                path="/es/*"
                element={
                  <LocaleLayout lang="es">
                    <AppRoutes />
                  </LocaleLayout>
                }
              />
              <Route
                path="/*"
                element={
                  <LocaleLayout lang="pt-BR">
                    <AppRoutes />
                  </LocaleLayout>
                }
              />
            </Routes>
          </Suspense>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
