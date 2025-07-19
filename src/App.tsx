import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TechnologiesPage from "./pages/TechnologiesPage";
import PortfolioPage from "./pages/PortfolioPage";
import QuotePage from "./pages/QuotePage";
import ContactPage from "./pages/ContactPage";
import FDMTechnology from "./pages/FDMTechnology";
import SLATechnology from "./pages/SLATechnology";
import SLSTechnology from "./pages/SLSTechnology";
import MJFTechnology from "./pages/MJFTechnology";
import PolyjetTechnology from "./pages/PolyjetTechnology";
import MetalTechnology from "./pages/MetalTechnology";
import TeamsPage from "./pages/TeamsPage";
import ProfilePage from "./pages/ProfilePage";
import NetworkStatus from "./components/NetworkStatus";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <ThemeProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <NetworkStatus />
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={<Index />}
                            />
                            <Route
                                path="/technologies"
                                element={<TechnologiesPage />}
                            />
                            <Route
                                path="/portfolio"
                                element={<PortfolioPage />}
                            />
                            <Route
                                path="/team"
                                element={<TeamsPage />}
                            />
                            <Route
                                path="/quote"
                                element={<QuotePage />}
                            />
                            <Route
                                path="/contact"
                                element={<ContactPage />}
                            />
                            <Route
                                path="/technology/fdm"
                                element={<FDMTechnology />}
                            />
                            <Route
                                path="/technology/sla"
                                element={<SLATechnology />}
                            />
                            <Route
                                path="/technology/sls"
                                element={<SLSTechnology />}
                            />
                            <Route
                                path="/technology/mjf"
                                element={<MJFTechnology />}
                            />
                            <Route
                                path="/technology/polyjet"
                                element={<PolyjetTechnology />}
                            />
                            <Route
                                path="/technology/metal"
                                element={<MetalTechnology />}
                            />
                            <Route
                                path="/profile"
                                element={<ProfilePage />}
                            />
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route
                                path="*"
                                element={<NotFound />}
                            />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </ThemeProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;
