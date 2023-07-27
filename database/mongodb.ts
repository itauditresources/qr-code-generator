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

        await client.db(mongodbConfig.mongo.db_name).command({ ping: 1 });

        Logging.info(
            `Connected to database: ${String(
                client.db(mongodbConfig.mongo.db_name).databaseName
            )}`,
            "MONGODB"
        );

        return client.db(mongodbConfig.mongo.db_name);
    } catch (error) {
        Logging.error(String(error), "MONGODB");

        await client.close();
    }
};
