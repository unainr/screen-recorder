"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as z from "zod";
import {
	ArrowRight,
	CheckCircle2,
	Layers,
	Sparkles,
	Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { formSchema } from "@/lib/schema";
import { useUploadStore } from "@/store/upload-store";
import { ImageUpload } from "@/server/image-upload";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";
import { CreateVideo } from "@/server/create-video";
import Image from "next/image";

export function CreateRecordForm() {
	const router = useRouter();
	const [imageUploading, setImageUploading] = useState(false);
	const [isPending, startTransition] = useTransition();

	const { videoUrl: recordedVideoUrl, reset: resetStore } = useUploadStore();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			bannerImage: "",
			videoUrl: "",
		},
	});

	// Pre-fill videoUrl from Zustand
	useEffect(() => {
		if (recordedVideoUrl) {
			form.setValue("videoUrl", recordedVideoUrl);
		}
	}, [recordedVideoUrl]);

	async function onSubmit(data: z.infer<typeof formSchema>) {
		startTransition(async () => {
			try {
				const res = await CreateVideo(data);
				if (res.error) {
					toast.error(res.error);
				} else {
					toast.success("video created! Redirecting…");
					resetStore();
					router.push("/my-videos");
					form.reset();
				}
			} catch {
				toast.error("Something went wrong");
			}
		});
	}

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setImageUploading(true);
		try {
			const url = await ImageUpload(file);
			if (url) {
				form.setValue("bannerImage", url);
				toast.success("Image uploaded");
			} else {
				toast.error("Failed to upload image");
			}
		} catch {
			toast.error("Error uploading image");
		} finally {
			setImageUploading(false);
		}
	};

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] flex items-start justify-center px-4 py-10">
			<div className="w-full max-w-5xl">
				{/* Page header */}
				<div className="mb-6">
					<div className="flex items-center gap-2 mb-1 my-10">
						<h1 className="text-2xl font-extrabold text-foreground tracking-tight">
							Upload Video
						</h1>
						<span className="h-5 px-2 inline-flex items-center rounded-md bg-orange-500/10 border border-orange-500/20 text-[11px] font-semibold text-orange-400 tracking-wide">
							New
						</span>
					</div>
					<p className="text-sm text-muted-foreground leading-relaxed">
						Fill in the details below to publish your screen recording.
					</p>
					<div className="mt-3 h-px w-24 bg-linear-to-r from-orange-500/60 to-transparent" />
				</div>

				{/* Two column grid */}
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
					{/* LEFT — Form (3/5) */}
					<div className="lg:col-span-3">
						<div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
							{/* Card header */}
							<div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
								<div className="flex items-center gap-3">
									<div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
										<Layers size={17} className="text-indigo-500" />
									</div>
									<div>
										<h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
											Video Details
										</h2>
										<p className="text-xs text-zinc-400 mt-0.5">
											Fill in the details — AI handles the content
										</p>
									</div>
								</div>
							</div>

							{/* Form */}
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="p-6 space-y-5">
								{/* Title */}
								<Controller
									name="title"
									control={form.control}
									render={({ field, fieldState }) => (
										<div className="space-y-2">
											<label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
												Title
											</label>
											<Input
												{...field}
												placeholder="e.g. Dashboard Bug Fix"
												className="h-11 rounded-xl border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:border-indigo-500/50 focus:ring-0"
											/>
											{fieldState.error && (
												<p className="text-xs text-rose-400">
													{fieldState.error.message}
												</p>
											)}
										</div>
									)}
								/>

								{/* Description */}
								<Controller
									name="description"
									control={form.control}
									render={({ field, fieldState }) => (
										<div className="space-y-2">
											<label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
												Description
											</label>
											<textarea
												{...field}
												placeholder="What does this video cover?"
												rows={4}
												className="w-full rounded-xl px-4 py-3 text-sm resize-none border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-indigo-500/50 focus:outline-none transition-colors"
											/>
											<div className="flex justify-between items-center">
												{fieldState.error ? (
													<p className="text-xs text-rose-400">
														{fieldState.error.message}
													</p>
												) : (
													<span />
												)}
												<span className="text-[10px] text-zinc-300 dark:text-zinc-600 tabular-nums">
													{field.value.length} chars
												</span>
											</div>
										</div>
									)}
								/>

								{/* Banner Image */}
								<div className="space-y-2">
									<label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
										Banner Image
									</label>
									<label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-all group">
										<div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center shrink-0">
											{imageUploading ? (
												<Spinner />
											) : (
												<ArrowRight
													size={14}
													className="text-zinc-400 group-hover:text-indigo-500 transition-colors"
												/>
											)}
										</div>
										<div>
											<p className="text-sm text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
												{imageUploading
													? "Uploading…"
													: "Click to upload banner"}
											</p>
											<p className="text-xs text-zinc-400">
												PNG, JPG, WEBP up to 5MB
											</p>
										</div>
										<Input
											type="file"
											accept="image/*"
											onChange={handleImageUpload}
											disabled={imageUploading}
											className="hidden"
										/>
									</label>
									<Controller
										name="bannerImage"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<Input {...field} type="hidden" />
												{field.value && (
													<div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
														<CheckCircle2 size={12} />
														<span>Banner uploaded</span>
														<Progress value={100} className="flex-1 h-1" />
													</div>
												)}
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>

								{/* Video hidden field */}
								<Controller
									name="videoUrl"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<Input {...field} type="hidden" />
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>

								{/* Actions */}
								<div className="flex gap-3 pt-1">
									<Button
										type="button"
										variant="outline"
										onClick={() => {
											form.reset();
											resetStore();
										}}
										className="flex-1 h-11 rounded-xl border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
										Reset
									</Button>
									<Button
									variant={'orange'}
										type="submit"
										disabled={imageUploading || isPending}
										className="flex-1 h-11  rounded-xl gap-2 shadow-lg shadow-indigo-500/20 transition-all">
										{isPending ? (
											<>
												<Spinner /> Creating…
											</>
										) : (
											<>
												<Sparkles size={15} /> Publish Video
											</>
										)}
									</Button>
								</div>
							</form>
						</div>
					</div>

					{/* RIGHT — Preview sidebar (2/5) */}
					<div className="lg:col-span-2 space-y-4">
						{/* Video preview */}
						<div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
							<div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
								<p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
									Video Preview
								</p>
							</div>
							<div className="p-4">
								{form.watch("videoUrl") ? (
									<video
										src={form.watch("videoUrl")}
										controls
										className="w-full rounded-xl border border-zinc-100 dark:border-zinc-800"
									/>
								) : (
									<div className="aspect-video rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-dashed border-zinc-200 dark:border-zinc-700 flex flex-col items-center justify-center gap-2">
										<div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
											<Video className="h-5 w-5 text-zinc-300 dark:text-zinc-500" />
										</div>
										<p className="text-xs text-zinc-400">
											No video recorded yet
										</p>
									</div>
								)}
							</div>
						</div>

						{/* Banner preview */}
						<div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
							<div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
								<p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
									Banner Preview
								</p>
							</div>
							<div className="p-4">
								{form.watch("bannerImage") ? (
									<Image
										src={form.watch("bannerImage")}
										width={900}
										height={900}
										alt="Banner"
										className="w-full rounded-xl border border-zinc-100 dark:border-zinc-800 object-cover"
									/>
								) : (
									<div className="aspect-video rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-dashed border-zinc-200 dark:border-zinc-700 flex flex-col items-center justify-center gap-2">
										<div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
											<ArrowRight className="h-5 w-5 text-zinc-300 dark:text-zinc-500" />
										</div>
										<p className="text-xs text-zinc-400">
											No banner uploaded yet
										</p>
									</div>
								)}
							</div>
						</div>

						{/* Tips */}
						<div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-3">
							<p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
								Tips
							</p>
							<div className="space-y-2">
								{[
									"Add a clear title so viewers know what to expect",
									"A banner image helps your video stand out",
									"Good descriptions improve discoverability",
								].map((tip, i) => (
									<div key={i} className="flex items-start gap-2">
										<span className="text-indigo-400 text-xs mt-0.5">✦</span>
										<p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
											{tip}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
