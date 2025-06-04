import db from '../config/db.js';
import User from './User.js';
import Product from './Product.js';
import Order from './Order.js';
import ShoeStore from './ShoeStore.js';

// Definisikan asosiasi di sini juga jika ada
// Order.belongsTo(User, { foreignKey: 'user_id' }); // Sudah ada di Order.js
// Order.belongsTo(Product, { foreignKey: 'product_id' }); // Sudah ada di Order.js

const syncDatabase = async () => {
    try {
        await db.authenticate();
        console.log('Database connected successfully.');
        // await db.sync({ force: true }); // HATI-HATI: Ini akan drop dan recreate tabel
        await db.sync(); // Gunakan ini setelah tabel pertama kali dibuat
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database or sync models:', error);
    }
};

export {
    syncDatabase,
    User,
    Product,
    Order,
    ShoeStore
};