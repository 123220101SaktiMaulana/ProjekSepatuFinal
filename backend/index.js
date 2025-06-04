// shoe-store-backend/src/index.js (new unified entry point)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Impor semua model dan fungsi syncDatabase dari index.js di folder models
import {
    syncDatabase
} from './models/all.js';

// Impor semua rute yang sudah ada
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import utilityRoutes from './routes/utilityRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Import userRoutes


dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Untuk parsing body JSON
// Gunakan CORS yang fleksibel untuk development dan Cloud Run (default Cloud Run adalah 8080)
// Untuk production, Anda bisa membatasi origin jika diperlukan
app.use(cors());

// Rute-rute aplikasi Anda
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
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
// Pastikan semua model di models/index.js sudah terdaftar
syncDatabase();

// Menentukan PORT aplikasi
// Cloud Run akan menyuntikkan variabel lingkungan PORT (biasanya 8080)
// Di lokal, akan menggunakan 5000 jika tidak ada PORT env var
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});