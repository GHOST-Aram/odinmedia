import { authenticate, isLoggedIn  } from "../zghost/app/auth.js"
import { Router } from "../zghost/app/init.js"

const accountsRouter = Router()

accountsRouter.get('/auth/facebook', 
	authenticate('facebook'), isLoggedIn, (req, res) =>{
		res.json({user: req.user})
	}
)

export {accountsRouter}