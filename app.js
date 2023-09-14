import { app } from './zghost/app/init.js';
import { config } from './zghost/app/config.js';
import {error500, error404} from './zghost/utils/errors.js'
import { app } from './init.js';


config(app)

app.use('/accounts', accountsRouter(db))



app.use(error404)
app.use(error500)

export {app};
