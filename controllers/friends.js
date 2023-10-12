import * as people from "../utils/friends.js"
import { formatFriends } from "../utils/formats.js"
export const unfriend = async(req, res, next) => {
    
    try {
        people.removeFromFriends(req)
        res.redirect(`/friends/${req.user.id}/all`)
    } catch (error) {
        next(error)
    }
}

export const get_all_friends = async(req, res, next) =>{
    let friends = []
    try {
        const user = await people.findUserById(req)
        
        if(user.friends && user.friends.length > 0){
            friends = formatFriends(user.friends)
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



