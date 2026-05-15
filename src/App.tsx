import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { captureUtms } from "@/lib/utms";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SkipLink } from "@/components/SkipLink";

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

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    captureUtms();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SkipLink />
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cpaas" element={<Cpaas />} />
              <Route path="/ads" element={<Ads />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/crm" element={<Crm />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/cloud" element={<Cloud />} />
              <Route path="/quem-somos" element={<QuemSomos />} />
              <Route path="/contato" element={<Contact />} />

              {/* Blog Routes */}
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route
                path="/blog/categoria/:category"
                element={<BlogCategory />}
              />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
