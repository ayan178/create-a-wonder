
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { NavItem } from "@/types/navbar";

interface DesktopNavProps {
  navItems: NavItem[];
  closeMenu: () => void;
}

const DesktopNav = ({ navItems, closeMenu }: DesktopNavProps) => {
  const location = useLocation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link 
          key={item.label} 
          to={item.href}
          className={`text-sm font-medium px-1 py-1 border-b-2 transition-colors ${
            location.pathname === item.href
              ? isDarkMode
                ? 'border-white text-white'
                : 'border-brand-primary text-brand-primary'
              : isDarkMode
                ? 'border-transparent text-white/70 hover:text-white hover:border-white/50'
                : 'border-transparent text-gray-600 hover:text-brand-primary hover:border-brand-primary/50'
          }`}
          onClick={(e) => {
            if (item.href.startsWith('#') && location.pathname === '/') {
              e.preventDefault();
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
    </nav>
  );
};

export default DesktopNav;
