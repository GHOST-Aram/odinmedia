import express from 'express'
import morgan from 'morgan';
import 'dotenv/config.js'
import { Authentication } from './auth.js';
import { connectDB } from '../utils/server.js';

const config = (app) =>{
    const port = process.env.PORT
    const auth = new Authentication(app)
    const mongoUrl = process.env.MONGODB_URI
    
    
    // db config
    connectDB(mongoUrl)
    
    //Server configs
    app.listen(port, () =>{
        console.log('Listening at port', port)
    })
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));

    // Authentication config
    auth.useFacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackUrl: `http://localhost:${port}/auth/facebook`
    })
    auth.setUpSession({
        secret: process.env.SESSION_SECRET,
        mongoUrl: mongoUrl,
        maxAge: 3600 * 24 * 1000
    })

    auth.initialize()
    auth.authenticateSession()
    auth.serializeUser()
    auth.deserializeUser()
}

export { config }
