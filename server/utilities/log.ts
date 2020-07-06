import stringify from "safe-json-stringify";

function isError(obj: any): obj is Error {
  if (typeof obj !== "object") return false;
  if (Object.getOwnPropertyNames(obj).includes("stack")) return true;
  return false;
}

function logError(error: Error): string {
  return stringify({
    message: error.message,
    stackTrace: error.stack,
  });
}

function serializeArguments(data: any[]): string {
  const timestamp = Date.now();
  return (
    `${timestamp}: ` +
    data
      .map((data) => {
        const type = typeof data;
        if (type === "string") return data;
        if (type === "number") return data;
        if (type === "boolean") return data;
        if (type === "bigint") return data;
        if (type === "undefined") return "undefined";
        if (type === "symbol") return "(Symbol)";
        if (isError(data)) return logError(data);
        return stringify(data);
      })
      .join(" ")
  );
}

export function info(...data: any[]) {
  console.log(serializeArguments(data));
}

export function warn(...data: any[]) {
  console.warn(serializeArguments(data));
}

export function error(...data: any[]) {
  console.log(serializeArguments(data));
}

export function debug(...data: any[]) {
  if (process.env.NODE_ENV === "test" || Boolean(process.env.DEBUG)) {
    console.log(serializeArguments(data));
  }
}
