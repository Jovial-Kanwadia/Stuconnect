import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Profile, { IProfile } from "../models/profile.model";
import { IUser } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user: IUser | null = req.user
    if(!user){
        throw new ApiError(400, "Cannot access user")
    }

    const userProfile: IProfile | null = await Profile.findOne({ userId: user._id })
    if(userProfile){
        return res
        .status(200)
        .json( new ApiResponse(200, userProfile, "User profile fetched successfully"))
    }

    const newUserProfile = await Profile.create({
        userId: user._id,
        username: user.username,
        imageUrl: user.avatar.url,
        email: user.email,
    })

    if(newUserProfile){
        return res
        .status(200)
        .json( new ApiResponse(200, newUserProfile, "User profile created and fetched successfully"))
    }
})

export {
    getUserProfile,
}