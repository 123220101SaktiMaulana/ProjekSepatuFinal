# Gunakan image Node.js LTS resmi yang lebih baru
FROM node:20-slim

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json (atau yarn.lock)
# Ini dilakukan terpisah untuk memanfaatkan cache Docker layer
COPY package*.json ./

# Install dependencies (gunakan 'npm ci' untuk build yang lebih konsisten di CI/CD)
RUN npm ci --only=production

# Copy sisa kode aplikasi ke dalam container
COPY . .

# Expose port yang akan didengarkan aplikasi Anda
# Cloud Run akan menginject variabel PORT ke 8080 secara default.
# Pastikan aplikasi Anda mendengarkan process.env.PORT
ENV PORT 8080
EXPOSE 8080

# Jalankan aplikasi Anda
# Gunakan "npm start" yang akan menjalankan script start di package.json Anda
CMD ["npm", "start"]