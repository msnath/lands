import nodemailer from "nodemailer";
import Env from "#/configs/env.config";

const transporter = nodemailer.createTransport({
  secure: true,
  port: Env.SMTP_PORT,
  host: Env.SMTP_HOST,
  auth: {
    user: Env.SMTP_USER,
    pass: Env.SMTP_PSWD,
  },
});

const Emailer = { transporter };

export default Emailer;
