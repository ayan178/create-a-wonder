
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import EnhancedBackground from "@/components/EnhancedBackground";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    subscribe: false
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      subscribe: false
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <EnhancedBackground intensity="extreme">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Get in Touch
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary/10 rounded-full p-3">
                      <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">info@aiinterview.com</p>
                      <p className="text-gray-600 dark:text-gray-400">support@aiinterview.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary/10 rounded-full p-3">
                      <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                      <p className="text-gray-600 dark:text-gray-400">+1 (555) 987-6543</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary/10 rounded-full p-3">
                      <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">123 Innovation Drive</p>
                      <p className="text-gray-600 dark:text-gray-400">San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h2 className="text-2xl font-semibold mb-6">Follow Us</h2>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-full p-3 transition-all">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-full p-3 transition-all">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-full p-3 transition-all">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                      </svg>
                    </a>
                    <a href="#" className="bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-full p-3 transition-all">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.773 5.159h-15.6C3.483 5.159 3 5.642 3 6.232v11.486c0 .59.483 1.073 1.173 1.073h15.6c.69 0 1.173-.483 1.173-1.073V6.232c0-.59-.483-1.073-1.173-1.073zm0 .715a.45.45 0 01.458.458v11.486a.45.45 0 01-.458.458h-15.6a.45.45 0 01-.458-.458V6.232a.45.45 0 01.458-.458h15.6zm-1.225 8.535l-4.883-4.882a.84.84 0 00-1.189 0l-3.458 3.458-1.458-1.458a.839.839 0 00-1.189 0l-2.65 2.65a.358.358 0 000 .506.358.358 0 00.507 0l2.65-2.65a.122.122 0 01.175 0l1.458 1.458a.84.84 0 001.19 0l3.457-3.458a.122.122 0 01.175 0l4.883 4.883a.358.358 0 00.507 0 .358.358 0 000-.507z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-800"
              >
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Please provide as much detail as possible..."
                      required
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="subscribe" 
                      checked={formData.subscribe}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, subscribe: !!checked }))
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="subscribe"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Subscribe to newsletter
                      </label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Get the latest news and updates from our team.
                      </p>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                    By submitting this form, you agree to our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.
                  </p>
                </form>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-2">How does the AI interview process work?</h3>
                    <p className="text-gray-600 dark:text-gray-400">Our AI-powered system conducts virtual interviews, analyzing responses in real-time to provide accurate candidate assessments and help employers make better hiring decisions.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Is my data secure with your platform?</h3>
                    <p className="text-gray-600 dark:text-gray-400">Absolutely. We use industry-leading encryption and security practices to ensure all your data remains private and protected at all times.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">How much does the service cost?</h3>
                    <p className="text-gray-600 dark:text-gray-400">We offer flexible pricing plans tailored to different business sizes. Contact our sales team for a personalized quote that fits your needs.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Can I integrate with my existing HR system?</h3>
                    <p className="text-gray-600 dark:text-gray-400">Yes, our platform offers seamless integrations with most major HR systems and ATS platforms. Our team can help set up custom integrations if needed.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </EnhancedBackground>
  );
};

export default Contact;
