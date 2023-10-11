import * as profiles from "../controllers/profiles.js";
import { Router } from "../zghost/app/init.js";

const profilesRouter = Router()

profilesRouter.get('/me', profiles.get_my_profile)
profilesRouter.get('/:id', profiles.get_user_profile)
profilesRouter.get('/:id/edit', profiles.get_editing_form)
profilesRouter.post('/:id/edit', profiles.update_profile)


export {profilesRouter}