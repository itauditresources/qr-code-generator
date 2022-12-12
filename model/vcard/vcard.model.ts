import mongoose from "mongoose";

import vcardSchema from "./vcard.schema";

const VCard = mongoose.model("VCard", vcardSchema);

export default VCard;
