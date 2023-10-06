import { Comment } from "../models/comment.js"
import { Post } from "../models/post.js"
import { formatDate } from "../zghost/utils/date-formatter.js"
import { formatAuthor } from "../zghost/utils/format-author.js"

export const add_new_comment = async(req, res) =>{

    if(!res.isAuthenticated()){
        res.redirect('/auth/login')
    }
    const postId = req.params.id
    const commentText = req.body.comment
    const authorId = res.locals.user._id

    try {
        const comment = await Comment.create({
            author: authorId,
            text: commentText
        })

        await Post.findByIdAndUpdate(postId, {
            $push:{ comments: comment._id}
        })
    } catch (error) {
        res.status(500).send('Internal server error')
    }

    
    res.redirect(`/posts/${req.params.id}`)
}

export const change_likes = async(req, res) => {
    if(!req.isAuthenticated()){
        res.redirect('/auth/login')
    }
    const postId = req.params.id
    const currentUserId = res.locals.user._id

    try {
        //Check if current user id is in likes array, 
        //if true remove it otherwise add it
        await Post.findByIdAndUpdate(postId, {
            $pull:{
                likes: currentUserId
            },
            $addToSet :{ 
                likes: currentUserId
            }, 
        })
    } catch (error) {
        res.status(500).send('Internal server Error')
    }

    

    res.redirect(`/posts/${id}`)
}

export const create_post = async(req, res) => {
    if(!req.isAuthenticated()){
        res.redirect('/auth/login')
    }
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
    if(!req.isAuthenticated()){
        res.redirect('/auth/login')
    }
    try {
        const posts = await Post.find().populate({
                        path: 'author',
                        select: 'first_name last_name pictureUrl _id'
                    })

        const formattedPosts = posts.map(post =>({
            id: post._id.toString(),
            post_content: post.post_content,
            author: formatAuthor(post.author),
            comments: post.comments.length,
            likes: post.likes.length,
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
    if(!req.isAuthenticated()){
        res.redirect('/auth/login')
    }
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
            post_content: post.post_content,
            author: {
                id: post.author._id.toString(),
                name: `${post.author.first_name} ${post.author.last_name}`,
                pictureUrl: post.author.pictureUrl
            },
            comments: post.comments.map(comment => ({
                author: formatAuthor(comment.author),
                text: comment.text
            })),
            likes: post.likes.length,
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
    if(!req.isAuthenticated()){
        res.redirect('/auth/login')
    }
    const id = req.params.id
    try {
        await Post.findByIdAndUpdate(id, 
            {
                $push: { reposts: res.locals.user._id } 
            },
            { new: true }
        )
    } catch (error) {
        res.status(500).send('Internal server error')
    }

    res.redirect(`/posts/${id}`)
}


