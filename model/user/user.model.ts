import { model } from "mongoose";
import { IUserDocument, IUserModel } from "./user.types";
import UserSchema from "./user.schema";

/**
 * Put everything together in a MongoDB model
 */

export const User = model<IUserDocument, IUserModel>("User", UserSchema);
