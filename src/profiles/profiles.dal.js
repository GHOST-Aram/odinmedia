import { User } from "../../zghost/db/User.js"
import { Post } from "../content/post.model.js"
import { ObjectId } from "../../zghost/app/init.js"

class ProfilesDAL{
    findProfileById = async(profileID) =>{
        return await User.findById(profileID).select(
            `pictureUrl friends bannerUrl city _id 
            region first_name last_name createdAt`
        )
    }
    
    findPostsByProfileId = async(profileID) =>{
        return await Post.find({author: new ObjectId(profileID)}).populate(
            {
                path: 'author',
                select: 'first_name last_name pictureUrl _id'
            }
        )
    }
    
    updateProfileInfo = async({ profileID, profileData }) =>{
        await User.findByIdAndUpdate(profileID, profileData )
    }
}    

export const profilesDAL = new ProfilesDAL()
