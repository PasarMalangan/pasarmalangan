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

# Build aplikasi untuk produksi dengan environment variable dari ARG
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# Stage berikutnya adalah menyalin hasil build
FROM node:18-alpine

# Atur direktori kerja
WORKDIR /app

# Salin hasil build dari tahap build ke direktori /app/dist
COPY --from=build /app/dist /app/dist

# Install serve untuk melayani aplikasi statis
RUN npm install -g serve

# Expose port untuk serve
EXPOSE 8080

# Jalankan serve untuk melayani aplikasi statis
CMD ["serve", "-s", "dist", "-l", "8080"]
