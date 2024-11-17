const { Router } = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = Router();

//API Routes
authRouter.post("/register", async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
  if (!username || !password || !firstname || !lastname) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // ตรวจสอบว่ามีผู้ใช้ที่มี username นี้อยู่หรือไม่
    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // เข้ารหัสรหัสผ่าน ตรงpassword
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างคำสั่ง SQL สำหรับการแทรกข้อมูล
    const result = await pool.query(
      "INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, hashedPassword, firstname, lastname]
    );

    const newUser = result.rows[0]; // รับข้อมูลผู้ใช้ที่ถูกแทรก
    res.status(201).json(newUser); // ส่งกลับข้อมูลผู้ใช้ที่ถูกสร้าง
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error inserting user." });
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = userQuery.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // ตรวจสอบรหัสผ่าน
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // สร้าง JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      process.env.SECRET_KEY || "default_secret", // ใช้ SECRET_KEY จาก environment variable
      { expiresIn: "15m" } // กำหนดอายุ Token (15 นาที)
    );

    return res.json({
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.error("Error in /login:", error.message);
    res.status(500).json({ message: "Error logging in." });
  }
});

// Swagger Comments
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing username or password
 *       401:
 *         description: Invalid password
 *       500:
 *         description: Server error
 */

module.exports = authRouter;
