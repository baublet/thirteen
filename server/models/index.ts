export interface ModelError {
  errorMessage: string;
}

export function isModelError(obj: any | ModelError): obj is ModelError {
  if(!obj) return false;
  return (obj as ModelError).errorMessage !== undefined;
}

export default {
  user: import("./user")
};
