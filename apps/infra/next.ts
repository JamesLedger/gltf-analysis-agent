import { gltfStorage } from "./storage";

// Creates nextjs app to host the uploader UI
export const gltfAgentUi = new sst.aws.Nextjs("gltfAgentUi", {
  link: [gltfStorage],
  path: "apps/ui/",
});
