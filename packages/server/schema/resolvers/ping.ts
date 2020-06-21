export async function ping(): Promise<{
  response: string;
}> {
  return {
    response: "pong",
  };
}
