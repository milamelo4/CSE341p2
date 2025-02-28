const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("../swagger/swaggerDefinition");
const userDocs = require("../swagger/userDocs");
const bookDocs = require("../swagger/bookDocs");

const swaggerDocs = {
  ...swaggerDefinition,
  paths: {
    ...userDocs,
    ...bookDocs,
  },
  definitions: {
    User: {
      type: "object",
      properties: {
        firstName: { type: "string", example: "John" },
        lastName: { type: "string", example: "Doe" },
        email: { type: "string", example: "johndoe@example.com" },
        role: { type: "string", enum: ["user", "admin"], example: "user" },
      },
      required: ["firstName", "lastName", "email"],
    },
    Book: {
      type: "object",
      properties: {
        title: { type: "string", example: "The Power of Habit" },
        author: { type: "string", example: "Charles Duhigg" },
        genre: { type: "string", example: "Self-Help" },
        publishedYear: { type: "integer", example: 2012 },
        ISBN: { type: "string", example: "9780812981605" },
        rating: { type: "number", example: 4.6 },
        summary: {
          type: "string",
          example: "A book about habits and how to change them.",
        },
      },
      required: ["title", "author", "genre", "publishedYear", "ISBN"],
    },
    ErrorResponse: {
      type: "object",
      properties: {
        success: { type: "boolean", example: false },
        message: { type: "string", example: "Validation failed" },
        errors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              field: { type: "string", example: "email" },
              message: { type: "string", example: "Email is required" },
            },
          },
        },
      },
    },
  },
};

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
