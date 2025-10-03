import { gltfStorage } from "./storage";
import { gltfAnalysisAgentSfn } from "./sfn";

// Add S3 notification to trigger Step Functions
gltfStorage.notify({
  notifications: [
    {
      name: "gltfStorageNotification",
      function: {
        handler: "apps/triggerSfn/src/app.handler",
        link: [gltfAnalysisAgentSfn],
      },
    },
  ],
});
