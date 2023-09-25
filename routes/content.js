import { Router } from "../zghost/app/init.js";
import { Post } from "../models/post.js";

const contentRouter = Router()

contentRouter.post('/post', async(req, res, next) =>{
    const {text, likes, shared, comments } = req.body
    console.log("Post: ", req.body)

    try {
        const post = new Post({
            textContent: text,
            likes: likes,
            shared: shared,
            comments: comments,
            // author: req.user.id
        })
        res.json({post: post})
    } catch (error) {
        res.json({
            error: {
                code: 500, 
                message: error.message
            }
        })
    }

})

export {contentRouter}