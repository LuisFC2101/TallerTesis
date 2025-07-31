// initialData/users.js
import User from "../../entity/user.entity.js";
import { encryptPassword } from "../../helpers/bcrypt.helper.js";
import { AppDataSource } from "../configDb.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Luis Fernanandez Canullan",
          rut: "20.255.005-3",
          email: "administrador2025@gmail.cl",
          password: await encryptPassword("admin1234"),
          rol: "administrador",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Prueba Usuario Emprendedor",
          rut: "21.212.212-3",
          email: "emprende2025@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "emprendedor",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Prueba Usuario Segundo",
          rut: "21.211.211-3",
          email: "granjefe@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "emprendedor",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Prueba Turista Uno",
          rut: "18.111.111-1",
          email: "turista1@gmail.cl",
          password: await encryptPassword("turista123"),
          rol: "turista",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Prueba Turista Dos",
          rut: "18.222.222-2",
          email: "turista2@gmail.cl",
          password: await encryptPassword("turista123"),
          rol: "turista",
        })
      ),
    ]);
    console.log("* Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

export { createUsers };
