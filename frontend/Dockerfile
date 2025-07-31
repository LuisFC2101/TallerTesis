# Dockerfile para frontend
FROM node:18 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

FROM node:18
WORKDIR /app
COPY --from=builder /app /app
RUN npm install -g serve

EXPOSE 4173

CMD ["npm", "run", "preview"]
