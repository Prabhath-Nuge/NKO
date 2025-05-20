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
        const users = await User.find({ type: "user" }).sort({ createdAt: -1 });
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
        const users = await User.find({ type: "manager" }).sort({ createdAt: -1 });
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

export const getAdmins = async (req, res) => {
    const user = req.session.user;


    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Unauthorized'
        });
    };

    if (user.type == 'admin') {
        const users = await User.find({ type: "admin" }).sort({ createdAt: -1 });
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

export const getRefs = async (req, res) => {
    const user = req.session.user;


    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Unauthorized'
        });
    };

    if (user.type == 'admin' || user.type == 'manager') {
        const users = await User.find({ type: "ref" }).sort({ createdAt: -1 });
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

export const updateUser = async (req, res) => {
    try {
        const { id, name, email, phone, address, dob, type } = req.body;
        const user = req.session.user;

        if (!id || !name || !email || !phone || !address || !dob || !type) {
            return res.status(400).json({
                error: true,
                message: 'All fields are required'
            });
        }

        const newuser = await User.findById(id);
        if (!newuser) {
            return res.status(404).json({
                error: true,
                message: 'User not found'
            });
        };

        if (user.type == 'admin') {
            newuser.name = name;
            newuser.email = email;
            newuser.phone = phone;
            newuser.address = address;
            newuser.dob = dob;
            newuser.type = type;

            await newuser.save();

            return res.status(200).json({
                error: false,
                message: 'User updated successfully'
            });
        };
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'An error occurred. Please try again'
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.session.user;

        if (!id) {
            return res.status(400).json({
                error: true,
                message: 'Data not found'
            });
        }

        const newuser = await User.findById(id);
        if (!newuser) {
            return res.status(404).json({
                error: true,
                message: 'User not found'
            });
        };

        if (user.type == 'admin') {
            await User.findByIdAndDelete(id);
            return res.status(200).json({
                error: false,
                message: 'User deleted successfully'
            });
        };
        res.status(401).json({
            error: true,
            message: 'Unauthorized'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'An error occurred. Please try again'
        });
    }
}

export const logout = async (req, res) => {
    const user = req.session.user;    

    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Unauthorized'
        });
    };

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: 'An error occurred. Please try again'
            });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({
            error: false,
            message: 'User logged out successfully'
        });
    });
}