import { Post } from "../models/post.js"
import { formatDate } from "../zghost/utils/date-formatter.js"
import { formatAuthor } from "../zghost/utils/format-author.js"

export const get_posts = async (req, res) => {
   
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

