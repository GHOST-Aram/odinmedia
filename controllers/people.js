import { ObjectId } from "mongodb"
import { User } from "../zghost/db/User.js"
import * as people from "../utils/people.js"
import { formatUser } from "../utils/format-user.js"

export const accept_one_friend_request = async(req, res) =>{
    try {
        await people.addFriend(req)
        res.redirect('/people/requests/received')
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export const decline_friend_request = async(req, res) =>{
    
    try {
        await people.rejectFriendRequest(req)
        res.redirect('/people/requests/received')
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}
export const get_all_people = async(req, res) =>{
    const currentUserId = req.user.id
    try {
        const users = await people.findAllUsers()

        const formattedUsers = users.map(user =>({
            ...formatUser(user),
            friends: user.friends.length
        })
        ).filter(user => user.id !== currentUserId)

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
    try {
        const requests_received = await people.findReceivedRequests(req)
        const formattedRequests = requests_received.map(
            request => formatUser(request)
        )
        
        res.render('requests-received', { 
            title: 'People | Requests Received', 
            heading: 'Requests Received',
            received_requests: formattedRequests
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}
export const get_sent_requests = async(req, res) =>{
    try {
        const requests_sent = await people.findSentRequests(req)
        const formattedRequests = requests_sent.map(
            request => formatUser(request)
        )

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
    
    try {
       await people.recallSentRequests(req)

        res.redirect('/people/requests/sent')
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export const send_friend_request = async(req, res) =>{
    
    try {
        await people.sendFriendRequest(req)
        res.redirect('/people')
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
}



