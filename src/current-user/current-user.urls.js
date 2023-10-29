import * as currentUser from './current-user.controllers'
import { Router } from "../../zghost/app/init.js";

const socialRouter = Router()

socialRouter.get('/people-you-may-know', currentUser.get_people_you_may_know)
socialRouter.get('/requests/sent', currentUser.get_sent_requests)
socialRouter.get('/requests/received', currentUser.get_received_requests)
socialRouter.get('/requests/:id', currentUser.send_friend_request)
socialRouter.get('/requests/:id/recall',currentUser.recall_friend_request)
socialRouter.get('/requests/:id/accept', currentUser.accept_friend_request)
socialRouter.get('/requests/:id/decline', currentUser.decline_friend_request)
socialRouter.get('/:id/all', currentUser.get_all_friends)
socialRouter.get('/:id/unfriend', currentUser.removeFriend)

export {socialRouter}