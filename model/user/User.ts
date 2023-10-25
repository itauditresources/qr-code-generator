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
            if (["users"].some((name) => collectionNames.includes(name))) {
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
                                uniqueItems: true,
                                // Server side validation to check uniqueness of email
                            },
                            password: {
                                bsonType: "string",
                                description: "must be a string and is required",
                            },
                            role: {
                                enum: ["user", "admin"],
                                description:
                                    "can only be one of the enum values and is required",
                                // Add user as default role if no role is provided via an aggregation pipeline of MongoDB ATLAS
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
