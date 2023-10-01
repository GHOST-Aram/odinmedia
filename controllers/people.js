import { people } from "../data.js"

export const accept_one_friend_request = (req, res) =>{
    console.log(req.params.id)

    res.redirect('/people/requests/received')
}

export const decline_friend_request = (req, res) =>{
    console.log(req.params.id)
    res.redirect('/people/requests/received')
}
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

export const recall_friend_request = (req, res) =>{
    console.log(req.params.id)
    res.redirect('/people/requests/sent')
}

export const send_friend_request = (req, res) =>{
    console.log("User id: ", req.params.id)
    res.redirect('/people')
}



