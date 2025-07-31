// useVad.ts
import { useState, useRef, useCallback, useEffect } from 'react';

type VadOptions = {
  /** RMS threshold above which we consider “speech” */
  threshold?: number;
  /** How many ms of continuous silence before firing onStop */
  silenceDelay?: number;
};

export function useVad(
  onStop: () => void,
  { threshold = 0.02, silenceDelay = 800 }: VadOptions = {}
) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakingRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const procRef = useRef<ScriptProcessorNode | null>(null);
  const silenceTimerRef = useRef<number | null>(null);

  const stopVad = useCallback(() => {
    // clear any pending silence timer
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    // disconnect & close script node
    if (procRef.current) {
      procRef.current.disconnect();
      procRef.current.onaudioprocess = null;
      procRef.current = null;
    }
    // disconnect & drop source
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    // close AudioContext
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    // reset flags
    speakingRef.current = false;
    setIsSpeaking(false);
  }, []);

  const startVad = useCallback(
    async (stream: MediaStream) => {
      if (audioCtxRef.current) {
        // already running
        return;
      }

      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;

      const proc = audioCtx.createScriptProcessor(2048, 1, 1);
      procRef.current = proc;

      proc.onaudioprocess = (ev) => {
        const data = ev.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += data[i] ** 2;
        }
        const rms = Math.sqrt(sum / data.length);

        if (rms > threshold) {
          // we just went above threshold
          if (!speakingRef.current) {
            speakingRef.current = true;
            setIsSpeaking(true);
          }
          // clear any silence timer
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
        } else if (speakingRef.current && !silenceTimerRef.current) {
          // we dropped below threshold *and* were speaking: start silence countdown
          silenceTimerRef.current = window.setTimeout(() => {
            // after `silenceDelay` of low RMS, fire onStop
            speakingRef.current = false;
            setIsSpeaking(false);
            stopVad();
            onStop();
          }, silenceDelay);
        }
      };

      source.connect(proc);
      proc.connect(audioCtx.destination);
    },
    [threshold, silenceDelay, onStop, stopVad]
  );

  // Clean up if component unmounts
  useEffect(() => {
    return () => {
      stopVad();
    };
  }, [stopVad]);

  return { startVad, stopVad, isSpeaking };
}
