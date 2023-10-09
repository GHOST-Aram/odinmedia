import { ObjectId } from "mongodb"
import { User } from "../zghost/db/User.js"

export const accept_one_friend_request = async(req, res) =>{
    const friendId = req.params.id
    const currentUserId = res.locals.user.id
    try {
        //Remove id from requests recieved of current user
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { request_received: new ObjectId(friendId) }
        })
        //Add id to friends current user
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { friends: new ObjectId(friendId) }
        })

        // Remove id of current user from requests sent of friend
        await User.findByIdAndUpdate(friendId, {
            $pull: { requests_sent: new ObjectId(currentUserId)}
        })
        // Add current user ID to friends list of friend
        await User.findByIdAndUpdate(friendId, {
            $addToSet: {friends: new ObjectId(currentUserId)}
        })
        res.redirect('/people/requests/received')
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export const decline_friend_request = async(req, res) =>{
    const friendId = req.params.id
    const currentUserId = res.locals.user.id

    try {
        //Remove id from requests recieved of current user
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { request_received: new ObjectId(friendId) }
        })
        // Remove id of current user from requests sent of friend
        await User.findByIdAndUpdate(friendId, {
            $pull: { requests_sent: new ObjectId(currentUserId)}
        })

        res.redirect('/people/requests/received')
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}
export const get_all_people = async(req, res) =>{
    try {
        const users = await User.find().select(
            'first_name last_name pictureUrl friends'
        )

        const formattedUsers = users.map(user =>({
            id: user._id.toString(),
            name: `${user.first_name} ${user.last_name}`,
            pictureUrl: user.pictureUrl,
            friends: user.friends.length
        }))

        res.render('people', { 
            title: 'People', 
            heading: 'People You May Know',
            people: formattedUsers
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server errror')
    }
}

export const get_received_requests = async(req, res) =>{
    const currentUsrId = res.locals.user.id
    try {
        const user = await User.findById(currentUsrId)
        .select('requests_received')
        .populate({
            path: 'requests_received',
            select: 'first_name last_name pictureUrl _id'
        })

        const formattedRequests = user.requests_received.map(request =>({
            name: `${request.first_name} ${request.last_name}`,
            pictureUrl: request.pictureUrl,
            id: request._id.toString()
        }))
        
        res.render('requests-sent', { 
            title: 'People | Requests Received', 
            heading: 'Requests Received',
            sent_requests: formattedRequests
        })
    } catch (error) {
        res.status(500).send('Internal server error')
    }
}
export const get_sent_requests = async(req, res) =>{
    const currentUsrId = res.locals.user.id
    try {
        const user = await User.findById(currentUsrId)
        .select('requests_sent')
        .populate({
            path: 'requests_sent',
            select: 'first_name last_name pictureUrl _id'
        })
        const formattedRequests = user.requests_sent.map(request =>({
            name: `${request.first_name} ${request.last_name}`,
            pictureUrl: request.pictureUrl,
            id: request._id.toString()
        }))
        
        res.render('requests-sent', { 
            title: 'People | Requests Sent', 
            heading: 'Requests Sent',
            sent_requests: formattedRequests
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}

export const recall_friend_request = async(req, res) =>{
    const friendId = req.params.id
    const currentUserId = res.locals.user.id

    try {
        //Remove id from requests sent of current user
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { request_sent: new ObjectId(friendId) }
        })
        // Remove id of current user from requests received of friend
        await User.findByIdAndUpdate(friendId, {
            $pull: { requests_received: new ObjectId(currentUserId)}
        })

        res.redirect('/people/requests/sent')
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export const send_friend_request = async(req, res) =>{
    const friendId = req.params.id
    const currentUserId = res.locals.user.id

    try {
        //Add friend id to requests sent of current user
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { request_sent: new ObjectId(friendId) }
        })
        // Add id of current user to requests received of friend
        await User.findByIdAndUpdate(friendId, {
            $addToSet: { requests_received: new ObjectId(currentUserId)}
        })

        res.redirect('/people')
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}



