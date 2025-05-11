
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, Award, BarChart, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

interface Interview {
  id: number;
  role: string;
  company: string;
  date: string;
  duration: number;
  status: string;
  score?: number;
}

interface InterviewsSectionProps {
  upcomingInterviews: Interview[];
  pastInterviews: Interview[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const InterviewsSection = ({ upcomingInterviews, pastInterviews }: InterviewsSectionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isSystemCheckDialogOpen, setIsSystemCheckDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(null);
  const [systemCheckProgress, setSystemCheckProgress] = useState(0);
  const [systemCheckComplete, setSystemCheckComplete] = useState(false);
  
  const rescheduleForm = useForm({
    defaultValues: {
      date: "",
      time: "",
    },
  });

  // Handle joining interview
  const handleJoinInterview = (interview: Interview) => {
    // Navigate to the interview page
    navigate('/candidate/interview');
  };

  // Handle rescheduling dialog
  const handleReschedule = (interview: Interview) => {
    setCurrentInterview(interview);
    setIsRescheduleDialogOpen(true);
  };

  // Handle viewing recording
  const handleViewRecording = (interview: Interview) => {
    setCurrentInterview(interview);
    setIsVideoDialogOpen(true);
  };

  // Handle viewing feedback
  const handleViewFeedback = (interview: Interview) => {
    setCurrentInterview(interview);
    setIsFeedbackDialogOpen(true);
  };

  // Run system check
  const handleRunSystemCheck = () => {
    setIsSystemCheckDialogOpen(true);
    setSystemCheckProgress(0);
    setSystemCheckComplete(false);
    
    // Simulate system check progress
    const interval = setInterval(() => {
      setSystemCheckProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSystemCheckComplete(true);
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  // Submit reschedule form
  const onSubmitReschedule = rescheduleForm.handleSubmit((data) => {
    toast({
      title: "Interview Rescheduled",
      description: `Your interview has been rescheduled to ${data.date} at ${data.time}`,
    });
    setIsRescheduleDialogOpen(false);
    rescheduleForm.reset();
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Interviews */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingInterviews.length > 0 ? (
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <motion.div 
                    key={interview.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 border rounded-lg hover:bg-accent hover:border-accent transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{interview.role}</h3>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                      </div>
                      <Badge>{interview.status}</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(interview.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{interview.duration} minutes</span>
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      <Button size="sm" onClick={() => handleJoinInterview(interview)}>
                        <Video className="h-4 w-4 mr-1" />
                        Join Interview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-2"
                        onClick={() => handleReschedule(interview)}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Reschedule
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium mb-1">No Scheduled Interviews</h3>
                <p className="text-sm text-muted-foreground">
                  You don't have any upcoming interviews scheduled.
                </p>
                <Button className="mt-4">Browse Job Opportunities</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Check Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              System Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Ensure your device is ready for interviews by running a system check
                </p>
                
                <Button 
                  className="w-full"
                  onClick={handleRunSystemCheck}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Run Full System Check
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Camera</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Available
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Microphone</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Available
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Internet Connection</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Good
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Past Interviews Summary */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Past Interviews Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{pastInterviews.length}</div>
                <p className="text-sm text-muted-foreground">Completed Interviews</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Average Score</h4>
                <div className="flex items-center">
                  <Progress value={85} className="h-2 flex-1" />
                  <span className="ml-2 text-sm font-medium">85%</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" onClick={() => {
                document.getElementById("past-interviews")?.scrollIntoView({ behavior: "smooth" });
              }}>
                View All Past Interviews
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Past Interviews Detail */}
        <Card className="lg:col-span-3" id="past-interviews">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Past Interview Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pastInterviews.length > 0 ? (
              <div className="space-y-4">
                {pastInterviews.map((interview) => (
                  <motion.div 
                    key={interview.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 border rounded-lg hover:bg-accent hover:border-accent transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{interview.role}</h3>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                      </div>
                      <div className="flex items-center">
                        <Badge variant={interview.score && interview.score >= 80 ? "default" : "outline"}>
                          {interview.score}%
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(interview.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{interview.duration} minutes</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm mb-1 flex justify-between">
                        <span>Performance</span>
                        <span className={interview.score && interview.score >= 80 ? "text-green-600" : "text-amber-600"}>
                          {interview.score && interview.score >= 90 ? "Excellent" : 
                          interview.score && interview.score >= 80 ? "Good" : 
                          interview.score && interview.score >= 70 ? "Average" : "Needs Improvement"}
                        </span>
                      </div>
                      <Progress 
                        value={interview.score} 
                        className="h-2"
                        style={{
                          background: 'var(--background-muted)',
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewRecording(interview)}
                      >
                        <Video className="h-4 w-4 mr-1" />
                        View Recording
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="ml-2"
                        onClick={() => handleViewFeedback(interview)}
                      >
                        <Award className="h-4 w-4 mr-1" />
                        See Feedback
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium mb-1">No Past Interviews</h3>
                <p className="text-sm text-muted-foreground">
                  You haven't completed any interviews yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Reschedule Dialog */}
      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reschedule Interview</DialogTitle>
          </DialogHeader>
          <Form {...rescheduleForm}>
            <form onSubmit={onSubmitReschedule} className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Interview Details</h3>
                <p className="text-sm">{currentInterview?.role} at {currentInterview?.company}</p>
                <p className="text-sm text-muted-foreground">
                  Current: {currentInterview ? formatDate(currentInterview.date) : ''}
                </p>
              </div>
              
              <FormField
                control={rescheduleForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={rescheduleForm.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Reschedule</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* System Check Dialog */}
      <Dialog open={isSystemCheckDialogOpen} onOpenChange={setIsSystemCheckDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>System Check</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              {!systemCheckComplete ? (
                <>
                  <p className="text-center">Running system diagnostics...</p>
                  <Progress value={systemCheckProgress} className="h-2 w-full" />
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${systemCheckProgress >= 20 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Checking camera...</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${systemCheckProgress >= 40 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Checking microphone...</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${systemCheckProgress >= 60 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Checking speakers...</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${systemCheckProgress >= 80 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Testing internet connection...</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${systemCheckProgress >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Finalizing results...</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <h3 className="text-xl font-medium">System Check Complete</h3>
                    <p className="text-sm text-muted-foreground">Your system is ready for interviews</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Camera</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Passed
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Microphone</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Passed
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Speakers</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Passed
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Internet Connection</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        15 Mbps (Good)
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Browser Compatibility</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Compatible
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsSystemCheckDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Recording Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Interview Recording</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="aspect-video bg-slate-950 rounded-md mb-4 flex items-center justify-center">
              <Video className="h-12 w-12 text-gray-500" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">{currentInterview?.role}</h3>
              <p className="text-sm text-muted-foreground">
                {currentInterview?.company} • {currentInterview ? formatDate(currentInterview.date) : ''}
              </p>
              
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Interview Highlights</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="font-medium text-muted-foreground">00:02:15</span>
                    <span>Introduction and background discussion</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-muted-foreground">00:08:45</span>
                    <span>Technical question about previous experience</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-muted-foreground">00:15:30</span>
                    <span>Problem solving scenario</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-medium text-muted-foreground">00:23:10</span>
                    <span>Discussion about career goals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVideoDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Interview Feedback</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{currentInterview?.role}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentInterview?.company} • {currentInterview ? formatDate(currentInterview.date) : ''}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Overall Performance</h4>
                <div className="flex items-center mb-2">
                  <Progress 
                    value={currentInterview?.score} 
                    className="h-2 flex-1"
                  />
                  <span className="ml-2 text-sm font-medium">{currentInterview?.score}%</span>
                </div>
                <p className="text-sm">
                  {currentInterview?.score && currentInterview.score >= 90 
                    ? "Excellent performance! You demonstrated strong knowledge and communication skills."
                    : currentInterview?.score && currentInterview.score >= 80
                    ? "Good performance. You showed solid knowledge with some areas that could be improved."
                    : currentInterview?.score && currentInterview.score >= 70
                    ? "Average performance with both strengths and areas for improvement."
                    : "This interview revealed several areas for improvement that you can work on."}
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Feedback by Category</h4>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Technical Knowledge</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-1.5" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Strong understanding of core concepts. Could improve depth in system design.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Problem Solving</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-1.5" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Good approach to problems, but could improve efficiency in solutions.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Communication</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-1.5" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Excellent communication skills. Clear and concise explanations.
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Experience Relevance</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-1.5" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Good alignment with the role requirements.
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Interviewer Notes</h4>
                <div className="text-sm border rounded-md p-3 bg-muted/30">
                  <p>The candidate demonstrated strong technical knowledge and excellent communication skills. 
                  They provided clear explanations and showed good problem-solving abilities. 
                  There are some areas for improvement in system design concepts and algorithm optimization. 
                  Overall, a strong candidate who would be a good fit for the role.</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Improvement Suggestions</h4>
                <ul className="space-y-1 text-sm list-disc pl-5">
                  <li>Review system design patterns for scalable applications</li>
                  <li>Practice more complex algorithm optimization problems</li>
                  <li>Enhance knowledge of containerization technologies</li>
                  <li>Provide more specific examples from past projects</li>
                </ul>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFeedbackDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewsSection;
