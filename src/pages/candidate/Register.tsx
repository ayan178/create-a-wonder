
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";
import { ModeToggle } from "@/components/ModeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const CandidateRegister = () => {
  const navigate = useNavigate();
  const { registerCandidate, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job_title: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
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
      await registerCandidate({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        job_title: formData.job_title
      });
      // Navigation is handled in the useAuth hook after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      // Toast is displayed in the useAuth hook
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
                  <h1 className="text-2xl font-bold mb-2">Register as a Candidate</h1>
                  <p className="text-gray-600 dark:text-gray-400">Create your account to start your interview journey</p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first_name" className="text-sm font-medium">First Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FiUser className="text-gray-400" />
                        </div>
                        <Input 
                          id="first_name"
                          name="first_name"
                          type="text" 
                          placeholder="First name"
                          className="pl-10"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {errors.first_name && (
                        <p className="text-xs text-red-500 mt-1">{errors.first_name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="last_name" className="text-sm font-medium">Last Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <FiUser className="text-gray-400" />
                        </div>
                        <Input 
                          id="last_name"
                          name="last_name"
                          type="text" 
                          placeholder="Last name"
                          className="pl-10"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {errors.last_name && (
                        <p className="text-xs text-red-500 mt-1">{errors.last_name}</p>
                      )}
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
                        name="email"
                        type="email" 
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone Number (Optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel" 
                        placeholder="Enter your phone number"
                        className="pl-10"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="job_title" className="text-sm font-medium">Current Job Title (Optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiUser className="text-gray-400" />
                      </div>
                      <Input 
                        id="job_title"
                        name="job_title"
                        type="text" 
                        placeholder="Enter your job title"
                        className="pl-10"
                        value={formData.job_title}
                        onChange={handleChange}
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
                        name="password"
                        type="password" 
                        placeholder="Create a password"
                        className="pl-10"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiLock className="text-gray-400" />
                      </div>
                      <Input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password" 
                        placeholder="Confirm your password"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="agreeToTerms" 
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => {
                        setFormData({
                          ...formData,
                          agreeToTerms: checked === true
                        });
                        if (errors.agreeToTerms) {
                          setErrors({
                            ...errors,
                            agreeToTerms: ""
                          });
                        }
                      }}
                      className="mt-1" 
                    />
                    <div>
                      <label
                        htmlFor="agreeToTerms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        By creating an account, you agree to our{" "}
                        <Link to="/terms" className="text-brand-blue hover:underline">Terms of Service</Link> and{" "}
                        <Link to="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>.
                      </p>
                      {errors.agreeToTerms && (
                        <p className="text-xs text-red-500 mt-1">{errors.agreeToTerms}</p>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-purple hover:bg-indigo-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
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
