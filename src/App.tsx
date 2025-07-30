import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContextProvider, useApp } from "@/context/AppContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Certifications from "./pages/Certifications";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import { Loading } from "@/components/ui/loading";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AppContextProvider>
  </QueryClientProvider>
);

const AppContent = () => {
  const { loading } = useApp();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/tickets" element={
          <Layout>
            <Tickets />
          </Layout>
        } />
        <Route path="/projects" element={
          <Layout>
            <Projects />
          </Layout>
        } />
        <Route path="/team" element={
          <Layout>
            <Team />
          </Layout>
        } />
        <Route path="/certifications" element={
          <Layout>
            <Certifications />
          </Layout>
        } />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
