import { Request, Response, NextFunction } from "express";

import { HttpCode } from "../library/httpStatusCodes";
import { TypedRequestBody } from "../library/typedRequest";
import { User } from "../model/user/User";
import { APIError } from "../utils/APIError";
import asyncWrapper from "../utils/asyncWrapper";
import { createResponse } from "../utils/createResponse";
import { getOne, getAll, deleteOne, updateOne } from "./factoryController";

const filterObj = (body: object, allowedFields: string[]) => {
    const filtered = Object.fromEntries(
        Object.entries(body).filter(([key, _val]) =>
            allowedFields.includes(key)
        )
    );
    return filtered;
};

export const setID = (req: Request, _res: Response, next: NextFunction) => {
    req.id = req.params.id;

    next();
};

export const updateMe = asyncWrapper(
    async (
        req: TypedRequestBody<{ password: string; passwordConfirm: string }>,
        res: Response,
        next: NextFunction
    ) => {
        const { password, passwordConfirm } = req.body;
        // 1) Create error if user POSTs password data
        if (password || passwordConfirm) {
            return next(
                new APIError({
                    httpCode: HttpCode.BAD_REQUEST,
                    description:
                        "This route is not for password updates. Please use /updateMyPassword.",
                })
            );
        }

        // 2) Filtered out unwanted fields names that are not allowed to be updated
        const filteredBody = filterObj(req.body, ["name", "email"]);

        // 3) Update user document
        const updatedUser = await User.findByIdAndUpdate(filteredBody, {
            new: true,
            runValidators: true,
        });

        res.status(HttpCode.OK).json(createResponse(true, updatedUser));
    }
);

export const deleteMe = asyncWrapper(
    async (req: Request, res: Response, _next: NextFunction) => {
        await User.findByIdAndUpdate(req.id, { active: false });

        res.status(HttpCode.NO_CONTENT).json(createResponse(true));
    }
);

export const createUser = (_req: Request, res: Response) => {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json(
        createResponse(
            false,
            "This route is not defined! Please use /signup instead"
        )
    );
};

// Factory functions for admins

export const getUser = getOne(User);
export const getAllUsers = getAll(User);

// Do not update passwords with this!
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
