import { Comment } from "../models/comment.js"
import mongoose from "mongoose"
import { Post } from "../models/post.js"
import { createNewPost, filterPosts, findPost, formatPost, formatPosts, updateLikes, updateReposts } from "../utils/posts.js"

export const add_new_comment = async(req, res) =>{

    const postId = req.params.id
    const commentText = req.body.comment
    const authorId = req.user._id

    try {
        const comment = await Comment.create({
            author: authorId,
            text: commentText,
        })

        await Post.findByIdAndUpdate(postId, {
            $push:{ comments: comment._id}
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }

    res.redirect(`/posts/${req.params.id}`)
}

export const change_likes = async(req, res) => {
    const postId = req.params.id

    try {
        await updateLikes(postId, req.user.id)
        res.redirect(`/posts/${postId}`)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server Error')
    }
}


export const create_post = async(req, res) => {
    try {
        await createNewPost(req.body.post_content, req.user._id)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }

}

export const get_posts = async (req, res) => {
    const currentUser = req.user
    
    try {
        let posts = await Post.find().populate({
            path: 'author',
            select: 'first_name last_name pictureUrl _id'
        })
        const filteredPosts = filterPosts(posts, currentUser)
        
        res.render('index', { 
            title: 'Home',
            heading: 'Posts', 
            posts: formatPosts(filteredPosts, currentUser)
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

export const get_one_post = async(req, res) =>{
    const postId = req.params.id

    try {
        const post = await findPost(postId)
        const formattedPost = formatPost(post, req.user.id)
        
        res.render('post-details', { 
            title: `Post | ${postId}`, 
            heading: 'Post', 
            post:formattedPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')   
    }
}

export const repost = async(req, res) =>{
    const postId = req.params.id
    const currentUserId = req.user.id
    try {
        const post = await Post.findById(postId)

        if(!post.reposts.includes(currentUserId)){
            await updateReposts(postId, currentUserId)
        }
        res.redirect(`/posts/${postId}`)

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}