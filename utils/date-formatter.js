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