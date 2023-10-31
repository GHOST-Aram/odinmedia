// small and medium screens 
const form = document.querySelector('.small-screen form')
const textArea1 = document.querySelector('.small-screen form textarea')
const submitButton1 = document.querySelector('.small-screen form button[type=submit]')

//Disable button if textarea is empty
window.addEventListener('load', () => {
    if(textArea1.validity.valueMissing){
        submitButton1.setAttribute('disabled', 'true')
        submitButton1.classList.add('opacity-75')
    }
})

textArea1.addEventListener('input', () =>{
    if(textArea1.validity.valueMissing){
        submitButton1.setAttribute('disabled', 'true')
        submitButton1.classList.add('opacity-75')
    } else {
        submitButton1.removeAttribute('disabled')
        submitButton1.classList.remove('opacity-75')
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    textArea1.value = textArea1.value.trim()

    if(!textArea1.validity.valueMissing){
        form.submit()
    }
})

//Wide screen form
const form2 = document.querySelector('.wide-screen form')
const textArea2 = document.querySelector('.wide-screen form textarea')
const submitButton2 = document.querySelector(
    '.wide-screen form button[type=submit]'
)
//Disable button if textarea is empty
window.addEventListener('load', () => {
    if(textArea2.validity.valueMissing){
        submitButton2.setAttribute('disabled', 'true')
        submitButton2.classList.add('opacity-75')
    }
})

textArea2.addEventListener('input', () =>{
    if(textArea2.validity.valueMissing){
        submitButton2.setAttribute('disabled', 'true')
        submitButton2.classList.add('opacity-75')
    } else {
        submitButton2.removeAttribute('disabled')
        submitButton2.classList.remove('opacity-75')
    }
})

form2.addEventListener('submit', (e) => {
    e.preventDefault()
    textArea2.value = textArea2.value.trim()

    if(!textArea2.validity.valueMissing){
        form2.submit()
    }
})
