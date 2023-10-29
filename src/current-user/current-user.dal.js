import { User } from "../../zghost/db/User.js"
import { ObjectId } from "../../zghost/app/init.js"
import { formatUser } from "../../utils/formats.js"

export class CurrentUserDAL{
    currentUserId
    constructor( currentUserId){
        this.currentUserId = currentUserId
    }
    
    acceptFriendRequest = async(friendId) =>{
        await User.findByIdAndUpdate(this.currentUserId, {
            $pull: { requests_received: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(this.currentUserId, {
            $addToSet: { friends: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(friendId, {
            $pull: { requests_sent: new ObjectId(this.currentUserId)}
        })
        await User.findByIdAndUpdate(friendId, {
            $addToSet: {friends: new ObjectId(this.currentUserId)}
        })
    }

    findFriends = async() =>{
        const currentUser =  await User.findById(this.currentUserId)
            .populate('friends')
            .select('friends')
        return currentUser.friends
    }
    
    findPeopleYouMayKnow = async() =>{
        return await User.find().select(
            `first_name last_name 
            pictureUrl 
            friends requests_sent 
            request_received`
        )
    }
    
    findReceivedRequests = async() =>{
        const user = await User.findById(this.currentUserId)
        .select('requests_received')
        .populate({
            path: 'requests_received',
            select: 'first_name last_name pictureUrl _id friends'
        })
    
        return user.requests_received
    }
    
    findSentRequests = async() =>{
        const user = await User.findById(this.currentUserId)
        .select('requests_sent')
        .populate({
            path: 'requests_sent',
            select: 'first_name last_name pictureUrl _id friends'
        })
    
        return user.requests_sent
    }
    
    formatFriends = (friends) =>{
        return friends.map(
            user => ({ ...formatUser(user)})
        )
    }

    recallSentRequest = async(friendId) =>{
        await User.findByIdAndUpdate(this.currentUserId, {
            $pull: { requests_sent: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(friendId, {
            $pull: { requests_received: new ObjectId(this.currentUserId)}
        })
    }
    
    removeReceivedRequest = async( friendId ) =>{
        await User.findByIdAndUpdate(this.currentUserId, {
            $pull: { requests_received: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(friendId, {
            $pull: { requests_sent: new ObjectId(this.currentUserId)}
        })
    }
    
    sendFriendRequest = async( friendId ) =>{
        await User.findByIdAndUpdate(this.currentUserId, {
            $push: { requests_sent: new ObjectId(friendId) }
        })
        await User.findByIdAndUpdate(friendId, {
            $push: { requests_received: new ObjectId(this.currentUserId)}
        })
    }
 
    removeFriend = async( friendId ) =>{
       
        await User.findByIdAndUpdate(this.currentUserId, {
            $pull: { friends: new ObjectId(friendId) }
        })
    
        await User.findByIdAndUpdate(friendId, {
            $pull: { friends: new ObjectId(this.currentUserId) }
        })
    }
}
