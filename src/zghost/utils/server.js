import mongoose from "mongoose";

export const connectDB = (dbUri) =>{
    mongoose.connect(dbUri)
    .then(result => console.log("Connected to DB"))
    .catch((error =>console.log("Some thing went wrong: ", error.message)))
}