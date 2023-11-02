import { SocialDAL } from "./social.dal.js"
import * as formats from '../../utils/formats.js'

export const accept_friend_request = async(req, res, next) =>{
    const currentUserId = req.user.id
    const friendId = req.params.id
    const socialDAL = new SocialDAL(currentUserId)

    try {
        await socialDAL.acceptFriendRequest(friendId)
        res.redirect('/social/requests/received')
    } catch (error) {
        next(error)
    }
}

export const decline_friend_request = async(req, res, next) =>{
    const friendId = req.params.id
    const currentUserId = req.user.id
    const socialDAL = new SocialDAL(currentUserId)

    try {
        await socialDAL.removeReceivedRequest(friendId)
        res.redirect('/social/requests/received')
    } catch (error) {
        next(error)
    }
}

export const get_all_friends = async(req, res, next) =>{
    const currentUserId = req.user.id
    const socialDAL = new SocialDAL(currentUserId)

    try {
        const friends = await socialDAL.findFriends()
        
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
    const socialDAL = new SocialDAL(currentUser.id)

    try {
        let users = await socialDAL.findPeopleYouMayKnow()

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
    const socialDAL = new SocialDAL(currentUserId)

    try {
        const requests_received = await socialDAL.findReceivedRequests()

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
    const socialDAL = new SocialDAL(currentUserId)

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
    const socialDAL = new SocialDAL(currentUserId)

    try {
       await socialDAL.recallSentRequest(friendId)

        res.redirect('/social/requests/sent')
    } catch (error) {
        next(error)
    }
}


export const removeFriend = async(req, res, next) => {
    const currentUserId = req.user.id
    const friendId = req.params.id
    const socialDAL = new SocialDAL(currentUserId)

    try {
        socialDAL.removeFriend(friendId)
        res.redirect(`/friends/${req.user.id}/all`)
    } catch (error) {
        next(error)
    }
}

export const send_friend_request = async(req, res, next) =>{
    const friendId = req.params.id
    const currentUserId = req.user.id
    const socialDAL = new SocialDAL(currentUserId)

    try {
        await socialDAL.sendFriendRequest(friendId)
        res.redirect('/social/people-you-may-know')
    } catch (error) {
        console.log(error)
        next(error)
    }
}




