import * as post  from "../utils/posts.js"

export const add_new_comment = async(req, res) =>{

    try {
        await post.addNewComment(req)
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }

}

export const change_likes = async(req, res) => {

    try {
        await post.updateLikes(req)
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server Error')
    }
}


export const create_post = async(req, res) => {
    try {
        await post.createNewPost(req)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }

}

export const get_posts = async (req, res) => {
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
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
}

export const get_one_post = async(req, res) =>{

    try {
        const currentPost = await post.findPostById(req)
        const formattedPost = post.formatPost(currentPost, req.user.id)
        
        res.render('post-details', { 
            title: `Post | ${req.params.id}`, 
            heading: 'Post', 
            post:formattedPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')   
    }
}

export const repost = async(req, res) =>{
    try {
        await post.updateReposts(req)
        res.redirect(`/posts/${req.params.id}`)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}