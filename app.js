import { app } from './zghost/app/init.js';
import { config } from './zghost/app/config.js';
import {error500, error404} from './zghost/utils/errors.js'
import accountsRouter from './accounts/routes/routes.js';
import { db } from './zghost/db/database.js';

config()

app.use('/accounts', accountsRouter(db))

app.use(error404)
app.use(error500)

export {app};
