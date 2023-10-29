import { get_all_friends, unfriend } from "./friends.controllers.js";
import { Router } from "../../zghost/app/init.js";

const friendsRouter = Router()

friendsRouter.get('/:id/all', get_all_friends)
friendsRouter.get('/:id/unfriend', unfriend)

export {friendsRouter}