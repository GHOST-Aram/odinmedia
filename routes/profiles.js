import * as profiles from "../controllers/profiles.js";
import { Router, uploadMultipleFiles } from "../zghost/app/init.js";

const profilesRouter = Router()

profilesRouter.get('/:id', profiles.get_user_profile)
profilesRouter.get('/:id/edit', profiles.get_editing_form)
profilesRouter.post('/:id/edit',uploadMultipleFiles([
    { name: 'avatar', maxCount: 1 }, { name: 'banner_file', maxCount: 1 }
]), profiles.update_profile)


export {profilesRouter}