import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FiMail, FiLock } from "react-icons/fi";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { ModeToggle } from "@/components/ModeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";

const CandidateLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/candidate/dashboard');
  };

  return (
    <EnhancedBackground intensity="medium">
      <div className="min-h-screen flex flex-col">
        <div className="absolute top-8 right-8 z-50">
          <ModeToggle />
        </div>
        
        <Link to="/" className="absolute top-8 left-8 z-50">
          <img 
            src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
            alt="AI Interview Logo" 
            className="h-10" 
          />
        </Link>
        
        <div className="absolute inset-0 bg-background/30 dark:bg-background/50 backdrop-blur-sm z-10"></div>
        
        <div className="flex-1 flex items-center justify-center relative z-20 px-4 py-12">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <div className="glass-card rounded-xl p-8 shadow-xl">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2">Candidate Login</h1>
                  <p className="text-gray-600 dark:text-gray-400">Login to start your interview journey</p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiMail className="text-gray-400" />
                      </div>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="Enter your email"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium">Password</label>
                      <Link to="/candidate/forgot-password" className="text-sm text-brand-blue hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiLock className="text-gray-400" />
                      </div>
                      <Input 
                        id="password"
                        type="password" 
                        placeholder="Enter your password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-brand-purple hover:bg-indigo-600">
                    Sign In
                  </Button>
                </form>
                
                <div className="mt-6 flex items-center justify-center">
                  <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
                  <span className="px-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
                  <div className="h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <FaGoogle className="mr-2" />
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FaFacebook className="mr-2" />
                    Facebook
                  </Button>
                </div>
                
                <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/candidate/register" className="text-brand-blue font-medium hover:underline">
                    Register as a candidate
                  </Link>
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md flex items-center justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-indigo-100/30 dark:bg-indigo-900/20 backdrop-blur-md animate-pulse"></div>
                <img 
                  src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
                  alt="AI Assistant" 
                  className="absolute inset-0 m-auto w-48 h-48 object-contain"
                />
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                  <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Your AI Interview Assistant</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ready to help you succeed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </EnhancedBackground>
  );
};

export default CandidateLogin;
