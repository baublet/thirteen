import SignUp from "./SignUp";

it("returns a new user", async () => {
  const signUpPayload = {
    email: "boo@radley.com",
    password: "a!passw0rd here!"
  };
  const register = await SignUp(signUpPayload);
  expect(register).toEqual({
    ...signUpPayload,
    id: 0
  })
});
