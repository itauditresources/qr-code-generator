import mongoose from "mongoose";

import app from "./index";
import { config } from "./config/config";
import { Logging } from "./utils/Logging";

mongoose
    .connect(config.mongo.uri, config.mongo.options)
    .then((_connection) => Logging.info("Database is connected"))
    .catch((err) => Logging.error(err));

const server = app.listen(config.server.port, () => {
    Logging.info(
        `[server]: Server is listening on https://127.0.0.1:/${config.server.port}/`
    );
});

// Shutting down the server and exit the nodejs process after an unhandled exception occurs
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
