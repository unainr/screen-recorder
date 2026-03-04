"use client";
import React from "react";
import LightRays from "../LightRays";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const HeroSection = () => {
	return (
		<div className="relative w-full h-150">
			{/* Background Wrapper */}
			<div className="absolute inset-0 pointer-events-none">
				<LightRays
					raysOrigin="top-center"
					raysColor="#f98a24"
					raysSpeed={1}
					lightSpread={4}
					rayLength={2}
					followMouse={false}
					mouseInfluence={0.1}
					noiseAmount={0}
					distortion={0}
					pulsating={false}
					fadeDistance={3}
					saturation={1}
				/>
			</div>

			{/* Content */}
			<div className="relative z-50 flex h-full items-center justify-center pointer-events-auto">
				<div className="text-center max-w-4xl px-6">
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, y: -12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: "easeOut" }}>
						<Badge
							className="mb-5 gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide border border-orange-400/30 bg-orange-500/10 text-orange-300 backdrop-blur-sm"
							variant="secondary">
							<Sparkles className="h-3 w-3" />
							Introducing Clipsterra 1.0
						</Badge>
					</motion.div>

					{/* Headline */}
					<motion.h1
						className="lg:text-6xl sm:text-3xl font-extrabold mb-5 leading-[1.1] tracking-tight"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}>
						Record And{" "}
						<span className="relative inline-block">
							<span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-300 to-orange-500">
								Share Instantly.
							</span>
							{/* Underline glow */}
							<motion.span
								className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-orange-400 to-amber-300 opacity-70"
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
								style={{ transformOrigin: "left" }}
							/>
						</span>
					</motion.h1>

					{/* Subtext */}
					<motion.p
						className="text-base text-white/60 mb-8 leading-relaxed max-w-lg mx-auto"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}>
						Capture your screen in one click, trim the perfect clip, and share a
						link — no uploads, no friction, no waiting.
					</motion.p>

					{/* CTAs */}
					<motion.div
						className="flex items-center justify-center gap-3 flex-wrap"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}>
						<motion.div
							whileHover={{ scale: 1.04 }}
							whileTap={{ scale: 0.97 }}
							transition={{ type: "spring", stiffness: 400, damping: 20 }}>
							<Button
								size="lg"
								className="gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_0_20px_rgba(249,138,36,0.45)] hover:shadow-[0_0_28px_rgba(249,138,36,0.65)] transition-shadow duration-300 px-6">
								Start Recording Free
								<ArrowRight className="h-4 w-4" />
							</Button>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.04 }}
							whileTap={{ scale: 0.97 }}
							transition={{ type: "spring", stiffness: 400, damping: 20 }}>
							<Button
								size="lg"
								variant="ghost"
								className="gap-2 text-white/70 hover:text-white hover:bg-white/8 border border-white/10 hover:border-white/20 transition-all duration-200 px-5">
								<Play className="h-3.5 w-3.5 fill-current" />
								Watch Demo
							</Button>
						</motion.div>
					</motion.div>

					{/* Social proof */}
					<motion.p
						className="mt-6 text-xs text-white/30 tracking-wide"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.55 }}>
						No credit card required · Free forever plan · Works in your browser
					</motion.p>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
