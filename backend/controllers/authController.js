import User from '../models/User.js';
import {
    comparePassword,
    generateToken
} from '../utils/helpers.js';

export const registerUser = async (req, res) => {
    const {
        username,
        email,
        password,
        full_name,
        address,
        phone_number
    } = req.body;
    try {
        const userExists = await User.findOne({
            where: {
                email
            }
        });
        if (userExists) {
            return res.status(400).json({
                message: 'User with that email already exists'
            });
        }
        const user = await User.create({
            username,
            email,
            password,
            full_name,
            address,
            phone_number
        });
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                address: user.address,       // <--- TAMBAHKAN INI
                phone_number: user.phone_number, // <--- TAMBAHKAN INI
            },
            token: generateToken(user.id),
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Server error during registration',
            error: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                address: user.address,       // <--- TAMBAHKAN INI
                phone_number: user.phone_number, // <--- TAMBAHKAN INI
            },
            token: generateToken(user.id),
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Server error during login',
            error: error.message
        });
    }
};

export const getMe = (req, res) => {
    res.status(200).json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        full_name: req.user.full_name,
        address: req.user.address,
        phone_number: req.user.phone_number,
    });
};