import {
    Sequelize
} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT, // 'mysql'
        logging: false, // Matikan logging SQL di console
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true, // Pastikan ini true agar created_at/updated_at otomatis
            underscored: true // Gunakan snake_case untuk nama kolom
        }
    }
);

export default sequelize;