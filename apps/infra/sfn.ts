import { gltfStorage } from "./storage";

// Defineds a step function to actually do the analysis
const pass = sst.aws.StepFunctions.pass({ name: "Pass" });

const validateGltf = sst.aws.StepFunctions.lambdaInvoke({
  name: "ValidateGltf",
  function: {
    handler: "apps/validation/src/app.handler",
    link: [gltfStorage],
  },
});

const succeed = sst.aws.StepFunctions.succeed({ name: "Succeed" });
const fail = sst.aws.StepFunctions.fail({ name: "Fail" });

validateGltf.catch(fail);

const definition = pass.next(validateGltf).next(succeed);

export const gltfAnalysisAgentSfn = new sst.aws.StepFunctions(
  "GltfAnalysisAgentSfn",
  {
    definition,
  }
);
