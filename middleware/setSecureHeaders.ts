import { Response, NextFunction } from "express";
import { RateLimiterRes } from "rate-limiter-flexible";

import { rateLimiterOptions } from "../config/config";

// RateLimiterRes = {
//    msBeforeNext: 250, // Number of milliseconds before next action can be done
//    remainingPoints: 0, // Number of remaining points in current duration
//    consumedPoints: 5, // Number of consumed points in current duration
//    isFirstInDuration: false, // action is first in current duration
// };

export const setHeaders = (
    res: Response,
    next: NextFunction,
    rateLimiterRes: RateLimiterRes
) => {
    const headers = {
        "Retry-After": rateLimiterRes.msBeforeNext / 1000,
        "X-RateLimit-Limit": rateLimiterOptions.points,
        "X-RateLimit-Remaining": rateLimiterRes.remainingPoints,
        "X-RateLimit-Reset": new Date(Date.now() + rateLimiterRes.msBeforeNext),
    };

    for (let i = 0; i < Object.keys(headers).length; ++i) {
        res.setHeader(
            Object.keys(headers)[i],
            String(Object.values(headers)[i])
        );
    }

    next();
};
