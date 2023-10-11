import { User } from "../zghost/db/User.js"
import { Post } from "../models/post.js"
import { formatDate } from "./date-formatter.js"
import { ObjectId } from "mongodb"

export const findProfileById = async(id) =>{
    return await User.findById(id).select(
        `pictureUrl friends bannerUrl city _id 
        region first_name last_name`
    )
}

export const findPostsByAuthorId = async(authorId) =>{
    return await Post.find({author: new ObjectId(authorId)}).populate(
        {
            path: 'author',
            select: 'first_name last_name pictureUrl _id'
        }
    )
}

export const formatProfile = (user) =>{
    return ({
        id: user._id.toString(),
        name: user.name,
        pictureUrl: user.pictureUrl,
        bannerUrl: user.bannerUrl,
        city: user.city,
        region: user.region,
        friends: user.friends.length,
        joined: user.createdAt ? formatDate(user.createdAt): 'Unknown'            
    })
}