let id = 0;

export default async function SignUp({ email, password }) {
  return {
    id: id++,
    email,
    password
  }
}