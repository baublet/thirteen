export default async function validatePassword(
  password: string
): Promise<boolean> {
  if (password.length < 6) return false;
  return true;
}
