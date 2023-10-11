import { User } from "../zghost/db/User.js"
import { ObjectId } from "mongodb"

export const addFriend = async(request) =>{
    const currentUserId = request.user.id
    const friendId = request.params.id

    await User.findByIdAndUpdate(currentUserId, {
        $pull: { requests_received: new ObjectId(friendId) }
    })
    await User.findByIdAndUpdate(currentUserId, {
        $addToSet: { friends: new ObjectId(friendId) }
    })
    await User.findByIdAndUpdate(friendId, {
        $pull: { requests_sent: new ObjectId(currentUserId)}
    })
    await User.findByIdAndUpdate(friendId, {
        $addToSet: {friends: new ObjectId(currentUserId)}
    })
}

export const findAllUsers = async() =>{
    return await User.find().select(
        `first_name last_name 
        pictureUrl 
        friends requests_sent 
        request_received`
    )
}
export const rejectFriendRequest = async(request) =>{
    const friendId = request.params.id
    const currentUserId = request.user.id

    await User.findByIdAndUpdate(currentUserId, {
        $pull: { requests_received: new ObjectId(friendId) }
    })
    await User.findByIdAndUpdate(friendId, {
        $pull: { requests_sent: new ObjectId(currentUserId)}
    })
} 