import { ObjectId } from 'mongodb'
import { posts, people } from '../data.js'
import { Post } from '../models/post.js'
import { User } from '../zghost/db/User.js'
export const get_my_profile = async(req, res) => {
    const id = res.locals.user.id

    try {
        const user = await User.findById(id).select(
            'first_name last_name pictureUrl friends'
        )

        const posts = await Post.find({author: new ObjectId(id)}).populate(
            {
                path: 'author',
                select: 'first_name last_name pictureUrl _id'
            }
        )

        const formattedPosts = posts.map(post =>({
            id: post._id.toString(),
            post_content: post.post_content,
            author: formatAuthor(post.author),
            comments: post.comments.length,
            likes: post.likes.length,
            reposts: post.reposts.length,
            createdAt: formatDate(post.createdAt)
        }))

        const profile = {
            id: id,
            name: `${user.first_name} ${user.last_name}`,
            pictureUrl: user.pictureUrl,
            friends: user.friends.length
        }

        res.render('profile', { 
            title: 'My Profile', 
            heading: 'User Profile',
            posts: formattedPosts, 
            profile: profile
        })
    } catch (error) {
        res.status(500).send('Internal Server Error')  
    }
}

export const get_user_profile = (req, res) => {
    const id = req.params.id

    const profile = people.find(person => person.id === id)
    res.render('profile', { 
        title: profile.name, 
        heading: 'User Profile',
        posts, 
        profile,

})
}

export const get_editing_form = (req, res) =>{
    const profile = people.find(prof => prof.id === req.params.id)
    res.render('edit-profile', { 
        title: 'Edit Profile',
        heading: 'Edit Profile', 
        profile 
    })
}

export const update_profile = (req, res) =>{
    const data = req.body
    console.log(data)

    res.redirect(`/profiles/${req.params.id}`)
}


