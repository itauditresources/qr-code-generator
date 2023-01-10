/*
Type declarations for all environment variables

Update the interfaces on change!
*/

export interface ENV {
    APP_NAME: string | undefined;
    NODE_ENV: string | undefined;
    PORT: number | undefined;
    SESSION_SECRET: string | undefined;
    MONGODB_USERNAME: string | undefined;
    MONGODB_PASSWORD: string | undefined;
    MONGODB_DB_NAME: string | undefined;
    MONGODB_URI: string | undefined;
    JWT_SALT: string | undefined;
    JWT_ISSUER: string | undefined;
    JWT_ALGORITHM: string | undefined;
    JWT_EXPIRES: number | undefined;
    COOKIE_EXPIRES: number | undefined;
    REDIS_USERNAME: string | undefined;
    REDIS_PASSWORD: string | undefined;
    REDIS_HOST: string | undefined;
    REDIS_PORT: number | undefined;
    SMTP_HOST: string | undefined;
    SMTP_PORT: number | undefined;
    SMTP_USERNAME: string | undefined;
    SMTP_PASSWORD: string | undefined;
    API_KEY: string | undefined;
}

export interface Config {
    APP_NAME: string;
    NODE_ENV: string;
    PORT: number;
    SESSION_SECRET: string;
    MONGODB_USERNAME: string;
    MONGODB_PASSWORD: string;
    MONGODB_DB_NAME: string;
    MONGODB_URI: string;
    JWT_SALT: string;
    JWT_ISSUER: string;
    JWT_ALGORITHM: string;
    JWT_EXPIRES: number;
    COOKIE_EXPIRES: number;
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    API_KEY: string;
}
