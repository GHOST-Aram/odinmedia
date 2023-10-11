import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { compareSync as comparePasswords, hash } from 'bcrypt'
import FacebookStrategy from 'passport-facebook'
import morgan from 'morgan';
import cors from 'cors'
import { ObjectId } from "mongodb"


const app = express()
const Authenticator = passport
const json = express.json
const logger = morgan
const Router = express.Router
const static_dir = express.static
const urlencoded = express.urlencoded

export {
    app, 
    Authenticator, 
    comparePasswords,
    cors,
    FacebookStrategy,
    hash,
    json, 
    LocalStrategy, 
    logger,
    ObjectId, 
    Router, 
    static_dir,
    urlencoded, 
}