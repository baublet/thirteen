import UserModel from "./user";

it("successfully creates a user", async () => {
  const user = await UserModel.create({
    email: "jonathan@van.ness.com",
    password: "some random password",
    username: "JONATHAN!"
  })
  console.log(user);
})