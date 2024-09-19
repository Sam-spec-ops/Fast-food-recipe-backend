const bcrypt = require("bcrypt");
const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'fastfood2024@hhghhe===?'
const userRegistration = async (req, res) => {
    await userModel.createTable();
    const { name, email, password } = req.body;
    const verificationstatus = false;
    const hashedPassword = await bcrypt.hash(password, 8);
    const checkEmail = await userModel.getUserByEmail(email);
    if (checkEmail) {
        res.status(403).json({ message: "Email already exists" });
        return;
    }
    else {
        try {
            const userId = await userModel.insertUser(name, email, hashedPassword, verificationstatus);
            if(!userId) {
                return res.status(201).json({ id: null, message: "failed" });
            }
            res.status(201).json({ id: userId, message: "successful" });
        } catch (error) {
            console.log(error);
        }
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const getrows = await userModel.getUserByEmail(email);
    if (!getrows) {
        res.status(403).json({ auth: false, token: null, message: "User not found" });
        return
    }
    const isPasswordValid = await bcrypt.compareSync(password, getrows.password);
    if (!isPasswordValid) {
        res.status(403).json({ message: "Invalid Password" });
        return;
    }
    console.log(getrows.id)
    const token = jwt.sign({ id: getrows.id }, SECRET_KEY, { expiresIn: 86400 }); // 24 hours
    res.status(201).json({ auth: true, token: token, message: "successful" });
};

module.exports = {
    userRegistration,
    userLogin
}