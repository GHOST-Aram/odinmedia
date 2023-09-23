// Get interactionn buttons
const commentBtns = document.querySelectorAll('button.comment-btn')
const likeBtns = document.querySelectorAll('button.like-btn')
const shareBtns = document.querySelectorAll('button.share-btn')
const confirmShareBtn = document.querySelector('button#confirm-share')
const confirmShareContainer = document.querySelector('div.confirm-share')


//Create elements
const textArea = document.createElement('textarea')
const sendBtn = document.createElement('button')
const commentText = document.createElement('p')
const commentAuthorImage = document.createElement('img')
const commentAuthorName = document.createElement('h1')
const commentAuthorContainer = document.createElement('div')
const commentContainer=document.createElement('div')


//Add author name and image nodes
commentAuthorContainer.appendChild(commentAuthorImage)
commentAuthorContainer.appendChild(commentAuthorName)

//Add username and image nodes to comment container node 
commentContainer.appendChild(commentAuthorContainer)
commentContainer.appendChild(commentText)

//Styles
commentAuthorContainer.className = 'flex flex-row gap-2 items-center'
commentAuthorImage.className = 'h-8 w-8 rounded-full'
textArea.className = (
    `w-full font-light p-2 h-32 
    border rounded-sm text-sm text-gray-500`
)
sendBtn.className = ('bg-blue-500 text-white font-md px-4 py-2 rounded-sm')
commentText.className = 'font-light text-md text-gray-500'
commentContainer.className = 'p-2 rounded-sm bg-slate-300'

//Add attributes and values
textArea.setAttribute('placeholder', 'What do you have in mind?')
sendBtn.textContent = 'SEND'


commentBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        const post = btn.parentElement.parentElement
        
        post.setAttribute('id', 'current-post')

        const currentCommentSection = document.querySelector('#current-post .comment-section')
        console.log(currentCommentSection)

        currentCommentSection.appendChild(textArea)
        currentCommentSection.appendChild(sendBtn)
        textArea.focus()

        currentCommentSection.addEventListener('blur', (e) =>{
            currentCommentSection.removeChild(textArea)
            currentCommentSection.removeChild(sendBtn)
        })

        sendBtn.addEventListener('click', (e) =>{

            commentText.textContent = textArea.value
            commentAuthorName.textContent = 'Erick Juoles'
            commentAuthorImage.src = 'https://randomuser.me/api/portraits/men/83.jpg'

            currentCommentSection.appendChild(commentContainer)

            currentCommentSection.removeChild(textArea)
            currentCommentSection.removeChild(sendBtn)
        })


    })
})

likeBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        btn.classList.toggle('text-red-500')
    })
})

shareBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        confirmShareContainer.classList.toggle('hidden')
        confirmShareBtn.focus()
    })
})

confirmShareBtn.addEventListener('click', () =>{
    confirmShareContainer.classList.add('hidden')
})


