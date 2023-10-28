import * as database from '../utils/profiles-db.js'
import { formatPosts, formatProfile } from '../utils/formats.js'
import { getValidationResult } from '../zghost/utils/validator.js'
import { profile_info_validators } from '../utils/backend-validators.js'
import fs from 'node:fs'

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
    ...profile_info_validators,

    async(req, res, next) =>{
        const errors = getValidationResult(req)
        try {
            if(errors.isEmpty()){
                const currentUserId = req.user.id
                const {
                    first_name, last_name, 
                    pictureUrl, bannerUrl, city,
                    region
                } = req.body
            
                const banner_file = req.files.banner_file ? 
                req.files.banner_file[0] : null

                const picture_file = req.files.avatar ? 
                req.files.avatar[0] : undefined

                const profileData = {
                    first_name,
                    last_name,
                    bannerUrl: bannerUrl.trim().length > 1 ? bannerUrl : undefined,
                    pictureUrl: pictureUrl.trim().length > 1 ? pictureUrl: undefined,
                    banner_file: banner_file ? {
                        data: fs.readFileSync(banner_file.path),
                        contentType: banner_file.mimetype 
                    } : null,
                    picture_file: picture_file ? {
                        data: fs.readFileSync(picture_file.path),
                        contentType: picture_file.mimetype
                    } : null,
                    city,
                    region,
                }

                await database.updateProfileInfo({ currentUserId, profileData})
            }
    
            res.redirect(`/profiles/${currentUserId}`)
        } catch (error) {
            next(error)
        }
    }
]     
