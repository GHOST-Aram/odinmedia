import * as formats from '../../utils/formats.js'

export class SocialController{
    #dataAccessLayer

    constructor(dataAccessLayer){
        this.#dataAccessLayer = dataAccessLayer
    }
    accept_friend_request = async(req, res, next) =>{
        const currentUserId = req.user.id
        const friendId = req.params.id
    
        try {
            await this.#dataAccessLayer.acceptFriendRequest(currentUserId, friendId)
            res.redirect('/social/requests/received')
        } catch (error) {
            next(error)
        }
    }
    
    decline_friend_request = async(req, res, next) =>{
        const friendId = req.params.id
        const currentUserId = req.user.id
    
        try {
            await this.#dataAccessLayer.removeReceivedRequest(currentUserId, friendId)
            res.redirect('/social/requests/received')
        } catch (error) {
            next(error)
        }
    }
    
    get_all_friends = async(req, res, next) =>{
        const currentUserId = req.user.id
    
        try {
            const friends = await this.#dataAccessLayer.findFriends(currentUserId)
            
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
    
    get_people_you_may_know = async(req, res, next) =>{
        const currentUser = req.user
    
        try {
            let users = await this.#dataAccessLayer.findPeopleYouMayKnow(currentUser.id)
    
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
    
    get_received_requests = async(req, res, next) =>{
        const currentUserId = req.user.id
    
        try {
            const requests_received = await this.#dataAccessLayer.findReceivedRequests(
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
    get_sent_requests = async(req, res, next) =>{
        const currentUserId = req.user.id
    
        try {
            const requests_sent = await this.#dataAccessLayer.findSentRequests(currentUserId)
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
    
    recall_friend_request = async(req, res, next) =>{
        const friendId = req.params.id
        const currentUserId = req.user.id
    
        try {
           await this.#dataAccessLayer.recallSentRequest(currentUserId, friendId)
    
            res.redirect('/social/requests/sent')
        } catch (error) {
            next(error)
        }
    }
    
    
    removeFriend = async(req, res, next) => {
        const currentUserId = req.user.id
        const friendId = req.params.id
    
        try {
            this.#dataAccessLayer.removeFriend(currentUserId, friendId)
            res.redirect(`/friends/${req.user.id}/all`)
        } catch (error) {
            next(error)
        }
    }
    
    send_friend_request = async(req, res, next) =>{
        const friendId = req.params.id
        const currentUserId = req.user.id
    
        try {
            await this.#dataAccessLayer.sendFriendRequest(currentUserId, friendId)
            res.redirect('/social/people-you-may-know')
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    
    
    


}    
