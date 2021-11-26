import Env from "#/configs/env.config";
import "#/configs/logger.config";
import Logger from "#/configs/logger.config";
import { ApiHandler } from "$/types/api.type";

const init: ApiHandler = async (_, __, next) => {
  try {
    Logger.info(`${Env.ENV.capitalized} Server`);
    next();
  } catch (err) {
    next(err);
  }
};

const success: ApiHandler = async (req, _, next) => {
  try {
    return Logger.success(req);
  } catch (err) {
    return next(err);
  }
};

const LoggerMiddleware = { init, success };

export default LoggerMiddleware;
