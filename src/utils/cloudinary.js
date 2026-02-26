import dotenv from "dotenv";
dotenv.config()
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
    });

const uploadToCloudinary = async (localFilePath) => {
    try {     
    if(!localFilePath) return null;
    //upload the find to cloudinary 
    const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto"
    });
    //file uploaded successfully, return response 
    console.log("Cloudinary upload response:", response);
    return response.secure_url;
    } catch (error) {
        console.log("Cloudinary upload error", error);
        return null;
    } finally {
        // Clean up local file
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error("Error deleting local file:", err);
            } else {
                console.log("Local file deleted successfully");
            }
        });
    }
}

export { uploadToCloudinary }

