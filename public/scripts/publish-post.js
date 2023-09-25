const publishBtn = document.querySelector('section#posts .new-post button')
const textArea = document.querySelector('section#posts .new-post textarea')

publishBtn.addEventListener('click', async() =>{
    console.log('Elons')
    console.log('Publising post', textArea.value)
    if(textArea.value.trim() !== ''){
        publishBtn.textContent = 'Publishing ...'
        disableButton(publishBtn)

        const postData = {
            text: textArea.value,
            likes: 0,
            shared: 0,
            comments: 0
        }

        try {
            const response = await fetch('localhost:8000/content/post', {
                method: 'POST',
                body: JSON.stringify(postData),
                mode: 'cors',
            })

            response.post? window.location.reload() : console.error(response.error)

        } catch (error) {
            console.error('Unexpected error occured: ', error)
        } finally{
            publishBtn.textContent = 'Publish Post'
            publishBtn.enable()
        }
        
    }
})

const disableButton = (button) =>{
    button.setAttribute('disabled', 'true')
    button.classList.add('opacity-50')
}


