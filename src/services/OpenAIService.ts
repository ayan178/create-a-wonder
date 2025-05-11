
/**
 * Consolidated OpenAI Service
 * 
 * This service combines multiple OpenAI API functionalities via the backend:
 * 1. Speech-to-text transcription (Whisper API)
 * 2. Text generation for AI interviewer responses (GPT API)
 * 3. Text-to-speech for AI interviewer voice (TTS API)
 */

import { openAIClient } from './openai/OpenAIClient';
import { extractAudioFromVideo, playAudio } from './openai/OpenAIMediaUtils';
import { 
  TranscriptionOptions, 
  TranscriptionResult, 
  ConversationOptions, 
  TextToSpeechOptions 
} from "./OpenAIServiceTypes";

/**
 * Consolidated service for OpenAI API interactions via backend
 */
export class OpenAIService {
  /**
   * Transcribe audio content using backend service
   * @param audioBlob - Audio/video blob to transcribe
   * @param options - Configuration options
   * @returns Promise with transcription result
   */
  async transcribe(audioBlob: Blob, options: TranscriptionOptions = {}): Promise<TranscriptionResult> {
    try {
      // Convert video to audio if necessary
      let contentBlob = audioBlob;
      if (audioBlob.type.startsWith('video/')) {
        contentBlob = await extractAudioFromVideo(audioBlob);
      }

      console.log("Transcribing audio, size:", contentBlob.size, "type:", contentBlob.type);
      // Send to backend for transcription
      return await openAIClient.transcribe(contentBlob, options);
    } catch (error) {
      console.error("Transcription error:", error);
      throw error;
    }
  }

  /**
   * Performs real-time transcription of audio chunks through backend
   * @param audioBlob - Latest audio chunk for transcription
   * @param options - Optional configuration for transcription
   * @returns Promise with transcription result
   */
  async transcribeRealTime(audioBlob: Blob, options: TranscriptionOptions = {}): Promise<TranscriptionResult> {
    console.log("Real-time transcription requested");
    // For real-time transcription, use enhanced prompting and settings
    return this.transcribe(audioBlob, {
      temperature: 0.2,
      prompt: options.prompt || "This is part of an ongoing job interview conversation. The speaker is answering interview questions clearly and professionally.",
      language: "en",
      ...options
    });
  }

  /**
   * Process a transcript to generate an AI interviewer response via backend
   * @param transcript - The candidate's transcript text
   * @param currentQuestion - The current interview question
   * @param options - Configuration options for the API request
   * @returns Promise with the AI's response text
   */
  async generateResponse(
    transcript: string, 
    currentQuestion: string, 
    options: ConversationOptions = {}
  ): Promise<string> {
    console.log("Generating AI response for transcript:", transcript);
    return await openAIClient.generateResponse(transcript, currentQuestion, options);
  }

  /**
   * Convert text to speech using backend service
   * @param text - Text to convert to speech
   * @param options - Configuration options
   * @returns Promise with audio blob
   */
  async textToSpeech(text: string, options: TextToSpeechOptions = { 
    voice: "nova", // Using nova voice for more natural sound
    speed: 1.0, 
    model: "tts-1-hd" // Using the HD model for better quality
  }): Promise<Blob> {
    console.log("Converting text to speech:", text);
    return await openAIClient.textToSpeech(text, options);
  }

  /**
   * Play audio from a blob using the browser's audio capabilities
   * @param audioBlob - The audio blob to play
   * @returns Promise that resolves when audio playback starts
   */
  async playAudio(audioBlob: Blob): Promise<void> {
    return playAudio(audioBlob);
  }
}

// Export a default instance for easy imports
export const openAIService = new OpenAIService();
