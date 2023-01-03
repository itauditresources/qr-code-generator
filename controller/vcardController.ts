import { Request, Response, NextFunction } from "express";
import { HttpCode } from "../library/httpStatusCodes";

import { VCard } from "../model/vcard/VCard";
import { APIError } from "../utils/APIError";
import asyncWrapper from "../utils/asyncWrapper";
import { createResponse } from "../utils/createResponse";

export const createCard = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const vcard = await VCard.create(req.body);

        if (!vcard)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Could not create new business card",
                })
            );

        res.status(HttpCode.OK).json(
            createResponse(true, vcard, 1, "Created business card")
        );
    }
);

export const getMyCard = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const vcard = await VCard.create(req.body);

        if (!vcard)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Could not create new business card",
                })
            );

        res.status(HttpCode.OK).json(
            createResponse(true, vcard, 1, "Created business card")
        );
    }
);

export const deleteMyCard = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const vcard = await VCard.create(req.body);

        if (!vcard)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Could not create new business card",
                })
            );

        res.status(HttpCode.OK).json(
            createResponse(true, vcard, 1, "Created business card")
        );
    }
);

export const updateMyCard = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const vcard = await VCard.create(req.body);

        if (!vcard)
            return next(
                new APIError({
                    httpCode: HttpCode.CONFLICT,
                    description: "Could not create new business card",
                })
            );

        res.status(HttpCode.OK).json(
            createResponse(true, vcard, 1, "Created business card")
        );
    }
);

// Factory routes for admins

import { getOne, getAll, updateOne, deleteOne } from "./factoryController";

export const getCard = getOne(VCard);
export const getAllCards = getAll(VCard);
export const updateCard = updateOne(VCard);
export const deleteCard = deleteOne(VCard);
