import { posts, people } from '../data.js'
export const get_my_profile = (req, res) => {
    const id = req.params.id

    const profile = people.find(person => person.id === id)
    res.render('profile', { 
    title: 'My Profile', posts, profile
})
}


