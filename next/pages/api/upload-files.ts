import AllMiddleware from "#/middlewares/all.middleware";
import FilesMiddleware from "#/middlewares/files.middleware";
import StorageService from "#/services/storage.service";
import { ApiHandler, ApiMethod, ApiResponse } from "$/types/api.type";

const UploadFiles: ApiHandler = async (req, res, next) => {
  try {
    const files = req.files ?? {};
    const promises: Promise<any>[] = [];

    for (const key in files) {
      promises.push(StorageService.uploadFile(files[key][0]));
    }

    const uploads = await Promise.all(promises);
    const response = ApiResponse.success<string[]>(uploads);
    res.json(response.json);

    next();
  } catch (err) {
    next(err);
  }
};

export default AllMiddleware.basic([
  { handler: FilesMiddleware.files, method: ApiMethod.POST },
  { handler: UploadFiles, method: ApiMethod.POST },
]);

export const config = { api: { bodyParser: false } };
