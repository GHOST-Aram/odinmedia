import * as auth from "../controllers/auth.js";
import { Router } from "../zghost/app/init.js";
import passport from 'passport'

const authRouter = Router()

authRouter.get('/facebook', passport.authenticate('facebook'))
authRouter.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: 'auth/login'
}))
authRouter.get('/login', auth.get_login_form )
authRouter.post('/login', passport.authenticate('local', {
        failureRedirect: '/auth/login',
        successRedirect: '/'
}))
authRouter.get('/logout', auth.logout)
authRouter.get('/sign-up', auth.get_sign_up_form)
authRouter.post('/sign-up', auth.creat_user)

export {authRouter}