import {
    verifyToken
} from '../utils/helpers.js';
import db from '../config/db.js'; // Import sequelize instance
import {
    DataTypes
} from 'sequelize';

// Define User model inline for middleware to avoid circular dependency
// In a real app, import from models/User.js
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    full_name: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone_number: DataTypes.STRING,
}, {
    tableName: 'users', // Pastikan nama tabel benar
    timestamps: true,
    underscored: true // created_at, updated_at
});


export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verifyToken(token);
            req.user = await User.findByPk(decoded.id, {
                attributes: {
                    exclude: ['password']
                }
            });
            if (!req.user) {
                return res.status(401).json({
                    message: 'Not authorized, user not found'
                });
            }
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({
                message: 'Not authorized, token failed or expired'
            });
        }
    }
    if (!token) {
        return res.status(401).json({
            message: 'Not authorized, no token provided'
        });
    }
};