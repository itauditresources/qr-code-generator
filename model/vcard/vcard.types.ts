import { Document, Model } from "mongoose";

/**
 * Variable types of the MongoDB schema
 *
 * Define the types to enable type linting in all files
 */

export interface IVCard {
    email: string;
    name: string;
    firstName: string;
    department: string;
    role: string;
    createdAt: Date;
    changedAt: Date;
    picture: string;
}

export interface IVCardDocument extends IVCard, Document {}

export interface IVCardModel extends Model<IVCardDocument> {}
