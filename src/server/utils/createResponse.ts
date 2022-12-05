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
        success: success ? "success" : "fail",
        results: n ? n : null,
        message: message ? message : "",
        data,
    };
};
