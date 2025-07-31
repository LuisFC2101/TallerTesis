FROM node:18-alpine

# Instalar PM2 globalmente
RUN npm install -g pm2

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Construir el frontend
RUN npm run build

EXPOSE 4173

# Usar Vite Preview con PM2 como hacías manualmente
CMD ["pm2-runtime", "npm", "--", "run", "preview"]
