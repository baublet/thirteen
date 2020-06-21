module.exports = {
  roots: ["./packages"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "((\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
