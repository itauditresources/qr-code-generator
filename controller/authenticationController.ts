import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import * as jose from "jose";

import db from "../database/mongodb";
import asyncWrapper from "../utils/asyncWrapper";
import { APIError } from "../utils/APIError";
import { createResponse } from "../utils/createResponse";
import { TypedRequestBody } from "../library/typedRequest";
import { HttpCode } from "../library/httpStatusCodes";
import { sanitizedConfig } from "../config/config";

/**
 * Create a JWT. Uses the provided config information
 * @param id UUID
 * @returns JWT
 */
const generateToken = async (id: string) => {
    // encode the SALT string as Uint8Array. File format is much safer
    // to store secrets used by encryption algorithms
    const secret = new TextEncoder().encode(sanitizedConfig.JWT_SALT);
    const alg = sanitizedConfig.JWT_ALGORITHM;

    const token = await new jose.SignJWT({ "urn:example:claim": true })
        .setProtectedHeader({ alg })
        .setIssuer(sanitizedConfig.JWT_ISSUER)
        .setIssuedAt(Date.now())
        .setExpirationTime(sanitizedConfig.JWT_EXPIRES)
        .setJti(id)
        .sign(secret);

    return token;
};

export const login = asyncWrapper(
    async (
        req: TypedRequestBody<{ email: string; password: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const database = await db();

        if (database === undefined) {
            return next(
                new APIError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    description: "Could not connect to database",
                })
            );
        }
        const { email, password }: { email: string; password: string } =
            req.body;

        // find each document with the provided email address
        // the email is a unique parameter in the User model
        // include the password to verify the user input
        const user = await database.collection("users").findOne({ email });

        if (user === null)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Wrong email or password - Please try again",
                })
            );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const passwordEquals = await bcrypt.compare(password, user.password); // update this as soon as implement the user model

        if (!passwordEquals)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Wrong email or password - Please try again",
                })
            );

        // regenerate session to prevent session fixation
        req.session.regenerate((err) => {
            if (err) next(err);
        });

        // Save token in session storage
        req.session.token = await generateToken(String(user._id));

        // Save session before redirecting to prevent empty session
        req.session.save((err) => {
            if (err) return next(err);

            // res.redirect("/");
        });

        res.status(HttpCode.OK).json(
            createResponse(true, undefined, undefined, "Logged in")
        );
    }
);

export const register = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const database = await db();

        if (database === undefined) {
            return next(
                new APIError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    description: "Could not connect to database",
                })
            );
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const user = await database.collection("users").insertOne(req.body);

        const token = await generateToken(String(user.insertedId));

        if (!token)
            return next(
                new APIError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    description: "Could not create JWT",
                })
            );

        // Prevent the passwordConfirm field from being saved since we do not need it anymore
        await database
            .collection("users")
            .updateOne(user, { $unset: { passwordConfirm: "" } });

        // Hide password field from the output
        // undefined would hide the fields but typescript will complain
        // about the type inconsistency
        //user.password = "";
        //user.passwordConfirm = "";

        res.status(HttpCode.CREATED).json(
            createResponse(
                true,
                [token, user],
                1,
                "Signup successful - Please login"
            )
        );
    }
);

export const protect = asyncWrapper(
    async (req: Request, _res: Response, next: NextFunction) => {
        const database = await db();

        if (database === undefined) {
            return next(
                new APIError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    description: "Could not connect to database",
                })
            );
        }
        let token: string | undefined;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.session.token) {
            token = req.session.token;
        }

        if (!token) {
            return next(
                new APIError({
                    httpCode: HttpCode.UNAUTHORIZED,
                    description: "No session found - Please log in",
                })
            );
        }

        const secret = new TextEncoder().encode(sanitizedConfig.JWT_SALT);

        const jwt = await jose.jwtVerify(token, secret);

        const user = await database.collection("users").findOne({
            _id: new ObjectId(jwt.payload.jti),
        });

        if (!user)
            return next(
                new APIError({
                    httpCode: HttpCode.UNAUTHORIZED,
                    description:
                        "Your session seems to be invalid - Please log in again",
                })
            );

        if (
            user.passwordChangedAt >
            (jwt.payload.iat !== undefined ? new Date(jwt.payload.iat) : false)
        ) {
            return next(
                new APIError({
                    httpCode: HttpCode.UNAUTHORIZED,
                    description:
                        "Your password changed since your last login - Please log in again",
                })
            );
        }

        // Set id to identify the respective documents in the database
        req.id = String(user._id);

        next();
    }
);

export const logout = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.token) {
        return next(
            new APIError({
                httpCode: HttpCode.CONFLICT,
                description: "No session found - Please log in",
            })
        );
    }

    req.session.destroy((err) => {
        if (err)
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json(
                createResponse(
                    true,
                    undefined,
                    undefined,
                    "Unable to logout - Please try again later"
                )
            );

        res.status(HttpCode.OK).json(
            createResponse(
                true,
                undefined,
                undefined,
                "Logged out successfully"
            )
        );
    });
};

export const loggedIn = (req: Request, _res: Response, next: NextFunction) => {
    if (req.session.token) next();
    else next("login");
};
