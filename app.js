import { accountsRouter } from './routes/accounts.js';
import { app } from './zghost/app/init.js';
import { config } from './zghost/app/config.js';
import { internalServerError, notFoundError } from './zghost/utils/errors.js';


config(app)

app.use(accountsRouter)

//Error handling
app.use(notFoundError)
app.use(internalServerError)

export {app};
