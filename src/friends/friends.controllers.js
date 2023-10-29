import * as database from "./friends.dal.js"
import * as formats from "../../utils/formats.js"
export const unfriend = async(req, res, next) => {
    const currentUserId = req.user.id
    const friendId = req.params.id
    try {
        database.removeFromFriends({ currentUserId, friendId })
        res.redirect(`/friends/${req.user.id}/all`)
    } catch (error) {
        next(error)
    }
}

export const get_all_friends = async(req, res, next) =>{
    const userId = req.params.id
    try {
        let friends = []
        const user = await database.findUserById(userId)
        
        if(user.friends && user.friends.length > 0){
            friends = user.friends.map(
                user => ({
                    ...formats.formatUser(user),
                    mutualFriends: formats.calculateMutualFriends(
                        user.friends, req.user.friends
                    )
                })
            )
        }

        res.render('friends', { 
            title: `Friends of ${user.name}`, 
            heading: `Friends of ${user.name}`,
            friends
        })
    } catch (error) {
        next(error)
    }
}



