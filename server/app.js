const express = require("express");
const cors = require("cors");
const authRouter = require("./apps/auth");
const bookRouter = require("./apps/books");
const dotenv = require("dotenv");

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");

dotenv.config();
const app = express();
const port = 3000;

//middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/books", bookRouter);

// ใช้ Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
