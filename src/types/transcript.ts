
/**
 * Interface for transcript items in the interview
 */
export interface Transcript {
  speaker: string;   // Who is speaking (AI or candidate)
  text: string;      // The content of the speech
  timestamp: Date;   // When the speech occurred
}

/**
 * Interface for transcription state data
 */
export interface TranscriptionState {
  isTranscribing: boolean;         // Whether transcription is currently active
  lastTranscriptionTime: number | null;  // Timestamp of the last transcription
  transcriptionErrors: number;      // Count of transcription errors
}
