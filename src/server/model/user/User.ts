import validator from "validator";
import {
    Schema,
    HydratedDocument,
    InferSchemaType,
    Model,
    model,
} from "mongoose";

interface IUserMethods {
    fullName(): string;
}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
    createWithFullName(
        name: string
    ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

// MongoDB user schema
// Define all user properties

const userSchema = new Schema<IUser, IUserModel, IUserMethods>({
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

// create instance methods which will run on the instance of a model

userSchema.method("fullName", function fullName(): string {
    return this.firstName, this.lastName;
});

// Static MongoDB methods which are called on the respective model

userSchema.static(
    "createWithFullName",
    function createWithFullName(name: string) {
        const [firstName, lastName] = name.split(" ");
        return this.create({ firstName, lastName });
    }
);

// Variable types of the MongoDB schema

// Define the types to enable type linting in all files

type IUser = InferSchemaType<typeof userSchema>;

interface IUserDocument extends Model<IUser> {}

// Put everything together in a MongoDB model

export const User = model<IUser, IUserModel>("User", userSchema);
