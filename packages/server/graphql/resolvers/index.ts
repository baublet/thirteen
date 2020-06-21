export interface ResolverError {
  errorMessage: string;
}

export function isResolverError(
  obj: any | ResolverError
): obj is ResolverError {
  if (!obj) return false;
  return (obj as ResolverError).errorMessage !== undefined;
}

export default {
  hello: () => {
    return "Hello world!";
  }
};
