// "use server"

// import { experimental_transcribe as transcribe, generateText } from "ai";
// import { groq } from "@ai-sdk/groq";
// import { google } from "@ai-sdk/google";
// import { db } from "@/drizzle/db";
// import { screenRecord } from "@/drizzle/schema";
// import { eq } from "drizzle-orm";
// import { auth } from "@clerk/nextjs/server";

// export const transcribeVideo = async (videoId: string) => {
//     const { userId } = await auth();
//     if (!userId) return { error: "Unauthorized" };

//     const [video] = await db.select().from(screenRecord).where(eq(screenRecord.id, videoId));
//     if (!video) return { error: "Video not found" };
//     if (video.createdBy !== userId) return { error: "Unauthorized" };
//     if (!video.videoUrl) return { error: "No video URL" };

//     await db.update(screenRecord)
//         .set({ transcriptStatus: "pending" })
//         .where(eq(screenRecord.id, videoId));

//     try {
//         // ✅ Correct Vercel AI SDK way
//         const result = await transcribe({
//             model: groq.transcription("whisper-large-v3"),
//             audio: new URL(video.videoUrl),
//         });

//         // ✅ Generate summary with Gemini
//         const { text: summary } = await generateText({
//             model: google("gemini-2.5-flash"),
//             prompt: `Summarize this transcript in 2-3 sentences:\n\n${result.text}`,
//         });

//         await db.update(screenRecord)
//             .set({ transcript: result.text, summary, transcriptStatus: "done" })
//             .where(eq(screenRecord.id, videoId));

//         return { success: true, transcript: result.text, summary };

//     } catch (error) {
//         console.error(error);
//         await db.update(screenRecord)
//             .set({ transcriptStatus: "failed" })
//             .where(eq(screenRecord.id, videoId));
//         return { error: "Transcription failed" };
//     }
// };