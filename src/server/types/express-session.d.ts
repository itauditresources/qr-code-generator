// to make the file a module and avoid the TypeScript error
export {};

declare module "express-session" {
    export interface SessionData {
        token: string;
        userID: string;
        role: string;
    }
}
