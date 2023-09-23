import passport from "passport"
import { authenticate} from "../zghost/app/auth.js"
import { Router } from "../zghost/app/init.js"

const accountsRouter = Router()

accountsRouter.get('/facebook', 
	authenticate('facebook')
)

accountsRouter.get('/facebook/callback', 
	authenticate('facebook', {
		failureRedirect: 'auth/login',
	})
, (req, res) =>{
	if(req.isAuthenticated()){
		res.render('index', {user: req.user})
	}
})

accountsRouter.get('/login', (req, res) => {
	res.render('accounts/login', { 
		title:'Login', data : null, errors: null 
	})
})
accountsRouter.get('/sign-up', (req, res) => {
	res.render('accounts/sign-up', { 
		title: 'Sign up', data : null, errors: null 
	})
})


export {accountsRouter}