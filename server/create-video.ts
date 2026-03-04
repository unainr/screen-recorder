"use server"

import { db } from "@/drizzle/db";
import { screenRecord } from "@/drizzle/schema";
import { formSchema } from "@/lib/schema"
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { DeleteVideo } from "./image-upload";

export const CreateVideo = async (values:z.infer<typeof formSchema>) => { 
const {userId} = await auth();
if(!userId) return {error:'Unauthorized'}
 

const validatedFields = formSchema.safeParse(values)
if(!validatedFields.success) return {error:'Invalid fields'}

const {title,description,bannerImage,videoUrl}= validatedFields.data
try{
const [data] = await db.insert(screenRecord).values({
    title,
    description,
    bannerImage,
    videoUrl,
    createdBy:userId
}).returning()
return{
    success:'Video Created',data:data
}
}catch(error){
    console.error(error)
    return {error:'Something went wrong'}
}
}

// TODO: get video by user 
export const getVideoByUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const data = await db
      .select()
      .from(screenRecord)
      .where(eq(screenRecord.createdBy, userId))
      .orderBy(desc(screenRecord.createdAt)); // newest first

    return { success: true, data };
  } catch (error) {
    console.error("[getVideoByUser]", error);
    return { error: "Something went wrong" };
  }
};

//  TODO: delete video by user
export const deleteVideo = async (id: string) => {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' }

    try {
        const [video] = await db
            .select()
            .from(screenRecord)
            .where(eq(screenRecord.id, id))

        if (!video) return { error: 'Video not found' }
        if (video.createdBy !== userId) return { error: 'Unauthorized' }
if (video.videoUrl) await DeleteVideo(video.videoUrl); // 👈 delete from uploadthing
        await db
            .delete(screenRecord)
            .where(and(
                eq(screenRecord.id, id),
                eq(screenRecord.createdBy, userId) // 👈 double check ownership on delete
            ))

        return { success: 'Video deleted' }
    } catch (error) {
        console.error(error)
        return { error: 'Something went wrong' }
    }
}

// TODO: get video by id
export const getVideoID = async (shareId:string) => { 
try {
    const [data] = await db.select().from(screenRecord).where(eq(screenRecord.shareId,shareId))
    if (!data ) {
			return{error:'share id not found'}
		}
    return {success:true,data:data}
} catch (error) {
     console.error(error);
    return { success: false, error: 'Something went wrong' };
}
 }