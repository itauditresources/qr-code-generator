/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import app from "./index";
import User from "./model/user/User";
import VCard from "./model/vcard/VCard";
import { port } from "./config/config";
import { Logging } from "./utils/Logging";

declare module "express-session" {
    interface SessionData {
        token: string;
        role: string;
    }
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            id: string;
        }
    }
}

// IIFE
// Connect to the database and create the collections
// only run this function once to prevent unnecessary network traffic
// void (async () => {
//     await User;
//     await VCard;
// })();

const server = app.listen(port, () => {
    Logging.info(
        `Server is listening on https://127.0.0.1:/${port}/`,
        "SERVER"
    );
});

// Shutting down the server and exit the nodejs process after an unhandled exception occurs
// Express recommends to exit the application on unhandled errors / exceptions to prevent
// unintentional behavior
process.on("uncaughtException", (err: any) => {
    Logging.error(err);
    server.close(() => {
        process.exit(1);
    });
});

// Shutting down the server and exit the nodejs process after an unhandled rejection occurs
process.on("unhandledRejection", (err: any) => {
    Logging.error(err);
    server.close(() => {
        process.exit(1);
    });
});
