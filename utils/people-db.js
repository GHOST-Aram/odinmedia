import { User } from "../zghost/db/User.js"
import { ObjectId } from "../zghost/app/init.js"

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

export const findReceivedRequests = async(request ) =>{
    const user = await User.findById(request.user.id)
    .select('requests_received')
    .populate({
        path: 'requests_received',
        select: 'first_name last_name pictureUrl _id'
    })

    return user.requests_received
}

export const findSentRequests = async(request) =>{
    const user = await User.findById(request.user.id)
    .select('requests_sent')
    .populate({
        path: 'requests_sent',
        select: 'first_name last_name pictureUrl _id'
    })

    return user.requests_sent
}

export const recallSentRequests = async(request) =>{
    const friendId = request.params.id
    const currentUserId = request.user.id

    await User.findByIdAndUpdate(currentUserId, {
        $pull: { requests_sent: new ObjectId(friendId) }
    })
    await User.findByIdAndUpdate(friendId, {
        $pull: { requests_received: new ObjectId(currentUserId)}
    })
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

export const sendFriendRequest = async(request) =>{
        const friendId = request.params.id
        const currentUserId = request.user.id

        await User.findByIdAndUpdate(currentUserId, {
            $push: { requests_sent: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(friendId, {
            $push: { requests_received: new ObjectId(currentUserId)}
        })
}