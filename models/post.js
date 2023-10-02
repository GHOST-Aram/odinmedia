import { Model, ModelSchema } from "../zghost/db/model.js";

const postSchema = new ModelSchema({
    textContent: String,
    likes: {
        type: [ModelSchema.Types.ObjectId],
        ref: 'User'
    },
    reposts:{
        type: [ModelSchema.Types.ObjectId],
        ref: 'Post'
    },
    comments: {
        type: [Comment],
    },
    author: {
        type: ModelSchema.ObjectId,
        ref: 'User'
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
}) 


export const Post = new Model('Post', postSchema)