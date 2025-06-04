    import {
        DataTypes
    } from 'sequelize';
    import db from '../config/db.js';
    import User from './User.js'; // Import models
    import Product from './product.js';

    const Order = db.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price_at_purchase: { // Harga saat produk dibeli (penting!)
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        order_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        shipping_address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(50),
            defaultValue: 'completed', // 'completed', 'pending', 'cancelled'
        },
    }, {
        tableName: 'orders',
        timestamps: true,
        underscored: true,
    });

    // Define associations
    Order.belongsTo(User, {
        foreignKey: 'user_id'
    });
    Order.belongsTo(Product, {
        foreignKey: 'product_id'
    });

    export default Order;