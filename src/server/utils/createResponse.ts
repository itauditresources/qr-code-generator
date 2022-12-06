export enum Body {
    success = "success",
    error = "error",
}

export const createResponse = (
    success: boolean,
    data?: unknown,
    n?: number,
    message?: string
) => {
    return {
        status: success ? "success" : "fail",
        results: n ? n : undefined,
        message: message ? message : undefined,
        data,
    };
};
