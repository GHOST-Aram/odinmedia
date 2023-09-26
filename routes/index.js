import { Router } from "../zghost/app/init.js";

const indexRouter = Router()


indexRouter.get('/', async (req, res) => {
    const user = {
        name: 'Frank Tristan',
        pictureUrl: 'https://randomuser.me/api/portraits/men/83.jpg'
    }
    
    res.render('index', { 
        user: user, title: 'Home', posts
    })
})

const posts = [
    {
        textContent: `Lorem ipsum dolor, sit amet consectetur 
            adipisicing elit. Itaque molestiae perspiciatis enim 
            laudantium quos beatae dignissimos! Est porro saepe 
            sapiente magnam dolorem? Quaerat vitae, 
            non at aliquid commodi dignissimos debitis!`,
        likes: 20,
        shared: 2,
        comments: 15,
        author: {
            name: 'Erick Bently',
            pictureUrl: 'https://randomuser.me/api/portraits/men/81.jpg'
        },
        createdAt: 'June 22'
    },
    {
        textContent: `Itaque molestiae perspiciatis enim 
            laudantium quos beatae dignissimos! Est porro saepe 
            sapiente magnam dolorem? Quaerat vitae, 
            non at aliquid commodi dignissimos debitis!`,
        likes: 180,
        shared: 8,
        comments: 100,
        author: {
            name: 'Jansen Kidis',
            pictureUrl: 'https://randomuser.me/api/portraits/men/80.jpg'
        },
        createdAt: 'June 23'
    },
    {
        textContent: `Quaerat vitae, non at aliquid commodi dignissimos
             debitis!Lorem ipsum dolor, sit amet consectetur 
            adipisicing elit. Itaque molestiae perspiciatis enim 
            laudantium quos beatae dignissimos! Est porro saepe 
            sapiente magnam dolorem? `,
        likes: 10,
        shared: 7,
        comments: 10,
        author: {
            name: 'Jack Daniel',
            pictureUrl: 'https://randomuser.me/api/portraits/men/71.jpg'
        },
        createdAt: 'June 14'
    },
]
export {indexRouter}
