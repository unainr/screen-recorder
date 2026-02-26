import { TimestampPlayer } from '@/components/recording/timestamp-player'
import { getVideoID } from '@/server/create-video'
import { getTimestamps } from '@/server/timestamps'
import { auth } from '@clerk/nextjs/server'
import { formatDistanceToNow } from 'date-fns'
import { Clock, FileText, Share2 } from 'lucide-react'
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
   <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

                {/* Header */}
                <div className="space-y-1">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                            {video?.title}
                        </h1>
                        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                            <Share2 className="h-3.5 w-3.5 text-zinc-400" />
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">Shared</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                            {video?.createdAt
                                ? formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })
                                : "—"}
                        </span>
                    </div>
                </div>

                {/* Video + Timestamps — client component */}
                <TimestampPlayer
                    videoUrl={video?.videoUrl ?? ""}
                    videoId={video!.id}
                     videoTitle={video.title}           // 👈
    videoDescription={video?.description ?? undefined} // 👈
                    initialTimestamps={timestampData.data}
                   isOwner={isOwner} // share page = public, no add/delete
                />

                {/* Description */}
                {video?.description && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {video.description}
                    </p>
                )}

            </div>
        </div>
  )
}

export default SharePage