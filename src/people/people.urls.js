import * as people from "./people.controllers.js";
import { Router } from "../../zghost/app/init.js";

const peopleRouter = Router()

peopleRouter.get('/', people.get_all_people)
peopleRouter.get('/requests/sent', people.get_sent_requests)
peopleRouter.get('/requests/received', people.get_received_requests)
peopleRouter.get('/requests/:id', people.send_friend_request)
peopleRouter.get('/requests/:id/recall',people.recall_friend_request)
peopleRouter.get('/requests/:id/accept', people.accept_one_friend_request)
peopleRouter.get('/requests/:id/decline', people.decline_friend_request)
export {peopleRouter}