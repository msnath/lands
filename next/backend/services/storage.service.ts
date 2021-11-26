import Logger from "#/configs/logger.config";
import { S3 } from "aws-sdk";
import Aws from "#/configs/aws.config";
import fs from "fs";
import Env from "#/configs/env.config";
import multiparty from "multiparty";

const uploadFile = async (file: multiparty.File) => {
  const environment = Env.ENV.isProduction ? "Production" : "Staging";
  const fileContent = fs.readFileSync(file.path);

  const fileName = new Date().valueOf() + "-" + file.originalFilename;

  const params: S3.PutObjectRequest = {
    Bucket: "ucpbucket",
    Key: `${environment}/ApplicationFormFiles/${fileName}`,
    Body: fileContent,
    ContentType: file.headers["content-type"],
    ACL: "public-read",
  };

  const data = await Aws.S3.upload(params).promise();
  Logger.info(data.Location);

  return { id: file.fieldName, url: data.Location };
};

const StorageService = { uploadFile };

export default StorageService;
