"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var MONGO_USERNAME = process.env.MONGO_USERNAME;
var MONGO_PASSWORD = process.env.MONGO_PASSWORD;
var MONGO_DB = process.env.MONGO_DB;
var MONGO_URI = "mongodb+srv://".concat(MONGO_USERNAME, ":").concat(MONGO_PASSWORD, "@cluster0.dvgqk1v.mongodb.net/").concat(MONGO_DB);
var PORT = process.env.NODE_ENV === 'production' ? Number(process.env.PORT) : 3001;
exports.config = {
    mongo: {
        uri: MONGO_URI,
        // Since Mongoose v.6 the url parser and unified index are used by default
        options: {}
    },
    server: {
        port: PORT
    }
};
