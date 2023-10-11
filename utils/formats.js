export const formatAuthor = (author) =>{
    return {
        id: author._id.toString(),
        name: `${author.first_name} ${author.last_name}`,
        pictureUrl: author.pictureUrl
    }
}
export const formatDate = (date_string) =>{
    return new Date(date_string).toLocaleString(
        'en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: 'numeric',
            second: 'numeric',
        }
    ) 
}

export const formatUser = (user) =>{
    return {
        id: user._id.toString(),
        name: `${user.first_name} ${user.last_name}`,
        pictureUrl: user.pictureUrl
    }
}
