"use strict";
import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD } from "./configEnv.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: 5432,
  username: DB_USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: ["src/entity/**/*.js"],
  synchronize: true,
  logging: false,
});

export async function connectDB(retries = 5, delay = 3000) {
  while (retries > 0) {
    try {
      await AppDataSource.initialize();
      console.log("✅ Conexión exitosa a la base de datos!");
      break;
    } catch (error) {
      console.error("⛔ Error al conectar con la base de datos:", error.message);
      retries--;
      if (retries === 0) {
        console.error("❌ No se pudo conectar luego de varios intentos. Saliendo...");
        process.exit(1);
      }
      console.log(`🔁 Reintentando en ${delay / 1000} segundos... (${retries} intentos restantes)`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}
