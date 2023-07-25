import { MongoClient } from "mongodb";

import { Logging } from "../utils/Logging";
import { mongodbConfig } from "../config/config";

const client = new MongoClient(
    mongodbConfig.mongo.uri,
    mongodbConfig.mongo.options
);

export default async () => {
    try {
        await client.connect();

        await client.db().command({ ping: 1 });

        Logging.info(
            `Connected to database: ${String(client.db().databaseName)}`,
            "MONGODB"
        );

        return client.db();
    } catch (error) {
        Logging.error(String(error), "MONGODB");

        await client.close();
    } finally {
        await client.close();
    }
};
