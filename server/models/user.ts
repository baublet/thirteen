import db from "../config/db";
import { QueryTypes } from "sequelize";
import { ModelError } from ".";

export interface User {
  id: number;
  email: string;
  displayName: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserInDb {
  id: number;
  email: string;
  display_name: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

const userDbModelToType = (userInDb: UserInDb): User => ({
  id: userInDb.id,
  email: userInDb.email,
  displayName: userInDb.display_name,
  passwordHash: userInDb.password_hash,
  createdAt: userInDb.created_at,
  updatedAt: userInDb.updated_at
});

const findByIds = async ({
  ids
}: {
  ids: number[];
}): Promise<Array<User | ModelError>> => {
  const users = await db.query(`SELECT * FROM users WHERE id IN (?)`, {
    replacements: [ids],
    type: QueryTypes.SELECT
  });
  return users.map((user: UserInDb) => userDbModelToType(user));
};

export default {
  create: async ({
    email,
    passwordHash,
    displayName = null
  }): Promise<User | ModelError> => {
    email = email.toLowerCase();
    const existingUsers = await db.query(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      {
        replacements: [email],
        type: QueryTypes.SELECT
      }
    );
    if (existingUsers.length) {
      return {
        errorMessage: "User already exists"
      };
    }
    const insertedUser = await db.query(
      `INSERT INTO users (email, password_hash, display_name) VALUES (?, ?, ?) RETURNING *`,
      {
        replacements: [email, passwordHash, displayName],
        type: QueryTypes.INSERT
      }
    );
    return userDbModelToType(insertedUser[0][0]);
  },
  findByIds,
  findById: async ({ id }: { id: number }): Promise<User | ModelError> =>
    (await findByIds({ ids: [id] }))[0]
};
