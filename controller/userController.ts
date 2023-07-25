import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

import db from "../database/mongodb";
import { HttpCode } from "../library/httpStatusCodes";
import { TypedRequestBody } from "../library/typedRequest";
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
    req.params.id = req.id;

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
        const updatedUser = await (await db())
            .collection("user")
            .findOneAndUpdate({ _id: new ObjectId(req.id) }, filteredBody, {
                maxTimeMS: 1000,
            });

        res.status(HttpCode.OK).json(createResponse(true, updatedUser));
    }
);

export const deleteMe = asyncWrapper(
    async (req: Request, res: Response, _next: NextFunction) => {
        await (await db()).collection("user").findOneAndDelete({
            _id: new ObjectId(req.id),
        });

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

export const getUser = getOne("users");
export const getAllUsers = getAll("users");

// Do not update passwords with this!
export const updateUser = updateOne("users");
export const deleteUser = deleteOne("users");
