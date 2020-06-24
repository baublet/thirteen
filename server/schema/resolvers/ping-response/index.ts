import { databaseHealth } from "./database-health";
import { databaseVersion } from "./database-version";
import { requestId } from "./request-id";
import { response } from "./response";

export const PingResponse = {
  databaseHealth,
  databaseVersion,
  requestId,
  response,
};
