import express from 'express'
import morgan from 'morgan';
import * as auth from './auth.js'
import mongoose from 'mongoose';
import { connectDB } from '../utils/server.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';

import 'dotenv/config.js'

const config = (app) =>{
    const port = process.env.PORT
    const mongoUrl = process.env.MONGODB_URI
    
    
    mongoose.connect(process.env.MONGODB_URI)
    .then(result => console.log("Connected to DB"))
    .catch((error =>console.log("Some thing went wrong: ", error.message)))
    
    //Server configs
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.set('views','views');
    app.set('view engine', 'jade');
    app.use(express.static('public'));

    auth.useFacebookStrategy()
    //Sessions setup
    app.use(session({ 
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    }))
    app.use(auth.initialize())
    app.use(auth.authSession())
    auth.serializeUser()
    auth.deserializeUser()


}

export { config }
