import { Model, ModelSchema } from "../zghost/db/model.js";

const commentSchema = new ModelSchema({
    author: {
        type: ModelSchema.ObjectId,
        ref: 'Author',
        required: true
    },    
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Comment = new Model('Comment', commentSchema)