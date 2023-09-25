const smallScreenPublishBtn = document.querySelector('section#posts .new-post button')
const wideScreenPublishBtn = document.querySelector('aside .new-post button')

//Medium screen, small screens and screen readers
smallScreenPublishBtn.addEventListener('click', async(event) =>{
    const textArea = document.querySelector('section#posts .new-post textarea')
    if(textArea.value.trim() !== ''){
        changeButtonText(event.target, 'Publishing ...')
        disableButton(event.target)

        const postData = {
            text: textArea.value,
            likes: 0,
            shared: 0,
            comments: 0
        }

        try {
            const response = await sendNewPOST(
                'http://localhost:8000/content/post',
                postData
            )
            console.log(await response.json())
        } catch (error) {
            console.error('Unexpected error occured: ', error)
        } finally{
            changeButtonText(event.target, 'Publish Post')
            enableButton(event.target)
        }
        
    }
})

//large and extra large screens only
wideScreenPublishBtn.addEventListener('click', async(event) =>{
    const textArea = document.querySelector('aside .new-post textarea')
    if(textArea.value.trim() !== ''){
        changeButtonText(event.target, 'Publishing ...')
        disableButton(event.target)

        const postData = {
            text: textArea.value,
            likes: 0,
            shared: 0,
            comments: 0
        }

        try {
            const response = await sendNewPOST(
                'http://localhost:8000/content/post',
                postData
            )
            console.log(await response.json())
        } catch (error) {
            console.error('Unexpected error occured: ', error)
        } finally{
            changeButtonText(event.target, 'Publish Post')
            enableButton(event.target)
        }
        
    }
})

const disableButton = (btn) =>{
    btn.setAttribute('disabled', 'true')
    btn.classList.add('opacity-50')
}

const enableButton = (btn) =>{
    btn.removeAttribute('disabled')
    btn.classList.remove('opacity-50')
}

const changeButtonText = (btn, text) =>{
    btn.textContent = text
}

const sendNewPOST = async(url, data) =>{
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
            "Content-type": "application/json"
        }
    })
    return response
}
