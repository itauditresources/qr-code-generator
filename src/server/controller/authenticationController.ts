import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import { User } from "../model/user/User";
import asyncWrapper from "../utils/asyncWrapper";
import { APIError } from "../utils/APIError";
import { createResponse } from "../utils/createResponse";
import { TypedRequestBody } from "../library/typedRequest";
import { HttpCode } from "../library/httpStatusCodes";
import { sanitizedConfig } from "../config/config";
import mongoose from "mongoose";

const generateToken = (id: string) => {
    const jwt: Promise<string | undefined> = new Promise<string | undefined>(
        (resolve, reject) => {
            jsonwebtoken.sign(
                { id },
                sanitizedConfig.SALT,
                {
                    expiresIn: sanitizedConfig.JWT_EXPIRES,
                },
                (err, token) => {
                    if (err) reject(err);
                    else resolve(token);
                }
            );
        }
    );
    return jwt;
};

export const login = asyncWrapper(
    async (
        req: TypedRequestBody<{ email: string; password: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const { email, password }: { email: string; password: string } =
            req.body;

        let encryptedPassword: string | undefined;
        let userID: mongoose.Types.ObjectId | undefined;

        // find each document with the provided email address
        // the email is a unique parameter in the User model
        const user = await User.findOne({ email }).select("+password").exec();

        if (user === null)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Wrong email or password - Please try again",
                })
            );

        const passwordEquals = await bcrypt.compare(password, user.password);

        if (!passwordEquals)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Wrong email or password - Please try again",
                })
            );

        req.session.token = await generateToken(String(userID));

        res.status(HttpCode.OK).json(createResponse(true, "Successful login"));
    }
);

export const register = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.create(req.body);

        const token = await generateToken(String(user._id));

        if (!token)
            return next(
                new APIError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    description: "Could not create JWT",
                })
            );

        // Remove the password from the output
        user.password = "";
        user.passwordConfirm = "";

        res.status(HttpCode.CREATED).json(
            createResponse(true, [token, user], 1)
        );
    }
);
