
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

const DashboardHeader = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/employer/login");
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-40 py-3 px-4 md:px-6 ${
      theme === 'dark' 
        ? 'bg-black/70 backdrop-blur-xl border-b border-white/10'
        : 'bg-white/70 backdrop-blur-xl border-b border-gray-200/70'
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
            alt="AI Interview Logo" 
            className="h-8" 
          />
          <h1 className="text-xl font-bold hidden md:block">Employer Dashboard</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Button 
            variant="default" 
            className="text-sm"
          >
            Dashboard
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Link to="/employer/profile">
            <Avatar className="cursor-pointer hover:ring-2 hover:ring-brand-primary/30 transition-all">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
          </Link>
          
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium">Employer</p>
            <p className="text-xs text-muted-foreground">Acme Inc.</p>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-100/50"
            onClick={handleLogout}
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
