import { OpenAIService } from "@/services/OpenAIService";
import { TextToSpeechOptions } from "@/services/OpenAIServiceTypes";
import { toast } from "@/hooks/use-toast";

const openAIService = new OpenAIService();

// Global variables to track speaking state and audio element
let isSpeaking = false;
let currentAudioElement: HTMLAudioElement | null = null;

/**
 * Check if AI is currently speaking
 */
export const getIsSpeaking = (): boolean => {
  return isSpeaking;
};

/**
 * Get the current audio element being used for speech
 * Used for recording the AI's voice
 */
export const getCurrentAudioElement = (): HTMLAudioElement | null => {
  return currentAudioElement;
};

/**
 * Speak text using OpenAI TTS
 * @param text Text to speak
 * @param isSystemAudioOn Whether system audio is enabled
 * @param options Options for speech synthesis
 */
export const speakText = async (
  text: string, 
  isSystemAudioOn: boolean,
  options: TextToSpeechOptions = { voice: "nova", speed: 1.0, model: "tts-1-hd" }
): Promise<void> => {
  if (!isSystemAudioOn || !text) return Promise.resolve();
  
  try {
    console.log("Speaking text:", text);
    isSpeaking = true;
    
    // Generate speech using OpenAI TTS API
    const audioBlob = await openAIService.textToSpeech(text, options);
    
    // Play the audio
    const audioElement = await playAudio(audioBlob);
    currentAudioElement = audioElement;
    
    // Add a small delay to ensure speech is complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    isSpeaking = false;
    currentAudioElement = null;
    return Promise.resolve();
  } catch (error) {
    console.error("Error speaking text:", error);
    
    // Try browser's built-in speech synthesis as fallback
    console.log("Falling back to browser speech synthesis");
    try {
      isSpeaking = true;
      await speakWithBrowserSynthesis(text);
      isSpeaking = false;
      currentAudioElement = null;
      return Promise.resolve();
    } catch (fallbackError) {
      console.error("Fallback speech synthesis failed:", fallbackError);
      toast({
        title: "Speech synthesis failed",
        description: "Please check your OpenAI API key or try again later.",
        variant: "destructive",
      });
      isSpeaking = false;
      currentAudioElement = null;
      return Promise.resolve();
    }
  }
};

/**
 * Play audio from a blob
 * @returns The audio element used for playback
 */
export const playAudio = async (audioBlob: Blob): Promise<HTMLAudioElement> => {
  return new Promise((resolve, reject) => {
    try {
      // Create audio URL and element
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      // Set up event handlers
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        isSpeaking = false;
        currentAudioElement = null;
      };
      
      audio.onerror = (err) => {
        URL.revokeObjectURL(audioUrl);
        isSpeaking = false;
        currentAudioElement = null;
        reject(new Error(`Audio playback error: ${err}`));
      };
      
      // Play the audio
      audio.play().then(() => {
        resolve(audio);
      }).catch(error => {
        console.error("Audio play error:", error);
        URL.revokeObjectURL(audioUrl);
        isSpeaking = false;
        currentAudioElement = null;
        reject(error);
      });
    } catch (error) {
      isSpeaking = false;
      currentAudioElement = null;
      reject(error);
    }
  });
};

/**
 * Check if browser supports speech recognition
 */
export const checkSpeechRecognitionSupport = (): boolean => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

/**
 * Uses browser's built-in speech synthesis as a fallback
 * @param text Text to speak
 * @param options Speech options
 */
export const speakWithBrowserSynthesis = (
  text: string,
  options = { rate: 1.0, pitch: 1.0, volume: 1.0 }
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!text || !window.speechSynthesis) {
      resolve();
      return;
    }
    
    // Create speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set options
    utterance.rate = options.rate;
    utterance.pitch = options.pitch;
    utterance.volume = options.volume;
    
    // Choose a voice (try to get a female English voice)
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(voice => 
      voice.lang.startsWith('en-') && voice.name.includes('Female')
    );
    
    if (englishVoices.length > 0) {
      utterance.voice = englishVoices[0];
    }
    
    // Add event handlers
    utterance.onend = () => {
      resolve();
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      reject(new Error('Speech synthesis failed'));
    };
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  });
};

/**
 * Get audio input permission and check if microphone is available
 */
export const requestAudioPermission = async (): Promise<boolean> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Clean up the stream after we've checked permission
    stream.getTracks().forEach(track => track.stop());
    
    return true;
  } catch (error) {
    console.error("Microphone permission denied:", error);
    return false;
  }
};
