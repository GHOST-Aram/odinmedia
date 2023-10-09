import { Comment } from "../models/comment.js"
import mongoose from "mongoose"
import { Post } from "../models/post.js"
import { formatDate } from "../utils/date-formatter.js"
import { formatAuthor } from "../utils/format-author.js"

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
    const currentUserId = res.locals.user._id

    
    
    try {
        const post = await Post.findById(postId).select('likes')
    
        if(post.likes.includes(new mongoose.Types.ObjectId(currentUserId))){
            await Post.findByIdAndUpdate(postId, {
                $pull:{ likes: currentUserId },
            })
            
        } else {
            await Post.findByIdAndUpdate(postId, {
                $push :{ likes: currentUserId }, 
            })

        }
        res.redirect(`/posts/${postId}`)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server Error')
    }
}


export const create_post = async(req, res) => {
    
    try {
        await Post.create({
            post_content: req.body.post_content,
            author: res.locals.user._id
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }

    res.redirect('/')
}

export const get_posts = async (req, res) => {
    try {
        const posts = await Post.find().populate({
                        path: 'author',
                        select: 'first_name last_name pictureUrl _id'
                    })

        const formattedPosts = posts.map(post =>({
            id: post._id.toString(),
            content: post.post_content,
            author: formatAuthor(post.author),
            comments: post.comments.length,
            likes: post.likes.length,
            user_liked: post.likes.includes(post.author._id),
            reposts: post.reposts.length,
            createdAt: formatDate(post.createdAt)
        }))

        res.render('index', { 
            title: 'Home',
            heading: 'Posts', 
            posts: formattedPosts
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

export const get_one_post = async(req, res) =>{
    const id = req.params.id

    try {
        const post = await Post.findById(id)
        .populate({
                path: 'author',
                select: 'first_name last_name pictureUrl _id'
        })
        .populate(
            {
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'first_name last_name pictureUrl _id'
                }
            }
        )

        const formattedPost = {
            id: post._id.toString(),
            content: post.post_content,
            author: {
                id: post.author._id.toString(),
                name: `${post.author.first_name} ${post.author.last_name}`,
                pictureUrl: post.author.pictureUrl
            },
            comments: post.comments.map(comment => ({
                author: formatAuthor(comment.author),
                text: comment.text,
                createdAt: formatDate(comment.createdAt)
            })),
            likes: post.likes.length,
            user_liked: post.likes.includes(post.author._id),
            reposts: post.reposts.length,
            createdAt: formatDate(post.createdAt)
        }
        
        res.render('post-details', { 
            title: `Post | ${id}`, 
            heading: 'Post', 
            post:formattedPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')   
    }
   
}

export const repost = async(req, res) =>{
    const id = req.params.id
    try {
        await Post.findByIdAndUpdate(id, 
            {
                $push: { reposts: res.locals.user._id } 
            },
        )
    } catch (error) {
        res.status(500).send('Internal server error')
    }

    res.redirect(`/posts/${id}`)
}