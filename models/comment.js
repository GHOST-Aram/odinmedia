import { Model, ModelSchema } from "../zghost/db/model.js";

const commentSchema = new ModelSchema({
    author: ModelSchema.ObjectId,    
    text: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Comment = new Model('Comment', commentSchema)