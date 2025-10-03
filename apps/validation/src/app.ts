import { APIGatewayProxyEvent, Context } from "aws-lambda";

export function handler(event: APIGatewayProxyEvent, context: Context) {
  console.log("Input:", event);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, world!" }),
  };
}
