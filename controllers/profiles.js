import { posts } from '../posts.js'
export const get_my_profile = (req, res) => {    
    res.render('profile', { 
    title: 'My Profile', posts
})
}


