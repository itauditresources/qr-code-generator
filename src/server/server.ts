/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import app from "./index";
import mongodb from "./database/mongodb";
import { port } from "./config/config";
import { Logging } from "./utils/Logging";

void (async () => {
    await mongodb;
})();

const server = app.listen(port, () => {
    Logging.info(
        `[server]: Server is listening on https://127.0.0.1:/${port}/`
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
