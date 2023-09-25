import { Model, ModelSchema } from "../zghost/db/model.js";

const postSchema = new ModelSchema({
    textContent: String,
    likes: Number,
    shared: Number,
    comments: Number,
    author: {
        type: ModelSchema.ObjectId,
        ref: 'User'
    },
    createAt: Date.now()
}) 


export const Post = new Model('Post', postSchema)