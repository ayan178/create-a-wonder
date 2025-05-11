
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";
import ScoreItem from "./ScoreItem";

interface AnalysisData {
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  problemSolvingScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  notes: string;
}

const AnalysisTab = ({ analysis }: { analysis?: AnalysisData }) => {
  if (!analysis) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Analysis not available for this interview.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="py-4 px-4">
            <CardTitle className="text-base">Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="py-0 px-4">
            <div className="space-y-2">
              <ScoreItem 
                label="Technical Knowledge" 
                score={analysis.technicalScore} 
              />
              <ScoreItem 
                label="Communication" 
                score={analysis.communicationScore} 
              />
              <ScoreItem 
                label="Confidence" 
                score={analysis.confidenceScore} 
              />
              <ScoreItem 
                label="Problem Solving" 
                score={analysis.problemSolvingScore} 
              />
              <Separator />
              <ScoreItem 
                label="Overall Score" 
                score={analysis.overallScore} 
                isOverall 
              />
            </div>
          </CardContent>
        </Card>
      
        <Card>
          <CardHeader className="py-4 px-4">
            <CardTitle className="text-base">Evaluation</CardTitle>
          </CardHeader>
          <CardContent className="py-0 px-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Strengths</h4>
                <ul className="list-disc list-inside text-sm space-y-1 pl-1">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-green-600 dark:text-green-400">
                      <span className="text-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Areas for Improvement</h4>
                <ul className="list-disc list-inside text-sm space-y-1 pl-1">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-amber-600 dark:text-amber-400">
                      <span className="text-foreground">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="py-4 px-4">
          <CardTitle className="text-base">Hiring Manager Notes</CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4">
          <p className="text-sm">{analysis.notes}</p>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-1" />
          Export Report
        </Button>
        <Button>
          <ArrowUpRight className="h-4 w-4 mr-1" />
          Schedule Next Round
        </Button>
      </div>
    </>
  );
};

export default AnalysisTab;
