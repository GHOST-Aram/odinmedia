import * as database from '../utils/profiles-db.js'
import { formatPosts, formatProfile } from '../utils/formats.js'
import { validationResult, validator } from '../zghost/utils/validator.js'

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

export const update_profile = [
    validator.validatePlainText('name', {identifier: 'Name'}),
    validator.validatePlainText('city', {identifier: 'City'}),
    validator.validatePlainText('region', { identifier: 'Region'}),
    validator.validateUrl('bannerUrl', {identifier: 'Banner Url'}),
    validator.validateUrl('pictureUrl', { identifier: 'Picture Url'}),

    async(req, res, next) =>{
        const errors = validationResult(req)
        try {
            if(errors.isEmpty()){
                await database.updateProfileInfo(req)
            }
    
            res.redirect(`/profiles/${req.user.id}`)
        } catch (error) {
            next(error)
        }
    }
]     
