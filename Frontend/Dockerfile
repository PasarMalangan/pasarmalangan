# Gunakan Node.js dengan Alpine untuk ukuran ringan
FROM node:18-alpine

# Atur direktori kerja
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi
COPY . .

# Build aplikasi untuk produksi
RUN npm run build

# Jalankan aplikasi menggunakan server bawaan Vite.js
EXPOSE 8080
CMD ["npm", "run", "preview"]
