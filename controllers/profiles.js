import { posts, people } from '../data.js'
export const get_my_profile = (req, res) => {
    const id = req.params.id

    const profile = people.find(person => person.id === id)
    res.render('profile', { 
    title: 'My Profile', posts, profile
})
}
export const get_editing_form = (req, res) =>{
    const profile = people.find(prof => prof.id === req.params.id)
    res.render('edit-profile', { title: 'Edit Profile', profile })
}

export const update_profile = (req, res) =>{
    const data = req.body
    console.log(data)

    res.redirect(`/profiles/${req.params.id}`)
}


