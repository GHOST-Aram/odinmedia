export const get_posts = async (req, res) => {
    const user = {
        name: 'Frank Tristan',
        pictureUrl: 'https://randomuser.me/api/portraits/men/83.jpg'
    }
    
    res.render('index', { 
        user: user, title: 'Home', posts
    })
}

export const get_one_post = (req, res) =>{
    const id = req.params.id
    console.log(id)

    const post = posts.find(post => post.id === id) 
   
    res.render('post-view', { title: `Post | ${id}`, post })
}

const posts = [
    {
        id: 'yfuhufhweuhfuw',
        textContent: `Lorem ipsum dolor, sit amet consectetur 
            adipisicing elit. Itaque molestiae perspiciatis enim 
            laudantium quos beatae dignissimos! Est porro saepe 
            sapiente magnam dolorem? Quaerat vitae, 
            non at aliquid commodi dignissimos debitis!`,
        likes: 20,
        shared: 2,
        comments: 15,
        media: 'https://images.unsplash.com/photo-1694532228681-'
                +'2f6d94c2f768?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8M'
                + 'HxlZGl0b3JpYWwtZmVlZHwzOHx8fGVufDB8fHx8fA%3D%3D'
                + '&auto=format&fit=crop&w=500&q=60',
        author: {
            name: 'Erick Bently',
            pictureUrl: 'https://randomuser.me/api/portraits/men/81.jpg'
        },
        createdAt: 'June 22'
    },
    {
        id: 'dasufhjkfjasidwq',
        textContent: `Itaque molestiae perspiciatis enim 
            laudantium quos beatae dignissimos! Est porro saepe 
            sapiente magnam dolorem? Quaerat vitae, 
            non at aliquid commodi dignissimos debitis!`,
        likes: 180,
        shared: 8,
        comments: 100,
        media: 'https://images.unsplash.com/photo-1695556128448-1050e9'
                + 'b277e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYW'
                + 'wtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500'
                + '&q=60',
        author: {
            name: 'Jansen Kidis',
            pictureUrl: 'https://randomuser.me/api/portraits/men/80.jpg'
        },
        createdAt: 'June 23'
    },
    {
        id: 'hdhasijnfjhwquu',
        textContent: `Quaerat vitae, non at aliquid commodi dignissimos
             debitis!Lorem ipsum dolor, sit amet consectetur 
            adipisicing elit. Itaque molestiae perspiciatis enim 
            laudantium quos beatae dignissimos! Est porro saepe 
            sapiente magnam dolorem? `,
        likes: 10,
        shared: 7,
        comments: 10,
        media: 'https://plus.unsplash.com/premium_photo-1687139217079-61'
                + 'ca54f41d08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3Jp'
                + 'YWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500'
                + '&q=60',
        author: {
            name: 'Jack Daniel',
            pictureUrl: 'https://randomuser.me/api/portraits/men/71.jpg'
        },
        createdAt: 'June 14'
    },
]