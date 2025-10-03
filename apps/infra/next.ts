import { gltfStorage } from "./storage";

export const gltfAgentUi = new sst.aws.Nextjs("gltfAgentUi", {
  link: [gltfStorage],
  path: "apps/ui/",
});
