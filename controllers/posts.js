import * as post  from "../utils/posts.js"

export const add_new_comment = async(req, res, next) =>{

    try {
        await post.addNewComment(req)
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        next(error)
    }

}

export const change_likes = async(req, res, next) => {

    try {
        await post.updateLikes(req)
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        next(error)
    }
}


export const create_post = async(req, res, next) => {
    try {
        await post.createNewPost(req)
        res.redirect('/')
    } catch (error) {
        next(error)
    }

}

export const get_posts = async (req, res, next) => {
    const currentUser = req.user
    
    try {
        const posts = await post.findAllPosts()
        const filteredPosts = post.filterPosts(posts, currentUser)
        
        res.render('index', { 
            title: 'Home',
            heading: 'Posts', 
            posts: formatPosts(filteredPosts, currentUser)
        })
    } catch (error) {
        next(error)
    }
}

export const get_one_post = async(req, res, next) =>{

    try {
        const currentPost = await post.findPostById(req)
        const formattedPost = post.formatPost(currentPost, req.user.id)
        
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
        await post.updateReposts(req)
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        next(error)
    }
}