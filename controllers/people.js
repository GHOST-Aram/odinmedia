import * as database from "../utils/people-db.js"
import * as formats from "../utils/formats.js"

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
    const currentUser = req.user
    try {
        let users = await database.findAllUsers()

        users = formats.removeFriendsOfCurrentUser(
            users, currentUser.friends
        )
        users = formats.removeSentRequestsOfCurrentUser(
            users, currentUser.requests_sent
        )
        users = formats.removeReceivedRequestsOfCurrentUser(
            users, currentUser.requests_received
        )

        const formattedUsers = users.map(user =>({
            ...formats.formatUser(user),
            friends: user.friends.length
        })
        ).filter(user => user.id !== currentUser.id)

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



