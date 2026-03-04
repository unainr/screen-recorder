"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Play, Copy, Check, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteVideo } from "@/server/create-video";
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
import { useRouter } from "next/navigation";

function PlayButton({ videoUrl }: { videoUrl: string }) {
    const [playing, setPlaying] = useState(false);

    if (!videoUrl) return null;

    if (playing) {
        return (
            <video
                src={videoUrl}
                controls
                autoPlay
                className="absolute inset-0 w-full h-full object-cover z-10"
            />
        );
    }

    return (
        <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        >
            <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-150">
                <Play className="h-4 w-4 text-zinc-900 dark:text-white fill-zinc-900 dark:fill-white ml-0.5" />
            </div>
        </button>
    );
}

function Buttons({ videoId, shareId, videoTitle }: {
    videoId: string;
    shareId: string;
    videoTitle: string;
}) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`${window.location.origin}/s/${shareId}`);
        setCopied(true);
        toast.success("Link copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await deleteVideo(videoId);
            if (res.error) {
                toast.error(res.error as string);
            } else {
                toast.success("Video deleted!");
                router.refresh(); // 👈 re-renders server component
            }
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <Button
                size="icon-xs"
                onClick={handleCopy}
                className="rounded-lg bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-zinc-700 transition-colors"
            >
                {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                    <Copy className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-300" />
                )}
            </Button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        size="icon-xs"
                        variant="destructive"
                        disabled={deleting}
                        className="rounded-lg disabled:opacity-40"
                    >
                        {deleting ? (
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
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                "{videoTitle}"
                            </span>{" "}
                            will be permanently deleted and cannot be recovered.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="rounded-xl bg-red-600 hover:bg-red-500 text-white"
                        >
                            {deleting ? (
                                <><Loader2 className="h-4 w-4 animate-spin mr-1.5" /> Deleting…</>
                            ) : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export { PlayButton, Buttons };