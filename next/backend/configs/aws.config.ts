import aws from "aws-sdk";

aws.config.update(
  new aws.Config({ region: "us-east-2", httpOptions: { timeout: 900000 } })
);

const S3 = new aws.S3();

const Aws = { S3 };

export default Aws;
