import { User } from '../zghost/db/User.js'
import * as profiles from '../utils/profiles.js'
import { formatPosts } from '../utils/posts.js'

export const get_my_profile = async(req, res) => {
    const currentUser = req.user

    try {
        const user = await profiles.findProfileById(currentUser.id)
        const posts = await profiles.findPostsByAuthorId(currentUser.id)
        const formattedPosts = formatPosts(posts, currentUser)
        const userProfile = profiles.formatProfile(user)

        res.render('profile', { 
            title: 'My Profile', 
            heading: 'User Profile',
            profile: userProfile,
            posts: formattedPosts
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  
    }
}

export const get_user_profile = async(req, res) => {
    const userId = req.params.id
    const currentUser = req.user

    try {
        const user = await profiles.findProfileById(userId)
        const posts = await profiles.findPostsByAuthorId(userId)
        const formattedPosts = formatPosts(posts, currentUser)
        const profile = profiles.formatProfile(user)
        
        res.render('profile', { 
            title: `${profile.name}`, 
            heading: `${profile.name} Profile`,
            profile: profile,
            posts: formattedPosts
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')  
    }
}

export const get_editing_form = async(req, res) =>{
    try {
        const user = await profiles.findProfileById(req.user.id)
        const profile = profiles.formatProfile(user)

        res.render('edit-profile', { 
            title: 'Edit Profile',
            heading: 'Edit Profile', 
            profile 
        })    
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}

export const update_profile = async(req, res) =>{
   
    const {
        first_name, last_name, 
        pictureUrl, bannerUrl, city,
        region, banner_file, picture_file
    } = req.body
    console.log(req.body)
    try {
        await profiles.updateProfileInfo(req.user.id, {
            first_name, 
            last_name, 
            pictureUrl, 
            bannerUrl,
            city, region
        })

        res.redirect('/profiles/me')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}


