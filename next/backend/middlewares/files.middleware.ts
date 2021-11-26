import { ApiHandler } from "$/types/api.type";
import { Codes, Exception } from "$/types/error.type";
import multiparty from "multiparty";

const files: ApiHandler = async (req, _, next) => {
  try {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
      if (err) {
        throw Exception.internal(
          Codes.INTERNAL_SERVER_ERROR,
          JSON.stringify(err)
        );
      }

      req.body = fields;
      req.files = files;
      next();
    });
  } catch (err) {
    next(err);
  }
};

const FilesMiddleware = { files };

export default FilesMiddleware;
