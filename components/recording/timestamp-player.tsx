"use client";

import { useRef, useState } from "react";
import { autoGenerateTimestamps, deleteTimestamp, addTimestamp } from "@/server/timestamps";
import { toast } from "sonner";
import { Plus, Trash2, Clock, Loader2, Sparkles } from "lucide-react";

type Timestamp = {
    id: string;
    label: string;
    time: number;
};

interface Props {
    videoUrl: string;
    videoId: string;
    videoTitle: string;
    videoDescription?: string;
    initialTimestamps: Timestamp[];
    isOwner: boolean;
}

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export function TimestampPlayer({
    videoUrl,
    videoId,
    videoTitle,
    videoDescription,
    initialTimestamps,
    isOwner,
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [timestampList, setTimestampList] = useState<Timestamp[]>(initialTimestamps);
    const [label, setLabel] = useState("");
    const [adding, setAdding] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [duration, setDuration] = useState(0);
    const [generating, setGenerating] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const handleAdd = async () => {
        if (!videoRef.current) return;
        const time = Math.floor(videoRef.current.currentTime);
        const finalLabel = label.trim() || `Chapter at ${formatTime(time)}`;
        setAdding(true);
        try {
            const res = await addTimestamp(videoId, time, finalLabel);
            if (res.error) {
                toast.error(res.error);
            } else {
                setTimestampList((prev) =>
                    [...prev, res.data!].sort((a, b) => a.time - b.time)
                );
                setLabel("");
                toast.success("Timestamp added!");
            }
        } finally {
            setAdding(false);
        }
    };

    const handleAutoGenerate = async () => {
        if (!duration) {
            toast.error("Video not loaded yet, wait a moment");
            return;
        }
        setGenerating(true);
        try {
            const res = await autoGenerateTimestamps(videoId, duration, videoTitle, videoDescription);
            if (res.error) {
                toast.error(res.error);
            } else {
                setTimestampList(res.data!);
                toast.success("Chapters generated!");
            }
        } finally {
            setGenerating(false);
        }
    };

    const handleSeek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            videoRef.current.play();
        }
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const res = await deleteTimestamp(id);
            if (res.error) {
                toast.error(res.error);
            } else {
                setTimestampList((prev) => prev.filter((t) => t.id !== id));
                toast.success("Timestamp removed");
            }
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-4">
            {/* Video Player */}
            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-black">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    onLoadedMetadata={() => {  // 👈 this is the key fix
                        const d = Math.floor(videoRef.current?.duration ?? 0);
                        setDuration(d);
                    }}
                    onTimeUpdate={() => {
                        setCurrentTime(Math.floor(videoRef.current?.currentTime ?? 0));
                    }}
                    className="w-full max-h-130"
                />
            </div>

            {/* Duration debug — remove after testing */}
            {isOwner && duration > 0 && (
                <p className="text-xs text-zinc-400">Video duration: {formatTime(duration)}</p>
            )}

            {/* Owner Controls */}
            {isOwner && (
                <div className="flex items-center gap-2">
                    <input
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        placeholder="Label (optional)"
                        className="flex-1 h-9 px-3 rounded-xl text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-400 transition-colors"
                    />

                    {/* Manual add */}
                    <button
                        onClick={handleAdd}
                        disabled={adding}
                        className="flex items-center gap-1.5 px-3 h-9 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50 shrink-0"
                    >
                        {adding ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Plus className="h-3.5 w-3.5" />
                        )}
                        Add at {formatTime(currentTime)}
                    </button>

                    {/* AI generate */}
                    <button
                        onClick={handleAutoGenerate}
                        disabled={generating || duration === 0}
                        className="flex items-center gap-1.5 px-3 h-9 rounded-xl text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white transition-colors disabled:opacity-50 shrink-0"
                    >
                        {generating ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Sparkles className="h-3.5 w-3.5" />
                        )}
                        AI Chapters
                    </button>
                </div>
            )}

            {/* Timestamps List */}
            {timestampList.length > 0 && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-zinc-400" />
                        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                            Chapters
                        </h2>
                    </div>
                    <div className="space-y-1">
                        {timestampList.map((ts) => (
                            <div
                                key={ts.id}
                                onClick={() => handleSeek(ts.time)}
                                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
                            >
                                <span className="text-xs font-mono font-medium text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-lg shrink-0">
                                    {formatTime(ts.time)}
                                </span>
                                <span className="text-sm text-zinc-700 dark:text-zinc-300 flex-1 truncate">
                                    {ts.label}
                                </span>
                                {isOwner && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(ts.id); }}
                                        disabled={deletingId === ts.id}
                                        className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                                    >
                                        {deletingId === ts.id ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-3 w-3" />
                                        )}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty state */}
            {timestampList.length === 0 && (
                <div className="flex items-center gap-2 text-xs text-zinc-400 px-1">
                    <Clock className="h-3.5 w-3.5" />
                    {isOwner
                        ? "Pause the video then click 'Add' or use AI Chapters"
                        : "No chapters added yet"}
                </div>
            )}
        </div>
    );
}