
import React from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider, ProtectedRoute } from './hooks/useAuth';
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Candidate pages
import CandidateLogin from "./pages/candidate/Login";
import CandidateRegister from "./pages/candidate/Register";
import CandidateVerifyOTP from "./pages/candidate/VerifyOTP";
import CandidateDashboard from "./pages/candidate/Dashboard";
import CandidateProfile from "./pages/candidate/Profile";
import CandidateInterview from "./pages/candidate/Interview";

// Employer pages
import EmployerLogin from "./pages/employer/Login";
import EmployerRegister from "./pages/employer/Register";
import EmployerDashboard from "./pages/employer/Dashboard";
import EmployerProfile from "./pages/employer/Profile";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Candidate routes */}
                <Route path="/candidate/login" element={<CandidateLogin />} />
                <Route path="/candidate/register" element={<CandidateRegister />} />
                <Route path="/candidate/verify-otp" element={<CandidateVerifyOTP />} />
                <Route path="/candidate/dashboard" element={
                  <ProtectedRoute userTypes={['candidate']}>
                    <CandidateDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/candidate/profile" element={
                  <ProtectedRoute userTypes={['candidate']}>
                    <CandidateProfile />
                  </ProtectedRoute>
                } />
                <Route path="/candidate/interview" element={
                  <ProtectedRoute userTypes={['candidate']}>
                    <CandidateInterview />
                  </ProtectedRoute>
                } />
                
                {/* Employer routes */}
                <Route path="/employer/login" element={<EmployerLogin />} />
                <Route path="/employer/register" element={<EmployerRegister />} />
                <Route path="/employer/dashboard" element={
                  <ProtectedRoute userTypes={['employer']}>
                    <EmployerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/employer/profile" element={
                  <ProtectedRoute userTypes={['employer']}>
                    <EmployerProfile />
                  </ProtectedRoute>
                } />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
