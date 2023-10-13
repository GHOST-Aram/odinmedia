import * as database from '../utils/profiles-db.js'
import { formatPosts, formatProfile } from '../utils/formats.js'

export const get_user_profile = async(req, res, next) => {
    const userId = req.params.id
    const currentUser = req.user

    try {
        const user = await database.findProfileById(userId)
        const posts = await database.findPostsByAuthorId(userId)
        const formattedPosts = formatPosts(posts, currentUser)
        const profile = formatProfile(user)
        
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
        const user = await database.findProfileById(req.user.id)
        const profile = formatProfile(user)

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
        await database.updateProfileInfo(req.user.id, {
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


