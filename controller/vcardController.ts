import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

import { HttpCode } from "../library/httpStatusCodes";
import db from "../database/mongodb";
import User from "../model/user/User";
import { APIError } from "../utils/APIError";
import asyncWrapper from "../utils/asyncWrapper";
import { createResponse } from "../utils/createResponse";

// Factory routes for users
export const createCard = asyncWrapper(
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

        const vcard = await database
            .collection("vcards")
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            .insertOne(req.body);

        if (!vcard)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Could not create the business card",
                })
            );

        res.status(HttpCode.OK).json(
            createResponse(true, vcard, 1, "Created business card")
        );
    }
);

export const getMyCard = asyncWrapper(
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
        const vcard = await database.collection("vcards").findOne({
            _id: new ObjectId(req.session.id),
        });

        if (!vcard)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Could not find your business card",
                })
            );

        res.status(HttpCode.OK).json(
            createResponse(true, vcard, 1, "Found your business card")
        );
    }
);

export const deleteMyCard = asyncWrapper(
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
        const vcard = await database.collection("vcards").findOneAndDelete({
            _id: new ObjectId(req.session.id),
        });

        if (!vcard)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: `Could not delete the business card with id: ${req.session.id}`,
                })
            );

        res.status(HttpCode.OK).json(
            createResponse(true, vcard, 1, "Deleted business card")
        );
    }
);

export const updateMyCard = asyncWrapper(
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
        const vcard = await database.collection("vcards").findOneAndUpdate(
            {
                _id: new ObjectId(req.session.id),
            },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            req.body
        );

        if (!vcard)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Could not update your business card",
                })
            );

        res.status(HttpCode.OK).json(
            createResponse(true, vcard, 1, "Updated business card")
        );
    }
);

// Factory routes for admins

import { getOne, getAll, updateOne, deleteOne } from "./factoryController";

export const getCard = getOne("vcard");
export const getAllCards = getAll("vcard");
export const updateCard = updateOne("vcard");
export const deleteCard = deleteOne("vcard");
