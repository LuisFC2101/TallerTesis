# Dockerfile para backend
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install -g pm2 && npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del backend
EXPOSE 3000

# Ejecutar backend con PM2
CMD ["pm2-runtime", "src/index.js"]
