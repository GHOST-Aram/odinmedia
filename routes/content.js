import { Router } from "../zghost/app/init.js";
import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";

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

contentRouter.get('/comments', (req, res) =>{
    const comments = [
        {
            author: {
                name: 'Jane Larry',
                pictureUrl:'https://randomuser.me/api/portraits/women/83.jpg'
            }, text: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Cum neque veritatis praesentium eveniet totam 
                voluptatem assumenda sint quaerat maiores cumque.`
        },
        {
            author: {
                name: 'Tom Keen',
                pictureUrl:'https://randomuser.me/api/portraits/men/32.jpg'
            }, text: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Cum neque veritatis praesentium eveniet totam.`
        },
        {
            author: {
                name: 'Lebron James',
                pictureUrl:'https://randomuser.me/api/portraits/men/13.jpg'
            }, text: `
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                voluptatem assumenda sint quaerat maiores cumque.`
        },

    ]
    res.json({ comments })
})

contentRouter.post('/comment', (req, res) =>{
    const comment = new Comment({...req.body})
    console.log(comment)

    res.json({comment: {
        author: {
            name: 'James Tipis',
            pictureUrl: 'https://randomuser.me/api/portraits/men/83.jpg',
        },
        ...req.body
    }  })
})

export {contentRouter}