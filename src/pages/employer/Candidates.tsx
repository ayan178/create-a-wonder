
import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  PhoneCall,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { ModeToggle } from "@/components/ModeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const candidatesData = [
  {
    id: 1,
    name: "Jessica Chen",
    position: "Senior React Developer",
    jobId: 1,
    email: "jessica@example.com",
    phone: "+1 555-123-4567",
    location: "San Francisco, CA",
    appliedDate: "2 days ago",
    status: "interviewed",
    matchScore: 92,
    skills: ["React", "TypeScript", "Redux", "Node.js"],
    resume: "#",
    avatar: "https://ui-avatars.com/api/?name=Jessica+Chen&background=4F46E5&color=fff",
  },
  {
    id: 2,
    name: "Michael Johnson",
    position: "Senior React Developer",
    jobId: 1,
    email: "michael@example.com",
    phone: "+1 555-987-6543",
    location: "Chicago, IL",
    appliedDate: "3 days ago",
    status: "screening",
    matchScore: 88,
    skills: ["React", "JavaScript", "GraphQL", "AWS"],
    resume: "#",
    avatar: "https://ui-avatars.com/api/?name=Michael+Johnson&background=4F46E5&color=fff",
  },
  {
    id: 3,
    name: "Sarah Williams",
    position: "Senior React Developer",
    jobId: 1,
    email: "sarah@example.com",
    phone: "+1 555-456-7890",
    location: "Remote",
    appliedDate: "1 week ago",
    status: "new",
    matchScore: 78,
    skills: ["React", "CSS", "HTML", "JavaScript"],
    resume: "#",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Williams&background=4F46E5&color=fff",
  },
  {
    id: 4,
    name: "David Rodriguez",
    position: "Senior React Developer",
    jobId: 1,
    email: "david@example.com",
    phone: "+1 555-789-0123",
    location: "New York, NY",
    appliedDate: "5 days ago",
    status: "rejected",
    matchScore: 65,
    skills: ["React", "Angular", "Vue"],
    resume: "#",
    avatar: "https://ui-avatars.com/api/?name=David+Rodriguez&background=4F46E5&color=fff",
  },
  {
    id: 5,
    name: "Emily Thompson",
    position: "Product Manager",
    jobId: 2,
    email: "emily@example.com",
    phone: "+1 555-234-5678",
    location: "Boston, MA",
    appliedDate: "3 days ago",
    status: "hired",
    matchScore: 95,
    skills: ["Product Management", "Agile", "Scrum", "Strategy"],
    resume: "#",
    avatar: "https://ui-avatars.com/api/?name=Emily+Thompson&background=4F46E5&color=fff",
  },
];

const statusColors = {
  new: "blue",
  screening: "purple",
  interviewed: "amber",
  hired: "green",
  rejected: "red",
};

const statusLabels = {
  new: "New",
  screening: "Screening",
  interviewed: "Interviewed",
  hired: "Hired",
  rejected: "Rejected",
};

const EmployerCandidates = () => {
  const { jobId } = useParams();
  const filteredCandidates = jobId 
    ? candidatesData.filter(candidate => candidate.jobId === parseInt(jobId)) 
    : candidatesData;
  
  const jobTitle = jobId && filteredCandidates.length > 0 
    ? filteredCandidates[0].position
    : "All Positions";

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
                  <img src="https://ui-avatars.com/api/?name=Employer&background=4F46E5&color=fff" alt="Profile" className="w-8 h-8 rounded-full" />
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
              <div className="flex items-center gap-2">
                <Link to="/employer/jobs" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  Jobs
                </Link>
                <span className="text-gray-400">/</span>
                <h1 className="text-3xl font-bold">Candidates</h1>
                {jobId && (
                  <>
                    <span className="text-gray-400 mx-2">for</span>
                    <Badge variant="outline" className="text-base font-normal py-1">
                      {jobTitle}
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {filteredCandidates.length} candidates {jobId ? "for this position" : "total"}
              </p>
            </div>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search candidates..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Candidates</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="screening">Screening</TabsTrigger>
              <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
              <TabsTrigger value="hired">Hired</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {filteredCandidates.map(candidate => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </TabsContent>
            
            {['new', 'screening', 'interviewed', 'hired'].map(status => (
              <TabsContent key={status} value={status} className="space-y-6">
                {filteredCandidates
                  .filter(candidate => candidate.status === status)
                  .map(candidate => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </EnhancedBackground>
  );
};

const CandidateCard = ({ candidate }) => {
  const handleStatusChange = (newStatus) => {
    toast.success(`Candidate status updated to ${statusLabels[newStatus]}`);
  };

  const handleScheduleInterview = () => {
    toast.success("Interview scheduling initiated");
  };

  const handleSendMessage = () => {
    toast.success("Message composer opened");
  };

  const handleViewDetails = () => {
    toast.info("Opening candidate details");
  };

  const matchScoreColor = 
    candidate.matchScore >= 90 ? "text-green-600 dark:text-green-400" :
    candidate.matchScore >= 70 ? "text-amber-600 dark:text-amber-400" :
    "text-red-600 dark:text-red-400";

  const statusColor = statusColors[candidate.status] || "gray";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-white shadow-md">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-bold">{candidate.name}</CardTitle>
              <CardDescription className="text-sm">
                {candidate.email} • {candidate.phone}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
            <Badge 
              className={`bg-${statusColor}-100 text-${statusColor}-800 dark:bg-${statusColor}-900/30 dark:text-${statusColor}-400`}
            >
              {statusLabels[candidate.status]}
            </Badge>
            <Badge variant="outline">Applied {candidate.appliedDate}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleStatusChange("screening")}>
                  Move to Screening
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("interviewed")}>
                  Mark as Interviewed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("hired")}>
                  Mark as Hired
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("rejected")}>
                  Reject Candidate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h3 className="text-sm font-medium mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {candidate.skills.map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
            
            <h3 className="text-sm font-medium mb-2">Location</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{candidate.location}</p>
            
            <h3 className="text-sm font-medium mb-2">Position</h3>
            <p className="text-gray-600 dark:text-gray-400">{candidate.position}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Match Score</h3>
            <div className="flex items-center gap-2 mb-2">
              <Progress value={candidate.matchScore} className="h-2" />
              <span className={`font-semibold ${matchScoreColor}`}>{candidate.matchScore}%</span>
            </div>
            
            <h3 className="text-sm font-medium mt-4 mb-2">AI Interview Analysis</h3>
            <Link to={`/employer/candidates/${candidate.id}/analysis`}>
              <Button variant="outline" className="w-full mb-2" size="sm">
                View AI Analysis
              </Button>
            </Link>
            
            <Link to={candidate.resume}>
              <Button variant="outline" className="w-full" size="sm">
                Download Resume
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3 justify-end items-center pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleSendMessage}
          >
            <MessageSquare size={14} />
            Message
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleScheduleInterview}
          >
            <Calendar size={14} />
            Schedule Interview
          </Button>
          <Link to={`/employer/candidates/${candidate.id}`}>
            <Button variant="default" size="sm">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EmployerCandidates;
