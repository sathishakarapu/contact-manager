const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/signup", async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // checks all the missing fields
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ error: "please enter all the required fields" });
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // email validation
    if (!emailReg.test(email)) {
        return res.status(400).json({ error: "please enter a valid email address" });
    }

    // validation of password
    if (password.length < 8) {
        return res.status(400).json({ error: "password must be at least 8 characters long" });
    }

    // validate confirm password
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "please enter the password correctly" });
    }

    try {
        // Check if user already exists
        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ error: `user with email ${email} already exists, please try another one` });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 12);
        
        // Create a new user
        const newUser = new User({ email, password: hashPassword });

        // Save the user into the database
        const result = await newUser.save();

        res.status(201).json({ message: "User registered successfully",...result._doc });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "please enter all the required fields" });
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // email validation
    if (!emailReg.test(email)) {
        return res.status(400).json({ error: "please enter a valid email address" });
    }

    try {
        // Find user by email
        const userAlreadyExist = await User.findOne({ email });

        // If user doesn't exist
        if (!userAlreadyExist) {
            return res.status(400).json({ error: "User not found" });
        }

        // Check if passwords match
        const doesPasswordMatch = await bcrypt.compare(password, userAlreadyExist.password);
        if (!doesPasswordMatch) {
            return res.status(400).json({ error: "Invalid email or password!" });
        }

        // Generate JWT token
        const payload = { _id: userAlreadyExist._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ token });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;