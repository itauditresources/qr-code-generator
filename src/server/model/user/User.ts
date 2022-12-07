/*
############### WARNING #################

Mongoose is a ODM (Object Data Modelling) tool and runs on top of the 
native mongo-db driver, adding an additional abstraction layer.

If you make any changes on the Mongoose schemas keep in mind
to change the respective existing entries in the MongoDB Collection!!

Since Mongoose creates its own data models, MongoDB doesn't know about 
our database schema and will not type check, validate and recursively change data types.

I will most likely replace Mongoose with the native MongoDB driver in a production 
environment to reduce abstraction and a potential source of errors. 
*/

import validator from "validator";
import bcrypt from "bcrypt";
import { Schema, InferSchemaType, Model, model } from "mongoose";

type Password = {
    password: string;
    passwordConfirm: string;
};

// MongoDB user schema
// Define all user properties

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Provide your company email address"],
        trim: true,
        unique: true,
        validate: {
            validator: function (value: string): boolean {
                return validator.isEmail(value);
            },
            message: (props: { value: string }) =>
                `${props.value} is not a valid email address`,
        },
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Provide a password"],
        minlength: [8, "Your password needs to be at least 8 characters long"],
        maxlength: [
            15,
            "Your password should not contain more than 15 characters long",
        ],
        select: false,
    },
    passwordConfirm: {
        type: String,
        trim: true,
        required: [true, "Provide a password"],
        minlength: [8, "Your password needs to be at least 8 characters long"],
        maxlength: [
            15,
            "Your password should not contain more than 15 characters long",
        ],
        validate: {
            validator: function (value: string): boolean {
                // `this` is only defined on save and find methods
                // @ts-ignore
                return value === this.password;
            },
            message: "Your passwords do not match",
        },
        select: false,
    },
    name: {
        type: String,
        required: [true, "Provide a name"],
        trim: true,
    },
    firstName: {
        type: String,
        required: [true, "Provide a first name"],
        trim: true,
    },
    department: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
        required: [true, "Provide your current role"],
        enum: {
            values: ["admin", "user", "moderator"],
            message: "{VALUE} is not a valid role",
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    changedAt: Date,
    picture: {
        type: Buffer,
    },
});

// Validation methods

// Middleware functions
userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    next();
});

// create instance methods which will run on the instance of a model

// Static MongoDB methods which are called on the respective model

// Infer data types of the MongoDB schema
export type IUser = InferSchemaType<typeof userSchema>;

export type IUserDocument = Model<IUser>;

// Put everything together in a MongoDB model

export const User = model<IUser>("User", userSchema);
