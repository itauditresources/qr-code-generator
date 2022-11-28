import { HydratedDocument, InferSchemaType, Model } from "mongoose";

import userSchema from "./user.schema";
//import { createWithFullName } from "./user.statics";
import { IUserMethods } from "./user.methods";

// Variable types of the MongoDB schema

// Define the types to enable type linting in all files

export type IUser = InferSchemaType<typeof userSchema>;

export interface IUserModel extends Model<IUser, {}, IUserMethods> {
    createWithFullName(
        name: string
    ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

export interface IUserDocument extends Model<IUser> {}
