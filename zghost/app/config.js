import express from 'express'
import morgan from 'morgan';
import * as auth from './auth.js'
import { connectDB } from '../utils/server.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import 'dotenv/config.js'
import cors from 'cors'
import { app } from './init.js';
const config = () =>{
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



}

export { config }
