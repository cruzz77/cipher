
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Loader2, AlertCircle } from 'lucide-react';

interface VoiceInputProps {
  onTextGenerated: (text: string) => void;
  isProcessing?: boolean;
  onListeningChange?: (isListening: boolean) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTextGenerated, isProcessing, onListeningChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refs for persistence (STRICT REQUIREMENT)
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  const finalTranscriptRef = useRef(""); 
  const onTextGeneratedRef = useRef(onTextGenerated);

  // Sync isListening state with parent
  useEffect(() => {
    onListeningChange?.(isListening);
  }, [isListening, onListeningChange]);

  // Keep the callback ref up-to-date without re-running the recognition effect
  useEffect(() => {
    onTextGeneratedRef.current = onTextGenerated;
  }, [onTextGenerated]);

  // Initialize ONLY ONCE (IMPORTANT)
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      // Update the input text with accumulated + current interim transcript
      onTextGeneratedRef.current(finalTranscriptRef.current + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech') return; 
      console.error("Speech recognition error", event.error);
      setError(`Error: ${event.error}`);
      
      if (event.error === 'not-allowed') {
        setIsListening(false);
        isRecordingRef.current = false;
      }
    };

    recognition.onend = () => {
      // Auto-restart if we're supposed to be recording
      if (isRecordingRef.current) {
        try {
          recognition.start();
        } catch (err) {
          console.error("Failed to restart recognition:", err);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isRecordingRef.current) {
      recognitionRef.current.stop();
      isRecordingRef.current = false;
      setIsListening(false);
    } else {
      setError(null);
      finalTranscriptRef.current = ""; // reset only on new session
      try {
        recognitionRef.current.start();
        isRecordingRef.current = true;
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
        setError("Failed to start recognition. Please check permissions.");
        isRecordingRef.current = false;
        setIsListening(false);
      }
    }
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <button
        onClick={toggleListening}
        disabled={isProcessing}
        className={isListening ? "btn-secondary recording-pulse" : "btn-primary"}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          background: isListening ? '#ef4444' : undefined,
          border: 'none',
          color: isListening ? 'white' : undefined,
          transition: 'all 0.3s ease',
          opacity: isProcessing ? 0.5 : 1,
          boxShadow: isListening ? '0 0 20px rgba(239, 68, 68, 0.4)' : 'none'
        }}
      >
        {isListening ? (
          <>
            <Square size={16} fill="currentColor" />
            <span>Stop Recording</span>
          </>
        ) : (
          <>
            <Mic size={16} />
            <span>Start Recording</span>
          </>
        )}
      </button>

      {isListening && (
        <div style={{ 
          fontSize: '0.75rem', 
          color: 'var(--accent-color)', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          animation: 'pulse 1.5s infinite' 
        }}>
          <Loader2 size={12} className="animate-spin" />
          <span>Listening to conversation...</span>
        </div>
      )}

      {error && (
        <div style={{ 
          fontSize: '0.75rem', 
          color: '#ef4444', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px' 
        }}>
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        @keyframes recording-glow {
          0% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.7); }
          100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.4); }
        }
        .recording-pulse {
          animation: recording-glow 1.5s infinite ease-in-out;
        }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default VoiceInput;
