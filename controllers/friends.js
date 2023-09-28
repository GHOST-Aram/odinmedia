import { people } from "../data.js"
export const get_all_friends = (req, res) =>{
    res.render('friends', 
    { 
        title: 'Friends', 
        user: {
            name: 'Irvine Johnson',
            pictureUrl: 'https://randomuser.me/api/portraits/men/83.jpg'
        },
        people
    })
}

