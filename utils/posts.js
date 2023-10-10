import { formatAuthor } from "./format-author.js"
import { formatDate } from "./date-formatter.js"
import { Post } from "../models/post.js"

export const filterPosts = (posts, currentUser)  =>{
    const currentUsersFriends = currentUser.friends.map(
        friend => friend.toString()
    )
    const isFriend = userId => currentUsersFriends.includes(
        userId.toString()
    )
    return posts.filter(post => (
        post.author._id.toString() === currentUser.id || 
        currentUsersFriends.includes(post.author._id.toString()) ||
        post.reposts.some(userId => isFriend(userId))
    ))
} 

export const formatPosts = (posts, currentUser) => {
    return posts.map(post =>({
        id: post._id.toString(),
        content: post.post_content,
        author: formatAuthor(post.author),
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
        author: formatAuthor(post.author),
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
        author: formatAuthor(comment.author),
        text: comment.text,
        createdAt: formatDate(comment.createdAt)
    })).reverse()
}

export const findPost = async(id) =>{
    return await Post.findById(id).populate({
        path: 'author',
        select: 'first_name last_name pictureUrl _id'
    }).populate({
        path: 'comments',
        populate: {
            path: 'author',
            select: 'first_name last_name pictureUrl _id'
        }
    })
}