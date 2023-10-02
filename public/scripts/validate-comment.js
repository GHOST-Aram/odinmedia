const form = document.querySelector('form#comment-form')
const textArea = document.querySelector('form#comment-form textarea')
const submitButton = document.querySelector('form#comment-form button[type=submit]')

//Disable button if textarea is empty
window.addEventListener('load', () => {
    if(textArea.validity.valueMissing){
        submitButton.setAttribute('disabled', 'true')
        submitButton.classList.add('opacity-75')
    }
})

textArea.addEventListener('input', () =>{
    if(textArea.validity.valueMissing){
        submitButton.setAttribute('disabled', 'true')
        submitButton.classList.add('opacity-75')
    } else {
        submitButton.removeAttribute('disabled')
        submitButton.classList.remove('opacity-75')
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    textArea.value = textArea.value.trim()

    if(!textArea.validity.valueMissing){
        form.submit()
    }
})
