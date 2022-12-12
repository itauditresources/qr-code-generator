import { HttpCode } from "../library/httpStatusCodes";

interface ErrorArgs {
    name?: string;
    httpCode: HttpCode;
    description: string;
    isOperational?: boolean;
}

export class APIError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;
    public readonly isOperational: boolean = true;

    /**
     * Custom error class with the http status code
     */
    constructor(args: ErrorArgs) {
        super(args.description);

        Object.setPrototypeOf(this, APIError.prototype);

        this.name = args.name || "Error";
        this.httpCode = args.httpCode;

        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }

        Error.captureStackTrace(this, this.constructor);
    }
}
