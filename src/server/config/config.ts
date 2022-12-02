import dotenv from "dotenv";
import { CookieOptions } from "express-session";
import { RedisClientOptions } from "redis";

dotenv.config();

// MONGODB driver settings

const MONGODB_USERNAME = process.env.MONGODB_USERNAME as string;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD as string;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME as string;
const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.dvgqk1v.mongodb.net/${MONGODB_DB_NAME}`;

export const port =
    process.env.NODE_ENV === "production"
        ? (process.env.PORT as unknown as number)
        : 3001;

export const mongodbConfig = {
    mongo: {
        uri: MONGODB_URI,
        // Since Mongoose v.6 the url parser and unified index are used by default
        options: {},
    },
};

// REDIS session storage settings

export const REDIS_HOST = process.env.REDIS_HOST as string;
export const REDIS_PORT = process.env.REDIS_PORT as unknown as number;

export const redisConfig: RedisClientOptions = {
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
    legacyMode: true,
};

// RATE_LIMITER settings

export const rateLimiterOptions = {
    points: 6, // Total points available per ID
    duration: 1, // Seconds between requests
};

export const cookieOptions: CookieOptions = {
    // convert days into milliseconds
    expires: new Date(
        (Date.now() + Number(process.env.COOKIE_EXPIRES)) * 24 * 60 * 60 * 1000
    ),
    // prevent client JS access to cookie data
    httpOnly: true,
    // TLS protection
    secure: process.env.NODE_ENV === "production" ? true : false,
};
