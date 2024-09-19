const db = require("../database/db");
const createTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      ownername VARCHAR(255) NOT NULL,
      recipename VARCHAR(255) NOT NULL,
      description LONGTEXT NULL,
      steps LONGTEXT NULL,
      contactname VARCHAR(255),
      contactphonenumber VARCHAR(25),
      dateposted TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      likes INT NULL
    )
  `;
    await db.execute(query);
};

const insertRecipe = async (ownername,recipename,description,steps,contactname,contactphonenumber,likes, userId) => {
    const query = "INSERT INTO orders(ownername,recipename,description,steps,contactname,contactphonenumber, likes, userId) VALUE(?,?,?,?,?,?,?,?)";
    const [result] = await db.execute(query, [ownername,recipename,description,steps,contactname,contactphonenumber,likes,userId]);
    return result.insertId;
};

const updateRecipe = async (ownername,recipename,description,steps,contactname,contactphonenumber,likes,userId) => {
    const query = 'UPDATE orders SET ownername=?,recipename=?,description=?,steps=?,contactname=?,contactphonenumber=?,likes=? WHERE userId = ?';
    const [result] = await db.execute(query, [ownername,recipename,description,steps,contactname,contactphonenumber,likes,userId]);
    return result.affectedRows;
};

const getAllRecipies = async (userId) => {
  const query = 'SELECT * FROM orders WHERE userId = ?';
  const [rows] = await db.execute(query, [userId]);
  return rows;
}

module.exports = {
  createTable,
  insertRecipe,
  updateRecipe,
  getAllRecipies

}