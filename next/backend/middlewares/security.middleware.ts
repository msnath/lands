import Logger from "#/configs/logger.config";
import { ApiHandler } from "$/types/api.type";

const metadata: ApiHandler = async (req, _, next) => {
  try {
    const url = req.url;
    const ip = req.headers["x-forwarded-for"] ?? req.socket.remoteAddress;
    const { origin, referer, host } = req.headers;

    Logger.none(
      `IP: ${ip} | Referer: ${referer} | Origin: ${origin} | Host: ${host} | URL: ${url}`
    );
    next();
  } catch (err) {
    next(err);
  }
};

const SecurityMiddleware = { metadata };

export default SecurityMiddleware;
