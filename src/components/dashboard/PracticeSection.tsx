
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface PracticeSectionProps {
  interviewRoles: string[];
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

// Renamed from PracticeSection to InterviewSection to better reflect real interviews
const InterviewSection = ({ interviewRoles, selectedRole, setSelectedRole }: PracticeSectionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSystemCheckDialogOpen, setIsSystemCheckDialogOpen] = useState(false);
  const [systemCheckProgress, setSystemCheckProgress] = useState(0);
  const [systemCheckComplete, setSystemCheckComplete] = useState(false);

  // Start real interview
  const handleStartInterview = () => {
    if (!selectedRole) {
      toast({
        title: "Select a role",
        description: "Please select a role before starting the interview",
        variant: "destructive",
      });
      return;
    }

    // Navigate to interview page
    navigate('/candidate/interview');
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

  const interviewTips = [
    "Be prepared to answer questions about your experience and skills related to the role.",
    "Ensure your camera and microphone are working properly before the interview.",
    "Speak clearly and take your time to formulate well-structured responses.",
    "Our AI interviewer will evaluate your responses and provide detailed feedback.",
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Start Interview</CardTitle>
            <CardDescription>
              Begin your scheduled interview with our AI interviewer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2">
                Select Role
              </label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {interviewRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                className="flex-1 mr-2"
                onClick={handleRunSystemCheck}
              >
                <Play className="h-4 w-4 mr-1" />
                Run Full System Check
              </Button>
              <Button 
                className="flex-1"
                onClick={handleStartInterview}
                disabled={!selectedRole}
              >
                Start Interview
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Tips</CardTitle>
            <CardDescription>
              Improve your performance with these interview tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {interviewTips.map((message, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                  <span className="text-sm">{message}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4">
              <Button variant="link" className="p-0 h-auto text-primary" onClick={() => navigate('/resources')}>
                View all interview resources
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
};

// Export with the new name
export default InterviewSection;
