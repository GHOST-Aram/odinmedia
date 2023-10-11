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

export const formatPosts = (posts, currentUser) => {
    return posts.map(post =>({
        id: post._id.toString(),
        content: post.post_content,
        author: formatUser(post.author),
        comments: post.comments.length,
        likes: post.likes.length,
        user_liked: post.likes.includes(currentUser._id),
        reposts: post.reposts.length,
        user_reposted: post.reposts.includes(currentUser._id),
        createdAt: formatDate(post.createdAt)
    })).reverse()
} 

export const formatPost = (post, currentUserId) =>{
    return ({
        id: post._id.toString(),
        content: post.post_content,
        author: formatUser(post.author),
        comments: formatComments(post.comments),
        likes: post.likes.length,
        user_liked: post.likes.includes(currentUserId),
        reposts: post.reposts.length,
        user_reposted: post.reposts.includes(currentUserId),
        createdAt: formatDate(post.createdAt)
    })
} 

export const formatComments = (comments) => {
    return comments.map(comment => ({
        author: formatUser(comment.author),
        text: comment.text,
        createdAt: formatDate(comment.createdAt)
    })).reverse()
}
