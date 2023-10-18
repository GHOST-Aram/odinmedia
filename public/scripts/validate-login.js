const emailField = document.querySelector('input[type=email]')
const passwordField = document.querySelector('input[type=password]')
const form = document.querySelector('form')

const passwordError = document.querySelector('span#password-error')

form.addEventListener('submit' ,(event) =>{
    event.preventDefault()
    validatePasswordField()
    validateEmailField()

    if(form.checkValidity()){
        form.submit()
    }
})

const validateEmailField = () =>{
    const emailError = document.querySelector('span#email-error')
    
    if(emailField.validity.valueMissing){
        emailError.textContent = 'Email Field is required'
        emailError.classList.remove('hidden')
    }
    if(emailField.validity.typeMistmatch){
        emailError.textContent = 'Invalid Email'
        emailError.classList.remove('hidden')
    }
}

const validatePasswordField = () =>{
    if(passwordField.validity.valueMissing){
        passwordError.textContent = 'Password Field is required'
        passwordError.classList.remove('hidden')
    } 
}