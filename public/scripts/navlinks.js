
const locationHref = window.location.href

window.addEventListener('load', () => {
    // wide screens 
    try {
        const sidebarNavLinkTextSpans = document.querySelectorAll('aside#sidebar nav button span')
        const currentUserProfileButton = document.querySelector('aside#sidebar .profile button')
        const currentUserId = currentUserProfileButton.getAttribute('data-set')
        
        sidebarNavLinkTextSpans.forEach(span =>{ 
            if(new RegExp(span.textContent.toLocaleLowerCase())
                .test(locationHref)){
                span.parentElement.classList.add('bg-blue-500', 'text-white')
            }
        })
    
        if(locationHref.includes(`/profiles/${currentUserId}`)){
            currentUserProfileButton.classList.add('bg-blue-500', 'text-white')
        }
    } catch (error) {}
    
    //Medium screens
    try {
        const mediumScreenNavbarSpans = document.querySelectorAll('header nav button span')
        const profilePicBtn = document.querySelector('button.profile')
        const currentUserId = profilePicBtn.getAttribute('data-set')

        mediumScreenNavbarSpans.forEach(span =>{ 
            if(new RegExp(span.textContent.toLocaleLowerCase())
            .test(locationHref)){
                span.parentElement.classList.remove('text-slate-600')
                span.parentElement.classList.add('text-blue-500', 'bg-white')
            }
        })

        if(locationHref.includes(`/profiles/${currentUserId}`)){
            profilePicBtn.classList.add('bg-white')
        }
        
    } catch (error) {}

    //Small  Screens
    try {
        const smallScreenNavLinkSpans = document.querySelectorAll('aside.small-screen nav button span') 
        const profilePicBtn = document.querySelector('aside.small-screen button.profile')
        const currentUserId = profilePicBtn.getAttribute('data-set')

        smallScreenNavLinkSpans.forEach(span =>{ 
            if(new RegExp(span.textContent.toLocaleLowerCase())
            .test(locationHref)){
                span.parentElement.classList.remove('text-slate-600')
                span.parentElement.classList.add('text-blue-500', 'bg-white')
            }
        })
        if(locationHref.includes(`/profiles/${currentUserId}`)){
            profilePicBtn.classList.add('bg-white')
        }

    } catch (error) {
        
    }
})
