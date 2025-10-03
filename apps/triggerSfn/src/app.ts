import { SFNClient, StartExecutionCommand } from "@aws-sdk/client-sfn";
import { Resource } from "sst";

export const handler = async (event: any) => {
  console.log("Step function triggered with event:", JSON.stringify(event));
  const sfnClient = new SFNClient({});

  const bucket = "input bucket";
  const key = "input key";

  const command = new StartExecutionCommand({
    stateMachineArn: Resource.GltfAnalysisAgentSfn.arn,
    input: JSON.stringify({ bucket, key }),
  });

  const response = await sfnClient.send(command);
  console.log("Step function execution response:", JSON.stringify(response));
};
