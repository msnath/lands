import { NodeEnv } from "$/types/env.type";

const Env = {
  NODE_ENV: process.env.NODE_ENV,
  ENV: new NodeEnv(process.env.APP_ENV ?? ""),
  ORIGIN_URL: process.env.ORIGIN_URL ?? "",

  PORT: parseInt(process.env.PORT ?? ""),

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? "",

  DB_PORT: parseInt(process.env.DB_PORT ?? ""),
  DB_HOST: process.env.DB_HOST ?? "",
  DB_USER: process.env.DB_USER ?? "",
  DB_PSWD: process.env.DB_PSWD ?? "",
  DB_NAME: process.env.DB_NAME ?? "",

  SMTP_HOST: process.env.SMTP_HOST ?? "",
  SMTP_PORT: parseInt(process.env.SMTP_PORT ?? ""),
  SMTP_USER: process.env.SMTP_USER ?? "",
  SMTP_PSWD: process.env.SMTP_PSWD ?? "",

  EMAIL_FROM: process.env.EMAIL_FROM ?? "",
  EMAIL_TO: (process.env.EMAIL_TO ?? "").split(", "),

  S3_URL: process.env.S3_URL ?? "",

  MONGO_DB_URI: process.env.MONGO_DB_URI ?? "",

  LOG_FILE: "sms-forms.log",
};

export default Env;
