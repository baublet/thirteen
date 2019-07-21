import db from "../config/db";
import { QueryTypes } from "sequelize";
import { ModelError } from ".";
import generateCode from "../../shared/helpers/generate-code";

export interface VerificationCode {
  id: number;
  code: string;
}

const findByCodesOrIds = async ({
  ids = undefined,
  codes = undefined
}: {
  ids?: number[];
  codes?: string[];
}): Promise<VerificationCode | ModelError> => {
  if ((!ids && !codes) || (ids && !ids.length) || (codes && !codes.length)) {
    return {
      errorMessage: ""
    };
  }
  const loadedCodes = await db.query(
    `SELECT * FROM verification_codes WHERE code IN (?) OR id IN (?)`,
    {
      replacements: [codes || [""], ids || [0]],
      type: QueryTypes.SELECT
    }
  );
  return loadedCodes;
};

export default {
  create: async (): Promise<VerificationCode | ModelError> => {
    let codeIsUnique = false;
    let code = generateCode();
    while (!codeIsUnique) {
      const existingCode = await db.query(
        `SELECT * FROM verification_codes WHERE code = ? LIMIT 1`,
        {
          replacements: [code],
          type: QueryTypes.SELECT
        }
      );
      if (existingCode.length == 0) {
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
    return insertedCode[0][0];
  },
  findByCodesOrIds,
  findById: async ({
    id
  }: {
    id: number;
  }): Promise<VerificationCode | ModelError> =>
    (await findByCodesOrIds({ ids: [id] }))[0],
  findByCode: async ({
    code
  }: {
    code: string;
  }): Promise<VerificationCode | ModelError> =>
    (await findByCodesOrIds({ codes: [code] }))[0]
};
