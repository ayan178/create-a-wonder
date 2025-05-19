
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiBriefcase, 
  FiArrowRight, 
  FiArrowLeft, 
  FiGlobe, 
  FiHash, 
  FiInfo
} from "react-icons/fi";
import { ModeToggle } from "@/components/ModeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const EmployerRegister = () => {
  const navigate = useNavigate();
  const { registerEmployer, isLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    industry: "",
    company_size: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      title: "What's your first name?",
      field: "first_name",
      placeholder: "Enter your first name",
      icon: <FiUser className="text-gray-400" />,
      type: "text",
    },
    {
      title: "What's your last name?",
      field: "last_name",
      placeholder: "Enter your last name",
      icon: <FiUser className="text-gray-400" />,
      type: "text",
    },
    {
      title: "What company do you represent?",
      field: "company_name",
      placeholder: "Enter your company name",
      icon: <FiBriefcase className="text-gray-400" />,
      type: "text",
    },
    {
      title: "What's your work email?",
      field: "email",
      placeholder: "Enter your business email",
      icon: <FiMail className="text-gray-400" />,
      type: "email",
    },
    {
      title: "How big is your company?",
      field: "company_size",
      placeholder: "Select company size",
      icon: <FiHash className="text-gray-400" />,
      type: "select",
      options: [
        { value: "1-10", label: "1-10 employees" },
        { value: "11-50", label: "11-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-500", label: "201-500 employees" },
        { value: "501+", label: "501+ employees" }
      ]
    },
    {
      title: "What industry are you in?",
      field: "industry",
      placeholder: "Select your industry",
      icon: <FiGlobe className="text-gray-400" />,
      type: "select",
      options: [
        { value: "technology", label: "Technology & Software" },
        { value: "finance", label: "Finance & Banking" },
        { value: "healthcare", label: "Healthcare & Medicine" },
        { value: "education", label: "Education" },
        { value: "retail", label: "Retail & E-commerce" },
        { value: "manufacturing", label: "Manufacturing" },
        { value: "other", label: "Other" }
      ]
    },
    {
      title: "Create a secure password",
      field: "password",
      placeholder: "Create a password",
      icon: <FiLock className="text-gray-400" />,
      type: "password",
    },
    {
      title: "Confirm your password",
      field: "confirmPassword",
      placeholder: "Confirm your password",
      icon: <FiLock className="text-gray-400" />,
      type: "password",
    }
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ""
      });
    }
  };

  const validateFormData = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company name is required";
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
    
    if (!validateFormData()) {
      toast({
        title: "Form validation error",
        description: "Please fix the errors before submitting",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await registerEmployer({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        company_name: formData.company_name,
        industry: formData.industry,
        company_size: formData.company_size
      });
      // Navigation is handled in the useAuth hook
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive"
      });
    }
  };

  const isCurrentFieldValid = () => {
    if (currentStep >= steps.length) return true;
    
    const field = steps[currentStep].field;
    const value = formData[field as keyof typeof formData];
    
    if (typeof value === 'string') {
      if (field === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      if (field === 'password') {
        return value.length >= 6;
      }
      if (field === 'confirmPassword') {
        return value === formData.password;
      }
      return value.length > 0;
    }
    return true;
  };

  const renderInput = (step: any) => {
    if (step.type === "select") {
      return (
        <Select 
          onValueChange={(value) => handleInputChange(step.field, value)}
          value={formData[step.field as keyof typeof formData] as string}
        >
          <SelectTrigger className="pl-10">
            <SelectValue placeholder={step.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {step.options.map((option: any) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    } else {
      return (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {step.icon}
          </div>
          <Input 
            type={step.type}
            placeholder={step.placeholder}
            className="pl-10"
            value={formData[step.field as keyof typeof formData] as string}
            onChange={(e) => handleInputChange(step.field, e.target.value)}
            autoFocus
          />
        </div>
      );
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
                {currentStep < steps.length ? (
                  <>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex-1">
                          <div className="flex items-center">
                            {currentStep > 0 && (
                              <button 
                                onClick={handlePrevStep}
                                className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              >
                                <FiArrowLeft className="h-5 w-5" />
                              </button>
                            )}
                            <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {currentStep + 1}/{steps.length + 1}
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full">
                        <div 
                          className="bg-brand-purple h-1 rounded-full transition-all duration-300"
                          style={{ width: `${((currentStep + 1) / (steps.length + 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          {renderInput(steps[currentStep])}
                          {errors[steps[currentStep].field] && (
                            <p className="text-xs text-red-500 mt-1">{errors[steps[currentStep].field]}</p>
                          )}
                        </div>
                        
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleNextStep}
                            disabled={!isCurrentFieldValid()}
                            className="flex items-center gap-2"
                          >
                            Next <FiArrowRight />
                          </Button>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </>
                ) : (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold">Final Step</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                          Review and complete your registration
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Your Information</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-sm font-medium">First Name</p>
                              <p className="text-sm">{formData.first_name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Last Name</p>
                              <p className="text-sm">{formData.last_name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Company</p>
                              <p className="text-sm">{formData.company_name}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm">{formData.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Company Size</p>
                              <p className="text-sm">{formData.company_size}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Industry</p>
                              <p className="text-sm">{formData.industry}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange('agreeToTerms', !!checked)}
                          className="mt-1" 
                          required 
                        />
                        <div>
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the terms and conditions
                          </label>
                          <p className="text-xs text-gray-500 mt-1">
                            By creating an account, you agree to our{" "}
                            <Link to="/terms" className="text-brand-blue hover:underline">Terms of Service</Link> and{" "}
                            <Link to="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>.
                          </p>
                          {errors.agreeToTerms && (
                            <p className="text-xs text-red-500 mt-1">{errors.agreeToTerms}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={handlePrevStep}
                          className="flex items-center gap-2"
                        >
                          <FiArrowLeft /> Back
                        </Button>
                        
                        <Button 
                          onClick={handleSubmit}
                          disabled={!formData.agreeToTerms || isLoading}
                          className="bg-brand-purple hover:bg-indigo-600"
                        >
                          {isLoading ? "Creating Account..." : "Create Employer Account"}
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
                
                <div className="mt-8">
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link to="/employer/login" className="text-brand-blue font-medium hover:underline">
                      Login instead
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md flex items-center justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full bg-indigo-100/30 backdrop-blur-md animate-pulse"></div>
                <img 
                  src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
                  alt="AI Assistant" 
                  className="absolute inset-0 m-auto w-48 h-48 object-contain"
                />
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                  <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Your AI Hiring Assistant</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Find the best candidates efficiently</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </EnhancedBackground>
  );
};

export default EmployerRegister;
