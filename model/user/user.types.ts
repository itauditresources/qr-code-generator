import { Document, Model } from 'mongoose';

export interface IUser {
	email: string;
	password: string | undefined;
	passwordConfirm: string;
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
