import * as auth from "../controllers/auth.js";
import { Router } from "../zghost/app/init.js";
import { Authenticator } from "../zghost/app/init.js";

const authRouter = Router()

authRouter.get('/facebook', Authenticator.authenticate('facebook'))
authRouter.get('/facebook/callback', Authenticator.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}))

authRouter.get('/google', Authenticator.authenticate('google', {scope: 'email'}))
authRouter.get('/google/callback', Authenticator.authenticate('google', {
    failureRedirect: '/auth/login',
    successRedirect: '/'
}))

authRouter.get('/github', Authenticator.authenticate('github'))
authRouter.get('/github/fallback', Authenticator.authenticate('github', {
    failureRedirect: '/auth/login',
    successRedirect: '/'
}))

authRouter.get('/login', auth.get_login_form )
authRouter.post('/login', Authenticator.authenticate('local', {
        failureRedirect: '/auth/login',
        successRedirect: '/'
}))
authRouter.get('/logout', auth.logout)
authRouter.get('/sign-up', auth.get_sign_up_form)
authRouter.post('/sign-up', auth.creat_user)

export {authRouter}