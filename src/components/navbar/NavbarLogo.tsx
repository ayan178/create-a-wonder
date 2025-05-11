
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

const NavbarLogo = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/dd63a16d-398e-4187-a982-b19a91446630.png" 
        alt="Vinte AI Interview" 
        className="h-12 w-auto"
        loading="eager"
      />
    </Link>
  );
};

export default React.memo(NavbarLogo);
