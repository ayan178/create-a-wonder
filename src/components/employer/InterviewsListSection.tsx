import React, { useState } from "react";
import { Search, Filter, ChevronDown, MoreHorizontal, Calendar, User, Clock, Check, Star } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for interviews
const mockInterviews = [
  {
    id: 1,
    candidate: "John Doe",
    position: "Frontend Developer",
    date: "2025-04-08",
    time: "10:30 AM",
    duration: 28,
    status: "completed",
    score: 85,
    selected: false,
  },
  {
    id: 2,
    candidate: "Jane Smith",
    position: "UI/UX Designer",
    date: "2025-04-08",
    time: "2:15 PM",
    duration: 32,
    status: "completed",
    score: 92,
    selected: false,
  },
  {
    id: 3,
    candidate: "Michael Brown",
    position: "Backend Developer",
    date: "2025-04-09",
    time: "11:00 AM",
    duration: 25,
    status: "upcoming",
    score: null,
    selected: false,
  },
  {
    id: 4,
    candidate: "Sarah Wilson",
    position: "Product Manager",
    date: "2025-04-10",
    time: "3:00 PM",
    duration: null,
    status: "scheduled",
    score: null,
    selected: false,
  },
  {
    id: 5,
    candidate: "David Lee",
    position: "Full Stack Developer",
    date: "2025-04-07",
    time: "1:30 PM",
    duration: 31,
    status: "completed",
    score: 78,
    selected: false,
  },
];

// Mock data for upcoming interviews
const mockUpcomingInterviews = [
  {
    id: 101,
    candidate: "Emily Johnson",
    position: "Frontend Developer",
    date: "2025-04-15",
    time: "11:00 AM",
    duration: 45,
    score: null,
  },
  {
    id: 102,
    candidate: "Robert Chen",
    position: "Backend Developer",
    date: "2025-04-16",
    time: "2:30 PM",
    duration: 30,
    score: null,
  },
  {
    id: 103,
    candidate: "Sophia Martinez",
    position: "UI/UX Designer",
    date: "2025-04-17",
    time: "10:00 AM",
    duration: 60,
    score: null,
  }
];

// Mock data for selected candidates
const initialSelectedCandidates = [
  {
    id: 201,
    candidate: "Thomas Wilson",
    position: "Senior Developer",
    status: "completed",
    score: 91,
    notes: "Excellent communication skills. Strong technical knowledge."
  }
];

