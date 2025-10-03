import { gltfStorage } from "./storage";

// Creates a lambda function to validate the GLTF file
export const gltfValidation = new sst.aws.Function("gltf-validation", {
  handler: "apps/validation/src/app.handler",
  runtime: "nodejs20.x",
  memory: "1024 MB",
  timeout: "300 seconds",
  environment: {
    GLTF_STORAGE_BUCKET: gltfStorage.name,
  },
  link: [gltfStorage],
});
