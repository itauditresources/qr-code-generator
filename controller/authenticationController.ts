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

const generateToken = (id: string) => {
    const jwt: Promise<string | undefined> = new Promise<string | undefined>(
        (resolve, reject) => {
            jsonwebtoken.sign(
                { id },
                sanitizedConfig.SALT,
                {
                    expiresIn: sanitizedConfig.JWT_EXPIRES * 1000 * 60 * 24,
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

        // regenerate session to prevent session fixation
        req.session.regenerate((err) => {
            if (err) next(err);
        });

        // Save token in session storage
        req.session.token = await generateToken(String(user._id));

        // Save session before redirecting to prevent empty session
        req.session.save((err) => {
            if (err) return next(err);

            // res.redirect("./");
        });

        res.status(HttpCode.OK).json(
            createResponse(true, undefined, undefined, "Logged in")
        );
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

        // Prevent the passwordConfirm field from being saved since we do not need it anymore
        await user.updateOne({ $unset: { passwordConfirm: "" } }).exec();

        // Hide password field from the output
        // undefined would hide the fields but typescript will complain
        // about the type inconsistency
        user.password = "";
        user.passwordConfirm = "";

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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const jwt: any = jsonwebtoken.verify(token, sanitizedConfig.SALT);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const user = await User.findById(String(jwt.id));

        if (!user)
            return next(
                new APIError({
                    httpCode: HttpCode.UNAUTHORIZED,
                    description:
                        "Your session seems to be invalid - Please log in again",
                })
            );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        if (user.passwordChangedAt > new Date(jwt.iat)) {
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

export const loggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.token) next();
    else next("login");
};
