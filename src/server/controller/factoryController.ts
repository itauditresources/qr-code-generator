import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";

import { User } from "../model/user/User";
import asyncWrapper from "../utils/asyncWrapper";
import { APIError } from "../utils/APIError";
import { createResponse } from "../utils/createResponse";
import { HttpCode } from "../library/httpStatusCodes";

/*
Factory controller for all models. Provides reusable functions.

Do not use these methods for production routes

Hiding __v is going to prevent Mongoose from being able to find the model instance
(and update its __v) on a save unless you explicitly include those fields in the find method
*/

export const getAll = (Model: typeof User) =>
    asyncWrapper(async (_req: Response, res: Response, _next: NextFunction) => {
        const documents = await Model.find();

        res.status(HttpCode.OK).json(
            createResponse(true, documents, documents.length)
        );
    });

export const getOne = (Model: typeof User) =>
    asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const document = await Model.findById({
            _id: new mongoose.Types.ObjectId(id),
        });

        if (!document)
            return next(
                new APIError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: `document with id: ${id} not found`,
                })
            );

        res.status(HttpCode.OK).json(createResponse(true, document, 1));
    });

export const updateOne = (Model: typeof User) =>
    asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const document = await Model.findByIdAndUpdate(
            new mongoose.Types.ObjectId(id),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!document)
            return next(
                new APIError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: `document with id: ${id} not found`,
                })
            );

        res.status(HttpCode.OK).json(createResponse(true, document, 1));
    });

export const deleteOne = (Model: typeof User) =>
    asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const document = await Model.findById({
            _id: new mongoose.Types.ObjectId(id),
        });

        if (!document)
            return next(
                new APIError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: `User with id: ${id} not found`,
                })
            );

        document.delete();

        res.status(HttpCode.NO_CONTENT).json(createResponse(true));
    });
