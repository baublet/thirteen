import { getConnection } from "../config/db";

export async function migrate() {
  const connection = await getConnection();
  await connection.migrate.latest();
  // await connection.seed.run();
}
