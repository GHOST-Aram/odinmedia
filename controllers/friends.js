import * as people from "../utils/friends.js"
export const unfriend = async(req, res) => {
    
    try {
        people.removeFromFriends(req)
        res.redirect(`/friends/${req.user.id}/all`)
    } catch (error) {
        res.status(500).send('Internal server error')
    }

}

export const get_all_friends = async(req, res) =>{
    let friends = []
    try {
        const user = await people.findUserById(req)
        
        if(user.friends && user.friends.length > 0){
            friends = people.formatFriends(user.friends)
        }

        res.render('friends', { 
            title: `Friends of ${user.name}`, 
            heading: `Friends of ${user.name}`,
            friends
        })
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}



