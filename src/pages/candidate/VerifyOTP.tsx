
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ModeToggle } from "@/components/ModeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";

const CandidateVerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: number;
    if (timeLeft > 0) {
      timer = window.setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      toast.success("OTP verified successfully");
      navigate('/candidate/dashboard');
    } else {
      toast.error("Please enter a valid OTP");
    }
  };

  const handleResendOTP = () => {
    if (canResend) {
      setTimeLeft(60);
      setCanResend(false);
      toast.success("A new OTP has been sent to your email");
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="glass-card rounded-xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
                <p className="text-gray-600 dark:text-gray-400">An OTP has been sent to your email address</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Please enter the code to verify your account</p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-medium">Enter 6-Digit OTP</label>
                  <Input 
                    id="otp"
                    type="text" 
                    placeholder="Enter your OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    {timeLeft > 0 ? (
                      `OTP expires in ${timeLeft} seconds`
                    ) : (
                      "OTP expired"
                    )}
                  </p>
                </div>
                
                <Button type="submit" className="w-full bg-brand-purple hover:bg-indigo-600">
                  Verify OTP
                </Button>
              </form>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Didn't receive the code?
                </p>
                <Button 
                  type="button" 
                  variant="link" 
                  className={`text-brand-blue ${!canResend && 'opacity-50 cursor-not-allowed'}`}
                  disabled={!canResend}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </Button>
              </div>
              
              <div className="text-center mt-6">
                <Link to="/candidate/register" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                  Return to registration
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </EnhancedBackground>
  );
};

export default CandidateVerifyOTP;
