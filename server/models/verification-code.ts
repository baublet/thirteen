import db from "../config/db";
import { QueryTypes } from "sequelize";
import { ModelError } from ".";
import generateCode from "../../shared/helpers/generate-code";

export interface VerificationCode {
  id: number;
  code: string;
}

export default {
  create: async (): Promise<VerificationCode | ModelError> => {
    let codeIsUnique = false;
    let code = generateCode();
    console.log(code);
    while (!codeIsUnique) {
      const existingCode = await db.query(
        `SELECT * FROM verification_codes WHERE code = ? LIMIT 1`,
        {
          replacements: [code],
          type: QueryTypes.SELECT
        }
      );
      console.log(existingCode)
      if(existingCode.length == 0) {
        codeIsUnique = true;
      } else {
        code = generateCode();
      }
    }
    const insertedCode = await db.query(
      `INSERT INTO verification_codes (code) VALUES (?) RETURNING *`,
      {
        replacements: [code],
        type: QueryTypes.INSERT
      }
    );
    console.log(insertedCode);
    return insertedCode[0][0];
  },
  findByCodeOrId: async ({ id = undefined, code = undefined }) => {}
};
