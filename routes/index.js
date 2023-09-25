import { Router } from "../zghost/app/init.js";

const indexRouter = Router()

indexRouter.get('/', async (req, res) => {
    const user = {
        name: 'Jane Doe',
        pictureUrl: 'https://randomuser.me/api/portraits/men/83.jpg'
    }

    res.render('index', { 
        user: user, title: 'Home', 
    })
})

export {indexRouter}
