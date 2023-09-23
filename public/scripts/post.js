
// Get interactionn buttons
const commentBtns = document.querySelectorAll('button.comment-btn')
const likeBtns = document.querySelectorAll('button.like-btn')
const shareBtns = document.querySelectorAll('button.share-btn')
const closeAlertDialogButton = document.querySelector('button#confirm-share')
const shareAlertDialogContainer = document.querySelector('div.confirm-share')




commentBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        //Find  current post node
        const post = btn.parentElement.parentElement
        
        //Mark as current post
        post.setAttribute('id', 'current-post')
        
        //Get comment node and elements for current post
        const currentCommentSection = document.querySelector('#current-post .comment-section')
        const commentForm = document.querySelector('#current-post .comment-form')
        const textArea = document.querySelector('#current-post textarea')
        const replyBtn = document.querySelector('#current-post .comment-form button')
    
        // diaplay comment form
        commentForm.classList.toggle('hidden')
        textArea.focus()
        
        commentForm.addEventListener('blur', (e) =>{
            commentForm.classList.toggle('hidden')
        })
    
        replyBtn.addEventListener('click', (e) =>{
    
            commentText.textContent = textArea.value
            commentAuthorName.textContent = 'Erick Juoles'
            commentAuthorImage.src = 'https://randomuser.me/api/portraits/men/83.jpg'
    
            currentCommentSection.appendChild(commentContainer)
            textArea.value = ''
            commentForm.classList.toggle('hidden')
        })

        //New comment elements
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
        
        commentText.className = 'font-light text-md text-gray-900'
        commentContainer.className = 'p-2 rounded-sm bg-slate-300'
        
        //Add attributes and values


    })
})

likeBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        btn.classList.toggle('text-red-500')
    })
})

shareBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        shareAlertDialogContainer.classList.toggle('hidden')
        closeAlertDialogButton.focus()
    })
})

closeAlertDialogButton.addEventListener('click', () =>{
    shareAlertDialogContainer.classList.add('hidden')
})


