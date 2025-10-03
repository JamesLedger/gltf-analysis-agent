// Creates an S3 bucket to store the GLTF files
export const gltfStorage = new sst.aws.Bucket("gltfStorage");
