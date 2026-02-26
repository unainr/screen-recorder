"use server"

import { db } from "@/drizzle/db";
import { timestamps, screenRecord } from "@/drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { generateObject, generateText, Output } from 'ai';
import { google } from "@ai-sdk/google";
import {z} from 'zod'


export const addTimestamp = async (videoId: string, time: number, label: string) => {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    const [video] = await db.select().from(screenRecord).where(eq(screenRecord.id, videoId));
    if (!video || video.createdBy !== userId) return { error: "Unauthorized" };

    const [data] = await db.insert(timestamps).values({
        videoId,
        time,
        label,
    }).returning();

    return { success: true, data };
};
export const autoGenerateTimestamps = async (videoId: string, duration: number, title: string, description?: string | null) => {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    // verify ownership
    const [video] = await db.select().from(screenRecord).where(eq(screenRecord.id, videoId));
    if (!video || video.createdBy !== userId) return { error: "Unauthorized" };


    try {
        const text  = await generateText({
            model:google('gemini-2.5-flash'),
            output:Output.object({
                schema:z.object({
                    timestamps:z.array(z.object({
                        time:z.number().describe('time in second'),
                        label:z.string().describe('short chapter')
                    }))
                })
            }),
               prompt: `
                Generate smart chapter timestamps for a screen recording video.
                
                Video title: "${title}"
                ${description ? `Description: "${description}"` : ""}
                Duration: ${duration} seconds
                
                Rules:
                - Always start with time 0
                - Create ${Math.max(3, Math.floor(duration / 30))} timestamps
                - Spread them evenly across the duration
                - Labels should be short and descriptive (max 5 words)
                - Make labels relevant to a screen recording context
            `,

            
        })
       
        
         const inserted = await db
            .insert(timestamps)
            .values(
                text.output.timestamps.map((ts) => ({
                    videoId,
                    time: ts.time,
                    label: ts.label,
                }))
            )
            .returning();;

    return { success: true, data:inserted };
    } catch (error) {
        console.log(error)
        return { error: "Failed to generate timestamps" };
    }
   
};

// TODO:get time stamps

export const getTimestamps = async (videoId: string) => {
    const data = await db
        .select()
        .from(timestamps)
        .where(eq(timestamps.videoId, videoId))
        .orderBy(asc(timestamps.time));

    return { success: true, data };
};

export const deleteTimestamp = async (id: string) => {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    await db.delete(timestamps).where(eq(timestamps.id, id));
    return { success: true };
};

