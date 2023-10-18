import { User } from "../zghost/db/User.js"
import { Post } from "../models/post.js"
import { ObjectId } from "../zghost/app/init.js"
import fs from 'node:fs'

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
        region
    } = request.body
    const banner_file = request.files.banner_file[0]
    const picture_file = request.files.avatar[0]

    await User.findByIdAndUpdate(request.user.id, {
        first_name,
        last_name,
        bannerUrl: bannerUrl.trim().length > 1 ? bannerUrl : undefined,
        pictureUrl: pictureUrl.trim().length > 1 ? pictureUrl: undefined,
        banner_file: banner_file ? {
            data: fs.readFileSync(banner_file.path),
            contentType: banner_file.mimetype 
        } : null,
        picture_file: picture_file ? {
            data: fs.readFileSync(picture_file.path),
            contentType: picture_file.mimetype
        } : null,
        city,
        region,
    })
}

