import User from '../models/User.js';

export const updateProfile = async (req, res) => {
    const userId = req.user.id; // User ID dari token
    const {
        full_name,
        address,
        phone_number
    } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        user.full_name = full_name || user.full_name;
        user.address = address || user.address;
        user.phone_number = phone_number || user.phone_number;

        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                full_name: user.full_name,
                address: user.address,
                phone_number: user.phone_number,
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            message: 'Server error updating profile',
            error: error.message
        });
    }
};