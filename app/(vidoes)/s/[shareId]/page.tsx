import { TimestampPlayer } from '@/components/recording/timestamp-player'
import { getVideoID } from '@/server/create-video'
import { getTimestamps } from '@/server/timestamps'
import { auth } from '@clerk/nextjs/server'
import { formatDistanceToNow } from 'date-fns'
import { Clock, Eye, FileText, Lock, Share2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props{
  params:Promise<{shareId:string}>
}

const SharePage = async ({params}:Props) => {
    const {shareId} = await params
    const { userId } = await auth(); // 👈 get current user
    const result = await getVideoID(shareId)
    const video = result.data
    if(!video?.id) return
    const timestampData = await getTimestamps(video.id)
   // 👇 check if viewer is the owner
    const isOwner = userId === video.createdBy;
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">

            {/* Top navbar */}
            {/* <nav className="border-b border-zinc-100 dark:border-zinc-900 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-zinc-900 dark:bg-white flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white dark:text-zinc-900">S</span>
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        ScreenRecord
                    </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Lock className="h-3 w-3" />
                    <span>Anyone with the link can view</span>
                </div>
            </nav> */}

            <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

                {/* Two column layout on large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left — Video (takes 2/3) */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Title */}
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug tracking-tight">
                                {video.title}
                            </h1>
                            <div className="flex items-center gap-3 text-xs text-zinc-400">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>
                                        {video.createdAt
                                            ? formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })
                                            : "—"}
                                    </span>
                                </div>
                                <span>·</span>
                                <div className="flex items-center gap-1">
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>Public</span>
                                </div>
                                {isOwner && (
                                    <>
                                        <span>·</span>
                                        <span className="text-indigo-500 font-medium">Your video</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Video Player */}
                        <TimestampPlayer
                            videoUrl={video.videoUrl ?? ""}
                            videoId={video.id}
                            videoTitle={video.title}
                            videoDescription={video.description ?? undefined}
                            initialTimestamps={timestampData.data}
                            isOwner={isOwner}
                        />

                        {/* Description */}
                        {video.description && (
                            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {video.description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right — Info sidebar (1/3) */}
                    <div className="space-y-4">

                        {/* Creator card */}
                        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-3">
                            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                                Creator
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-400 to-violet-500 flex items-center justify-center shrink-0">
                                    <span className="text-sm font-semibold text-white">
                                        {video.title.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                        {isOwner ? "You" : "Creator"}
                                    </p>
                                    <p className="text-xs text-zinc-400">Screen Recording</p>
                                </div>
                            </div>
                        </div>

                        {/* Video details */}
                        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-3">
                            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                                Details
                            </p>
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-zinc-400">Recorded</span>
                                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                        {video.createdAt
                                            ? formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })
                                            : "—"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-zinc-400">Visibility</span>
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                        Public
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-zinc-400">Type</span>
                                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                        Screen Recording
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Banner image if exists */}
                        {video.bannerImage && (
                            <div className="rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                                <Image
                                    src={video.bannerImage}
                                    width={900}
                                    height={900}
                                    alt={video.title}
                                    className="w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Powered by */}
                        <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-300 dark:text-zinc-700 pt-2">
                            <span>Powered by</span>
                            <span className="font-semibold text-zinc-400 dark:text-zinc-600">ScreenRecord</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
  )
}

export default SharePage