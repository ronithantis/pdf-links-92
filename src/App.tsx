import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import ModulePage from "./pages/ModulePage";
import DigitalTools from "./pages/DigitalTools";

import Contact from "./pages/Contact";
import KnowledgeCenter from "./pages/KnowledgeCenter";
import ForeignWorkerSearch from "./pages/ForeignWorkerSearch";
import CognitiveTraining from "./pages/CognitiveTraining";
import TasksList from "./pages/TasksList";
import TechnicalSpec from "./pages/TechnicalSpec";
import Auth from "./pages/Auth";
import AdminKnowledge from "./pages/AdminKnowledge";
import AdminSuppliers from "./pages/AdminSuppliers";
import GiveTake from "./pages/GiveTake";
import AdElai from "./pages/AdElai";
import About from "./pages/About";
import MedTracker from "./pages/MedTracker";
import FormsPage from "./pages/FormsPage";
import Rights from "./pages/Rights";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/module/:moduleId" element={<ModulePage />} />
            
            <Route path="/tools" element={<DigitalTools />} />
            <Route path="/knowledge-center" element={<KnowledgeCenter />} />
            <Route path="/foreign-worker-search" element={<ForeignWorkerSearch />} />
            <Route path="/cognitive-training" element={<CognitiveTraining />} />
            <Route path="/tasks-list" element={<TasksList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/technical-spec" element={<TechnicalSpec />} />
            <Route path="/give-take" element={<GiveTake />} />
            <Route path="/ad-elai" element={<AdElai />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/knowledge" element={<AdminKnowledge />} />
            <Route path="/admin/suppliers" element={<AdminSuppliers />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/med-tracker" element={<MedTracker />} />
            <Route path="/rights" element={<Rights />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
