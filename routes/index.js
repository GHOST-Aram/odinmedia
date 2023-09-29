import { Router } from "../zghost/app/init.js";
import { posts } from "../data.js";

const indexRouter = Router()


indexRouter.get('/home', async (req, res) => {
    const user = {
        name: 'Frank Tristan',
        pictureUrl: 'https://randomuser.me/api/portraits/men/83.jpg'
    }
    
    res.render('index', { 
        user: user, title: 'Home', posts
    })
})

export {indexRouter}
