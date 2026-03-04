"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ScreenRecorderDialog } from "../recording/screen-recorder-dialog";
import Link from "next/link";
import { Video } from "lucide-react";
import { useState } from "react";

export const SignInButtonClerk = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<SignedOut>
				<SignInButton mode="modal">
					<Button variant="orange" className="rounded-full">
						Get Started
					</Button>
				</SignInButton>
				{/* <SignUpButton mode="modal">
									<Button>Sign UP</Button>
								</SignUpButton> */}
			</SignedOut>

			<SignedIn>
				<UserButton />
				<Button
					asChild
					className="rounded-full gap-2 px-4 h-9 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border border-orange-500/20 hover:border-orange-500/35 shadow-none transition-all duration-200"
					variant="ghost">
					<Link href="/my-videos">
						<Video className="w-3.5 h-3.5" />
						My Videos
					</Link>
				</Button>
				<Button
					variant="orange"
					className="gap-2"
					onClick={() => setOpen(true)}>
					<Video className="w-4 h-4" />
					Record Video
				</Button>
				<ScreenRecorderDialog open={open} onOpenChange={setOpen} />
			</SignedIn>
		</>
	);
};
