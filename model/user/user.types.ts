import { Document, Model } from "mongoose";

/**
 * Variable types of the MongoDB schema
 *
 * Define the types to enable type linting in all files
 */

export interface IUser {
    email: string;
    password: string | undefined;
    passwordConfirm: string | undefined;
    name: string;
    firstName: string;
    department: string;
    role: string;
    createdAt: Date;
    changedAt: Date;
    picture: string;
}

export interface IUserDocument extends IUser, Document {
    setLastUpdated: (this: IUserDocument) => Promise<void>;
    sameLastName: (this: IUserDocument) => Promise<Document[]>;
}

export interface IUserModel extends Model<IUserDocument> {
    findOneOrCreate: ({
        firstName,
        lastName,
        age,
    }: {
        firstName: string;
        lastName: string;
        age: number;
    }) => Promise<IUserDocument>;
    findByAge: (min?: number, max?: number) => Promise<IUserDocument[]>;
}
