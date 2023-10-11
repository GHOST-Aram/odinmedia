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