import { ModelSchema, Model } from "./model";

const userModel = new ModelSchema({
    profileId: String,
    name: String,
    last_name: String,
    first_name: String,
    middle_name: String,
    pictureUrl: String,

})

export const User = new Model('User', userModel) 