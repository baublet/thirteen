interface Event {
  path: string;
  httpMethod: string;
  headers: Record<string, string>;
  queryStringParameters: Record<string, string>;
  body: string;
  isBase64Encoded: boolean;
}
