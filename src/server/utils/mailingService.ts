import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const client = nodeMailer.createTransport({
    host: process.env.SMTP_HOST as string,
    port: process.env.SMTP_PORT as unknown as number,
    auth: {
        user: process.env.SMTP_USERNAME as string,
        pass: process.env.SMTP_PASSWORD as string,
    },
});
