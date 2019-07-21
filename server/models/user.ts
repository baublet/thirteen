import db from "../config/db";
import { QueryTypes } from "sequelize";
import { ModelError } from ".";
import validatePassword from "../../shared/validators/password";

interface User {
  id: number;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export default {
  create: async ({
    email,
    password,
    username = null
  }): Promise<User | ModelError> => {
    if (!(await validatePassword(password))) {
      return {
        errorMessage: "Password is not strong enough"
      };
    }
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
      `INSERT INTO users (email, passwordHash, username) VALUES (?, ?, ?)`,
      {
        replacements: [email, password, username],
        type: QueryTypes.INSERT
      }
    );
    return insertedUser as User;
  }
};
