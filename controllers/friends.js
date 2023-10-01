import { people } from "../data.js"

export const unfriend = (req, res) => {
    res.redirect('/friends')
}

export const get_all_friends = (req, res) =>{
    res.render('friends', 
    { 
        title: 'Friends', 
        heading: 'Friends',
        people
    })
}



