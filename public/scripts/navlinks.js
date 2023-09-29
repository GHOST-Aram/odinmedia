
const locationHref = window.location.href

window.addEventListener('load', () => {
    // wide screens 
    try {
        const sidebarNavLinkTextSpans = document.querySelectorAll('aside#sidebar nav button span')
        const currentUserProfileButton = document.querySelector('aside#sidebar .profile button')
        
        sidebarNavLinkTextSpans.forEach(span =>{ 
            if(new RegExp(span.textContent.toLocaleLowerCase())
                .test(locationHref)){
                span.parentElement.classList.add('bg-blue-500', 'text-white')
            }
        })
    
        if(locationHref.includes('/profiles/me')){
            currentUserProfileButton.classList.add('bg-blue-500', 'text-white')
        }
    } catch (error) {}
    
    //Medium screens
    try {
        const mediumScreenNavbarSpans = document.querySelectorAll('header nav button span')
        const profilePicBtn = document.querySelector('button.profile')

        mediumScreenNavbarSpans.forEach(span =>{ 
            if(new RegExp(span.textContent.toLocaleLowerCase())
            .test(locationHref)){
                span.parentElement.classList.remove('text-slate-600')
                span.parentElement.classList.add('text-blue-500', 'bg-white')
            }
        })

        if(locationHref.includes('/profiles/me')){
            profilePicBtn.classList.add('bg-white')
        }
        
    } catch (error) {}

    //Small  Screens
    try {
        const smallScreenNavLinkSpans = document.querySelectorAll('aside.small-screen nav button span') 
        const profilePicBtn = document.querySelector('aside.small-screen button.profile')

        smallScreenNavLinkSpans.forEach(span =>{ 
            if(new RegExp(span.textContent.toLocaleLowerCase())
            .test(locationHref)){
                span.parentElement.classList.remove('text-slate-600')
                span.parentElement.classList.add('text-blue-500', 'bg-white')
            }
        })
        if(locationHref.includes('/profiles/me')){
            profilePicBtn.classList.add('bg-white')
        }

    } catch (error) {
        
    }
})
