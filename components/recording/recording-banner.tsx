"use client";

import { Suspense } from "react";
import { motion } from "motion/react";
import { Video, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RecordingsBanner = () => {
	return (
		<motion.div
			className="relative rounded-2xl overflow-hidden border border-border/60 bg-card/60 backdrop-blur-sm px-8 py-8 mb-10"
			initial={{ opacity: 0, y: -16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}>
			{/* Background glow */}
			<div className="absolute inset-0 bg-linear-to-r from-orange-500/[0.07] via-amber-500/4 to-transparent pointer-events-none" />
			<div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-orange-500/40 via-amber-400/20 to-transparent" />

			{/* Decorative blurred orb */}
			<div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

			<div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
				{/* Left: title + meta */}
				<div className="flex items-start gap-4">
					<div className="shrink-0 w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
						<Video className="w-5 h-5 text-orange-400" />
					</div>
					<div>
						<div className="flex items-center gap-2 mb-1">
							<h1 className="text-xl font-extrabold tracking-tight text-foreground">
								My Recordings
							</h1>
							<span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
								<Sparkles className="w-2.5 h-2.5" />
								Clipsterra
							</span>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed">
							All your screen recordings, ready to share. Click any clip to view
							or copy its link.
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
