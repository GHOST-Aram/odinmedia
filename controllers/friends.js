import * as database from "../utils/friends-db.js"
import { formatUser } from "../utils/formats.js"
export const unfriend = async(req, res, next) => {
    
    try {
        database.removeFromFriends(req)
        res.redirect(`/friends/${req.user.id}/all`)
    } catch (error) {
        next(error)
    }
}

export const get_all_friends = async(req, res, next) =>{
    let friends = []
    try {
        const user = await database.findUserById(req)
        
        if(user.friends && user.friends.length > 0){
            friends = user.friends.map(friend => formatUser(friend))
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



