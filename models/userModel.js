const db = require("../database/db");
const createTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255)  NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      verificationstatus BOOLEAN NULL,
      otp VARCHAR(6) NULL,
      expireAt TIMESTAMP NULL
    )
  `;
    await db.execute(query);
};
const insertUser = async (name, email, hashedPassword, verificationstatus) => {
    const query = "INSERT INTO users(name, email, password, verificationstatus) VALUE(?,?,?,?)";
    const [result] = await db.execute(query, [name, email, hashedPassword, verificationstatus]);
    return result.insertId;
};

const getUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0];
};

module.exports = {
  createTable,
  insertUser,
  getUserByEmail
}