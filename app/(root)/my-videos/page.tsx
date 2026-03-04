import { ShowGetVideos } from "@/components/all-vidoes";
import { RecordingsBanner } from "@/components/recording/recording-banner";
import { VideoGridSkeleton } from "@/components/video-skeleton";
import { auth } from "@clerk/nextjs/server";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { toast } from "sonner";

const MyVideosPage = async () => {
	const {userId} = await auth()
	if (!userId) {
		redirect("/"); // redirect to homepage (modal can open there)
	}
	return (
		<div className="mx-7 py-20">
			<RecordingsBanner/>
			<Suspense fallback={<VideoGridSkeleton />}>
				<ShowGetVideos />
			</Suspense>
		</div>
	);
};

export default MyVideosPage;
