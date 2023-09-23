import { isLoggedIn } from "../zghost/app/auth.js";
import { Router } from "../zghost/app/init.js";

const indexRouter = Router()

indexRouter.get('/', (req, res) => {
    res.render('index', { user: req.user, title: 'Home' })
})

export {indexRouter}
