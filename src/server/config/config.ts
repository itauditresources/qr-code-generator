import connectRedis from "connect-redis";
import session from "express-session";
import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

// MONGODB driver settings

const MONGODB_USERNAME = process.env.MONGODB_USERNAME as string;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD as string;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME as string;
const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.dvgqk1v.mongodb.net/${MONGODB_DB_NAME}`;

const PORT =
    process.env.NODE_ENV === "production"
        ? (process.env.PORT as unknown as number)
        : 3001;

export const config = {
    mongo: {
        uri: MONGODB_URI,
        // Since Mongoose v.6 the url parser and unified index are used by default
        options: {},
    },
    server: {
        port: PORT,
    },
};

// REDIS session storage settings

//const REDIS_HOST = process.env.REDIS_HOST as string;
//const REDIS_PORT = process.env.REDIS_PORT as unknown as number;

// RATE_LIMITER settings

export const options = {
    points: 6, // Total points available per ID
    duration: 1, // Seconds between requests
};
