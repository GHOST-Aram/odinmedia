import * as database from "../utils/friends-db.js"
import * as formats from "../utils/formats.js"
export const unfriend = async(req, res, next) => {
    
    try {
        database.removeFromFriends(req)
        res.redirect(`/friends/${req.user.id}/all`)
    } catch (error) {
        next(error)
    }
}

export const get_all_friends = async(req, res, next) =>{
    try {
        let friends = []
        const user = await database.findUserById(req)
        
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



