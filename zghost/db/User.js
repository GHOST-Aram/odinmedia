import { ModelSchema, Model } from "./model.js";

const userSchema = new ModelSchema({
    profileId: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    first_name: {
        type: String,
        trim: true,
    },
    middle_name: {
        type: String,
        trim: true,
    },
    pictureUrl: {
        type: String,
        trim: true,
    },
    bannerUrl:{
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
        default: undefined
    },
    region:  {
        type: String,
        trim: true,
        default: undefined
    },
    email:  {
        type: String,
        trim: true,
        default: undefined
    },
    banner_file: {
        data: Buffer,
        contentType: String,
    },
    picture_file: {
        data: Buffer,
        contentType: String,
    },
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