import { dropDatabase, createDatabase, migrate } from "./packages/server";

async function setup() {
  await dropDatabase();
  await createDatabase();
  await migrate();
}

setup()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
