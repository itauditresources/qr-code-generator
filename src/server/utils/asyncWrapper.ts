import { Request, Response, NextFunction } from "express";

const asyncWrapper = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err: any) => next(err));
    };
};

export default asyncWrapper;
