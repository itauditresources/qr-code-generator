import nodeMailer from "nodemailer";

import { sanitizedConfig } from "../config/config";

export default class Email {
    public readonly header!: string;
    public readonly body!: string;
    private _message: string;
    private _title: string;
    private _to: string;
    private _from: string;
    private _client: unknown;

    constructor(title: string, message: string, to: string, from: string) {
        this._title = title;
        this._message = message;
        this._to = to;
        this._from = from;

        this._client = nodeMailer.createTransport({
            host: sanitizedConfig.SMTP_HOST,
            port: sanitizedConfig.SMTP_PORT,
            auth: {
                user: sanitizedConfig.SMTP_USERNAME,
                pass: sanitizedConfig.SMTP_PASSWORD,
            },
        });
    }

    static main() {}
}
