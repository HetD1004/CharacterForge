import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import PersonaInterview from "./pages/PersonaInterview";
import AdjectiveGrouping from "./pages/AdjectiveGrouping";
import PersonaForm from "./pages/PersonaForm";
import PersonaOutput from "./pages/PersonaOutput";
import MoodBoard from "./pages/MoodBoard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/persona-interview" element={<PersonaInterview />} />
            <Route path="/adjective-grouping" element={<AdjectiveGrouping />} />
            <Route path="/persona-form" element={<PersonaForm />} />
            <Route path="/persona-output" element={<PersonaOutput />} />
            <Route path="/mood-board" element={<MoodBoard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
