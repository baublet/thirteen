export const jwt = {
  secret: process.env.JWT_SECRET || "not-that-secret",
  adminUsername: process.env.ADMIN_USERNAME || "admin",
  adminPassword: process.env.ADMIN_PASSWORD || "admin",
  expiryDelta: 31622400, // 1 year in seconds
};
