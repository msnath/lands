import nextConnect, { NextConnect, RequestHandler } from "next-connect";
import ErrorMiddleware from "#/middlewares/error.middleware";
import LoggerMiddleware from "#/middlewares/logger.middleware";
import SecurityMiddleware from "#/middlewares/security.middleware";
import { ApiHandler, ApiMethod } from "$/types/api.type";
import { NextApiRequest, NextApiResponse } from "next";

const chainHandler = (
  chain: NextConnect<NextApiRequest, NextApiResponse<any>>,
  handler: ApiHandler,
  method: ApiMethod
) => {
  if (method === ApiMethod.GET) chain.get(handler);
  else if (method === ApiMethod.POST) chain.post(handler);
  else if (method === ApiMethod.PUT) chain.put(handler);
  else if (method === ApiMethod.DELETE) chain.delete(handler);
  else if (method === ApiMethod.PATCH) chain.patch(handler);

  return chain;
};

const basic = (
  connections:
    | { handler: ApiHandler | RequestHandler<any, any>; method: ApiMethod }
    | { handler: ApiHandler | RequestHandler<any, any>; method: ApiMethod }[]
) => {
  const chain = nextConnect(ErrorMiddleware)
    .use(LoggerMiddleware.init)
    .use(SecurityMiddleware.metadata)

  if (Array.isArray(connections)) {
    for (const connection of connections)
      chainHandler(chain, connection.handler, connection.method);
  } else {
    chainHandler(chain, connections.handler, connections.method);
  }

  chain.use(LoggerMiddleware.success);

  return chain;
};

const AllMiddleware = { basic };

export default AllMiddleware;
