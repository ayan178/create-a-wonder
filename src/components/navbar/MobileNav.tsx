
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { NavItem } from "@/types/navbar";

interface MobileNavProps {
  isOpen: boolean;
  closeMenu: () => void;
  navItems: NavItem[];
  isOnDashboardPage: boolean;
  isOnLoginPage: boolean;
  loginLink: string;
  dashboardLink: string;
}

const MobileNav = ({
  isOpen,
  closeMenu,
  navItems,
  isOnDashboardPage,
  isOnLoginPage,
  loginLink,
  dashboardLink
}: MobileNavProps) => {
  const location = useLocation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden overflow-hidden ${
            isDarkMode ? 'bg-background/95' : 'bg-white/95'
          } backdrop-blur-md`}
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`block px-4 py-2 rounded-lg text-base font-medium ${
                  location.pathname === item.href
                    ? isDarkMode
                      ? 'bg-white/10 text-white'
                      : 'bg-brand-primary/10 text-brand-primary'
                    : isDarkMode
                      ? 'text-white/70 hover:bg-white/5 hover:text-white'
                      : 'text-gray-600 hover:bg-brand-primary/5 hover:text-brand-primary'
                }`}
                onClick={() => {
                  if (item.href.startsWith('#') && location.pathname === '/') {
                    document.querySelector(item.href)?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }
                  closeMenu();
                }}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Auth buttons */}
            {!isOnDashboardPage && (
              <>
                {isOnLoginPage ? (
                  <Link to={dashboardLink} onClick={closeMenu}>
                    <Button variant="default" className="w-full mt-4">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link to="/candidate/login" onClick={closeMenu}>
                      <Button variant="outline" className="w-full">
                        I am a Candidate
                      </Button>
                    </Link>
                    <Link to="/employer/login" onClick={closeMenu}>
                      <Button variant="default" className="w-full">
                        I want to Hire
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full flex justify-between items-center mt-2" 
              onClick={closeMenu}
            >
              Close Menu
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
