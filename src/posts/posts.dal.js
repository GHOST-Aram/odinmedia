import { Post } from "./post.model.js"
import { ObjectId } from "../../zghost/app/init.js"
import { Comment } from "./comment.model.js"

class PostDAL{
    
    addNewComment = async({ authorObjectId, commentText, postId }) =>{
        const comment = await Comment.create({
            author: authorObjectId,
            text: commentText,
        })
    
        await Post.findByIdAndUpdate(postId, {
            $push:{ comments: comment._id}
        })
    }
    
    createNewPost = async(postData) => {
        await Post.create({
            post_content: postData.post_content,
            media_url: postData.media_url,
            media_file: postData.media_file,
            author: postData.author
        })
    }
    
    findAllPosts = async() =>{
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
    
    
    findPostById = async(postId) =>{
        return await Post.findById(postId)
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
    
    updateLikes = async({ currentUserId, postId }) =>{
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
    updateReposts = async({ currentUserId, postId }) =>{
        const post = await Post.findById(postId)
    
        if(!post.reposts.includes(currentUserId)){
            await Post.findByIdAndUpdate(postId, 
                {
                    $push: { reposts: currentUserId } 
                },
            )
        }
    }
}

export const postDAL = new PostDAL()