import { 
    get_editing_form, 
    get_my_profile,
    get_user_profile,
    update_profile 
} from "../controllers/profiles.js";
import { Router } from "../zghost/app/init.js";

const profilesRouter = Router()

profilesRouter.get('/me', get_my_profile)
profilesRouter.get('/:id', get_user_profile)
profilesRouter.get('/:id/edit', get_editing_form)
profilesRouter.post('/:id/edit', update_profile)


export {profilesRouter}