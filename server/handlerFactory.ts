interface Event {
  path: string;
  httpMethod: string;
  headers: Record<string, string>;
  queryStringParameters: Record<string, string>;
  body: string;
  isBase64Encoded: boolean;
}

interface CallbackReturnParams {
  isBase64Encoded: boolean;
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

type CallbackFunction = (
  error: string | null,
  returnValues: CallbackReturnParams
) => void;

type HandlerFunction = (event: Event) => Promise<CallbackReturnParams>;

export default (handler: HandlerFunction) => (
  event: Event,
  callback: CallbackFunction
) => {
  return new Promise(async resolve => {
    callback(null, await handler(event));
  }).catch(e =>
    callback(e, {
      isBase64Encoded: false,
      statusCode: 500,
      body: JSON.stringify({ error: e }),
      headers: {}
    })
  );
};
