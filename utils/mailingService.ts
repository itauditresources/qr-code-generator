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

export enum EmailType {
    VERIFY = "verify",
    RESET = "reset",
    REGISTRATION = "registration",
}

export enum Sender {
    SERVICE = "service@my.vcards.com",
    NEWSLETTER = "newsletter@my.vcards.com",
}

export default class EmailConstructor {
    private _to: string;
    private _from: string;
    private _subject: string;
    public _message!: EmailBody;
    private readonly _key: string = sanitizedConfig.API_KEY;

    /**
     *
     * @param to receiver
     * @param from sender
     */
    constructor(to: string, from: string) {
        this._to = to;
        this._from = from;
        this._subject = "";
        this.init();
        this.messageConstructor();
    }

    private init(): void {
        sendgrid.setApiKey(this._key);
    }

    private messageConstructor(): void {
        this._message = {
            to: this._to,
            from: this._from,
            subject: this._subject,
            text: "Hello",
            html: "<p>World</p>",
        };
    }

    public async verifyEmail(): Promise<void> {
        this._subject = "Verify your email";

        try {
            await sendgrid.send(this._message);
        } catch (err) {
            Logging.error(String(err), "EMAIL");
        }
    }

    public async passwordReset(): Promise<void> {
        this._subject = "Password reset";

        try {
            await sendgrid.send(this._message);
        } catch (err) {
            Logging.error(String(err), "EMAIL");
        }
    }

    public async registration(): Promise<void> {
        this._subject = "Welcome to VCARD";

        try {
            await sendgrid.send(this._message);
        } catch (err) {
            Logging.error(String(err), "EMAIL");
        }
    }
}
