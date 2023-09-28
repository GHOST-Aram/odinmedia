import { people } from "../data.js"
export const get_all_people = (req, res) =>{
    res.render('people', 
    { 
        title: 'People', 
        people
    })
}

export const get_sent_requests = (req, res) =>{
    res.render('requests-sent', 
    { 
        title: 'People | Requests Sent', 
        people
    })
}
export const get_received_requests = (req, res) =>{
    res.render('requests-received', 
    { 
        title: 'People | Requests Received', 
        people
    })
}

