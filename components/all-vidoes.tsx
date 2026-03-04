import { formatDistanceToNow } from "date-fns";
import { Video, AlertCircle } from "lucide-react";
import Image from "next/image";
import { getVideoByUser } from "@/server/create-video";
import { Buttons, PlayButton } from "./video-actions";

interface VideoItem {
  id: string;
  title: string;
  description?: string | null;
  bannerImage?: string | null;
  videoUrl?: string | null;
  shareId: string;
  createdAt: Date | null;
}

export const ShowGetVideos = async () => {
  const result = await getVideoByUser();

  // Handle error state
  if (result.error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-14 h-14 rounded-2xl bg-red-500/8 border border-red-500/20 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-red-400" />
        </div>
        <p className="text-sm text-muted-foreground">
          {result.error === "Unauthorized"
            ? "Please sign in to view your recordings."
            : "Failed to load recordings. Please refresh."}
        </p>
      </div>
    );
  }

  const videos = (result.data ?? []) as VideoItem[];

  // Handle empty state
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-orange-500/8 border border-orange-500/20 flex items-center justify-center">
          <Video className="h-6 w-6 text-orange-400/50" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground mb-1">No recordings yet</p>
          <p className="text-xs text-muted-foreground">Start recording your screen to see clips here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {videos.map((video, index) => (
        <div
          key={video.id}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-in fade-in slide-in-from-bottom-2 duration-400 group cursor-pointer"
        >
          {/* Thumbnail */}
          <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden mb-3">
            {video.bannerImage ? (
              <Image
                src={video.bannerImage}
                alt={video.title}
                width={900}
                height={900}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
                <Video className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
              </div>
            )}
            <PlayButton videoUrl={video.videoUrl ?? ""} />
          </div>

          {/* Info */}
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-orange-400 to-amber-500 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-semibold text-white">
                {video.title.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                {video.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                <span>Public</span>
                <span>·</span>
                <span>
                  {video.createdAt
                    ? formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })
                    : "—"}
                </span>
              </div>
            </div>

            <Buttons
              videoId={video.id}
              shareId={video.shareId}
              videoTitle={video.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
};