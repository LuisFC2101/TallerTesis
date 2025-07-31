# Dockerfile para frontend
FROM node:18 as builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos e instalar dependencias
COPY package*.json ./
COPY .env .env
RUN npm install
COPY . .

# Ejecutar build de producción
RUN npm run build

# Servir la aplicación con preview (vite preview)
FROM node:18
WORKDIR /app
COPY --from=builder /app /app
RUN npm install -g serve

# Puerto de preview por defecto
EXPOSE 4173

# Comando de inicio
CMD ["npm", "run", "preview"]
