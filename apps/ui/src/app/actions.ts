"use server";

import { Resource } from "sst";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getUploadUrl(filename: string) {
  const key = `${crypto.randomUUID()}-${filename}`;

  const command = new PutObjectCommand({
    Key: key,
    Bucket: Resource.gltfStorage.name,
  });

  const url = await getSignedUrl(new S3Client({}), command);

  return { url, key };
}
