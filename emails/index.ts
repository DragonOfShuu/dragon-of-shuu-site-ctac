import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

const transport = nodemailer.createTransport({
    pool: true,
    host: "smtp.postmarkapp.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendMail = buildSendMail({
    transport,
    defaultFrom: "Dragon Of Shuu <mail@dragonofshuu.dev>",
    configPath: "./mailing.config.json",
});

export default sendMail;
