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
		console.log(data);
		startTransition(async () => {
		    try {
		        const res = await CreateVideo(data);
		        if (res.error) {
		            toast.error(res.error);
		        } else {
		            toast.success("video created! Redirecting…");
		            resetStore();
		            router.push('/');
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
		<div className="rounded-2xl border   overflow-hidden shadow-2xl">
			{/* Header */}
			<div className="px-6 py-5 border-b ">
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-xl  border  flex items-center justify-center">
						<Layers size={17} className="text-indigo-400" />
					</div>
					<div>
						<h2 className="text-sm font-semibold text-white">Upload Video</h2>
						<p className="text-xs text-white/40 mt-0.5">
							Fill in the details — AI handles the content
						</p>
					</div>
				</div>
			</div>

			{/* Form */}
			<form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
				{/* Title */}
				<Controller
					name="title"
					control={form.control}
					render={({ field, fieldState }) => (
						<div className="space-y-2">
							<label className="text-xs font-medium  uppercase tracking-widest">
								Title
							</label>
							<Input
								{...field}
								placeholder="Title"
								className="  focus:border-indigo-500/50 focus:ring-0 h-11 rounded-xl"
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
							<label className="text-xs font-medium  uppercase tracking-widest">
								Description
							</label>
							<textarea
								{...field}
								placeholder="What will students learn in this course?"
								rows={4}
								className="w-full  focus:border-indigo-500/50 focus:outline-none rounded-xl px-4 py-3 text-sm resize-none transition-colors"
							/>
							<div className="flex justify-between items-center">
								{fieldState.error ? (
									<p className="text-xs text-rose-400">
										{fieldState.error.message}
									</p>
								) : (
									<span />
								)}
								<span className="text-[10px] text-white/25 tabular-nums">
									{field.value.length} chars
								</span>
							</div>
						</div>
					)}
				/>

				{/* Banner Image */}
				<div className="space-y-2">
					<FieldLabel>Banner Image</FieldLabel>
					<Input
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						disabled={imageUploading}
					/>
					{imageUploading && <Spinner />}
					<Controller
						name="bannerImage"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<Input {...field} type="hidden" />
								{field.value && (
									<div className="mt-2 text-xs  truncate">
										<Progress value={100} />
									</div>
								)}
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>

				{/* Video — pre-filled from Zustand (screen recorder) */}
				<div className="space-y-2">
					<FieldLabel>Record Video</FieldLabel>

					{/* Video Preview */}
					{form.watch("videoUrl") && (
						<video
							src={form.watch("videoUrl")}
							controls
							className="w-full rounded-xl border "
						/>
					)}

					<Controller
						name="videoUrl"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<Input {...field} type="hidden" />
								{field.value && (
									<div className="mt-2 text-xs truncate">
										<Progress value={100} />
									</div>
								)}
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</div>

				{/* Actions */}
				<div className="flex gap-3 pt-1">
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							form.reset();
							resetStore();
						}}
						className="flex-1 h-11  rounded-xl">
						Reset
					</Button>
					<Button
						type="submit"
						disabled={imageUploading || isPending}
						className="flex-2 h-11 bg-indigo-600 hover:bg-indigo-500  rounded-xl gap-2 shadow-lg shadow-indigo-500/20 transition-all">
						{isPending ? (
							<>
								<Spinner /> Creating…
							</>
						) : (
							<>
								<Sparkles size={15} /> Create Course
							</>
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
