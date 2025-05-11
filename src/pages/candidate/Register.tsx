
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { ModeToggle } from "@/components/ModeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";

const CandidateRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/candidate/verify-otp');
  };

  return (
    <EnhancedBackground intensity="extreme">
      <div className="min-h-screen flex flex-col">
        <div className="absolute top-8 right-8 z-10">
          <ModeToggle />
        </div>
        
        <Link to="/" className="absolute top-8 left-8 z-10">
          <img 
            src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
            alt="AI Interview Logo" 
            className="h-10" 
          />
        </Link>
        
        <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <div className="glass-card rounded-xl p-8 shadow-xl">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2">Register as a Candidate</h1>
                  <p className="text-gray-600 dark:text-gray-400">Create your account to start your interview journey</p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiUser className="text-gray-400" />
                      </div>
                      <Input 
                        id="name"
                        type="text" 
                        placeholder="Enter your full name"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

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
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiLock className="text-gray-400" />
                      </div>
                      <Input 
                        id="password"
                        type="password" 
                        placeholder="Create a password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiLock className="text-gray-400" />
                      </div>
                      <Input 
                        id="confirm-password"
                        type="password" 
                        placeholder="Confirm your password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-1" required />
                    <div>
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        By creating an account, you agree to our{" "}
                        <Link to="/terms" className="text-brand-blue hover:underline">Terms of Service</Link> and{" "}
                        <Link to="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>.
                      </p>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-brand-purple hover:bg-indigo-600">
                    Register
                  </Button>
                </form>
                
                <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/candidate/login" className="text-brand-blue font-medium hover:underline">
                    Login instead
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

export default CandidateRegister;
