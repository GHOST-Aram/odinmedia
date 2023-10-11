import * as profiles from '../utils/profiles.js'
import { formatPosts } from '../utils/posts.js'

export const get_my_profile = async(req, res, next) => {
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
        next(error)
    }
}

export const get_user_profile = async(req, res, next) => {
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
        next(error)
    }
}

export const get_editing_form = async(req, res, next) =>{
    try {
        const user = await profiles.findProfileById(req.user.id)
        const profile = profiles.formatProfile(user)

        res.render('edit-profile', { 
            title: 'Edit Profile',
            heading: 'Edit Profile', 
            profile 
        })    
    } catch (error) {
        next(error)
    }
}

export const update_profile = async(req, res, next) =>{
   
    const {
        first_name, last_name, 
        pictureUrl, bannerUrl, city,
        region, banner_file, picture_file
    } = req.body
    git 
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
        next(error)
    }
}


