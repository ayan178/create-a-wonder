
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FiMail, FiLock } from "react-icons/fi";
import { ModeToggle } from "@/components/ModeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";
import { useAuth } from "@/hooks/useAuth";

const CandidateLogin = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login({ email, password });
      // Navigation is handled in the useAuth hook after successful login
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrors({
        ...errors,
        general: error.message || "Login failed. Please check your credentials."
      });
    }
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
                  <h1 className="text-2xl font-bold mb-2">Candidate Login</h1>
                  <p className="text-gray-600 dark:text-gray-400">Welcome back! Please login to your account</p>
                </div>
                
                {errors.general && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-3 rounded-md mb-4 text-sm">
                    {errors.general}
                  </div>
                )}
                
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
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors({ ...errors, email: undefined });
                          }
                        }}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="text-sm font-medium">Password</label>
                      <Link to="/candidate/forgot-password" className="text-xs text-brand-blue hover:underline">
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
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) {
                            setErrors({ ...errors, password: undefined });
                          }
                        }}
                        required
                      />
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <Checkbox 
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      Remember me
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-purple hover:bg-indigo-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
                
                <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/candidate/register" className="text-brand-blue font-medium hover:underline">
                    Register as a Candidate
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
