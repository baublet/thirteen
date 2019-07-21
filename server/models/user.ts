import db from "../config/db";
import { QueryTypes } from "sequelize";
import { ModelError } from ".";

export interface User {
  id: number;
  email: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserInDb {
  id: number;
  email: string;
  username: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

const userDbModelToType = (userInDb: UserInDb): User => ({
  id: userInDb.id,
  email: userInDb.email,
  username: userInDb.username,
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
    username = null
  }): Promise<User | ModelError> => {
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
      `INSERT INTO users (email, password_hash, username) VALUES (?, ?, ?) RETURNING *`,
      {
        replacements: [email, passwordHash, username],
        type: QueryTypes.INSERT
      }
    );
    return userDbModelToType(insertedUser[0][0]);
  },
  findByIds,
  findById: async ({ id }: { id: number }): Promise<User | ModelError> =>
    (await findByIds({ ids: [id] }))[0]
};
