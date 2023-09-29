const sidebarNavLinkButtons = document.querySelectorAll('aside#sidebar nav button')
const sidebarNavLinkTextSpans = document.querySelectorAll('aside#sidebar nav button span')
const currentUserProfileButton = document.querySelector('aside#sidebar .profile button')

const locationHref = window.location.href

window.addEventListener('load', () => {
    sidebarNavLinkTextSpans.forEach(span =>{ 
        if(new RegExp(span.textContent.toLocaleLowerCase())
            .test(locationHref)){
            span.parentElement.classList.add('bg-blue-500', 'text-white')
        }
    })

    if(locationHref.includes('/profiles/me')){
        currentUserProfileButton.classList.add('bg-blue-500', 'text-white')
    }
})