
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useNavbarState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  // Check if we're on a candidate or employer page
  const isCandidate = location.pathname.includes("/candidate");
  const isEmployer = location.pathname.includes("/employer");
  
  // Determine the appropriate login/dashboard links
  const loginLink = isEmployer ? "/employer/login" : "/candidate/login";
  const dashboardLink = isEmployer ? "/employer/dashboard" : "/candidate/dashboard";
  
  // Check if user is on login or dashboard page
  const isOnLoginPage = location.pathname.includes("/login") || location.pathname.includes("/register");
  const isOnDashboardPage = location.pathname.includes("/dashboard");
  
  return {
    isOpen,
    setIsOpen,
    scrolled,
    closeMenu,
    loginLink,
    dashboardLink,
    isOnLoginPage,
    isOnDashboardPage,
    location
  };
};
