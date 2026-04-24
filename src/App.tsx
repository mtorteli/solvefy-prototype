import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { captureUtms } from "@/lib/utms";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cpaas from "./pages/Cpaas.tsx";
import Ads from "./pages/Ads.tsx";
import Marketing from "./pages/Marketing.tsx";
import Crm from "./pages/Crm.tsx";
import Cloud from "./pages/Cloud.tsx";
import QuemSomos from "./pages/QuemSomos.tsx";
import BlogIndex from "./pages/BlogIndex.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import BlogCategory from "./pages/BlogCategory.tsx";
import Contact from "./pages/Contact.tsx";

import { ScrollToTop } from "@/components/ScrollToTop";

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
          <ScrollToTop />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cpaas" element={<Cpaas />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/crm" element={<Crm />} />
          <Route path="/cloud" element={<Cloud />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/contato" element={<Contact />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/categoria/:category" element={<BlogCategory />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
