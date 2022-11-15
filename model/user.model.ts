import { model } from 'mongoose';
import { IUserDocument, IUserModel } from './user.types';
import UserSchema from './user.schema';

export const User = model<IUserDocument, IUserModel>('User', UserSchema);
