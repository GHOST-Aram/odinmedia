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

