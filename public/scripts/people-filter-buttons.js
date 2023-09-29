const wideScreenFilterBtns = document.querySelectorAll('.wide-screen button')
const smallScreenFilterBtns = document.querySelectorAll('.small-screen button')
const locationUrl = window.location.href

window.addEventListener('load', () =>{
    wideScreenFilterBtns.forEach(btn => {
        const text = btn.textContent.toLocaleLowerCase().trim().split(' ')[1]
        if(locationUrl.endsWith(text)){
            btn.classList.add('bg-blue-500', 'text-white')
        }
    })
    smallScreenFilterBtns.forEach(btn => {
        const text = btn.textContent.toLocaleLowerCase().trim().split(' ')[1]
        if(locationUrl.endsWith(text)){
            btn.classList.remove('text-white')
            btn.classList.add('text-blue-500', 'bg-white')
        }
    })
})