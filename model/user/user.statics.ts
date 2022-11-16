import { IUserDocument, IUserModel } from './user.types';

// @ts-ignore
export async function findOneOrCreate(): Promise<IUserDocument> {}

export async function findByAge(min?: number, max?: number): Promise<IUserDocument[]> {
	// @ts-ignore
	return this.find({ age: { $gte: min || 0, $lte: max || Infinity } });
}
