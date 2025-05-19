
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FiMail, FiLock } from "react-icons/fi";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { ModeToggle } from "@/components/ModeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  remember: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const EmployerLogin = () => {
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setError(null);
      await login({
        email: values.email,
        password: values.password,
      });
      // Navigation is handled in the useAuth hook
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <EnhancedBackground intensity="medium">
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
                  <h1 className="text-2xl font-bold mb-2">Employer Login</h1>
                  <p className="text-gray-600 dark:text-gray-400">Login to access your hiring dashboard</p>
                </div>
                
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-3 rounded-md mb-6 text-sm">
                    {error}
                  </div>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FiMail className="text-gray-400" />
                              </div>
                              <Input
                                placeholder="Enter your email"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Password</FormLabel>
                            <Link to="/employer/forgot-password" className="text-sm text-brand-blue hover:underline">
                              Forgot password?
                            </Link>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FiLock className="text-gray-400" />
                              </div>
                              <Input
                                type="password" 
                                placeholder="Enter your password"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="remember"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Remember me</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-brand-purple hover:bg-indigo-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
                
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
                  <Link to="/employer/register" className="text-brand-blue font-medium hover:underline">
                    Register as an employer
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

export default EmployerLogin;
