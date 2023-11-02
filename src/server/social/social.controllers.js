import { socialDAL } from "./social.dal.js"
import * as formats from '../../utils/formats.js'

export const accept_friend_request = async(req, res, next) =>{
    const currentUserId = req.user.id
    const friendId = req.params.id

    try {
        await socialDAL.acceptFriendRequest(currentUserId, friendId)
        res.redirect('/social/requests/received')
    } catch (error) {
        next(error)
    }
}

export const decline_friend_request = async(req, res, next) =>{
    const friendId = req.params.id
    const currentUserId = req.user.id

    try {
        await socialDAL.removeReceivedRequest(currentUserId, friendId)
        res.redirect('/social/requests/received')
    } catch (error) {
        next(error)
    }
}

export const get_all_friends = async(req, res, next) =>{
    const currentUserId = req.user.id

    try {
        const friends = await socialDAL.findFriends(currentUserId)
        
        const formattedFriends = friends.map(friend =>({
            ...formats.formatUser(friend),
            mutualFriends: formats.calculateMutualFriends(
                friend.friends, req.user.friends
            )
        }))

        res.render('friends', { 
            title: `Friends of ${req.user.name}`, 
            heading: `Friends of ${req.user.name}`,
            friends: formattedFriends
        })
    } catch (error) {
        next(error)
    }
}

export const get_people_you_may_know = async(req, res, next) =>{
    const currentUser = req.user

    try {
        let users = await socialDAL.findPeopleYouMayKnow(currentUser.id)

        users = formats.filterFriends(
            users, currentUser.friends
        )
        users = formats.filterSentRequests(
            users, currentUser.requests_sent
        )
        users = formats.filterReceivedRequests(
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
        const requests_received = await socialDAL.findReceivedRequests(
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
        const requests_sent = await socialDAL.findSentRequests(currentUserId)
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
       await socialDAL.recallSentRequest(currentUserId, friendId)

        res.redirect('/social/requests/sent')
    } catch (error) {
        next(error)
    }
}


export const removeFriend = async(req, res, next) => {
    const currentUserId = req.user.id
    const friendId = req.params.id

    try {
        socialDAL.removeFriend(currentUserId, friendId)
        res.redirect(`/friends/${req.user.id}/all`)
    } catch (error) {
        next(error)
    }
}

export const send_friend_request = async(req, res, next) =>{
    const friendId = req.params.id
    const currentUserId = req.user.id

    try {
        await socialDAL.sendFriendRequest(currentUserId, friendId)
        res.redirect('/social/people-you-may-know')
    } catch (error) {
        console.log(error)
        next(error)
    }
}




