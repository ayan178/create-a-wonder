
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  isOnDashboardPage: boolean;
  isOnLoginPage: boolean;
  loginLink: string;
  dashboardLink: string;
}

const AuthButtons = ({ 
  isOnDashboardPage, 
  isOnLoginPage, 
  loginLink, 
  dashboardLink 
}: AuthButtonsProps) => {
  if (isOnDashboardPage) {
    return null;
  }

  if (isOnLoginPage) {
    return (
      <Link to={dashboardLink}>
        <Button variant="default" size="sm">
          Dashboard
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/candidate/login">
        <Button variant="outline" size="sm">
          I am a Candidate
        </Button>
      </Link>
      <Link to="/employer/login">
        <Button variant="default" size="sm">
          I want to Hire
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
