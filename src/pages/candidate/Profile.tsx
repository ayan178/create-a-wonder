
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
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

const CandidateProfile = () => {
  const [formData, setFormData] = useState({
    name: "David Chen",
    jobTitle: "Senior Frontend Developer",
    email: "david.chen@example.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    website: "https://davidchen.dev",
    bio: "Passionate frontend developer with 5+ years of experience building responsive web applications using React, TypeScript, and modern JavaScript frameworks.",
    skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Redux", "GraphQL"],
    education: [
      {
        degree: "B.S. Computer Science",
        school: "University of California, Berkeley",
        year: "2015 - 2019"
      }
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        period: "2021 - Present",
        description: "Lead developer for the company's main product dashboard"
      },
      {
        title: "Frontend Developer",
        company: "StartupX",
        period: "2019 - 2021",
        description: "Developed responsive web applications"
      }
    ],
    notifications: {
      email: true,
      sms: false,
      browser: true
    },
    avatar: "https://ui-avatars.com/api/?name=David+Chen&background=4F46E5&color=fff"
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

  const handleSaveChanges = () => {
    toast.success("Profile updated successfully");
  };

  const handleAddSkill = () => {
    toast.success("Skill added");
  };

  return (
    <EnhancedBackground intensity="extreme" variant="dashboard">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/candidate/dashboard" className="flex items-center">
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
              <Link to="/candidate/profile">
                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                  <img src={formData.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
                </Button>
              </Link>
              <Link to="/candidate/dashboard">
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
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your personal information and resume</p>
            </div>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your profile information to make yourself stand out to employers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-4">
                          <Avatar className="h-24 w-24 border-2 border-white shadow-md">
                            <AvatarImage src={formData.avatar} />
                            <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <Button variant="outline" size="sm">Change Photo</Button>
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
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input 
                              id="jobTitle" 
                              name="jobTitle" 
                              value={formData.jobTitle} 
                              onChange={handleInputChange} 
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input 
                              id="location" 
                              name="location" 
                              value={formData.location} 
                              onChange={handleInputChange} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website">Personal Website</Label>
                            <Input 
                              id="website" 
                              name="website" 
                              value={formData.website} 
                              onChange={handleInputChange} 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Professional Summary</Label>
                          <Textarea 
                            id="bio" 
                            name="bio"
                            rows={4}
                            value={formData.bio} 
                            onChange={handleInputChange} 
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resume" className="space-y-6">
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>
                    Highlight your technical and professional skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label>Technical Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map(skill => (
                          <Badge 
                            key={skill}
                            className="px-3 py-1 text-sm bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/30 dark:text-white border border-brand-primary/20"
                          >
                            {skill}
                            <button className="ml-2 text-xs" onClick={() => toast.info(`Remove ${skill}`)}>×</button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Input 
                          placeholder="Add a new skill..." 
                          className="max-w-xs"
                        />
                        <Button onClick={handleAddSkill} size="sm">Add</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Work Experience</Label>
                        <Button variant="outline" size="sm" onClick={() => toast.info("Add experience form opened")}>
                          Add Experience
                        </Button>
                      </div>
                      
                      {formData.experience.map((exp, idx) => (
                        <Card key={idx} className="bg-white/50 dark:bg-gray-800/50">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{exp.title}</CardTitle>
                                <CardDescription>{exp.company} • {exp.period}</CardDescription>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => toast.info("Edit experience form opened")}>
                                Edit
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{exp.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Education</Label>
                        <Button variant="outline" size="sm" onClick={() => toast.info("Add education form opened")}>
                          Add Education
                        </Button>
                      </div>
                      
                      {formData.education.map((edu, idx) => (
                        <Card key={idx} className="bg-white/50 dark:bg-gray-800/50">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{edu.degree}</CardTitle>
                                <CardDescription>{edu.school} • {edu.year}</CardDescription>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => toast.info("Edit education form opened")}>
                                Edit
                              </Button>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Resume Document</Label>
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-white/50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" x2="8" y1="13" y2="13"></line>
                              <line x1="16" x2="8" y1="17" y2="17"></line>
                              <line x1="10" x2="8" y1="9" y2="9"></line>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">David_Chen_Resume.pdf</p>
                            <p className="text-sm text-gray-500">Uploaded on April 2, 2025</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Download</Button>
                          <Button variant="outline" size="sm">Replace</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Privacy & Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Password</h3>
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
                      
                      <div className="flex justify-end">
                        <Button>Update Password</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Profile Visibility</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Public Profile</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Allow employers to discover your profile</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Show Contact Information</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Display your contact details to employers</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Open to Work</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Signal to employers that you're available</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Data & Privacy</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Data Collection</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Allow us to use your data for personalization</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing Communications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive marketing emails and updates</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-red-600 dark:text-red-400">Danger Zone</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive" onClick={() => toast.error("Account deletion confirmation required")}>
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose what notifications you receive and how
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Receive job matches and updates via email</p>
                          </div>
                          <Switch 
                            checked={formData.notifications.email}
                            onCheckedChange={() => handleNotificationChange('email')}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Get text messages for urgent updates</p>
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
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Notification Types</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="job-matches" defaultChecked />
                            <Label htmlFor="job-matches">Job Matches</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="interview-invites" defaultChecked />
                            <Label htmlFor="interview-invites">Interview Invites</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="application-updates" defaultChecked />
                            <Label htmlFor="application-updates">Application Updates</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="messages" defaultChecked />
                            <Label htmlFor="messages">Messages from Employers</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="career-tips" />
                            <Label htmlFor="career-tips">Career Tips & News</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="product-updates" />
                            <Label htmlFor="product-updates">Product Updates</Label>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Email Frequency</h3>
                        <div className="space-y-2">
                          <Label htmlFor="email-frequency">How often would you like to receive job match emails?</Label>
                          <select 
                            id="email-frequency"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary dark:bg-gray-800 dark:border-gray-700"
                          >
                            <option value="immediately">As soon as available</option>
                            <option value="daily">Daily digest</option>
                            <option value="weekly">Weekly digest</option>
                          </select>
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

export default CandidateProfile;
