import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const TAB_TITLES = [
  "Yash Walke | Software Engineer",
  "yaaryash@portfolio:~$",
  "Yash Walke — Portfolio",
];

const App = () => {
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % TAB_TITLES.length;
      document.title = TAB_TITLES[index];
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
