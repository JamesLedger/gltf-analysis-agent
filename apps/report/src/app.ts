import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

type Payload = {
  bucket: string;
  key: string;
};

// Handler for the report function, responsible for downloading the GLTF file and generating a report via gltf transform
export async function handler(event: Payload) {
  console.log("Input:", event);

  const bucket = event.bucket;
  const key = event.key;

  console.log(bucket, key);

  const gltf = await downloadGltf(bucket, key);

  const report = await generateReport(gltf);

  return {
    statusCode: 200,
    body: JSON.stringify({ report }),
  };
}

// Gets the GLTF file from S3
const downloadGltf = async (bucket: string, key: string) => {
  const s3 = new S3Client({});
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  const response = await s3.send(command);
  return response.Body;
};

type report = {
  size: number;
};

// Generates a report from the GLTF file
const generateReport = async (gltf: any): Promise<report> => {
  return gltf.size;
};
