"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Video, Loader2, Play, Check, Copy, Clock, ImageDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteVideo, getVideoByUser } from "@/server/create-video";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

type Video = {
  id: string;
  title: string;
  description?: string | null;
  bannerImage?: string | null;
  videoUrl?: string | null;
  shareId: string;
  createdAt: Date | null;
};

export const ShowAllVideo = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const fetchVideos = async () => {
    const res = await getVideoByUser();
    if (res.error) {
      toast.error(res.error as string);
    } else {
      setVideos(res.data as Video[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deleteVideo(id);
      if (res.error) {
        toast.error(res.error as string);
      } else {
        toast.success("Video deleted!");
        setVideos((prev) => prev.filter((v) => v.id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };
 const handleCopy = (shareId: string) => {
    const url = `${window.location.origin}/s/${shareId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(shareId);
    toast.success("Link copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-white/30" />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center">
          <Video className="h-6 w-6 text-white/20" />
        </div>
        <p className="text-sm text-white/30">No videos recorded yet</p>
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
        {playingId === video.id ? (
          <video
            src={video.videoUrl ?? ""}
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <>
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

        

            {/* Play button overlay */}
            {video.videoUrl && (
              <button
                onClick={() => setPlayingId(video.id)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-150">
                  <Play className="h-4 w-4 text-zinc-900 dark:text-white fill-zinc-900 dark:fill-white ml-0.5" />
                </div>
              </button>
            )}
          </>
        )}
      </div>

      {/* Info below thumbnail — like Loom */}
      <div className="flex items-start gap-2.5">
        {/* Avatar placeholder */}
        <div className="w-7 h-7 rounded-full bg-linear-to-br from-indigo-400 to-violet-500 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-[10px] font-semibold text-white">
            {video.title.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Text */}
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
  {/* Top right actions — show on hover */}
          
              {/* Copy share link */}
             

              <Button
              size={'icon-xs'}
              onClick={(e) => { e.stopPropagation(); handleCopy(video.shareId); }}
              className=" rounded-lg bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-zinc-700 transition-colors"
              >
                {copiedId === video.shareId ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                    <Copy className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-300" />
                )}
              </Button>
                
            
        {/* Delete — 3 dot style */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
            size={'icon-xs'}
            variant={'destructive'}
              disabled={deletingId === video.id}
              className=" group-hover:opacity-100 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all shrink-0 disabled:opacity-40"
            >
              {deletingId === video.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-zinc-900 dark:text-zinc-100">
                Delete video?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">"{video.title}"</span>{" "}
                will be permanently deleted and cannot be recovered.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(video.id)}
                className="rounded-xl bg-red-600 hover:bg-red-500 text-white"
              >
                {deletingId === video.id ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Deleting…</>
                ) : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  ))}
</div>
  );
};