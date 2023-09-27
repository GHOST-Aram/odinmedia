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

const people = [
    {
        name: 'John Khan',
        pictureUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
        mutuaFriends: 20,
    },
    {
        name: 'Erickson Denis',
        pictureUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
        mutuaFriends: 10,
    },
    {
        name: 'Fransk Odoi',
        pictureUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
        mutuaFriends: 12,
    },
    {
        name: 'Fred Kennedy',
        pictureUrl: 'https://randomuser.me/api/portraits/men/73.jpg',
        mutuaFriends: 21,
    },
    {
        name: 'Erick Bell',
        pictureUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
        mutuaFriends: 28,
    },
]