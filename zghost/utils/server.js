import mongoose from "mongoose";

export const connectDB = (dbUri) =>{
    mongoose.connect(dbUri).then(result =>{
        console.log('Success. Connected to DB')
    }).catch(error => {
        console.error('Failed to connect to DB', error.message)
    })
}