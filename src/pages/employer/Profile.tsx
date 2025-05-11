
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ModeToggle } from "@/components/ModeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const EmployerProfile = () => {
  const [formData, setFormData] = useState({
    name: "John Smith",
    company: "TechInnovate Inc.",
    jobTitle: "HR Manager",
    email: "john.smith@techinnovate.com",
    phone: "+1 (555) 123-4567",
    website: "https://techinnovate.com",
    bio: "As an HR manager with over 10 years of experience in the tech industry, I focus on finding the best talent through innovative recruitment strategies.",
    notifications: {
      email: true,
      sms: false,
      browser: true,
      app: true
    },
    avatar: "https://ui-avatars.com/api/?name=John+Smith&background=4F46E5&color=fff"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  return (
    <EnhancedBackground intensity="extreme" variant="dashboard">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/employer/dashboard" className="flex items-center">
              <img 
                src="https://interviewstaging.shiksak.com/storage/customimages/ai-interviewlogo.png" 
                alt="AI Interview Logo" 
                className="h-10" 
              />
            </Link>
            
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button 
                onClick={() => toast.info("Notifications clicked")} 
                variant="ghost" 
                size="icon"
                className="relative"
              >
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
              </Button>
              <Link to="/employer/profile">
                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                  <img src={formData.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
                </Button>
              </Link>
              <Link to="/employer/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link to="/">
                <Button variant="destructive">Logout</Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account and preferences</p>
            </div>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and how we can contact you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-4">
                          <Avatar className="h-24 w-24 border-2 border-white shadow-md">
                            <AvatarImage src={formData.avatar} />
                            <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <Button variant="outline" size="sm">Change Avatar</Button>
                      </div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              name="name" 
                              value={formData.name} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input 
                              id="jobTitle" 
                              name="jobTitle" 
                              value={formData.jobTitle} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email"
                              value={formData.email} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone" 
                              name="phone" 
                              value={formData.phone} 
                              onChange={handleInputChange} 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            name="bio"
                            rows={4}
                            value={formData.bio} 
                            onChange={handleInputChange} 
                            placeholder="Tell us about yourself"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="company">
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Update your company details and profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input 
                            id="company" 
                            name="company" 
                            value={formData.company} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Company Website</Label>
                          <Input 
                            id="website" 
                            name="website" 
                            value={formData.website} 
                            onChange={handleInputChange} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="companyDescription">Company Description</Label>
                        <Textarea 
                          id="companyDescription" 
                          name="companyDescription"
                          rows={4}
                          placeholder="Describe your company"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded">
                            <span className="text-gray-400">Logo</span>
                          </div>
                          <Button variant="outline">Upload Logo</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your password and account security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input 
                            id="current-password" 
                            type="password"
                            placeholder="••••••••" 
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input 
                            id="new-password" 
                            type="password"
                            placeholder="••••••••" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input 
                            id="confirm-password" 
                            type="password"
                            placeholder="••••••••" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Password must include:</p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                          <li>At least 8 characters</li>
                          <li>At least one uppercase letter</li>
                          <li>At least one number</li>
                          <li>At least one special character</li>
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable 2FA</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Update Password</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to be notified
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive candidate applications via email</p>
                          </div>
                          <Switch 
                            checked={formData.notifications.email}
                            onCheckedChange={() => handleNotificationChange('email')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Get text messages for important updates</p>
                          </div>
                          <Switch 
                            checked={formData.notifications.sms}
                            onCheckedChange={() => handleNotificationChange('sms')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Browser Notifications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Show desktop notifications</p>
                          </div>
                          <Switch 
                            checked={formData.notifications.browser}
                            onCheckedChange={() => handleNotificationChange('browser')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Mobile App Notifications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Push notifications on your mobile device</p>
                          </div>
                          <Switch 
                            checked={formData.notifications.app}
                            onCheckedChange={() => handleNotificationChange('app')}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Notification Types</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="new-applications" defaultChecked />
                            <Label htmlFor="new-applications">New Applications</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="interview-reminders" defaultChecked />
                            <Label htmlFor="interview-reminders">Interview Reminders</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="job-expiry" defaultChecked />
                            <Label htmlFor="job-expiry">Job Expiry</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="messages" defaultChecked />
                            <Label htmlFor="messages">Messages</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Preferences</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </EnhancedBackground>
  );
};

export default EmployerProfile;
