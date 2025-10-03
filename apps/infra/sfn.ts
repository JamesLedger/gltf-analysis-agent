import { gltfStorage } from "./storage";

// Defineds a step function to actually do the analysis
const pass = sst.aws.StepFunctions.pass({
  name: "Pass",
  assign: {
    bucket: "{% $states.input.bucket %}",
    key: "{% $states.input.key %}",
  },
});

const reportGltf = sst.aws.StepFunctions.lambdaInvoke({
  name: "ReportGltf",
  function: {
    handler: "apps/report/src/app.handler",
    link: [gltfStorage],
  },
  payload: {
    bucket: "{% $bucket %}",
    key: "{% $key %}",
  },
});

const succeed = sst.aws.StepFunctions.succeed({ name: "Succeed" });
const fail = sst.aws.StepFunctions.fail({ name: "Fail" });

reportGltf.catch(fail);

const definition = pass.next(reportGltf).next(succeed);

export const gltfAnalysisAgentSfn = new sst.aws.StepFunctions(
  "GltfAnalysisAgentSfn",
  {
    definition,
  }
);
