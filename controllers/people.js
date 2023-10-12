import * as database from "../utils/people-db.js"
import { formatUser } from "../utils/formats.js"

export const accept_one_friend_request = async(req, res, next) =>{
    try {
        await database.addFriend(req)
        res.redirect('/people/requests/received')
    } catch (error) {
        next(error)
    }
}

export const decline_friend_request = async(req, res, next) =>{
    
    try {
        await database.rejectFriendRequest(req)
        res.redirect('/people/requests/received')
    } catch (error) {
        next(error)
    }
}
export const get_all_people = async(req, res, next) =>{
    const currentUserId = req.user.id
    try {
        const users = await database.findAllUsers()

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
        next(error)
    }
}

export const get_received_requests = async(req, res, next) =>{
    try {
        const requests_received = await database.findReceivedRequests(req)
        const formattedRequests = requests_received.map(
            request => formatUser(request)
        )
        
        res.render('requests-received', { 
            title: 'People | Requests Received', 
            heading: 'Requests Received',
            received_requests: formattedRequests
        })
    } catch (error) {
        next(error)
    }
}
export const get_sent_requests = async(req, res, next) =>{
    try {
        const requests_sent = await database.findSentRequests(req)
        const formattedRequests = requests_sent.map(
            request => formatUser(request)
        )

        res.render('requests-sent', { 
            title: 'People | Requests Sent', 
            heading: 'Requests Sent',
            sent_requests: formattedRequests
        })
    } catch (error) {
        next(error)
    }
}

export const recall_friend_request = async(req, res, next) =>{
    try {
       await database.recallSentRequests(req)

        res.redirect('/people/requests/sent')
    } catch (error) {
        next(error)
    }
}

export const send_friend_request = async(req, res, next) =>{
    try {
        await database.sendFriendRequest(req)
        res.redirect('/people')
    } catch (error) {
        console.log(error)
        next(error)
    }
}



