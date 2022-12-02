import express, { Request, Response, NextFunction, urlencoded } from "express";
import session from "express-session";
import helmet from "helmet";
import rateLimiter from "rate-limiter-flexible";
import path from "path";
import dotenv from "dotenv";

import error from "./controller/errorController";
import { APIError, HttpCode } from "./utils/APIError";
import staffRouter from "./router/userRouter";
import { Logging } from "./utils/Logging";
import { options } from "../server/config/config";
import { createResponse } from "./utils/createResponse";
import { setHeaders } from "./middleware/setSecureHeaders";

const app = express();

dotenv.config();

// MIDDLEWARE
app.use(express.json());

// logging
if (process.env.NODE_ENV === "development") {
    app.use((req: Request, _res: Response, next: NextFunction) => {
        Logging.log(`${req.method} - ${req.url} - ${req.rawHeaders.join()}`);

        next();
    });
}

// rate limiter
// prevents DDOS and DOS attacks
// I implement a more sophisticated rate limiter as soon as I have redis up and running
// Use the Session UUID to identify access
const rateLimiter_ = new rateLimiter.RateLimiterMemory(options);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    rateLimiter_
        .consume(req.socket.remoteAddress || req.ip, 1)
        .then((rateLimiterRes) => {
            const headers = {
                "Retry-After": rateLimiterRes.msBeforeNext / 1000,
                "X-RateLimit-Limit": options.points,
                "X-RateLimit-Remaining": rateLimiterRes.remainingPoints,
                "X-RateLimit-Reset": new Date(
                    Date.now() + rateLimiterRes.msBeforeNext
                ),
            };

            for (let i = 0; i < Object.keys(headers).length; ++i) {
                res.setHeader(
                    Object.keys(headers)[i],
                    String(Object.values(headers)[i])
                );
            }

            next();
        })
        .catch((_rateLimiterRes) =>
            next(
                new APIError({
                    httpCode: HttpCode.BAD_GATEWAY,
                    description:
                        "Too many network requests - Please try again later",
                })
            )
        );
});

//app.use(session);

// set secure HTTP headers
app.use(helmet());

// REDUCE SERVER FINGERPRINT
// only prevents casual exploits
app.disable("x-powered-by");

// ROUTERS
app.use("/api/v1/users", staffRouter);

// Serving static files
app.use(express.static(path.join(__dirname, "/view")));

// UNHANDLED ROUTES
app.all("*", (req: Request, _res: Response, next: NextFunction) => {
    next(
        new APIError({
            httpCode: HttpCode.NOT_FOUND,
            description: `Cannot find ${req.originalUrl} on this server`,
        })
    );
});

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
    console.log(req.session);

    if (!req.session)
        next(
            new APIError({
                httpCode: HttpCode.CONFLICT,
                description: "Session destroyed",
            })
        );

    // continue otherwise
    next();
});

// ERROR HANDLING
app.use(error);

export default app;
