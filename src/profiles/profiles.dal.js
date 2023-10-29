import { User } from "../../zghost/db/User.js"
import { Post } from "../content/post.model.js"
import { ObjectId } from "../../zghost/app/init.js"

class ProfilesDAL{
    findProfileById = async(id) =>{
        return await User.findById(id).select(
            `pictureUrl friends bannerUrl city _id 
            region first_name last_name createdAt`
        )
    }
    
    findPostsByProfileId = async(authorId) =>{
        return await Post.find({author: new ObjectId(authorId)}).populate(
            {
                path: 'author',
                select: 'first_name last_name pictureUrl _id'
            }
        )
    }
    
    updateProfileInfo = async({ currentUserId, profileData }) =>{
        await User.findByIdAndUpdate(currentUserId, profileData )
    }
}    

export const profilesDAL = new ProfilesDAL()
