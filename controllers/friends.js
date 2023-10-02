import { people } from "../data.js"

export const unfriend = (req, res) => {
    res.redirect('/friends')
}

export const get_all_friends = (req, res) =>{
    const id = req.params.id

    const profile = people.find(person => person.id === id)
    res.render('friends', 
    { 
        title: `Friends of ${profile.name}`, 
        heading: `Friends of ${profile.name}`,
        people
    })
}



