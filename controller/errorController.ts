/* eslint-disable @typescript-eslint/no-explicit-any */
/*
Since we accept different types of errors which are not always 
defined in their type declaration file we ignore the errors 

Might declare a types.d.ts file in production instead!
*/

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, NextFunction } from "express";

import { HttpCode } from "../library/httpStatusCodes";
import { APIError } from "../utils/APIError";
import { Logging } from "../utils/Logging";

const handleCastError = (err: any) => {
    const message = `Invalid ${String(err.path)}: ${String(err.path)}`;
    return new APIError({
        name: "Error",
        httpCode: HttpCode.NO_CONTENT,
        description: message,
        isOperational: true,
    });
};

const handleDuplicateKeyError = (err: any) => {
    // search in keyValue to get the field
    const value = err.keyValue[Object.keys(err.keyValue)[0]];
    const message = `Duplicate field value: "${String(
        value
    )}". Please use an other value.`;
    return new APIError({
        name: "Error",
        httpCode: HttpCode.CONFLICT,
        description: message,
        isOperational: true,
    });
};

const handleValidationError = (err: any) => {
    const errors = Object.values(err.errors).map((el) => el);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new APIError({
        name: "Error",
        httpCode: HttpCode.UNPROCESSABLE_ENTITY,
        description: message,
        isOperational: true,
    });
};

const handleTypeError = (err: any) => {
    Logging.error(String(err), "ERROR");
    const message = `Invalid input data. ${String(err.message)}`;
    return new APIError({
        name: "Error",
        httpCode: HttpCode.BAD_REQUEST,
        description: message,
        isOperational: true,
    });
};

const handleJWTError = () =>
    new APIError({
        name: "Error",
        httpCode: HttpCode.BAD_REQUEST,
        description: "Invalid Token - Please log in",
        isOperational: true,
    });

const handleMongoDBError = (err: any) => {
    const message = err.content.errInfo.details.schemaRulesNotSatisfied.map(
        (el: any) => el.missingProperties
    );
    new APIError({
        name: "Error",
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: message,
        isOperational: true,
    });
};

const handleJWTExpiredError = () =>
    new APIError({
        name: "Error",
        httpCode: HttpCode.BAD_REQUEST,
        description: "Expired Token - Please log in",
        isOperational: true,
    });

const devError = (err: any, res: Response) => {
    Logging.error(String(err), "ERROR");
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        error: err.name,
        message: err.message,
        content: err,
        stack: err.stack,
    });
};

const prodError = (err: any, res: Response) => {
    // operational, trusted error
    if (err.isOperational) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: err.name,
            message: err.message,
        });
    }
    // programming error - don't leak information about it
    else {
        // log the error
        Logging.error(String(err), "ERROR");

        res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "Something went wrong on our side",
        });
    }
};

export default (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    err.statusCode = err.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        devError(err, res);
    } else if (process.env.NODE_ENV === "production") {
        // MongoDB bad ObjectID
        if (err.name === "CastError") err = handleCastError(err);
        // MongoDB duplicate key error
        if (err.code === 11000) err = handleDuplicateKeyError(err);
        // MongoDB validation error
        if (err.name === "ValidationError") err = handleValidationError(err);
        // MongoDB type error
        if (err.name === "BSONTypeError") err = handleTypeError(err);
        // JWT Error
        if (err.name === "JsonWebTokenError") err = handleJWTError();
        // JWT Expiry Error
        if (err.name === "TokenExpiredError") err = handleJWTExpiredError();
        // MongoDB Error
        if (err.name === "MongoServerError") err = handleMongoDBError(err);
        prodError(err, res);
    }
};
