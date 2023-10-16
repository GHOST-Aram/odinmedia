import { Post } from "../models/post.js"
import { ObjectId } from "../zghost/app/init.js"
import { Comment } from "../models/comment.js"
import fs from 'node:fs'

export const addNewComment = async(request) =>{
    const comment = await Comment.create({
        author: request.user._id,
        text: request.body.comment,
    })

    await Post.findByIdAndUpdate(request.params.id, {
        $push:{ comments: comment._id}
    })
}

export const createNewPost = async(request) => {
    const {post_content, media_url} = request.body
    const currentUserId = request.user._id
    await Post.create({
        post_content,
        media_url: media_url.length > 0 ? media_url : undefined,
        media_file: request.file && { 
            data: fs.readFileSync(request.file.path),
            contentType: request.file.mimetype
        },
        author: currentUserId
    })
}

export const findAllPosts = async() =>{
    return await Post.find()
    .populate({
        path: 'author',
        select: 'first_name last_name pictureUrl _id'
    })
    .populate({
        path: 'reposts',
        select: '_id first_name last_name'
    })
}


export const findPostById = async(request) =>{
    return await Post.findById(request.params.id)
        .populate({
        path: 'author',
        select: 'first_name last_name pictureUrl _id'
        })
        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'first_name last_name pictureUrl _id'
            }
        })
}

export const updateLikes = async(request) =>{
    const postId = request.params.id
    const currentUserId = request.user.id
    const post = await Post.findById(postId).select('likes')
    
    if(post.likes.includes(new ObjectId(currentUserId))){
        await Post.findByIdAndUpdate(postId, {
            $pull:{ likes: currentUserId },
        })
        
    } else {
        await Post.findByIdAndUpdate(postId, {
            $push :{ likes: currentUserId }, 
        })

    }
}
export const updateReposts = async(request) =>{
    const postId = request.params.id
    const currentUserId = request.user.id

    const post = await Post.findById(postId)

    if(!post.reposts.includes(currentUserId)){
        await Post.findByIdAndUpdate(postId, 
            {
                $push: { reposts: currentUserId } 
            },
        )
    }
}