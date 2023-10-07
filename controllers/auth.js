export const creat_user = (req, res) => {
    
}
export const get_login_form = (req, res) =>{
    res.render('accounts/login')
}

export const get_sign_up_form = (req, res) =>{
    res.render('accounts/sign-up')
}

export const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else{
        res.redirect('/login')
    }
}