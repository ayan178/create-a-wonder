
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Copy, Mic, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface TranscriptMessage {
  speaker: string;
  text: string;
  timestamp: Date;
}

interface TranscriptSectionProps {
  transcript: TranscriptMessage[];
}

/**
 * TranscriptSection component for displaying the interview transcript
 * Includes real-time updates from Whisper transcription and OpenAI responses
 * 
 * @param transcript - Array of transcript messages to display
 */
const TranscriptSection: React.FC<TranscriptSectionProps> = ({ transcript }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [transcript]);
  
  /**
   * Format timestamp into a readable time string
   * @param date - Date object to format
   * @returns Formatted time string (HH:MM)
   */
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  /**
   * Copy transcript to clipboard
   */
  const copyTranscript = () => {
    const text = transcript
      .map(msg => `[${formatTime(msg.timestamp)}] ${msg.speaker}: ${msg.text}`)
      .join('\n');
    
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Interview transcript has been copied to clipboard",
      });
    });
  };
  
  /**
   * Download transcript as a text file
   */
  const downloadTranscript = () => {
    const text = transcript
      .map(msg => `[${formatTime(msg.timestamp)}] ${msg.speaker}: ${msg.text}`)
      .join('\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-transcript-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded transcript",
      description: "Interview transcript has been downloaded",
    });
  };
  
  /**
   * Determine if a message is from real-time transcription
   * @param speaker - The speaker label from the message
   * @returns Boolean indicating if message is from real-time transcription
   */
  const isRealTimeTranscription = (speaker: string): boolean => {
    return speaker.includes('Transcribed');
  };

  /**
   * Determine if a message is from the AI interviewer
   * @param speaker - The speaker label from the message
   * @returns Boolean indicating if message is from AI
   */
  const isAIInterviewer = (speaker: string): boolean => {
    return speaker === 'AI Interviewer';
  };
  
  return (
    <Card className="flex-grow glass-morphism border-primary/10">
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">Transcript</CardTitle>
          {/* Show indicator when we have real-time transcriptions */}
          {transcript.some(msg => isRealTimeTranscription(msg.speaker)) && (
            <div className="flex items-center gap-1 bg-green-500/10 text-green-500 text-xs rounded-full px-2 py-0.5">
              <Mic size={12} className="animate-pulse" />
              <span>Real-time</span>
            </div>
          )}
          
          {/* Show indicator when we have AI responses */}
          {transcript.some(msg => isAIInterviewer(msg.speaker)) && (
            <div className="flex items-center gap-1 bg-blue-500/10 text-blue-500 text-xs rounded-full px-2 py-0.5">
              <MessageSquare size={12} />
              <span>AI Responses</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={copyTranscript} 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            disabled={transcript.length === 0}
            title="Copy transcript"
          >
            <Copy size={14} />
          </Button>
          <Button 
            onClick={downloadTranscript} 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            disabled={transcript.length === 0}
            title="Download transcript"
          >
            <Download size={14} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] rounded-md" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {transcript.length === 0 ? (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                <div className="text-center">
                  <p className="mb-2">Interview transcript will appear here</p>
                  <p className="text-xs">Real-time transcription will begin when recording starts</p>
                </div>
              </div>
            ) : (
              transcript.map((message, index) => {
                const isRealTime = isRealTimeTranscription(message.speaker);
                const isAI = isAIInterviewer(message.speaker);
                
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {/* Speaker name with appropriate styling based on speaker type */}
                      <span className={`font-medium ${
                        isAI 
                          ? 'text-blue-500' 
                          : isRealTime 
                            ? 'text-green-500' 
                            : 'text-foreground'
                      }`}>
                        {message.speaker}
                        {isRealTime && <Mic size={12} className="inline ml-1" />}
                        {isAI && <MessageSquare size={12} className="inline ml-1" />}
                      </span>
                      
                      {/* Timestamp */}
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    
                    {/* Message text with styling based on speaker */}
                    <p className={`text-sm pl-0 ${
                      isAI 
                        ? 'bg-blue-500/5 p-2 rounded-md border-l-2 border-blue-500' 
                        : isRealTime 
                          ? 'bg-green-500/5 p-2 rounded-md' 
                          : ''
                    }`}>
                      {message.text}
                    </p>
                  </motion.div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TranscriptSection;
