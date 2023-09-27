import {    
    get_all_people, 
    get_received_requests, 
    get_sent_requests 
} from "../controllers/people.js";
import { Router } from "../zghost/app/init.js";

const peopleRouter = Router()

peopleRouter.get('/', get_all_people)
peopleRouter.get('/requests/sent', get_sent_requests)
peopleRouter.get('/requests/received', get_received_requests)
export {peopleRouter}