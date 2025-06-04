import ShoeStore from '../models/ShoeStore.js';
import {
    Op
} from 'sequelize';

// Fungsi Haversine untuk menghitung jarak antara dua koordinat (dalam KM)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius bumi dalam kilometer
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // Jarak dalam kilometer
};

export const getNearbyStores = async (req, res) => {
    const {
        latitude,
        longitude,
        radius_km = 50
    } = req.query; // Default radius 50km
    if (!latitude || !longitude) {
        return res.status(400).json({
            message: 'Latitude and longitude are required.'
        });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({
            message: 'Invalid latitude or longitude.'
        });
    }

    try {
        const stores = await ShoeStore.findAll(); // Ini mengambil semua data toko
        const nearbyStores = stores.map(store => {
                // FOKUS DI SINI: store.latitude dan store.longitude
                const distance = calculateDistance(userLat, userLon, store.latitude, store.longitude);
                return {
                    id: store.id,
                    name: store.name,
                    address: store.address,
                    latitude: store.latitude, // <--- Ini nilai yang diambil langsung dari objek Sequelize
                    longitude: store.longitude, // <--- Ini nilai yang diambil langsung dari objek Sequelize
                    phone_number: store.phone_number,
                    distance_km: parseFloat(distance.toFixed(2))
                };
            }).filter(store => store.distance_km <= radius_km)
            .sort((a, b) => a.distance_km - b.distance_km);

        res.status(200).json(nearbyStores);
    } catch (error) {
        console.error('Get nearby stores error:', error);
        res.status(500).json({
            message: 'Server error fetching nearby stores',
            error: error.message
        });
    }
};

// Opsional: Untuk admin menambah/mengedit toko
// export const createShoeStore = async (req, res) => { /* ... */ };