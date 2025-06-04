import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
    syncDatabase,
    User,
    Product,
    Order,
    ShoeStore
} from './models/index.js'; // Import syncDatabase dan modelnya

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import utilityRoutes from './routes/utilityRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Import userRoutes

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Tambahkan userRoutes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/utils', utilityRoutes);

// Error handling middleware (opsional, tapi bagus)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message
    });
});

// Jalankan sinkronisasi database saat aplikasi dimulai
syncDatabase();

export default app;