import stringify from "safe-json-stringify";

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
