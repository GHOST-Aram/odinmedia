export const filterPosts = (posts, currentUser)  =>{
    const currentUsersFriends = currentUser.friends.map(
        friendId => friendId.toString()
    )
    const isFriendId = userId => currentUsersFriends.includes(
        userId.toString()
    )
    return posts.filter(post => (
        post.author._id.toString() === currentUser.id || 
        currentUsersFriends.includes(post.author._id.toString()) ||
        post.reposts.some(userId => isFriendId(userId))
    ))
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

export const formatProfile = (user) =>{
    return ({
        id: user._id.toString(),
        name: user.name,
        pictureUrl: user.pictureUrl,
        bannerUrl: user.bannerUrl,
        city: user.city,
        region: user.region,
        friends: user.friends.length,
        joined: user.createdAt ? formatDate(user.createdAt): 'Unknown'            
    })
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
        ...formatPartialPostProperties(post, currentUser._id),
        comments: post.comments.length,
        friend_reposters: getFriendReposters(
            currentUser.friends, post.reposts
        ),
        user_reposted: isUserReposter(post.reposts, currentUser),
    })).reverse()
} 

const getFriendReposters = (allfriendsObjectIds, reposters) =>{
    return reposters.filter(
        reposter => allfriendsObjectIds.includes(reposter._id) 
    ).map(reposter => `${reposter.first_name} ${reposter.last_name}`)
} 

const isUserReposter = (reposts, currentUser) =>{
    return  reposts.some(
        repost => repost._id.toString() === currentUser._id.toString()
    )
}

export const formatPost = (post, currentUserId) =>{
    return ({
        ...formatPartialPostProperties(post, currentUserId),
        comments: formatComments(post.comments),
    })
} 

const formatPartialPostProperties = (post, currentUserId) =>({
    id: post._id.toString(),
    content: post.post_content,
    media_url: post.media_url || null,
    author: formatUser(post.author),
    likes: post.likes.length,
    user_liked: post.likes.includes(currentUserId),
    reposts: post.reposts.length,
    user_reposted: post.reposts.includes(currentUserId),
    createdAt: formatDate(post.createdAt)

})

export const formatComments = (comments) => {
    return comments.map(comment => ({
        author: formatUser(comment.author),
        text: comment.text,
        createdAt: formatDate(comment.createdAt)
    })).reverse()
}

export const calculateMutualFriends = (
    usersFriends, currentUsersFriends) =>{
        const allFriends = [...usersFriends, ...currentUsersFriends]
        const mergedList = removeRedundancies(allFriends)

        return allFriends.length - mergedList.length
}

const removeRedundancies = (mergedList) =>{
    return [new Set(mergedList)]
}
export const removeFriends = (users, currentUserFriends) => {
    return users.filter(user => !currentUserFriends.includes(user._id))
}

export const removeSentRequests = (users, sentRequests) =>{
    return users.filter(user => !sentRequests.includes(user._id))
}
export const removeReceivedRequests = (users, receivedRequests) =>{
    return users.filter(user => !receivedRequests.includes(user._id))
}