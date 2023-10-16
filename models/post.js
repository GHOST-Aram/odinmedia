import { Model, ModelSchema } from "../zghost/db/model.js";

const postSchema = new ModelSchema({
    post_content: String,
    likes: [
        {
            type: ModelSchema.Types.ObjectId,
            ref: 'User'
        }
    ],
    reposts:[
        {
            type: ModelSchema.Types.ObjectId,
            ref: 'User',
        }
    ],
    comments: [
        {
            type: ModelSchema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    media_url: String,
    author: {
        type: ModelSchema.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}) 


export const Post = new Model('Post', postSchema)