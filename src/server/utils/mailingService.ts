import sendgrid from "@sendgrid/mail";

import { sanitizedConfig } from "../config/config";
import { Logging } from "./Logging";

interface EmailBody {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
}

export default class Email {
    private _to: string;
    private _from: string;
    private _subject: string;
    public _message!: EmailBody;
    private readonly _key: string = sanitizedConfig.API_KEY;

    constructor(to: string, from: string) {
        this._to = to;
        this._from = from;
        this._subject = "";
        this.init();
        this.messageConstructor();
    }

    public set to(v: string) {
        this._to = v;
    }

    public get to() {
        return this._to;
    }

    public set from(v: string) {
        this._to = v;
    }

    public get from() {
        return this._from;
    }

    private init(): void {
        sendgrid.setApiKey(this._key);
    }

    private messageConstructor(): void {
        this._message = {
            to: this.to,
            from: this.from,
            subject: this._subject,
            text: "Hello",
            html: "<p>World</p>",
        };
    }

    public async passwordReset(): Promise<void> {
        this._subject = "Password reset";

        try {
            await sendgrid.send(this._message);
        } catch (err) {
            Logging.error(String(err), "EMAIL");
        }
    }
}
