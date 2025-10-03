/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "gltf-analysis-agent",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "eu-west-2",
        },
      },
    };
  },
  async run() {
    await import("./apps/infra/storage");
    await import("./apps/infra/sfn");
    await import("./apps/infra/notifications");
    await import("./apps/infra/validation");
    await import("./apps/infra/next");
  },
});
