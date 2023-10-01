import {    
    accept_one_friend_request,
    decline_friend_request,
    get_all_people, 
    get_received_requests, 
    get_sent_requests, 
    recall_friend_request, 
    send_friend_request
} from "../controllers/people.js";
import { Router } from "../zghost/app/init.js";

const peopleRouter = Router()

peopleRouter.get('/', get_all_people)
peopleRouter.get('/requests/sent', get_sent_requests)
peopleRouter.get('/requests/received', get_received_requests)
peopleRouter.get('/requests/:id', send_friend_request)
peopleRouter.get('/requests/:id/recall',recall_friend_request)
peopleRouter.get('/requests/:id/accept', accept_one_friend_request)
peopleRouter.get('/requests/:id/decline', decline_friend_request)
export {peopleRouter}