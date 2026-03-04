"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useScreenRecorder } from "../../hooks/use-recording";
import { VideoIcon } from "lucide-react";
import { useState } from "react";
import { VideoUpload } from "@/server/image-upload";
import { useRouter } from "next/navigation";
import { useUploadStore } from "@/store/upload-store";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
 interface ScreenRecorderDialogProps{
    open:boolean;
    onOpenChange:(open:boolean)=>void
}
export function ScreenRecorderDialog({open,onOpenChange}:ScreenRecorderDialogProps) {
   const router = useRouter();
  const setVideoUrl = useUploadStore((s) => s.setVideoUrl);
  const {
    startRecording,
    stopRecording,
    discardRecording,
    isRecording,
    time,
    micEnabled,
    setMicEnabled,
    previewUrl,
    videoBlob,
  } = useScreenRecorder();
 const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!videoBlob) return;

    setUploading(true);
    try {
      // Convert Blob → File
      const file = new File([videoBlob], `video-${Date.now()}.webm`, {
        type: "video/webm",
      });

      const url = await VideoUpload(file);
      if (url) {
        setUploadedUrl(url);
         setVideoUrl(url);        // 👈 save to zustand
        router.push("/upload");  // 👈 go to form
        console.log("✅ Uploaded URL:", url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };
  return (
     <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="sm:max-w-2xl border-border/60 bg-card/95 backdrop-blur-sm p-0 overflow-hidden">

    {/* Header */}
    <div className="relative px-6 py-5 border-b border-border/60">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-orange-500/70 via-amber-400/40 to-transparent" />
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <VideoIcon className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <DialogTitle className="text-base font-bold tracking-tight">Screen Recorder</DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Capture, preview and share your screen</p>
          </div>
        </div>
      </DialogHeader>
    </div>

    <div className="px-6 py-5 space-y-5">

      {/* Controls row */}
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
        {/* Mic toggle */}
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200 ${micEnabled ? "bg-orange-500/15 border border-orange-500/25" : "bg-muted border border-border/60"}`}>
            <svg className={`w-3.5 h-3.5 transition-colors ${micEnabled ? "text-orange-400" : "text-muted-foreground"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">{micEnabled ? "Mic On" : "Mic Off"}</p>
            <p className="text-[11px] text-muted-foreground">{micEnabled ? "Audio will be recorded" : "No audio"}</p>
          </div>
          <Switch
            checked={micEnabled}
            onCheckedChange={setMicEnabled}
            disabled={isRecording}
            className="ml-1"
          />
        </div>

        {/* Record / Stop button */}
        {!isRecording ? (
          <Button
            onClick={startRecording}
            className="gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_0_14px_rgba(249,138,36,0.35)] hover:shadow-[0_0_20px_rgba(249,138,36,0.55)] transition-all duration-200 px-5"
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            Start Recording
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            className="gap-2 bg-red-500/90 hover:bg-red-500 text-white font-semibold px-5"
          >
            <span className="w-2 h-2 rounded-sm bg-white" />
            Stop Recording
          </Button>
        )}
      </div>

      {/* Timer */}
      {isRecording && (
        <div className="flex items-center justify-center gap-2.5 py-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-sm font-semibold text-red-400 tracking-widest">
            {formatTime(time)}
          </span>
          <span className="text-xs text-muted-foreground">Recording in progress…</span>
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Preview</p>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-medium">
              Ready
            </span>
          </div>

          <video
            src={previewUrl}
            controls
            className="w-full rounded-xl border border-border/60 bg-black"
          />

          <div className="flex justify-end gap-2.5 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={discardRecording}
              className="gap-2 text-muted-foreground hover:text-foreground border-border/60"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              Record Again
            </Button>

            <Button
              size="sm"
              onClick={handleUpload}
              disabled={uploading}
              className="gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_0_12px_rgba(249,138,36,0.3)] hover:shadow-[0_0_18px_rgba(249,138,36,0.5)] transition-all duration-200 px-5"
            >
              {uploading ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Uploading…
                </>
              ) : uploadedUrl ? (
                <>✓ Uploaded</>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
                  </svg>
                  Upload & Share
                </>
              )}
            </Button>
          </div>
        </div>
      )}

    </div>
  </DialogContent>
</Dialog>
  );
}