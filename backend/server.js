// shoe-store-backend/src/server.js
import app from './app.js'; // Atau const app = require('./app.js');
import dotenv from 'dotenv';

dotenv.config();

// PASTIKAN BARIS INI: Mengambil PORT dari environment variable, fallback ke 5000 jika tidak ada
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});