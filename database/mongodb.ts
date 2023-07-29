import { MongoClient } from "mongodb";

import { Logging } from "../utils/Logging";
import { mongodbConfig } from "../config/config";

export const client = new MongoClient(
    mongodbConfig.mongo.uri,
    mongodbConfig.mongo.options
);

export default async () => {
    try {
        await client.connect();

        // Check if the client is connected

        Logging.info(
            `Connected to database: ${String(
                client.db(mongodbConfig.mongo.db_name).databaseName
            )}`,
            "MONGODB"
        );

        // export the database instance sharing the current socket connections
        // refer to https://mongodb.github.io/node-mongodb-native/5.7/classes/MongoClient.html#db
        return client.db(mongodbConfig.mongo.db_name);
    } catch (error) {
        Logging.error(String(error), "MONGODB");

        await client.close();
    }
};
