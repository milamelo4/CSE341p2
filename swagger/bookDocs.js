module.exports = {
  "/books": {
    get: {
      description: "Retrieve all books",
      responses: {
        200: {
          description: "A list of books",
          schema: {
            type: "array",
            items: { $ref: "#/definitions/Book" },
          },
        },
        500: {
          description: "Internal Server Error",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
      },
    },
    post: {
      description: "Create a new book (Protected)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "body",
          name: "body",
          description: "Book details",
          required: true,
          schema: {
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
                example: "How habits shape our lives.",
              },
            },
            required: ["title", "author", "genre", "publishedYear", "ISBN"],
          },
        },
      ],
      responses: {
        201: { description: "Book created successfully" },
        400: {
          description: "Validation error",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
      },
    },
  },
  "/books/{id}": {
    get: {
      description: "Retrieve a book by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "Book retrieved successfully",
          schema: { $ref: "#/definitions/Book" },
        },
        400: {
          description: "Invalid book ID format",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
        404: {
          description: "Book not found",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
      },
    },
    put: {
      description: "Update a book by ID (Protected)",
      security: [{ bearerAuth: [] }],
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
          description: "Updated book details",
          required: true,
          schema: {
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
                example: "How habits shape our lives.",
              },
            },
          },
        },
      ],
      responses: {
        200: { description: "Book updated successfully" },
        400: {
          description: "Validation error",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
        404: {
          description: "Book not found",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
      },
    },
    delete: {
      description: "Delete a book by ID (Protected)",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
        },
      ],
      responses: {
        200: { description: "Book deleted successfully" },
        404: {
          description: "Book not found",
          schema: { $ref: "#/definitions/ErrorResponse" },
        },
      },
    },
  },
};
