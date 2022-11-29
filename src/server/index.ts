// import dependencies
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import helmet from "helmet";
import rateLimiter from "rate-limiter-flexible";
import path from "path";
import dotenv from "dotenv";

// imports files
import error from "./controller/errorController";
import { APIError, HttpCode } from "./utils/APIError";
import staffRouter from "./router/userRouter";
import { Logging } from "./utils/Logging";
import { options } from "../server/config/config";
import { createResponse } from "./utils/createResponse";

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
// const rateLimiter_ = new rateLimiter.RateLimiterMemory(options);

// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//     rateLimiter_
//         .consume(req.socket.remoteAddress || req.ip, 1)
//         .then((RateLimiterRes) => {
//             res.status(HttpCode.OK).json(createResponse(true, RateLimiterRes));
//         })
//         .catch((RateLimiterRes: any) =>
//             next(
//                 new APIError({
//                     httpCode: HttpCode.BAD_GATEWAY,
//                     description:
//                         "Too many network requests - Please try again later",
//                 })
//             )
//         );
// });

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

// ERROR HANDLING
app.use(error);

app.use((req: Request, _res: Response, next: NextFunction) => {
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

export default app;
