import { get_all_friends, unfriend } from "../controllers/friends.js";
import { Router } from "../zghost/app/init.js";

const friendsRouter = Router()

friendsRouter.get('/', get_all_friends)
friendsRouter.get('/:id/unfriend', unfriend)

export {friendsRouter}