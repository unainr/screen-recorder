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

export function ScreenRecorderDialog() {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>Record Video</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>🎥 Screen Recorder</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          {/* 🎤 Mic Toggle */}
          <div className="flex items-center flex-row-reverse justify-between border rounded-lg p-3">

            <div className="flex  items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {micEnabled ? "Microphone On" : "Microphone Off"}
              </span>

              <Switch
                checked={micEnabled}
                onCheckedChange={setMicEnabled}
                disabled={isRecording}
              />
            </div>
             <div>
            {!isRecording ? (
              <Button className="flex items-center gap-2"  onClick={startRecording}>
                <VideoIcon className="h-4 w-4"/> Start Recording
              </Button>
            ) : (
              <Button
                size="lg"
                variant="destructive"
                onClick={stopRecording}
              >
                Stop Recording
              </Button>
            )}
          </div>
          </div>

          {/* ⏱ Recording Timer */}
          {isRecording && (
            <div className="text-red-500 font-mono text-lg text-center">
              ● Recording {formatTime(time)}
            </div>
          )}

          {/* 🎬 Controls */}
         

          {/* 🎞 Preview */}
          {previewUrl && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Preview
              </p>

              <video
                src={previewUrl}
                controls
                className="w-full rounded-lg border"
              />

              {/* ⭐ NEW ACTIONS */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={discardRecording}
                >
                  Record again
                </Button>

                 <Button
                  className="bg-violet-600"
                  onClick={handleUpload}
                  disabled={uploading } // disable after upload
                >
                  {uploading ? "Uploading..." : uploadedUrl ? "Uploaded ✅" : "Upload Video"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>  
    </Dialog>
  );
}