import * as auth from "./auth.controllers.js";
import { Router } from "../../zghost/app/init.js";
import { Authenticator } from "../../zghost/app/init.js";
import { 
    login_validators, 
    signup_validators, 
} from "../../utils/validators.js"

const authRouter = Router()

authRouter.get('/facebook', Authenticator.authenticate('facebook'))
authRouter.get('/facebook/callback', Authenticator.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}))

authRouter.get('/login', auth.get_login_form )
authRouter.post('/login', ...login_validators, auth.login)
authRouter.get('/logout', auth.logout)
authRouter.get('/sign-up', auth.get_sign_up_form)
authRouter.post('/sign-up',...signup_validators, auth.creat_user)

export {authRouter}