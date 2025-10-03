import { SFNClient, StartExecutionCommand } from "@aws-sdk/client-sfn";
import { Resource } from "sst";

export const handler = async (event: any) => {
  console.log("Step function triggered with event:", JSON.stringify(event));
  const sfnClient = new SFNClient({});

  // Process each record in the event
  for (const record of event.Records) {
    // Extract bucket and key from S3 event
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;

    const command = new StartExecutionCommand({
      stateMachineArn: Resource.GltfAnalysisAgentSfn.arn,
      input: JSON.stringify({ bucket, key }),
      name: `${key}-${Date.now()}`,
    });

    const response = await sfnClient.send(command);
    console.log("Step function execution response:", JSON.stringify(response));
  }
};
