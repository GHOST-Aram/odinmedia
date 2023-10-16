import { 
    logger, 
    json, 
    urlencoded,
    cors, 
    static_dir 
} from './init.js';
import { connectDB } from '../utils/server.js';
import 'dotenv/config.js'
import { app } from './auth.js';
    const mongoUrl = process.env.MONGODB_URI
    
    //Connect DB
    connectDB(mongoUrl)
    
    //Server configs
    app.use(cors())
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(logger('dev'));
    app.set('views','views');
    app.set('view engine', 'ejs');
    app.use(static_dir('public'));




export { app }
