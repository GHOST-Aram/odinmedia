import express from 'express'
import morgan from 'morgan';
import { connectDB } from '../utils/server.js';
import 'dotenv/config.js'
import cors from 'cors'
import { app } from './auth.js';
    const mongoUrl = process.env.MONGODB_URI
    
    //Connect DB
    connectDB(mongoUrl)
    
    //Server configs
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.set('views','views');
    app.set('view engine', 'ejs');
    app.use(express.static('public'));




export { app }
