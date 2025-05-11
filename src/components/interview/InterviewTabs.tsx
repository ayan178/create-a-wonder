
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeEditor from "./CodeEditor";
import { Code2, MessageCircle } from "lucide-react";
import TranscriptSection from "./TranscriptSection";

interface InterviewTabsProps {
  transcript: {
    speaker: string;
    text: string;
    timestamp: Date;
  }[];
  codingQuestion: string;
}

const InterviewTabs = ({ transcript, codingQuestion }: InterviewTabsProps) => {
  return (
    <Tabs defaultValue="conversation" className="w-full h-full flex flex-col">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="conversation" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Conversation
        </TabsTrigger>
        <TabsTrigger value="coding" className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          Coding Challenge
        </TabsTrigger>
      </TabsList>
      <TabsContent value="conversation" className="flex-1 m-0">
        <TranscriptSection transcript={transcript} />
      </TabsContent>
      <TabsContent value="coding" className="flex-1 m-0">
        <CodeEditor codingQuestion={codingQuestion} />
      </TabsContent>
    </Tabs>
  );
};

export default InterviewTabs;
