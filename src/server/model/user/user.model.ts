import { model, HydratedDocument } from "mongoose";
import { IUser, IUserModel } from "./user.types";
import UserSchema from "./user.schema";

// Put everything together in a MongoDB model

export const User = model<IUser>("User", UserSchema);
