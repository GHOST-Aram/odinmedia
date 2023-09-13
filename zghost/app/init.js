import express from 'express'
import { hash } from "bcrypt"

const app = express()
const Router = express.Router

export {app, Router, hash}