const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { 
            username,
            email,
            password 
        } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newUser = new User({
            username,
            email,
            password: password
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    }
    catch (error) {
        console.error('Error during user signup:', error);
        res.status(500).json({ message: 'Server error, please try again.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({ message: 'Login successful!' });

    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error, please try again.' });
    }
});

module.exports = router;