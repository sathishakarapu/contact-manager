const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/register", async (req,res) => {
    const {email,password,confirmPassword} = req.body;

    // checks all the missing fields
    if(!email || !password || !confirmPassword) {
        res.status(400).json({error:"please enter all the required field"});
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // email validation
    if(!emailReg.test(email)) {
        res.status(400).json({error:"please enter a valid email address"});
    }

    // validation of password
    if(password.length < 8) {
        res.status(400).json({error:"password must be atleast 8 characters long"});
    }

    // validate confirm password
    if(password !== confirmPassword) {
        res.status(400).json({error:"please enter the password correctly"});
    }
    try {
        // if user is already exist
        const userAlreadyExist = await User.findOne({email});

        if(userAlreadyExist) {
            res.status(400).json({error:`user with that email [${email}] is already exists so please try another one`})
        }

        // hashing the password
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email, password: hashPassword });

        // save the user into database
        const result = await newUser.save();

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        return res.status(201).json({...result._doc});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }
})

router.post("/login",async (req,res) => {
    const {email,password} = req.body;
    
    if(!email || !password) {
        res.status(400).json({error:"please enter all the required fields"});
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // email validation
    if(!emailReg.test(email)) {
        res.status(400).json({error:"please enter a valid email address"});
    }

    try{
        const userAlreadyExist = await User.findOne({email});

        if(!userAlreadyExist) {
            res.status(400).json({error:"Invalid email or password!"});
        }

        // if there were user is present
        const doesPasswordMatch = await bcrypt.compare(password,userAlreadyExist.password);

        if(!doesPasswordMatch) {
            res.status(400).json({error:"Invalid email or password!"});
        }

        const payload = {_id:userAlreadyExist._id};

        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message});
    }
});

module.exports = router;

