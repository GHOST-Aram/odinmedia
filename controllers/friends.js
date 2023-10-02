import { people } from "../data.js"

export const unfriend = (req, res) => {0
    res.redirect(`/friends/${res.locals.user.id}/all`)
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



