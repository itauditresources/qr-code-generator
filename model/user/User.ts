/**
 * Create a user collection with schema validation
 * @file User.ts
 * @exports User
 * @description User collection
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
            if (
                ["users", "contacts", "groups"].some((name) =>
                    collectionNames.includes(name)
                )
            ) {
                return;
            }

            // Create the user collection including schema validation
            await connection.createCollection("users", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["email", "password"],
                        properties: {
                            email: {
                                bsonType: "string",
                                description: "must be a string and is required",
                            },
                            password: {
                                bsonType: "string",
                                description: "must be a string and is required",
                            },
                        },
                    },
                },
            });

            await connection.createCollection("contacts", {
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

            await connection.createCollection("groups", {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["name"],
                        properties: {
                            name: {
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
