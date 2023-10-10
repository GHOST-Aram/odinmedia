import { ModelSchema, Model } from "./model.js";

const userSchema = new ModelSchema({
    profileId: String,
    last_name: String,
    first_name: String,
    middle_name: String,
    pictureUrl: String,
    bannerUrl: String,
    city: String,
    region: String,
    email: String,
    banner_file: String,
    picture_file: String,
    password: String,
    friends: {
        type: [ModelSchema.Types.ObjectId],
        ref: 'User'
    },
    requests_sent:{
        type: [ModelSchema.Types.ObjectId],
        ref: 'User'
    },
    requests_received: {
        type: [ModelSchema.Types.ObjectId],
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

userSchema.virtual('name').get(function(){
    return `${this.first_name} ${this.last_name}`
})

export const User = new Model('User', userSchema) 