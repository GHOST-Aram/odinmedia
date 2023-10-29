import { User } from "../../zghost/db/User.js"
import { ObjectId } from "../../zghost/app/init.js"

export const addFriend = async({currentUserId, friendId}) =>{
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

export const findReceivedRequests = async(currentUserId) =>{
    const user = await User.findById(currentUserId)
    .select('requests_received')
    .populate({
        path: 'requests_received',
        select: 'first_name last_name pictureUrl _id friends'
    })

    return user.requests_received
}

export const findSentRequests = async(currentUserId) =>{
    const user = await User.findById(currentUserId)
    .select('requests_sent')
    .populate({
        path: 'requests_sent',
        select: 'first_name last_name pictureUrl _id friends'
    })

    return user.requests_sent
}

export const recallSentRequests = async({currentUserId, friendId}) =>{
    await User.findByIdAndUpdate(currentUserId, {
        $pull: { requests_sent: new ObjectId(friendId) }
    })
    await User.findByIdAndUpdate(friendId, {
        $pull: { requests_received: new ObjectId(currentUserId)}
    })
}

export const rejectFriendRequest = async({ currentUserId, friendId }) =>{
    await User.findByIdAndUpdate(currentUserId, {
        $pull: { requests_received: new ObjectId(friendId) }
    })
    await User.findByIdAndUpdate(friendId, {
        $pull: { requests_sent: new ObjectId(currentUserId)}
    })
}

export const sendFriendRequest = async({ currentUserId, friendId }) =>{
        await User.findByIdAndUpdate(currentUserId, {
            $push: { requests_sent: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(friendId, {
            $push: { requests_received: new ObjectId(currentUserId)}
        })
}