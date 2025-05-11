
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
import {
  Briefcase,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import { ModeToggle } from "@/components/ModeToggle";
import EnhancedBackground from "@/components/EnhancedBackground";
import { Input } from "@/components/ui/input";

// Mock data
const jobListings = [
  {
    id: 1,
    title: "Senior React Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    applicants: 45,
    postedDate: "2 days ago",
    status: "active",
    description: "We're looking for an experienced React developer to join our team..."
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    applicants: 32,
    postedDate: "1 week ago",
    status: "active",
    description: "Lead product development for our AI-driven interview platform..."
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    applicants: 18,
    postedDate: "3 days ago",
    status: "active",
    description: "Design intuitive user experiences for our cutting-edge interview platform..."
  },
  {
    id: 4,
    title: "Data Scientist",
    department: "Data",
    location: "San Francisco, CA",
    type: "Full-time",
    applicants: 27,
    postedDate: "5 days ago",
    status: "active",
    description: "Work with large datasets to extract insights and improve our AI algorithms..."
  },
  {
    id: 5,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Part-time",
    applicants: 12,
    postedDate: "1 month ago",
    status: "inactive",
    description: "Develop and execute marketing strategies to increase brand awareness..."
  }
];

const EmployerJobs = () => {
  const handleCreateJob = () => {
    toast.success("New job creation form opened");
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
              <h1 className="text-3xl font-bold">Job Listings</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage all your job postings</p>
            </div>
            <Button onClick={handleCreateJob} className="flex items-center gap-2">
              <Plus size={16} /> Create New Job
            </Button>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search jobs..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Jobs (4)</TabsTrigger>
              <TabsTrigger value="draft">Drafts (2)</TabsTrigger>
              <TabsTrigger value="closed">Closed (1)</TabsTrigger>
              <TabsTrigger value="all">All Jobs (7)</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              {jobListings.filter(job => job.status === 'active').map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
            
            <TabsContent value="draft">
              <EmptyState 
                title="No draft jobs"
                description="You don't have any jobs in draft status. Create a new job to get started."
                action="Create Job"
                onAction={handleCreateJob}
                icon={<FileText className="h-12 w-12 text-gray-400" />}
              />
            </TabsContent>

            <TabsContent value="closed">
              {jobListings.filter(job => job.status === 'inactive').map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>

            <TabsContent value="all" className="space-y-6">
              {jobListings.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </EnhancedBackground>
  );
};

const JobCard = ({ job }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4">
        <div>
          <CardTitle className="text-xl font-bold mb-1">{job.title}</CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Briefcase size={14} /> {job.department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {job.type}
            </span>
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
          <Badge variant="outline" className="flex items-center gap-1">
            <Users size={14} /> {job.applicants} Applicants
          </Badge>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {job.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
          <Badge variant="outline">{job.postedDate}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400">{job.description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3 justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="text-sm text-gray-500">
          ID: JOB-{job.id.toString().padStart(4, '0')}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to={`/employer/candidates/${job.id}`}>
            <Button variant="outline" size="sm">View Candidates</Button>
          </Link>
          <Link to={`/employer/jobs/${job.id}/edit`}>
            <Button variant="outline" size="sm">Edit</Button>
          </Link>
          <Button variant="default" size="sm">
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  </motion.div>
);

const EmptyState = ({ title, description, action, onAction, icon }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16 px-4"
  >
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
      {icon}
    </div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">{description}</p>
    <Button onClick={onAction}>{action}</Button>
  </motion.div>
);

export default EmployerJobs;
