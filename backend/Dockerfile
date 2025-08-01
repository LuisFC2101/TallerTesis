FROM node:18

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto al contenedor
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto que usará tu app (mismo que PORT=3000)
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "run", "dev"]
