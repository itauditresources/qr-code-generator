/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createClient } from "redis";
import session from "express-session";
import connectRedis from "connect-redis";

import { redisConfig } from "../config/config";
import { Logging } from "../utils/Logging";

export const redisClient = createClient(redisConfig);

redisClient.on("error", (err: any) => Logging.error(err));

export const RedisStore = connectRedis(session);
