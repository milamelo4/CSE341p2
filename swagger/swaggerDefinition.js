module.exports = {
  swagger: "2.0",
  info: {
    title: "Books & Users API",
    description: "API documentation for managing books and users",
    version: "1.0.0",
  },
  host: "cse341p2-mokj.onrender.com", // Change if needed cse341p2-mokj.onrender.com
  basePath: "/",
  schemes: ["https"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "JWT Authorization header using the Bearer scheme. Format: Bearer {token}",
    },
  },
  security: [{ bearerAuth: [] }],
};
