/*
 * Factory controller for all models. Provides reusable functions.
 *
 * Do not use these methods for production routes
 * since they do not provide any validation or sanitization.
 */

import { Response, Request, NextFunction } from "express";
import { ObjectId } from "mongodb";

import db from "../database/mongodb";
import asyncWrapper from "../utils/asyncWrapper";
import { APIError } from "../utils/APIError";
import { createResponse } from "../utils/createResponse";
import { HttpCode } from "../library/httpStatusCodes";

export const getAll = (model: string) =>
    asyncWrapper(async (_req: Response, res: Response, next: NextFunction) => {
        const database = await db();

        if (database === undefined) {
            return next(
                new APIError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    description: "Could not connect to database",
                })
            );
        }
        const documents = await database.collection(model).find({}).toArray();

        res.status(HttpCode.OK).json(
            createResponse(true, documents, documents.length)
        );
    });

export const getOne = (model: string) =>
    asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const database = await db();

        if (database === undefined) {
            return next(
                new APIError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    description: "Could not connect to database",
                })
            );
        }
        const { id } = req.params;

        const document = await database.collection(model).findOne({
            _id: new ObjectId(id),
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

export const updateOne = (model: string) =>
    asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const database = await db();

        if (database === undefined) {
            return next(
                new APIError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    description: "Could not connect to database",
                })
            );
        }
        const { id } = req.params;

        const document = await database
            .collection(model)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            .findOneAndUpdate({ _id: new ObjectId(id) }, req.body, {
                maxTimeMS: 1000,
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

export const deleteOne = (model: string) =>
    asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const database = await db();

        if (database === undefined) {
            return next(
                new APIError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    description: "Could not connect to database",
                })
            );
        }
        const { id } = req.params;

        const document = await database.collection(model).findOneAndDelete({
            _id: new ObjectId(id),
        });

        if (!document)
            return next(
                new APIError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: `Document with id: ${id} not found`,
                })
            );

        res.status(HttpCode.NO_CONTENT).json(createResponse(true));
    });
