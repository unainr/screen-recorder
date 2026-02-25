import { useRef, useState, useEffect } from "react";

export function useScreenRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // ▶️ Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: micEnabled,
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "video/webm",
        });

        const url = URL.createObjectURL(blob);

        setVideoBlob(blob);
        setPreviewUrl(url);

        console.log("Recorded video URL:", url);
      };

      recorder.start();
      setIsRecording(true);
      setTime(0);

      timerRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);

      stream.getVideoTracks()[0].onended = stopRecording;
    } catch (err:any) {
      if(err?.name==='NotAllowedError'){
        console.log('User cancelled the screen')
        return
      }
      console.error("Recording failed:", err);
    }
  };

  // ⏹ Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());

    if (timerRef.current) clearInterval(timerRef.current);

    setIsRecording(false);
  };

  // ❌ NEW — Discard Recording
  const discardRecording = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // 🔥 important
    }

    setPreviewUrl(null);
    setVideoBlob(null);
    setTime(0);
    chunksRef.current = [];
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());

      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return {
    startRecording,
    stopRecording,
    discardRecording, // ⭐ NEW
    isRecording,
    time,
    micEnabled,
    setMicEnabled,
    videoBlob,
    previewUrl,
  };
}