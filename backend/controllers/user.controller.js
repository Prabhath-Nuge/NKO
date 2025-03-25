import hashPasswordWithGeneratedSalt from "../functions/bcrypt.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const userRegister = async (req, res) => {
    const { name, email, phone, address, dob, password } = req.body;

    if (!name || !email || !password || !dob || !address || !phone) {
        return res.status(400).json({
            error: true,
            message: 'All fields are required'
        });
    }

    const hashedPassword = await hashPasswordWithGeneratedSalt(password);

    const user = new User({
        name,
        email,
        phone,
        address,
        dob,
        password: hashedPassword
    });

    await user.save();

    res.status(201).json({
        error: false,
        message: 'User registered successfully'
    });

};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: 'All fields are required'
        });
    }

    try {
        const userDets = await User.findOne({ email: email });

        if (!userDets) {
            return res.status(401).json({
                error: true,
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, userDets.password);

        if (!isMatch) {
            return res.status(401).json({
                error: true,
                message: 'Incorrect password'
            });
        }

        res.status(200).json({
            error: false,
            message: 'User logged in successfully',
            data: userDets
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'An error occurred. Please try again'
        });
    }
};
