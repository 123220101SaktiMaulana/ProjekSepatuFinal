// Konversi Mata Uang (Data Statis, diperbarui manual jika perlu)
// Nilai ini berdasarkan IDR sebagai basis (1 IDR = X USD, 1 IDR = X SGD, dll)
// Atau bisa juga USD sebagai basis (1 USD = X IDR, 1 USD = X SGD)
// Saya akan pakai IDR sebagai basis.
export const CURRENCY_RATES = {
    IDR: 1, // Indonesian Rupiah (basis)
    USD: 0.000062, // 1 IDR = 0.000062 USD (sekitar 1 USD = 16.000 IDR)
    SGD: 0.000083, // 1 IDR = 0.000083 SGD (sekitar 1 SGD = 12.000 IDR)
    MYR: 0.00029, // 1 IDR = 0.00029 MYR (sekitar 1 MYR = 3.500 IDR)
};

// Zona Waktu Umum (untuk tujuan demo)
export const TIME_ZONES = {
    WIB: 'Asia/Jakarta', // Western Indonesia Time
    WITA: 'Asia/Makassar', // Central Indonesia Time
    WIT: 'Asia/Jayapura', // Eastern Indonesia Time
    LONDON: 'Europe/London',
    NEW_YORK: 'America/New_York',
};