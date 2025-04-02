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
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                error: true,
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                error: true,
                message: 'Incorrect password'
            });
        }

        req.session.user = user;

        return res.status(200).json({
            error: false,
            message: 'User logged in successfully',
            data: user
        });
        
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'An error occurred. Please try again'
        });
    }
};

export const getNewUsers = async (req, res) => {
    const user = req.session.user;
    
    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Unauthorized'
        });
    };

    if (user.type == 'admin') {
        const users = await User.find({type:"user"}).sort({ createdAt: -1 });
        return res.status(200).json({
            error: false,
            data: users
        });
    };

    res.status(401).json({
        error: true,
        message: 'Unauthorized'
    });
};

export const getManagers = async (req, res) => {
    const user = req.session.user;
    
    
    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Unauthorized'
        });
    };

    if (user.type == 'admin') {        
        const users = await User.find({type:"manager"}).sort({ createdAt: -1 });
        return res.status(200).json({
            error: false,
            data: users
        });
    };

    res.status(401).json({
        error: true,
        message: 'Unauthorized'
    });
};