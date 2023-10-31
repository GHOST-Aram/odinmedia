import { ProfilesDAL } from './profiles.dal.js'
import * as formats from '../../utils/formats.js'
import { getValidationResult } from '../../zghost/utils/validator.js'
import { profile_info_validators } from '../../utils/validators.js'
import fs from 'node:fs'

export const get_user_profile = async(req, res, next) => {
    const userId = req.params.id
    const currentUser = req.user
    const profilesDAL = new ProfilesDAL(currentUser.id)

    try {
        const user = await profilesDAL.findProfileById(userId)
        const posts = await profilesDAL.findPostsByProfileId(userId)
        const formattedPosts = formats.formatPosts(posts, currentUser)
        const profile = formats.formatProfile(user)
        
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
    const currentUserId = req.user.id
    const profilesDAL = new ProfilesDAL(currentUserId)

    try {
        const user = await profilesDAL.findCurrentUserProfile()
        const profile = formats.formatProfile(user)

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
        const currentUserId = req.user.id

        if(errors.isEmpty()){
            const profilesDAL = new ProfilesDAL(currentUserId)
            const profileData = collectProfileData({ 
                textData: req.body,
                files: req.files
            })

            try {
                await profilesDAL.updateCurrentUserProfile(profileData)
                res.redirect(`/profiles/${currentUserId}`)
            } catch (error) {
                next(error)
            }
        } else {
            res.redirect(`/profiles/${currentUserId}/edit`)
        }
    }
]     

const collectProfileData = ({ textData, files}) =>{
    const {
        first_name, last_name, 
        pictureUrl, bannerUrl, city,
        region
    } = textData
    const banner_file = files.banner_file ? files.banner_file[0] : null

    const picture_file = files.avatar ? files.avatar[0] : undefined

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

    return profileData
}