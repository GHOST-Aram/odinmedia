import { people } from "../data.js"
export const get_all_friends = (req, res) =>{
    res.render('friends', 
    { 
        title: 'Friends', 
        people
    })
}

