const commentBtns = getAllElements('button.comment-btn')

commentBtns.forEach(btn =>{
    
    btn.addEventListener('click', async(e) =>{
        const post = getParentPost(btn)        
        setId(post, 'current-post')  
        const replyBtn = getElement('#current-post .comment-form button')

        fetchComments().then(result =>{
            clearCommentsContainer()
            result.comments.forEach(comment =>{
                renderComment(comment)
            })
        })

        toggleCommentForm()
        
        replyBtn.addEventListener('click', async(e) =>{
            const textArea = document.querySelector('#current-post textarea')
            
            if(textArea.value.trim() !== ''){
                const response = await postComment({text: textArea.value})
                console.log(response.comment)
                renderComment(response.comment)
                hideCommentForm()
            }
        })
    })
})


function alertUser(){
    const closeAlertDialogButton = document.querySelector('button#confirm-share')
    const shareAlertDialogContainer = document.querySelector('div.confirm-share')
    
    shareAlertDialogContainer.classList.toggle('hidden')
    closeAlertDialogButton.focus()

    closeAlertDialogButton.addEventListener('click', () =>{
        shareAlertDialogContainer.classList.add('hidden')
    })
}

const clearCommentsContainer = () =>{
    const replies = document.querySelector('#current-post .comments') 
    replies.innerHTML = ''
}
const createCommentAuthorContainer = ({
    authorName, authorImageSrc
}) =>{
    const commentAuthorImage = document.createElement('img')
    commentAuthorImage.src = authorImageSrc
    commentAuthorImage.className = 'h-8 w-8 rounded-full'
    
    const commentAuthorName = document.createElement('h1')
    commentAuthorName.textContent = authorName
    
    
    const commentAuthorContainer = document.createElement('div')
    commentAuthorContainer.className = 'flex flex-row gap-2 items-center'
    commentAuthorContainer.appendChild(commentAuthorImage)
    commentAuthorContainer.appendChild(commentAuthorName)

    return commentAuthorContainer
}

const createCommentContainer = () =>{
    const commentContainer=document.createElement('div')
    commentContainer.className = 'p-2 rounded-sm bg-slate-300'

    return commentContainer
}

const createTextNode = (text) =>{
    const commentText = document.createElement('p')
    commentText.textContent = text
    commentText.className = 'font-light text-md text-gray-900'
    
    return commentText
}
const fetchComments = async() =>{
    const response = await fetch('http://localhost:8000/content/comments')
    const comments = await response.json()
    
    return comments
}
const getElement = (params) =>{
    return document.querySelector(params)
}

function getAllElements(params) {
    return document.querySelectorAll(params)
}
const getParentPost = (element) =>{
    const post = element.parentElement.parentElement

    return post
}
const hideCommentForm = () =>{
    const commentForm = document.querySelector('#current-post .comment-form')
    const textArea = document.querySelector('#current-post textarea')

    textArea.value = ''
    commentForm.classList.add('hidden')
}

const renderComment = ({ author, text }) =>{
    const commentText = createTextNode(text)
    const commentAuthorContainer = createCommentAuthorContainer({
        authorName: author.name,
        authorImageSrc: author.pictureUrl
    })
    
    const commentContainer = createCommentContainer()
    commentContainer.appendChild(commentAuthorContainer)
    commentContainer.appendChild(commentText)
    
    renderCommentContainer(commentContainer)
}

const renderCommentContainer = (commentContainer) =>{
    const replies = document.querySelector('#current-post .comments') 
    replies.prepend(commentContainer)
}
const setId = (post, id) =>{
    post.setAttribute('id', id)

}

const toggleCommentForm = () =>{
    const commentForm = document.querySelector('#current-post .comment-form')
    const textArea = document.querySelector('#current-post textarea')
    commentForm.classList.toggle('hidden')
    if(!commentForm.classList.contains('hidden')){
        textArea.focus()
    }
}

const postComment = async(data) =>{
    const response = await fetch(
        'http://localhost:8000/content/comment', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers:{
                'Content-type': 'application/json'
            }
        }
    )
    const comment = await response.json()

    return comment
}