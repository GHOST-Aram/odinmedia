import { createUserWithHashedPassword } from "../utils/auth.js"

export const creat_user = (req, res) => {
   try {
    createUserWithHashedPassword(req)
    res.redirect('/auth/login')

   } catch (error) {
       console.log(error)
        res.status(500).send('Internal server error')
   } 
}

export const get_login_form = (req, res) =>{
    res.render('accounts/login', {title: 'Login'})
}

export const get_sign_up_form = (req, res) =>{
    res.render('accounts/sign-up', { title: 'Sign Up'})
}

export const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else{
        res.redirect('/auth/login')
    }
}

export const logout = (req, res, next) =>{
    req.logout(function(error) {
        if(error){ return next(error)}
    })
    res.redirect('/auth/login')
}