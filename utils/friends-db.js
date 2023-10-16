import { ObjectId } from "../zghost/app/init.js"
import { User } from "../zghost/db/User.js"

export const findUserById = async(req) =>{
    return await User.findById(req.params.id).populate({
        path: 'friends',
        select: '_id first_name last_name pictureUrl friends'
    })
 
}

export const removeFromFriends = async(request) =>{
    const currentUserId = request.user.id
    const friendId = request.params.id

    await User.findByIdAndUpdate(currentUserId, {
        $pull: { friends: new ObjectId(friendId) }
    })

    await User.findByIdAndUpdate(friendId, {
        $pull: { friends: new ObjectId(currentUserId) }
    })
}