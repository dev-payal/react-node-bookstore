const express = require('express');
const router = express.Router();
const User = require('../models/User')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
router.use(express.json());
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    console.log(req.body);
    res.send('Welcome to my project. Sign up to create your book store!!')
})

//Sign-up validation
const { registerValidation, loginValidation } = require('../validation');
router.post('/signup', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check whether the user already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email address already exists!')

    //Password hashing with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Creating a new user in database
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUserData = await newUser.save();
        res.send(savedUserData)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//Login
router.post('/login', async (req, res) => {
    //Login validation
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } 

    //*User Verification*//
    //Checking if email exists or not
    const userExistData = await User.findOne({ email: req.body.email });
    if (!userExistData) return res.status(400).send("Email doesn't exist!")
    //Password check
    const validPassword = await bcrypt.compare(req.body.password, userExistData.password);
    if (!validPassword) return res.status(400).send("Incorrect Password!")

    // Creating & assigning JWT token
    const authToken = jwt.sign({ _id: userExistData._id }, process.env.SECRET_TOKEN);
    res.header('auth-token', authToken).json({status: 'Success', user: authToken});
    if(!authToken) return res.json({status: 'Error', user: 'User not found' })
})

module.exports = router;
