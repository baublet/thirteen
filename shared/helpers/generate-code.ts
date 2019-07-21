export default function generateCode(count = 6, prepend = "", append = "") {
  const chars = "acdefhkmnqrstuvwxyz0123456789".split("");
  let result = "";
  for (var i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * chars.length);
    result += chars[x];
  }
  return result;
}
