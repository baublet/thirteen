import path from "path";
import fs from "fs";
import env from "dotenv";

import { start } from "./express";

const envPath = path.resolve(__dirname, "..", "..", ".env");
const exampleEnvPath = path.resolve(__dirname, "..", "..", ".env.example");

if (fs.existsSync(envPath)) {
  env.config({ path: envPath });
} else if (fs.existsSync(exampleEnvPath)) {
  env.config({ path: exampleEnvPath });
} else {
  throw new Error(
    `Cannot boot without either an .env or .env.example in the root.`
  );
}

env.config({ path: envPath || exampleEnvPath });

(async () => await start())();
