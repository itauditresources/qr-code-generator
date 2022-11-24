import mongoose from "mongoose";
import validator from "validator";

const vcardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide a name"],
    },
    email: {
        type: String,
        required: [true, "Provide an email address"],
        validate: {
            validator: function (value: string) {
                return validator.isEmail(value);
            },
            message: "email not valid",
        },
    },
});

export default vcardSchema;
