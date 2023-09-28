const likeBtns = document.querySelectorAll('button.like-btn')
likeBtns.forEach(btn =>{
    btn.addEventListener('click', (e) =>{
        btn.classList.toggle('text-red-500')
    })
})