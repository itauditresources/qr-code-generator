import session from "express-session";
import connectRedis from "connect-redis";

import redisClient from "../database/redis";
import { cookieOptions, sanitizedConfig } from "../config/config";

const RedisStore = connectRedis(session);

export default session({
    secret: sanitizedConfig.SESSION_SECRET,
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    name: sanitizedConfig.APP_NAME,
    cookie: cookieOptions,
});
