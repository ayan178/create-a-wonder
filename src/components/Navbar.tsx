
import React from "react";
import { motion } from "framer-motion";
import { Menu, LogOut, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";
import AuthButtons from "./navbar/AuthButtons";
import { useNavbarState } from "@/hooks/useNavbarState";
import { getNavItems } from "@/data/navItems";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const {
    isOpen,
    setIsOpen,
    scrolled,
    closeMenu,
    loginLink,
    dashboardLink,
    isOnLoginPage,
    isOnDashboardPage,
    location
  } = useNavbarState();
  
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const navItems = getNavItems();
  
  // Determine profile path based on route
  const profilePath = location.pathname.includes("/employer") 
    ? "/employer/profile" 
    : location.pathname.includes("/candidate")
    ? "/candidate/profile"
    : "";

  // Check if on employer or candidate dashboard
  const isEmployerDashboard = location.pathname.includes("/employer/dashboard");
  const isCandidateDashboard = location.pathname.includes("/candidate/dashboard");

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? isDarkMode 
            ? 'bg-background/90 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <NavbarLogo />

          {/* Desktop Navigation */}
          <DesktopNav navItems={navItems} closeMenu={closeMenu} />

          {/* Right Side - Auth & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {!isOnDashboardPage && (
              <AuthButtons 
                isOnDashboardPage={isOnDashboardPage}
                isOnLoginPage={isOnLoginPage}
                loginLink={loginLink}
                dashboardLink={dashboardLink}
              />
            )}
            
            {/* If on dashboard and profile path exists, show profile link */}
            {isOnDashboardPage && profilePath && (
              <>
                {isEmployerDashboard ? (
                  <Link to={profilePath} className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium">EM</span>
                    </div>
                  </Link>
                ) : isCandidateDashboard ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-brand-primary/30 transition-all">
                        <AvatarFallback>CD</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link to="/candidate/profile" className="cursor-pointer flex items-center">
                          <UserCog className="mr-2 h-4 w-4" />
                          <span>Edit Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </>
            )}
            
            {/* Theme Toggle Button */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <ThemeToggle />
            <Button variant="outline" size="icon" className="ml-2" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNav 
        isOpen={isOpen}
        closeMenu={closeMenu}
        navItems={navItems}
        isOnDashboardPage={isOnDashboardPage}
        isOnLoginPage={isOnLoginPage}
        loginLink={loginLink}
        dashboardLink={dashboardLink}
      />
    </motion.header>
  );
};

export default Navbar;
