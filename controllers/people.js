export const get_all_people = (req, res) =>{
    res.render('people', 
    { 
        title: 'People', 
        user: {
            name: 'Irvine Johnson',
            pictureUrl: 'https://randomuser.me/api/portraits/men/83.jpg'
        },
        people
    })
}

export const get_sent_requests = (req, res) =>{
    res.render('requests-sent', 
    { 
        title: 'People | Requests Sent', 
        user: {
            name: 'Irvine Johnson',
            pictureUrl: 'https://randomuser.me/api/portraits/men/83.jpg'
        },
        people
    })
}
export const get_received_requests = (req, res) =>{
    res.render('requests-received', 
    { 
        title: 'People | Requests Received', 
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
