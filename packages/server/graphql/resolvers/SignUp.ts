import validatePassword from "../../../shared/validators/password";
import UserModel from "../../models/user";
import * as bcrypt from "bcrypt";
import { User } from "../../models/user";
import { ResolverError } from ".";

export default async function SignUp({
  email,
  password
}): Promise<User | ResolverError> {
  return new Promise(async resolve => {
    if (!(await validatePassword(password))) {
      resolve({
        errorMessage: "Password is not strong enough"
      });
    }
    bcrypt.hash(password, 10, async (err, passwordHash) => {
      if (err) {
        return resolve({
          errorMessage: `Encryption error: ${err}`
        });
      }
      const createdUser = await UserModel.create({
        email,
        passwordHash
      });
      resolve(createdUser);
    });
  });
}
