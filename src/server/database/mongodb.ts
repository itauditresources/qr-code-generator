/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import mongoose from "mongoose";

import { Logging } from "../utils/Logging";
import { mongodbConfig } from "../config/config";

export default mongoose
    .connect(mongodbConfig.mongo.uri, mongodbConfig.mongo.options)
    .then((connection) =>
        Logging.info(
            `Database connected on port: ${connection.connection.port}`,
            "MONGODB"
        )
    )
    .catch((err: any) => Logging.error(err, "MONGODB"));
