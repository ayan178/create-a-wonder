
import React from "react";
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  name: string;
  email: string;
}

interface DashboardHeaderProps {
  profileData: ProfileData;
}

const DashboardHeader = ({ profileData }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/candidate/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b dark:border-gray-800">
      <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img 
              src="/lovable-uploads/dd63a16d-398e-4187-a982-b19a91446630.png" 
              alt="AI Interview Logo" 
              className="h-12" // Increased from h-8 to h-12
            />
          </Link>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="border-2 border-primary transition-all hover:scale-105 cursor-pointer">
                <AvatarImage src="/lovable-uploads/dd63a16d-398e-4187-a982-b19a91446630.png" alt="Profile" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-in fade-in duration-300">
              <div className="p-3 border-b">
                <p className="font-medium">{profileData.name}</p>
                <p className="text-xs text-muted-foreground">{profileData.email}</p>
              </div>
              <DropdownMenuItem asChild>
                <Link to="/candidate/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:bg-red-100 focus:text-red-600 dark:focus:bg-red-900/50">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