const InterviewsListSection = ({ onSelectInterview }: { onSelectInterview: (id: number) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [interviews, setInterviews] = useState(mockInterviews);
  const [upcomingInterviews] = useState(mockUpcomingInterviews);
  const [selectedCandidates, setSelectedCandidates] = useState(initialSelectedCandidates);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter interviews based on search query
  const filteredInterviews = interviews.filter(
    interview => 
      interview.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleCandidateSelection = (id: number) => {
    setInterviews(interviews.map(interview => 
      interview.id === id 
        ? { ...interview, selected: !interview.selected } 
        : interview
    ));
  };
  
  const addToSelectedCandidates = () => {
    const newSelectedCandidates = interviews
      .filter(interview => interview.selected && interview.status === "completed")
      .map(interview => ({
        id: interview.id + 1000, // Generate a new ID
        candidate: interview.candidate,
        position: interview.position,
        status: interview.status,
        score: interview.score,
        notes: ""
      }));
    
    if (newSelectedCandidates.length > 0) {
      setSelectedCandidates([...selectedCandidates, ...newSelectedCandidates]);
      
      // Unselect all interviews
      setInterviews(interviews.map(interview => ({
        ...interview,
        selected: false
      })));
    }
  };
  
  // Render status badge with appropriate color
  const renderStatus = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Completed</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Upcoming</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <Card className="glass-morphism">
      <CardHeader className="pb-3">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Interviews</TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-1">
              <Calendar size={14} />
              <span>Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="selected" className="flex items-center gap-1">
              <Star size={14} />
              <span>Selected</span>
            </TabsTrigger>
          </TabsList>
        
          <CardContent className="space-y-4 pt-4">
            <TabsContent value="all" className="m-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
                <div className="w-full sm:w-auto relative flex-1">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by candidate or position..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Filter Interviews</h4>
                      
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Status</h5>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="completed" />
                            <label htmlFor="completed" className="text-sm">Completed</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="upcoming" />
                            <label htmlFor="upcoming" className="text-sm">Upcoming</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="scheduled" />
                            <label htmlFor="scheduled" className="text-sm">Scheduled</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium">Position</h5>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="frontend" />
                            <label htmlFor="frontend" className="text-sm">Frontend Developer</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="backend" />
                            <label htmlFor="backend" className="text-sm">Backend Developer</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="fullstack" />
                            <label htmlFor="fullstack" className="text-sm">Full Stack Developer</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="ui-ux" />
                            <label htmlFor="ui-ux" className="text-sm">UI/UX Designer</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="pm" />
                            <label htmlFor="pm" className="text-sm">Product Manager</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">Clear</Button>
                        <Button size="sm" onClick={() => setFilterOpen(false)}>Apply</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInterviews.length > 0 ? (
                      filteredInterviews.map((interview) => (
                        <TableRow 
                          key={interview.id} 
                          className="cursor-pointer hover:bg-muted/40"
                        >
                          <TableCell className="p-0 pl-4">
                            <Checkbox 
                              checked={interview.selected}
                              onCheckedChange={() => toggleCandidateSelection(interview.id)}
                              onClick={(e) => e.stopPropagation()} 
                            />
                          </TableCell>
                          <TableCell onClick={() => onSelectInterview(interview.id)}>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {interview.candidate.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{interview.candidate}</span>
                            </div>
                          </TableCell>
                          <TableCell onClick={() => onSelectInterview(interview.id)}>
                            {interview.position}
                          </TableCell>
                          <TableCell onClick={() => onSelectInterview(interview.id)}>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">{interview.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">{interview.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell onClick={() => onSelectInterview(interview.id)}>
                            {renderStatus(interview.status)}
                          </TableCell>
                          <TableCell onClick={() => onSelectInterview(interview.id)}>
                            {interview.score ? (
                              <span className={`font-medium ${
                                interview.score >= 85 ? 'text-green-600 dark:text-green-400' : 
                                interview.score >= 70 ? 'text-amber-600 dark:text-amber-400' : 
                                'text-red-600 dark:text-red-400'
                              }`}>{interview.score}%</span>
                            ) : '-'}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onSelectInterview(interview.id)}>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                {interview.status === "completed" && (
                                  <DropdownMenuItem onClick={() => toggleCandidateSelection(interview.id)}>
                                    {interview.selected ? 'Unselect' : 'Select'} Candidate
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No interviews found matching your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="default" 
                  className="flex items-center"
                  disabled={!interviews.some(i => i.selected && i.status === "completed")}
                  onClick={addToSelectedCandidates}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Add to Selected Candidates
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="m-0">
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingInterviews.length > 0 ? (
                      upcomingInterviews.map((interview) => (
                        <TableRow key={interview.id} className="hover:bg-muted/40">
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {interview.candidate.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{interview.candidate}</span>
                            </div>
                          </TableCell>
                          <TableCell>{interview.position}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">{interview.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">{interview.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{interview.duration} min</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button variant="outline" size="sm">Reschedule</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No upcoming interviews scheduled
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="selected" className="m-0">
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCandidates.length > 0 ? (
                      selectedCandidates.map((candidate) => (
                        <TableRow key={candidate.id} className="hover:bg-muted/40">
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {candidate.candidate.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span>{candidate.candidate}</span>
                            </div>
                          </TableCell>
                          <TableCell>{candidate.position}</TableCell>
                          <TableCell>{renderStatus(candidate.status)}</TableCell>
                          <TableCell>
                            {candidate.score && (
                              <span className={`font-medium ${
                                candidate.score >= 85 ? 'text-green-600 dark:text-green-400' : 
                                candidate.score >= 70 ? 'text-amber-600 dark:text-amber-400' : 
                                'text-red-600 dark:text-red-400'
                              }`}>{candidate.score}%</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {candidate.notes || 'No notes added'}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button variant="outline" size="sm">Contact</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No selected candidates yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </CardHeader>
      
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {activeTab === 'all' && `Showing ${filteredInterviews.length} of ${interviews.length} interviews`}
          {activeTab === 'upcoming' && `${upcomingInterviews.length} upcoming interviews`}
          {activeTab === 'selected' && `${selectedCandidates.length} selected candidates`}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InterviewsListSection;
