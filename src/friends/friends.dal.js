import { ObjectId } from "../../zghost/app/init.js"
import { User } from "../../zghost/db/User.js"

export const findUserById = async(userId) =>{
    return await User.findById(userId).populate({
        path: 'friends',
        select: '_id first_name last_name pictureUrl friends'
    })
 
}

export const removeFromFriends = async({ currentUserId, friendId }) =>{
   
    await User.findByIdAndUpdate(currentUserId, {
        $pull: { friends: new ObjectId(friendId) }
    })

    await User.findByIdAndUpdate(friendId, {
        $pull: { friends: new ObjectId(currentUserId) }
    })
}