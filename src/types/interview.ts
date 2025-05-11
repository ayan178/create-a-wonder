
export interface TranscriptItem {
  speaker: string;
  text: string;
  timestamp: string;
}

export interface InterviewAnalysis {
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  problemSolvingScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  notes: string;
}

export interface InterviewDetail {
  id: number;
  candidate: string;
  position: string;
  date: string;
  time: string;
  duration: number | null;
  status: string;
  score: number | null;
  videoUrl?: string;
  transcript?: TranscriptItem[];
  analysis?: InterviewAnalysis;
}
