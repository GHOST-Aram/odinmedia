import { posts } from "../data.js"

export const create_post = (req, res) => {
    console.log(req.body)
    res.redirect('/')
}
export const get_posts = async (req, res) => {
    res.render('index', { 
        title: 'Home', posts
    })
}

export const get_one_post = (req, res) =>{
    const id = req.params.id
    console.log(id)

    const post = posts.find(post => post.id === id) 
   
    res.render('post-details', { title: `Post | ${id}`, post })
}

