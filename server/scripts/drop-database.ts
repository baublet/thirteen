import { getConfigForCurrentEnvironment } from "../config/db";

export async function dropDatabase() {
  await getConfigForCurrentEnvironment().drop();
}
