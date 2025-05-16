
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Download } from "lucide-react";

const VideoTab = ({ videoUrl }: { videoUrl?: string }) => {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black/80 rounded-md flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Button size="lg" className="rounded-full h-14 w-14">
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <span className="text-white/50 text-sm">Interview video preview</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button className="flex-1">
          <Play className="h-4 w-4 mr-1" />
          Play Full Interview
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default VideoTab;
