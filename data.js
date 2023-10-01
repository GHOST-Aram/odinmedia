export const people = [
    {
        id:'jfkdsjifjks',
        name: 'John Khan',
        banner: 'https://images.unsplash.com/photo-1695456527397-0b9e1c79fe96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        pictureUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
        mutuaFriends: 20,
        total_posts: 12,
        total_friends: 243,
        joined_date: 'Dec 12 2022',
        city: 'Nairobi',
        region: 'East Africa',
    },
    {
        id:'jfsakflwpewq',
        name: 'Erickson Denis',
        banner: 'https://images.unsplash.com/photo-1695455061112-87e2cee1647c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        pictureUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
        mutuaFriends: 10,
        total_posts: 12,
        total_friends: 243,
        joined_date: 'Dec 12 2022',
        city: 'Nairobi',
        region: 'East Africa',
    },
    {
        id:'mlsakflwqlwq',
        name: 'Fransk Odoi',
        banner: 'https://images.unsplash.com/photo-1695669089599-9461b72d6643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        pictureUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
        mutuaFriends: 12,
        total_posts: 12,
        total_friends: 243,
        joined_date: 'Dec 12 2022',
        city: 'Nairobi',
        region: 'East Africa',
    },
    {
        id:'kfksdpfpwepew',
        name: 'Fred Kennedy',
        banner: 'https://images.unsplash.com/photo-1665658115136-bf3fcb10a3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
        pictureUrl: 'https://randomuser.me/api/portraits/men/73.jpg',
        mutuaFriends: 21,
        total_posts: 12,
        total_friends: 243,
        joined_date: 'Dec 12 2022',
        city: 'Nairobi',
        region: 'East Africa',
    },
    {
        id:'mfokdofkpewkfwe',
        name: 'Erick Bell',
        banner: 'https://images.unsplash.com/photo-1695582570771-bca78d2089b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        pictureUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
        mutuaFriends: 28,
        total_posts: 12,
        total_friends: 122,
        joined_date: 'Jan 10 2022',
        city: 'Pretoria',
        region: 'South Africa',
    },
    {
        id: 'fdshifhsdifjds',
        first_name: 'Frank',
		last_name: 'Tristan',
        name: 'Frank Tristan',
        banner: 'https://images.unsplash.com/photo-1695339642672-751be0722b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
        pictureUrl: 'https://randomuser.me/api/portraits/men/83.jpg',
        total_posts: 12,
        total_friends: 243,
        joined_date: 'Dec 12 2022',
        city: 'Nairobi',
        region: 'East Africa',    
    }
]

export const posts = [
    {
        id: 'yfuhufhweuhfuw',
        textContent: `Lorem ipsum dolor, sit amet consectetur 
            adipisicing elit. Itaque molestiae perspiciatis enim 
            laudantium quos beatae dignissimos! Est porro saepe 
            sapiente magnam dolorem? Quaerat vitae, 
            non at aliquid commodi dignissimos debitis!`,
        likes: [
                'fdshifhsdifjds', 'mfokdofkpewkfwe',
                'kfksdpfpwepew','mlsakflwqlwq'
            ],
        shared: 2,
        comments:  [
            {
                author: people[0],
                textContent: `Quaerat vitae, non at aliquid commodi dignissimos
                    debitis!Lorem ipsum dolor, sit amet consectetur 
                    adipisicing elit.`,
                timePosted: '2 days ago',
                

            },
            {
                author: people[2],
                textContent: `Quaerat vitae, non at aliquid commodi dignissimos
                    debitis!Lorem ipsum dolor, sit amet consectetur 
                    adipisicing elit.`,
                timePosted: '2 days ago'
            },
            {
                author: people[3],
                textContent: `Quaerat vitae, non at aliquid commodi dignissimos
                    debitis!Lorem ipsum dolor, sit amet consectetur 
                    adipisicing elit.`,
                timePosted: '2 days ago'
            }
        ],
        media: 'https://images.unsplash.com/photo-1694532228681-'
                +'2f6d94c2f768?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8M'
                + 'HxlZGl0b3JpYWwtZmVlZHwzOHx8fGVufDB8fHx8fA%3D%3D'
                + '&auto=format&fit=crop&w=500&q=60',
        author: people[0],
        createdAt: 'June 22'
    },
    {
        id: 'dasufhjkfjasidwq',
        textContent: `Itaque molestiae perspiciatis enim 
            laudantium quos beatae dignissimos! Est porro saepe 
            sapiente magnam dolorem? Quaerat vitae, 
            non at aliquid commodi dignissimos debitis!`,
        likes: [
            'fdshifhsdifjds', 'mfokdofkpewkfwe','mlsakflwqlwq'
        ],
        shared: 8,
        comments: [],
        media: 'https://images.unsplash.com/photo-1695556128448-1050e9'
                + 'b277e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYW'
                + 'wtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500'
                + '&q=60',
        author: people[1],
        createdAt: 'June 23'
    },
    {
        id: 'hdhasijnfjhwquu',
        textContent: `Quaerat vitae, non at aliquid commodi dignissimos
             debitis!Lorem ipsum dolor, sit amet consectetur 
            adipisicing elit. Itaque molestiae perspiciatis enim 
            laudantium quos beatae dignissimos! Est porro saepe 
            sapiente magnam dolorem? `,
        likes: [],
        shared: 7,
        comments: [
            {
                author: people[2],
                textContent: `Quaerat vitae, non at aliquid commodi dignissimos
                    debitis!Lorem ipsum dolor, sit amet consectetur 
                    adipisicing elit.`,
                timePosted: '2 days ago'
            },
            {
                author: people[1],
                textContent: `Quaerat vitae, non at aliquid commodi dignissimos
                    debitis!Lorem ipsum dolor, sit amet consectetur 
                    adipisicing elit.`,
                timePosted: '2 days ago'
            },
            {
                author: people[0],
                textContent: `Quaerat vitae, non at aliquid commodi dignissimos
                    debitis!Lorem ipsum dolor, sit amet consectetur 
                    adipisicing elit.`,
                timePosted: '2 days ago'
            }
        ],
        media: 'https://plus.unsplash.com/premium_photo-1687139217079-61'
                + 'ca54f41d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3Jp'
                + 'YWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500'
                + '&q=60',
        author: people[2],
        createdAt: 'June 14'
    },
]