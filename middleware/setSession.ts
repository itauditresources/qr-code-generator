import RedisStore from "connect-redis";
import session from "express-session";

import redisClient from "../database/redis";
import { cookieOptions, sanitizedConfig } from "../config/config";

/*
 * session initialization with redis as storage for session data
 *
 * feed environment data from a file to prevent disclosure
 */
export default session({
    secret: sanitizedConfig.SESSION_SECRET,
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    name: sanitizedConfig.APP_NAME,
    cookie: cookieOptions,
});
