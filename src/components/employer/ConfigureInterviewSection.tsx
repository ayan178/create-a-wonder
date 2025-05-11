
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  Settings, 
  ChevronDown, 
  ChevronUp,
  Save,
  Plus
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const ConfigureInterviewSection = () => {
  const [open, setOpen] = useState(true);
  const [selectedRole, setSelectedRole] = useState("frontend-dev");
  const [customQuestions, setCustomQuestions] = useState([
    "Tell me about your experience with React.",
    "How do you handle state management?",
  ]);
  const [newQuestion, setNewQuestion] = useState("");

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setCustomQuestions([...customQuestions, newQuestion]);
      setNewQuestion("");
    }
  };

  return (
    <Card className="glass-morphism">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle>Configure Interview</CardTitle>
          </div>
          <CollapsibleTrigger className="hover:bg-muted p-2 rounded-full">
            {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Position/Role</Label>
                <Select 
                  value={selectedRole} 
                  onValueChange={setSelectedRole}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend-dev">Frontend Developer</SelectItem>
                    <SelectItem value="backend-dev">Backend Developer</SelectItem>
                    <SelectItem value="fullstack-dev">Full Stack Developer</SelectItem>
                    <SelectItem value="ui-designer">UI/UX Designer</SelectItem>
                    <SelectItem value="product-manager">Product Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Entry Level</SelectItem>
                    <SelectItem value="medium">Intermediate</SelectItem>
                    <SelectItem value="hard">Senior Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Interview Duration</Label>
              <div className="flex items-center gap-4">
                <Select defaultValue="30">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                  </SelectContent>
                </Select>
                
                <span className="text-sm text-muted-foreground">
                  Recommended: 30 minutes for 8-10 questions
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Interview Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="ai-analysis" defaultChecked />
                  <Label htmlFor="ai-analysis">Enable AI analysis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="recording" defaultChecked />
                  <Label htmlFor="recording">Record interview</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="code-questions" defaultChecked />
                  <Label htmlFor="code-questions">Include technical questions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="behavioral" defaultChecked />
                  <Label htmlFor="behavioral">Include behavioral questions</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Custom Questions</Label>
                <span className="text-xs text-muted-foreground">{customQuestions.length}/10</span>
              </div>
              
              <div className="bg-muted/30 rounded-md p-2 max-h-48 overflow-y-auto">
                <ul className="space-y-2">
                  {customQuestions.map((question, index) => (
                    <li key={index} className="bg-background p-2 rounded text-sm flex justify-between">
                      {question}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 rounded-full"
                        onClick={() => {
                          const newQuestions = [...customQuestions];
                          newQuestions.splice(index, 1);
                          setCustomQuestions(newQuestions);
                        }}
                      >
                        <span className="sr-only">Remove</span>
                        <span>×</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Add a custom question" 
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  size="sm" 
                  onClick={handleAddQuestion}
                  disabled={!newQuestion.trim() || customQuestions.length >= 10}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <Button>
                <Save className="h-4 w-4 mr-1" /> Save Configuration
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ConfigureInterviewSection;
