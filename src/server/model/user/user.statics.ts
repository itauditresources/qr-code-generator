import userSchema from "./user.schema";

// Static MongoDB methods which are called on the respective model

userSchema.static(
    "createWithFullName",
    function createWithFullName(name: string) {
        const [firstName, lastName] = name.split(" ");
        return this.create({ firstName, lastName });
    }
);
