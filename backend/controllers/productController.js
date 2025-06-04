import Product from '../models/product.js'; // Import model Product
import {
    Op
} from 'sequelize'; // Untuk operator pencarian

export const getProducts = async (req, res) => {
    try {
        const {
            search,
            brand,
            min_price,
            max_price
        } = req.query;
        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [{
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    description: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    brand: {
                        [Op.like]: `%${search}%`
                    }
                },
            ];
        }
        if (brand) {
            whereClause.brand = brand;
        }
        if (min_price) {
            whereClause.price = {
                ...whereClause.price,
                [Op.gte]: parseFloat(min_price)
            };
        }
        if (max_price) {
            whereClause.price = {
                ...whereClause.price,
                [Op.lte]: parseFloat(max_price)
            };
        }

        const products = await Product.findAll({
            where: whereClause
        });
        res.status(200).json(products);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            message: 'Server error fetching products',
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Get product by ID error:', error);
        res.status(500).json({
            message: 'Server error fetching product',
            error: error.message
        });
    }
};

// Opsional: Untuk admin menambah/mengedit produk
// export const createProduct = async (req, res) => { /* ... */ };
// export const updateProduct = async (req, res) => { /* ... */ };
// export const deleteProduct = async (req, res) => { /* ... */ };