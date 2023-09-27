import { get_all_friends } from "../controllers/friends.js";
import { Router } from "../zghost/app/init.js";

const friendsRouter = Router()

friendsRouter.get('/', get_all_friends)

export {friendsRouter}