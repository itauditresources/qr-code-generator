import validator from "validator";
import { Schema } from "mongoose";

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
            message: "This is not a valid email address",
        },
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Provide a password"],
        minlength: [8, "Your password needs to be at least 8 characters long"],
        maxlength: [
            15,
            "Your password should contain more than 15 characters long",
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
            "Your password should contain more than 15 characters long",
        ],
        validate: {
            validator: function (value: string): boolean {
                // `this` is only defined on save and find
                // @ts-ignore
                return value === this.password;
            },
            message: "Your passwords do not match",
        },
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
        required: [true, "Provide your current role"],
        enum: ["admin", "user", "moderator"],
        default: "user",
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

export default userSchema;
