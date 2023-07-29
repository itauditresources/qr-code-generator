/**
 * Create a vcard collection with schema validation
 * @file VCard.ts
 * @exports VCard
 * @description VCard collection
 * @version 1.0.0
 * @requires mongodb
 * @requires Logging
 */

import db from "../../database/mongodb";
import { Logging } from "../../utils/Logging";

export default db()
    .then(async (connection) => {
        if (connection !== undefined) {
            // Check if the collection already exists
            const collections = await connection.listCollections().toArray();
            const collectionNames = collections.map(
                (collection) => collection.name
            );
            if (collectionNames.includes("vcards")) {
                return;
            }

            // Create the vcard collection including schema validation
            await connection.createCollection("vcards", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["name", "email", "phone", "address"],
                        properties: {
                            name: {
                                bsonType: "string",
                                description: "must be a string and is required",
                            },
                            email: {
                                bsonType: "string",
                                description: "must be a string and is required",
                            },
                            phone: {
                                bsonType: "string",
                                description: "must be a string and is required",
                            },
                            address: {
                                bsonType: "string",
                                description: "must be a string and is required",
                            },
                        },
                    },
                },
            });
        }
    })

    .catch((err) => {
        Logging.error(
            `Could not create collections: ${String(err)}`,
            "MONGODB"
        );
    });
