const express = require("express");
const bookRouter = express.Router();
const pool = require("../db");
const protect = require("../middlewares/protect");

bookRouter.use(protect);

// Get all books
bookRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a book by ID
bookRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add a new book
bookRouter.post("/", async (req, res) => {
  console.log("Received data:", req.body);
  const { title, author, content, imageurl, type } = req.body;

  if (!title || !author || !content || !imageurl || !type) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const result = await pool.query(
      "INSERT INTO books (title, author, content, imageurl, type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, author, content, imageurl, type]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).send("Server Error");
  }
});

// Update a book
bookRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, content, imageurl, type } = req.body;
  try {
    const result = await pool.query(
      "UPDATE books SET title = $1, author = $2, content = $3, imageurl = $4, type = $5 WHERE id = $6 RETURNING *",
      [title, author, content, imageurl, type, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a book
bookRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json({ msg: "Book deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/// Swagger Comments
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book Management API
 */

/**
@swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   content:
 *                     type: string
 *                   imageurl:
 *                     type: string
 *                   type:
 *                     type: string
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Details of the book
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               imageurl:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               imageurl:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */

module.exports = bookRouter;
