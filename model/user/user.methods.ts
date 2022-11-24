import { Document } from "mongoose";
import { IUserDocument } from "./user.types";

/**
 * Custom instance methods which can be called on individual instances of the model
 * @param this
 */

export async function setLastUpdated(this: IUserDocument): Promise<void> {
    const now = new Date();
    // @ts-ignore
    if (!this.lastUpdated || this.lastUpdated < now) {
        // @ts-ignore
        this.lastUpdated = now;
        await this.save();
    }
}

export async function sameLastName(this: IUserDocument): Promise<Document[]> {
    return this.$model("User").find({ lastName: this.name });
}
