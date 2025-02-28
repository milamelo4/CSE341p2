module.exports = {
  "/users/register": {
    post: {
      description: "Register a new user",
      parameters: [
        {
          in: "body",
          name: "body",
          description: "User registration details",
          required: true,
          schema: {
            type: "object",
            properties: {
              firstName: { type: "string", example: "John" },
              lastName: { type: "string", example: "Doe" },
              email: { type: "string", example: "johndoe@example.com" },
              password: { type: "string", example: "securePassword123" },
            },
            required: ["firstName", "lastName", "email", "password"],
          },
        },
      ],
      responses: {
        201: { description: "User registered successfully" },
        400: {
          description: "Validation error",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
      },
    },
  },
  "/users/": {
    get: {
      description: "Retrieve all users",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "OK",
          schema: {
            type: "array",
            items: { $ref: "#/definitions/User" },
          },
        },
        500: {
          description: "Internal Server Error",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
      },
    },
  },
  "/users/{id}": {
    get: {
      description: "Retrieve a user by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
        },
      ],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "User retrieved successfully",
          schema: { $ref: "#/definitions/User" },
        },
        400: {
          description: "Invalid ID format",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
        404: {
          description: "User not found",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
      },
    },
    put: {
      description: "Update an existing user (email cannot be updated)",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
        },
        {
          in: "body",
          name: "body",
          description:
            "User object that needs to be updated (email cannot be changed)",
          required: true,
          schema: { $ref: "#/definitions/UserUpdate" },
        },
      ],
      security: [{ bearerAuth: [] }],
      responses: {
        204: { description: "No Content" },
        400: {
          description: "Bad Request - Invalid User ID format",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
        404: {
          description: "Not Found - User does not exist",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
      },
    },
    delete: {
      description: "Delete a user",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
        },
      ],
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: "User deleted successfully" },
        404: {
          description: "Not Found",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
      },
    },
  },
};
