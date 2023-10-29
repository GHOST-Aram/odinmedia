import * as database  from "./posts.dal.js"
import fs from 'node:fs'
import { getValidationResult } from "../../zghost/utils/validator.js"
import { 
    formatPosts, 
    formatPost, 
    filterPosts 
} from "../../utils/formats.js"

export const add_new_comment = async(req, res, next) =>{
    const errors = getValidationResult(req)

    try {
        if(errors.isEmpty()){
            const commentData = {
                authorObjectId: req.user._id,
                commentText: req.body.comment,
                postId: req.params.id
            }
            await database.addNewComment(commentData)
        }
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        next(error)
    }

}

export const change_likes = async(req, res, next) => {
    const postId = req.params.id
    const currentUserId = req.user.id

    try {
        await database.updateLikes({ currentUserId, postId })
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        next(error)
    }
}

export const create_post = async(req, res, next) => {
    const errors = getValidationResult(req)

    try {
        if(errors.isEmpty()){
            const {post_content, media_url} = req.body
            const currentUserId = req.user._id
            const postData = {
                post_content,
                media_url: media_url.length > 0 ? media_url : undefined,
                media_file: req.file && { 
                    data: fs.readFileSync(req.file.path),
                    contentType: req.file.mimetype
                },
                author: currentUserId
            }
            await database.createNewPost(postData)
        }
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}
    
export const get_posts = async (req, res, next) => {
    const currentUser = req.user
    
    try {
        const posts = await database.findAllPosts()
        const filteredPosts = filterPosts(posts, currentUser)
        const formattedPosts = formatPosts(filteredPosts, currentUser)
                
        res.render('index', { 
            title: 'Home',
            heading: 'Posts', 
            posts: formattedPosts
        })
    } catch (error) {
        next(error)
    }
}

export const get_one_post = async(req, res, next) =>{
    const postId = req.params.id
    const currentUserId = req.user.id

    try {
        const currentPost = await database.findPostById(postId)
        const formattedPost = formatPost(currentPost, currentUserId)
        
        res.render('post-details', { 
            title: `Post | ${postId}`, 
            heading: 'Post', 
            post:formattedPost
        })
    } catch (error) {
        next(error)
    }
}

export const repost = async(req, res, next) =>{
    const postId = req.params.id
    const currentUserId = req.user.id
    
    try {
        await database.updateReposts({ currentUserId, postId })
        res.redirect(`/posts/${postId}`)
    } catch (error) {
        next(error)
    }
}