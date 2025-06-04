import {
    DataTypes
} from 'sequelize';
import db from '../config/db.js';

const ShoeStore = db.define('ShoeStore', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
}, {
    tableName: 'shoe_stores',
    timestamps: true,
    underscored: true,
});

export default ShoeStore;