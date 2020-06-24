import { PingResponse } from "./ping-response";

export const root = {
  PingResponse,
  Query: {
    ping: () => ({}),
  },
};
