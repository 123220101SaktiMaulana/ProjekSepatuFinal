import {
    CURRENCY_RATES,
    TIME_ZONES
} from '../utils/constants.js';
import moment from 'moment-timezone'; // Akan butuh instal 'moment-timezone'

// Instal moment-timezone: npm install moment-timezone

export const getCurrencyRates = (req, res) => {
    res.status(200).json({
        base: 'IDR', // Basis mata uang
        rates: CURRENCY_RATES,
        message: 'Currency rates are static and updated manually.'
    });
};

export const convertCurrency = (req, res) => {
    const {
        amount,
        from,
        to
    } = req.query;

    if (!amount || !from || !to) {
        return res.status(400).json({
            message: 'Amount, from, and to currencies are required.'
        });
    }
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({
            message: 'Invalid amount.'
        });
    }
    if (!CURRENCY_RATES[from.toUpperCase()] || !CURRENCY_RATES[to.toUpperCase()]) {
        return res.status(400).json({
            message: 'Invalid "from" or "to" currency code.'
        });
    }

    const baseAmount = parseFloat(amount) / CURRENCY_RATES[from.toUpperCase()]; // Konversi ke IDR
    const convertedAmount = baseAmount * CURRENCY_RATES[to.toUpperCase()];

    res.status(200).json({
        original_amount: parseFloat(amount),
        from_currency: from.toUpperCase(),
        to_currency: to.toUpperCase(),
        converted_amount: parseFloat(convertedAmount.toFixed(4)), // Bulatkan 4 angka
        message: `Converted from ${from.toUpperCase()} to ${to.toUpperCase()}. Rates are static.`
    });
};

export const convertTime = (req, res) => {
    const {
        datetime,
        from_tz,
        to_tz
    } = req.query; // datetime format ISO 8601 (e.g., 2025-05-31T07:24:08+07:00)

    if (!datetime || !from_tz || !to_tz) {
        return res.status(400).json({
            message: 'Datetime, from_tz, and to_tz are required.'
        });
    }
    if (!TIME_ZONES[from_tz.toUpperCase()] || !TIME_ZONES[to_tz.toUpperCase()]) {
        return res.status(400).json({
            message: 'Invalid "from" or "to" timezone code.'
        });
    }

    try {
        const sourceTimezone = TIME_ZONES[from_tz.toUpperCase()];
        const targetTimezone = TIME_ZONES[to_tz.toUpperCase()];

        const momentDate = moment.tz(datetime, sourceTimezone);
        const convertedDate = momentDate.clone().tz(targetTimezone);

        res.status(200).json({
            original_datetime: datetime,
            from_timezone: sourceTimezone,
            to_timezone: targetTimezone,
            converted_datetime: convertedDate.format(), // Format ISO 8601
            converted_datetime_readable: convertedDate.format('YYYY-MM-DD HH:mm:ss [GMT]Z (z)')
        });
    } catch (error) {
        console.error('Time conversion error:', error);
        res.status(500).json({
            message: 'Server error converting time',
            error: error.message
        });
    }
};

// Fungsi Sensor Sederhana (simulasi, karena sensor di mobile)
export const getSensorData = (req, res) => {
    // Ini hanya akan mengembalikan data simulasi atau placeholder
    // Implementasi sebenarnya ada di aplikasi Flutter
    res.status(200).json({
        message: "This endpoint simulates sensor data. Actual sensor data handled by mobile app.",
        sensor_type: "accelerometer",
        x: (Math.random() * 2 - 1).toFixed(2), // -1 to 1
        y: (Math.random() * 2 - 1).toFixed(2),
        z: (Math.random() * 2 - 1).toFixed(2),
        timestamp: new Date().toISOString()
    });
};