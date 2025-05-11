
import React from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";

interface InterviewHeaderProps {
  candidate: string;
  position: string;
  date: string;
  time: string;
  duration: number | null;
  status: string;
}

const InterviewHeader = ({ candidate, position, date, time, duration, status }: InterviewHeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {status === "completed" && (
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Completed
            </Badge>
          )}
          <CardDescription className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {date} • {time} 
            {duration && (
              <span className="flex items-center ml-2">
                <Clock className="h-3 w-3 mr-1" />
                {duration} min
              </span>
            )}
          </CardDescription>
        </div>
        <CardTitle className="flex items-center gap-2">
          <span>{candidate}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground font-normal text-base">{position}</span>
        </CardTitle>
      </div>
      <Avatar className="h-12 w-12">
        <AvatarFallback>
          {candidate.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default InterviewHeader;
