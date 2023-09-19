import { authenticate, isLoggedIn  } from "../zghost/app/auth.js"
import { Router } from "../zghost/app/init.js"

const accountsRouter = Router()

accountsRouter.get('/auth/facebook', 
	authenticate('facebook'), isLoggedIn, (req, res) =>{
		res.json({user: req.user})
	}
)

accountsRouter.get('/login', (req, res) => {
	res.render('login', { data : null, errors: null })
})

export {accountsRouter}