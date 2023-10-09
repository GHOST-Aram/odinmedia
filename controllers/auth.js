import { User } from "../zghost/db/User.js"

export const creat_user = (req, res) => {
   const {first_name, last_name, email, password} = req.body
    
   try {
       hash(password, 10, async(err, hashedPasscode) =>{
        if(err) throw err
        await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPasscode,
        } )
    })
    res.redirect('/auth/login')

   } catch (error) {
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
        res.redirect('/login')
    }
}