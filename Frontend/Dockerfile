# Gunakan Node.js dengan Alpine untuk ukuran ringan
FROM node:18-alpine AS build

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

# Stage berikutnya adalah menyalin hasil build
FROM node:18-alpine

# Atur direktori kerja
WORKDIR /app

# Salin hasil build dari tahap build ke direktori /app/dist
COPY --from=build /app/dist /app/dist

# Install http-server untuk melayani aplikasi statis
RUN npm install -g http-server

# Expose port untuk http-server
EXPOSE 8080

# Jalankan http-server untuk melayani aplikasi statis
CMD ["http-server", "dist", "-p", "8080"]
