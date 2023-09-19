import { authenticate, isLoggedIn  } from "../zghost/app/auth.js"
import { Router } from "../zghost/app/init.js"

const accountsRouter = Router()

accountsRouter.get('/auth/facebook', 
	authenticate('facebook'), isLoggedIn, (req, res) =>{
		res.json({user: req.user})
	}
)

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