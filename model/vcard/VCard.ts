/*
 * ############### WARNING #################
 *
 * Mongoose is a ODM (Object Data Modelling) tool and runs on top of the
 * native mongo-db driver, adding an additional abstraction layer.
 *
 * If you make any changes on the Mongoose schemas keep in mind
 * to change the respective existing entries in the MongoDB Collection!!
 *
 * Since Mongoose creates its own data models, MongoDB doesn't know about
 * our database schema and will not type check, validate and recursively change data types.
 *
 * I will most likely replace Mongoose with the native MongoDB driver in a production
 * environment to reduce abstraction and a potential source of errors.
 */

import { Schema, InferSchemaType, Model, model } from "mongoose";

// MongoDB user schema
// Define all user properties

const vcardSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please provide your first name"],
    },

    lastName: {
        type: String,
        required: [true, "Please provide your last name"],
    },

    email: {
        type: String,
        required: [true, "Please provide your business email"],
    },

    telephone: Number,

    mobile: Number,

    picture: {
        type: Buffer,
        required: [true, "Please upload a picture of yourself"],
    },

    department: String,
});

// Validation methods

// Middleware functions

// Instance methods which will run on the instance of a model

// Static MongoDB methods which are called on the respective model

// Infer data types of the MongoDB schema
export type IVCard = InferSchemaType<typeof vcardSchema>;

export type IVCardDocument = Model<IVCard>;

// Put everything together in a MongoDB model

export const User = model<IVCard>("VCard", vcardSchema);
