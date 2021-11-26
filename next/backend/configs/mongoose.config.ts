import mongoose from "mongoose";
import Env from "./env.config";

const ID = () => new mongoose.Types.ObjectId();

const connect = async () =>
  await mongoose.connect(Env.MONGO_DB_URI, { maxPoolSize: 10 });

const disconnect = async () => await mongoose.disconnect();

const MongoDB = { ID, connect, disconnect };

export default MongoDB;
