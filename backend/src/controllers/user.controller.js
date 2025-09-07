import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"; 
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from "path"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken=async(userId)=>{
    const user= await User.findById(userId)
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()

    user.refreshToken=refreshToken;
    await user.save({validateBeforeSave:false})

    return{accessToken,refreshToken}
}


const registerUser=asyncHandler(async(req,res)=>{
    //get use details from frontend
      console.log("req.file:", req.file);
    console.log("localPath:", req.file?.path);
    const {name , email ,password}=req.body
    
    //check if empty
    if(!name || !email || !password){
        throw new ApiError(400,"All fields are required")
    }

    //check if user already exist
    const existedUser=await User.findOne({email});
    if(existedUser){
        throw new ApiError(400,"User with this email already exist")
    }

    //check if profile picture is given by user

    const localPath=req.file?.path;

    if(!localPath) {
        throw new ApiError(400,"Profile picture is required")
    }
    

    //upload to cloudinary
    const profilePicture=await uploadOnCloudinary(localPath);
    console.log(profilePicture)
    

    if(!profilePicture){
        throw new ApiError(500,"Failed to upload profile picture")
    }

    //create user
    const user=await User.create({
        name,
        email,
        password,
        profilePicture:profilePicture.secure_url

    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user");  //check user is present or not
    }

    return res
    .status(200)
    .json(new ApiResponse(200,createdUser,"User registered successfully"))

})

const loginUser=asyncHandler(async(req,res)=>{

    //take data from req.body
    const {email,password}=req.body;
    if(!email ){
        throw new ApiError(400,"Email is required")
    }

    const user=await User.findOne({email})

    if(!user){
        throw new ApiError(400,"User does not exist")
    }
    console.log(password)

    const isPasswordValid=await user.isPasswordCorrect(password);
    console.log(isPasswordValid)
    if(!isPasswordValid){
        throw new ApiError(400,"Invalid user credentials")

    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:false
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User Logged In Successfully"
        )
    )
})

const logoutUser=asyncHandler(async(req,res)=>{

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },{
            new:true
        }  
    )
    const options={
        httpOnly:true,
        secure:false
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User logged Out")
    )

})

const getCurrentuser=asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
         new ApiResponse(200,req.user._id,"Current user fetched successfully")
    )
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request");
    }
   try {
     const decodedToken=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
 
     const user=await User.findById(decodedToken?._id)
 
       if(!user){
         throw new ApiError(401,"Invalid refresh Token");
     }
 
     if(incomingRefreshToken !== user?.refreshToken){
         throw new ApiError(401,"Refresh Token is expired or used");
     }
 
     const options ={
         httpOnly:true,
         secure:true
     }
 
     const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
 
     return res
     .status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",newRefreshToken,options)
     .json(
         new ApiResponse(
             200,
             {accessToken, refreshToken:newRefreshToken},
             "Access Token refreshed"
         )
 
     )
   } catch (error) {
    throw new ApiError(401,error?.message || "Invalid Token")
    
   }
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentuser,
    refreshAccessToken
}