
import { OpenAIService } from "@/services/OpenAIService";
import { TextToSpeechOptions } from "@/services/OpenAIServiceTypes";
import { toast } from "@/hooks/use-toast";

const openAIService = new OpenAIService();

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
  // Skip if audio is disabled or text is empty
  if (!isSystemAudioOn || !text) return Promise.resolve();
  
  try {
    console.log("Speaking text with TTS:", text.substring(0, 50) + "...");
    
    // Generate speech using OpenAI TTS API
    const audioBlob = await openAIService.textToSpeech(text, options);
    console.log("Audio blob received, size:", audioBlob.size);
    
    // Play the audio
    return await playAudio(audioBlob);
  } catch (error) {
    console.error("Error speaking text with OpenAI TTS:", error);
    
    // Try browser's built-in speech synthesis as fallback
    console.log("Falling back to browser speech synthesis");
    try {
      await speakWithBrowserSynthesis(text);
      return Promise.resolve();
    } catch (fallbackError) {
      console.error("Fallback speech synthesis failed:", fallbackError);
      toast({
        title: "Speech synthesis failed",
        description: "Please check your OpenAI API key or try again later.",
        variant: "destructive",
      });
      return Promise.resolve();
    }
  }
};

/**
 * Play audio from a blob
 */
export const playAudio = async (audioBlob: Blob): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Playing audio blob, type:", audioBlob.type, "size:", audioBlob.size);
      
      // Create audio URL and element
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      // Log when audio starts playing
      audio.oncanplaythrough = () => {
        console.log("Audio ready to play, duration:", audio.duration || "unknown");
      };
      
      // Set up event handlers
      audio.onended = () => {
        console.log("Audio playback completed");
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      
      audio.onerror = (err) => {
        console.error("Audio playback error:", err);
        URL.revokeObjectURL(audioUrl);
        reject(new Error(`Audio playback error: ${err}`));
      };
      
      // Increase volume to ensure it's audible
      audio.volume = 1.0;
      
      // Play the audio
      audio.play().then(() => {
        console.log("Audio playback started");
      }).catch(error => {
        console.error("Audio play error:", error);
        URL.revokeObjectURL(audioUrl);
        reject(error);
      });
    } catch (error) {
      console.error("Error setting up audio playback:", error);
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
    
    console.log("Using browser speech synthesis for:", text.substring(0, 50) + "...");
    
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
      console.log("Selected voice:", utterance.voice.name);
    }
    
    // Add event handlers
    utterance.onend = () => {
      console.log("Browser speech synthesis completed");
      resolve();
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      reject(new Error('Speech synthesis failed'));
    };
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
    console.log("Browser speech synthesis started");
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
