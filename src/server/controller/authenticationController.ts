import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import dotenv from "dotenv";

import { User } from "../model/user/User";
import asyncWrapper from "../utils/asyncWrapper";
import { APIError, HttpCode } from "../utils/APIError";
import { createResponse } from "../utils/createResponse";
import { TypedRequestBody } from "../library/typedRequest";

dotenv.config();

const generateToken = (id: string) => {
    const jwt: Promise<string | undefined> = new Promise<string | undefined>(
        (resolve, reject) => {
            jsonwebtoken.sign(
                { id },
                process.env.SALT as string,
                {
                    expiresIn: process.env.JWT_EXPIRES as string,
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

        const user = User.findOne({ email });

        const passwordEquals = await bcrypt.compare(password, "");

        if (!passwordEquals) {
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Wrong email or password - Please try again",
                })
            );
        }

        res.status(HttpCode.OK).json(createResponse(true, "Successful login"));
    }
);

export const register = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.create(req.body);

        await user.save();

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

        //res.cookie("jwt", token, options);

        res.status(HttpCode.CREATED).json(
            createResponse(true, [token, user], 1)
        );
    }
);
