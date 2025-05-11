
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptItem {
  speaker: string;
  text: string;
  timestamp: string;
}

const TranscriptTab = ({ transcript }: { transcript?: TranscriptItem[] }) => {
  if (!transcript) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Transcript not available for this interview.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-4">
        {transcript.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="font-medium">{item.speaker}</span>
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            </div>
            <p className="text-sm pl-4">{item.text}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TranscriptTab;
