import session from "express-session";
import connectRedis from "connect-redis";

import { redisClient } from "../database/redis";
import { cookieOptions } from "../config/config";

const RedisStore = connectRedis(session);

export default session({
    secret: "my new secret",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    name: "session",
    cookie: cookieOptions,
});
