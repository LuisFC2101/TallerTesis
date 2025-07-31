FROM node:18-alpine

# Instalar PM2 para preview
RUN npm install -g pm2

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Construir la app antes de servirla
RUN npm run build

# Exponer el puerto usado por Vite Preview
EXPOSE 4173

# Iniciar el servidor de preview en el puerto correcto
CMD ["pm2-runtime", "npm", "--", "run", "preview", "--", "--port", "4173", "--host"]
