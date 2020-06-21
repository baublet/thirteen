import { getConfigForCurrentEnvironment } from "../config/db";

export async function createDatabase() {
  await getConfigForCurrentEnvironment().create();
}
