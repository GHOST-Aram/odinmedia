// import { Post } from "../models/post.js";
import { isLoggedIn } from "../zghost/app/auth.js";
import { Router } from "../zghost/app/init.js";

const indexRouter = Router()

indexRouter.get('/', async (req, res) => {
    // const posts = await Post.find()

    res.render('index', { 
        user: req.user, title: 'Home', 
    })
})

export {indexRouter}
