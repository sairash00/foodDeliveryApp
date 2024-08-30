import dotenv from 'dotenv'
dotenv.config()

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

export const uploadOnCloudinary = async (fileBuffer, fileName) => {
  try {
    const response = await cloudinary.uploader.upload_stream(
      { resource_type: "auto", public_id: fileName },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return null;
        }
        return result;
      }
    );
    // Write the file buffer to the upload stream
    response.end(fileBuffer);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};


export const removeFromCloudinary = async (url) => {
  try {
    if (url && !Array.isArray(url)) {
      url = [url];
    }

    const deletion = url.map((url) => {
      const publicId = url.split("/").slice(-1)[0].split(".")[0];
      return cloudinary.uploader.destroy(publicId);
    });

    const response = await Promise.all(deletion);
    return response;
  } catch (error) {
    console.error("error while deleting from cloudinary", error);
    return null;
  }
};
