import { accountsRouter } from './routes/accounts.js';
import { app } from './zghost/app/init.js';
import { config } from './zghost/app/config.js';
import { internalServerError, notFoundError } from './zghost/utils/errors.js';
import { indexRouter } from "./routes/index.js";

config()
app.use(indexRouter)
app.use(accountsRouter)

//Error handling
app.use(notFoundError)
app.use(internalServerError)

export {app};
