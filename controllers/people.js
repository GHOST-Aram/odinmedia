import { ObjectId } from "mongodb"
import { people } from "../data.js"
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
export const get_all_people = (req, res) =>{
    res.render('people', 
    { 
        title: 'People', 
        heading: 'People You May Know',
        people
    })
}

export const get_sent_requests = (req, res) =>{
    res.render('requests-sent', 
    { 
        title: 'People | Requests Sent', 
        heading: 'Requests Sent',
        people
    })
}
export const get_received_requests = (req, res) =>{
    res.render('requests-received', 
    { 
        title: 'People | Requests Received',
        heading: 'Requests Received', 
        people
    })
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

export const send_friend_request = (req, res) =>{
    console.log("User id: ", req.params.id)
    res.redirect('/people')
}



