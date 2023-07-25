import express, { Request, Response, NextFunction } from "express";

import helmet from "helmet";
import rateLimiter from "rate-limiter-flexible";
import path from "path";

import error from "./controller/errorController";
import session from "./middleware/setSession";
import { APIError } from "./utils/APIError";
import userRouter from "./router/userRouter";
import vcardRouter from "./router/vcardRouter";
import { Logging } from "./utils/Logging";
import { setHeaders } from "./middleware/setSecureHeaders";
import { rateLimiterOptions, sanitizedConfig } from "./config/config";
import { HttpCode } from "./library/httpStatusCodes";

const app = express();

// 1) MIDDLEWARE
app.use(express.json());

// logging
if (sanitizedConfig.NODE_ENV === "development") {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// 2) REDUCE SERVER FINGERPRINT
// only prevents casual exploits
app.disable("x-powered-by");

// 3) CSRF PROTECTION

// 4) ROUTERS
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cards", vcardRouter);

// 5) STATIC FILES
// might be unnecessary if I use a frontend framework
app.use(express.static(path.join(__dirname, "/view")));

// 6) UNHANDLED ROUTES
app.all("*", (req: Request, _res: Response, next: NextFunction) => {
    next(
        new APIError({
            httpCode: HttpCode.NOT_FOUND,
            description: `Cannot find ${req.originalUrl} on this server`,
        })
    );
});

// 7) ERROR HANDLING
app.use(error);

export default app;
