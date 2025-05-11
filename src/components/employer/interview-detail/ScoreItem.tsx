
import React from "react";

interface ScoreItemProps {
  label: string;
  score: number;
  isOverall?: boolean;
}

const ScoreItem = ({ label, score, isOverall = false }: ScoreItemProps) => {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };
  
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${isOverall ? "font-medium" : ""}`}>{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-36 bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              score >= 85 
                ? "bg-green-600 dark:bg-green-500" 
                : score >= 70 
                ? "bg-amber-600 dark:bg-amber-500" 
                : "bg-red-600 dark:bg-red-500"
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={`text-sm font-medium ${getScoreColor(score)} ${isOverall ? "text-base" : ""}`}>
          {score}%
        </span>
      </div>
    </div>
  );
};

export default ScoreItem;
