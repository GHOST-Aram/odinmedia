import { Router } from "../zghost/app/init.js";
import { Post } from "../models/post.js";

const contentRouter = Router()

contentRouter.post('/post', async(req, res, next) =>{
    const {text, likes, shared, comments } = request.body

    try {
        const post = await Post.create({
            textContent: text,
            likes: likes,
            shared: shared,
            comments: comments,
            author: req.user.id
        })
    
        res.json({post: post})
    } catch (error) {
        res.json({
            error: {
                code: 500, 
                message: 'Internal server error'
            }
        })
    }

})