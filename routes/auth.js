import * as auth from "../controllers/auth.js";
import { Router } from "../zghost/app/init.js";
import { Authenticator } from "../zghost/app/init.js";

const authRouter = Router()

authRouter.get('/facebook', Authenticator.authenticate('facebook'))
authRouter.get('/facebook/callback', Authenticator.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}))

authRouter.get('/login', auth.get_login_form )
authRouter.post('/login', auth.login)
authRouter.get('/logout', auth.logout)
authRouter.get('/sign-up', auth.get_sign_up_form)
authRouter.post('/sign-up', auth.creat_user)

export {authRouter}