import VerificationCodeModel from "./verification-code";
import db from "../config/db";
import { isModelError } from ".";

beforeEach(async () => {
  await db.query(`TRUNCATE TABLE verification_Codes CASCADE`);
});

it("creates and reads a user", async () => {
  const code = await VerificationCodeModel.create();
  if (isModelError(code)) throw `Error creating a user: ${code.errorMessage}`;
  expect(code.code).toBeTruthy();
  expect(typeof code.code).toBe("string");

  const codeFromDb = await VerificationCodeModel.findByCode({
    code: code.code
  });
  if (isModelError(codeFromDb)) throw codeFromDb.errorMessage;
  expect(codeFromDb.code).toBe(code.code);
});

it("reads a user", async () => {
  const code = await VerificationCodeModel.create();
  if (isModelError(code)) throw `Error creating a user: ${code.errorMessage}`;
  expect(code.code).toBeTruthy();
  expect(typeof code.code).toBe("string");
});
