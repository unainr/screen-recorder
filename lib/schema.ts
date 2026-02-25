import { z } from "zod";

export const formSchema = z.object(
  {
    title:z.string().min(1,{message:'title is required'}),
    description:z.string().min(1,{message:'description is required'}),
    bannerImage:z.string().min(1,{message:'banner image is required'}),
   videoUrl:z.string().min(1,{message:'video is required'}),
  }
)