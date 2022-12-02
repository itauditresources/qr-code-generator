import { Response, NextFunction } from "express";

// RateLimiterRes = {
//    msBeforeNext: 250, // Number of milliseconds before next action can be done
//    remainingPoints: 0, // Number of remaining points in current duration
//    consumedPoints: 5, // Number of consumed points in current duration
//    isFirstInDuration: false, // action is first in current duration
// };

export const setHeaders = (
    res: Response,
    next: NextFunction,
    RateLimiterRes: object
) => {
    next();
};
