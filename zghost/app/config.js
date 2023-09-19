import express from 'express'
import morgan from 'morgan';
import * as auth from './auth.js'
import { connectDB } from '../utils/server.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import 'dotenv/config.js'
import cors from 'cors'
const config = (app) =>{
    const mongoUrl = process.env.MONGODB_URI
    
    //Connect DB
    connectDB(mongoUrl)
    
    //Server configs
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.set('views','views');
    app.set('view engine', 'ejs');
    app.use(express.static('public'));

    auth.useFacebookStrategy()
    //Sessions setup
    app.use(session({ 
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: mongoUrl
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            secure: true
        }
    }))
    app.use(auth.authenticateSession())
    app.use(auth.initialize())
    auth.serializeUser()
    auth.deserializeUser()


}

export { config }
