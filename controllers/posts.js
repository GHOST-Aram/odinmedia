import * as database  from "../utils/posts-db.js"
import { 
    formatPosts, 
    formatPost, 
    filterPosts 
} from "../utils/formats.js"
export const add_new_comment = async(req, res, next) =>{

    try {
        await database.addNewComment(req)
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        next(error)
    }

}

export const change_likes = async(req, res, next) => {

    try {
        await database.updateLikes(req)
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        next(error)
    }
}


export const create_post = async(req, res, next) => {
    try {
        await database.createNewPost(req)
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

        formattedPosts.forEach(post => {
            console.log(post.friend_reposters)
        })
        
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

    try {
        const currentPost = await database.findPostById(req)
        const formattedPost = formatPost(currentPost, req.user.id)
        
        res.render('post-details', { 
            title: `Post | ${req.params.id}`, 
            heading: 'Post', 
            post:formattedPost
        })
    } catch (error) {
        next(error)
    }
}

export const repost = async(req, res, next) =>{
    try {
        await database.updateReposts(req)
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        next(error)
    }
}