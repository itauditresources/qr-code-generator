import { Document } from "mongoose";
import userSchema from "./user.schema";

// create instance methods which will run on the instance of a model

export interface IUserMethods {
    fullName(): string;
}

userSchema.method("fullName", function fullName(): string {
    return this.firstName + " " + this.lastName;
});
