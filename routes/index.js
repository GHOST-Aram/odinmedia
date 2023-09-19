import { Router } from "../zghost/app/init.js";

const indexRouter = Router()

indexRouter.get('/', (req, res) => {
    res.render('index')
})

export {indexRouter}
