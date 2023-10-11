import { ObjectId } from "mongodb"
import { User } from "../zghost/db/User.js"
export const unfriend = async(req, res) => {
    const currentUser = req.user
    const friendId = req.params.id

    try {
        await User.findByIdAndUpdate(currentUser.id, {
            $pull: { friends: new ObjectId(friendId) }
        })

        await User.findByIdAndUpdate(friendId, {
            $pull: { friends: new ObjectId(currentUser.id) }
        })
        
        res.redirect(`/friends/${req.user.id}/all`)
    } catch (error) {
        res.status(500).send('Internal server error')
    }

}

export const get_all_friends = async(req, res) =>{
    const id = req.params.id
    try {
        const user =  await User.findById(id).populate({
            path: 'friends',
            select: '_id first_name last_name pictureUrl'
        })

        const friends = user.friends.map(friend => ({
            id: friend._id.toString(),
            name: `${friend.first_name} ${friend.last_name}`,
            pictureUrl: friend.pictureUrl
        }))

        res.render('friends', { 
            title: `Friends of ${user.name}`, 
            heading: `Friends of ${user.name}`,
            friends
        })
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
}



