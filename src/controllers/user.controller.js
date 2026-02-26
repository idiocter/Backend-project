import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadToCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res) => {
    
    const {fullName,email,username,password} = req.body;
    console.log("fullName:", fullName);
    
    if([fullName,email,username,password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "Full name is required");
    }

   const existedUser = await User.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(existedUser){
        throw new ApiError(400, "Email or username already exists");
    }

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar is required");
   }

   const avatarUrl = await uploadToCloudinary(avatarLocalPath, "avatars");
   const coverImageUrl = await uploadToCloudinary(coverImageLocalPath, "coverImages");

   if(!avatarUrl){
    throw new ApiError(500, "Failed to upload avatar");
   }

    const newUser = await User.create({
     fullName,
     email,
     username,
     password,
     avatar: avatarUrl,
     coverImage: coverImageUrl || "",
    })

   const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
})

export { registerUser }