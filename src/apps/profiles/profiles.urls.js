import {ProfilesController} from "./profiles.controllers.js";
import { Router, uploadMultipleFiles } from "../../zghost/app/init.js";
import { profilesDAL } from './profiles.dal.js'

const profilesRouter = Router()
const controller = new ProfilesController(profilesDAL)

profilesRouter.get('/:id', controller.get_user_profile)
profilesRouter.get('/:id/edit', controller.get_editing_form)
profilesRouter.post('/:id/edit',
    uploadMultipleFiles(
        [
            { name: 'avatar', maxCount: 1 }, 
            { name: 'banner_file', maxCount: 1 }
        ]
    ), 
    controller.update_profile
)


export {profilesRouter}