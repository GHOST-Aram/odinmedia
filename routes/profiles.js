import * as profiles from "../controllers/profiles.js";
import { Router } from "../zghost/app/init.js";
import multer from 'multer'

const upload = multer({ dest: '/uploads'})
const profilesRouter = Router()

profilesRouter.get('/:id', profiles.get_user_profile)
profilesRouter.get('/:id/edit', profiles.get_editing_form)
profilesRouter.post('/:id/edit',upload.fields([
    { name: 'avatar', maxCount: 1 }, { name: 'banner_file', maxCount: 1 }
]), profiles.update_profile)


export {profilesRouter}