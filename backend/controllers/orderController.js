import Order from '../models/Order.js';
import Product from '../models/product.js'; // Pastikan huruf p kecil jika nama filenya product.js
import User from '../models/User.js'; // Untuk include user data in order history

export const createOrder = async (req, res) => {
    const {
        product_id,
        quantity,
        shipping_address
    } = req.body;
    const user_id = req.user.id; // Diambil dari token

    if (!product_id || !quantity || !shipping_address) {
        return res.status(400).json({
            message: 'Missing required fields: product_id, quantity, shipping_address'
        });
    }

    try {
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        if (product.stock < quantity) {
            return res.status(400).json({
                message: 'Not enough stock for this product'
            });
        }

        // Kurangi stok produk
        await product.update({
            stock: product.stock - quantity
        });

        const order = await Order.create({
            user_id,
            product_id,
            quantity,
            price_at_purchase: product.price, // Simpan harga saat pembelian
            shipping_address,
            status: 'completed', // Bisa juga 'pending' jika ada pembayaran asli
        });

        res.status(201).json({
            message: 'Order placed successfully',
            order
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            message: 'Server error placing order',
            error: error.message
        });
    }
};

export const getOrders = async (req, res) => {
    const user_id = req.user.id;
    try {
        const orders = await Order.findAll({
            where: {
                user_id
            },
            include: {
                model: Product,
                attributes: ['id', 'name', 'description', 'price', 'stock', 'brand', 'image_url']
            },
            order: [
                ['order_date', 'DESC']
            ]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({
            message: 'Server error fetching orders',
            error: error.message
        });
    }
};