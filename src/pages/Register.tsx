
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

const Register = () => {
  const [step, setStep] = useState(1);
  
  const goToNextStep = () => {
    setStep(step + 1);
  };
  
  const goToPreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 animated-gradient-background"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      
      <Link to="/" className="absolute top-8 left-8 z-10">
        <img 
          src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
          alt="AI Interview Logo" 
          className="h-10" 
        />
      </Link>
      
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass-card rounded-xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
              <p className="text-gray-600">Join our platform to start your interview practice</p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center">
                <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-brand-purple' : 'bg-gray-200'}`}></div>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-brand-purple text-white' : 'bg-gray-200'}`}>
                  {step > 1 ? '✓' : '1'}
                </div>
                <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-brand-purple' : 'bg-gray-200'}`}></div>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-brand-purple text-white' : 'bg-gray-200'}`}>
                  {step > 2 ? '✓' : '2'}
                </div>
                <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-brand-purple' : 'bg-gray-200'}`}></div>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-brand-purple text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-brand-purple' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Account</span>
                <span>Personal</span>
                <span>Complete</span>
              </div>
            </div>
            
            {step === 1 && (
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
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
                    />
                  </div>
                </div>
                
                <Button type="button" onClick={goToNextStep} className="w-full bg-brand-purple hover:bg-indigo-600">
                  Continue
                </Button>
              </motion.form>
            )}
            
            {step === 2 && (
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label htmlFor="full-name" className="text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiUser className="text-gray-400" />
                    </div>
                    <Input 
                      id="full-name"
                      type="text" 
                      placeholder="Enter your full name"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <Input 
                      id="phone"
                      type="tel" 
                      placeholder="Enter your phone number"
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">Your Role</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="jobseeker">Job Seeker</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={goToPreviousStep} 
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={goToNextStep} 
                    className="flex-1 bg-brand-purple hover:bg-indigo-600"
                  >
                    Continue
                  </Button>
                </div>
              </motion.form>
            )}
            
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Almost there!</h3>
                  <p className="text-gray-600 text-center mb-4">Just agree to our terms to complete your registration.</p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" className="mt-1" />
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
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={goToPreviousStep} 
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    className="flex-1 bg-brand-purple hover:bg-indigo-600"
                  >
                    Complete Registration
                  </Button>
                </div>
              </motion.div>
            )}
            
            <div className="mt-8">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-blue font-medium hover:underline">
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
