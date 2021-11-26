import mysql from "mysql2";
import Env from "./env.config";

const pool = mysql
  .createPool({
    connectionLimit: 10,
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    user: Env.DB_USER,
    password: Env.DB_PSWD,
    database: Env.DB_NAME,
    timezone: "Z",
  })
  .promise();

const connect = async () => await pool.getConnection();

const MySQL = { pool, connect };

export default MySQL;
