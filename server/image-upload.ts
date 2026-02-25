"use server"

import { imagekit } from "@/lib/image-kit";

export const ImageUpload = async (file: File) => {
  if (!file) return null;

  try {
    // ✅ Pass File directly — no need to convert to base64 anymore!
    const imageKitRef = await imagekit.files.upload({
      file: file,
      fileName: `image-${Date.now()}.png`,
      folder: '/screen-images',
    });

    return imageKitRef?.url ?? null;

  } catch (error) {
    console.error("ImageKit upload error:", error);
    return null;
  }
}

export const VideoUpload = async (file: File) => {
  if (!file) return null;

  try {
    const imageKitRef = await imagekit.files.upload({
      file: file,
      fileName: `video-${Date.now()}.mp4`,
      folder: '/screen-record-videos',
    });

    return imageKitRef?.url ?? null;

  } catch (error) {
    console.error("ImageKit video upload error:", error);
    return null;
  }
}