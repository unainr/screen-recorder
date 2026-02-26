"use server"

import { imagekit } from "@/lib/image-kit";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();
export const ImageUpload = async (file: File) => {
  if (!file) return null;

  try {
    // ✅ Pass File directly — no need to convert to base64 anymore!
    const imageKitRef = await imagekit.files.upload({
      file: file,
      fileName: `image-${Date.now()}.png`,
      folder: '/screen-images',
       transformation: {
                pre: "orig-true" // 👈 skip transformations
            }
    });

    return imageKitRef?.url ?? null;

  } catch (error) {
    console.error("ImageKit upload error:", error);
    return null;
  }
}

// export const VideoUpload = async (file: File) => {
//   if (!file) return null;

//   try {
//     const imageKitRef = await imagekit.files.upload({
//       file: file,
//       fileName: `video-${Date.now()}.mp4`,
//       folder: '/screen-record-videos',
//       transformation: {
//                 pre: "orig-true" // 👈 skip transformations
//             }
//     });

//     return imageKitRef?.url ?? null;

//   } catch (error) {
//     console.error("ImageKit video upload error:", error);
//     return null;
//   }
// }


// ✅ VideoUpload — now uses Uploadthing
export const VideoUpload = async (file: File) => {
    if (!file) return null;
    try {
        const response = await utapi.uploadFiles(file);
        return response?.data?.ufsUrl ?? null;
    } catch (error) {
        console.error("Uploadthing video upload error:", error);
        return null;
    }
};

// ✅ Delete video from Uploadthing
export const DeleteVideo = async (videoUrl: string) => {
    if (!videoUrl) return;
    try {
        const fileKey = videoUrl.split("/").pop();
        if (!fileKey) return;
        await utapi.deleteFiles(fileKey);
    } catch (error) {
        console.error("Delete error:", error);
    }
};