import express, { Request, Response, NextFunction } from "express";

import helmet from "helmet";
import rateLimiter from "rate-limiter-flexible";
import path from "path";
import dotenv from "dotenv";

import error from "./controller/errorController";
import session from "./middleware/setSession";
import { APIError, HttpCode } from "./utils/APIError";
import staffRouter from "./router/userRouter";
import { Logging } from "./utils/Logging";
import { setHeaders } from "./middleware/setSecureHeaders";
import { rateLimiterOptions } from "./config/config";

const app = express();

dotenv.config();

// MIDDLEWARE
app.use(express.json());

// logging
if (process.env.NODE_ENV === "development") {
    app.use((req: Request, _res: Response, next: NextFunction) => {
        Logging.log(
            `${req.method} - ${req.url} - ${Object.values(req.params).join()}`,
            "SERVER"
        );

        next();
    });
}

// rate limiter
// prevents DDOS and DOS attacks
// I implement a more sophisticated rate limiter as soon as I have redis up and running
// Use the Session UUID to identify access
const rateLimiter_ = new rateLimiter.RateLimiterMemory(rateLimiterOptions);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    rateLimiter_
        .consume(req.socket.remoteAddress || req.ip, 1)
        .then((rateLimiterRes) => {
            setHeaders(res, next, rateLimiterRes);
        })
        .catch((_rateLimiterRes) => {
            next(
                new APIError({
                    httpCode: HttpCode.BAD_GATEWAY,
                    description:
                        "Too many network requests - Please try again later",
                })
            );
        });
});

app.use(session);

// app.use(function (req, res, next) {
//     let tries = 3;

//     function lookupSession(error) {
//         if (error) {
//             return next(error);
//         }

//         tries -= 1;

//         if (req.session !== undefined) {
//             return next();
//         }

//         if (tries < 0) {
//             return next(new Error("oh no"));
//         }

//         sessionMiddleware(req, res, lookupSession);
//     }

//     lookupSession();
// });

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

export default app;
