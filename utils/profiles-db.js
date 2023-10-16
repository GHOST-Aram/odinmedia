import { User } from "../zghost/db/User.js"
import { Post } from "../models/post.js"
import { ObjectId } from "../zghost/app/init.js"

export const findProfileById = async(id) =>{
    return await User.findById(id).select(
        `pictureUrl friends bannerUrl city _id 
        region first_name last_name createdAt`
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

export const updateProfileInfo = async(request) =>{
    const {
        first_name, last_name, 
        pictureUrl, bannerUrl, city,
        region, banner_file, picture_file
    } = request.body

    await User.findByIdAndUpdate(request.user.id, {
        first_name,
        last_name,
        bannerUrl,
        city,
        region,
        pictureUrl
    })
}

