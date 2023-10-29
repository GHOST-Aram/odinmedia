import * as database from "./people.dal.js"
import * as formats from "../../utils/formats.js"

export const accept_one_friend_request = async(req, res, next) =>{
    const currentUserId = req.user.id
    const friendId = req.params.id

    try {
        await database.addFriend({currentUserId, friendId})
        res.redirect('/people/requests/received')
    } catch (error) {
        next(error)
    }
}

export const decline_friend_request = async(req, res, next) =>{
    const friendId = req.params.id
    const currentUserId = req.user.id
    try {
        await database.rejectFriendRequest({ currentUserId, friendId })
        res.redirect('/people/requests/received')
    } catch (error) {
        next(error)
    }
}
export const get_all_people = async(req, res, next) =>{
    const currentUser = req.user
    try {
        let users = await database.findAllUsers()

        users = formats.removeFriends(
            users, currentUser.friends
        )
        users = formats.removeSentRequests(
            users, currentUser.requests_sent
        )
        users = formats.removeReceivedRequests(
            users, currentUser.requests_received
        )

        const formattedUsers = users.map(user =>({
            ...formats.formatUser(user),
            friends: user.friends.length,
            mutualFriends: formats.calculateMutualFriends(
                user.friends, currentUser.friends),
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
    const currentUserId = req.user.id
    try {
        const requests_received = await database.findReceivedRequests(
            currentUserId
        )
        const formattedRequests = requests_received.map(
            user => ({
                ...formats.formatUser(user),
                mutualFriends: formats.calculateMutualFriends(
                    user.friends, req.user.friends
                )
            })
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
    const currentUserId = req.user.id
    try {
        const requests_sent = await database.findSentRequests(currentUserId)
        const formattedRequests = requests_sent.map(
            user => ({
                ...formats.formatUser(user),
                mutualFriends: formats.calculateMutualFriends(
                    user.friends, req.user.friends
                )
            })
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
    const friendId = req.params.id
    const currentUserId = req.user.id
    try {
       await database.recallSentRequests({currentUserId, friendId})

        res.redirect('/people/requests/sent')
    } catch (error) {
        next(error)
    }
}

export const send_friend_request = async(req, res, next) =>{
    const friendId = req.params.id
    const currentUserId = req.user.id

    try {
        await database.sendFriendRequest({ currentUserId, friendId })
        res.redirect('/people')
    } catch (error) {
        console.log(error)
        next(error)
    }
}



