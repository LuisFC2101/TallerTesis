"use strict";
import { AppDataSource } from "../config/configDb.js";
import Publicacion from "../entity/publicacion.entity.js";
import Imagen from "../entity/imagen.entity.js";
import EstadisticaPublicacion from "../entity/estadisticas.entity.js";

export async function createPublicacionService(data) {
  try {
    const publicacionRepository = AppDataSource.getRepository(Publicacion);
    const imagenRepository = AppDataSource.getRepository(Imagen);
    const estadisticaRepository = AppDataSource.getRepository(EstadisticaPublicacion);

    
    const nuevaPublicacion = publicacionRepository.create({
      titulo: data.titulo,
      descripcion: data.descripcion,
      precio: data.precio,
      ubicacion: data.ubicacion,
      categoria: { id: data.categoriaId },
      emprendimiento: { id: data.emprendimientoId },
      usuario: { id: data.usuarioId },
    });

    await publicacionRepository.save(nuevaPublicacion);

    // se crea la estadistica de la publicación
    const nuevaEstadistica = estadisticaRepository.create({
      visitas: 0,
      contactos_recibidos: 0,
      publicacion: nuevaPublicacion
    });

    await estadisticaRepository.save(nuevaEstadistica);

    
    if (data.imagenes && Array.isArray(data.imagenes)) {
      const imagenesAGuardar = data.imagenes.map((url) =>
        imagenRepository.create({ url, publicacion: nuevaPublicacion })
      );
      await imagenRepository.save(imagenesAGuardar);
    }

    
    const publicacionConRelaciones = await publicacionRepository.findOne({
      where: { id: nuevaPublicacion.id },
      relations: ["categoria", "emprendimiento", "imagenes"],
    });

    return [publicacionConRelaciones, null];
  } catch (error) {
    console.error("Error al crear publicación:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getPublicacionesService() {
  try {
    const publicacionRepository = AppDataSource.getRepository(Publicacion);
    const publicaciones = await publicacionRepository.find({
      relations: ["categoria", "emprendimiento", "imagenes", "estadistica"],
      order: { createdAt: "DESC" },
    });

    return [publicaciones, null];
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updatePublicacionService(id, data, userId) {
  try {
    const publicacionRepository = AppDataSource.getRepository(Publicacion);

    
    const publicacion = await publicacionRepository.findOne({
      where: { id },
      relations: ["usuario"]
    });

    if (!publicacion) {
      return [null, "Publicación no encontrada"];
    }

    
    if (publicacion.usuario.id !== userId) {
      return [null, "No tienes permiso para editar esta publicación"];
    }

    
    publicacion.titulo = data.titulo || publicacion.titulo;
    publicacion.descripcion = data.descripcion || publicacion.descripcion;
    publicacion.precio = data.precio || publicacion.precio;

    await publicacionRepository.save(publicacion);
    return [publicacion, null];
  } catch (error) {
    console.error("Error al actualizar publicación:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deletePublicacionService(publicacionId, userId) {
  try {
    const publicacionRepository = AppDataSource.getRepository(Publicacion);

    const publicacion = await publicacionRepository.findOne({
      where: { id: publicacionId },
      relations: ["usuario"],
    });

    if (!publicacion) {
      return [null, "Publicación no encontrada"];
    }

    if (publicacion.usuario.id !== userId) {
      return [null, "No tienes permiso para eliminar esta publicación"];
    }

    await publicacionRepository.remove(publicacion);
    return [true, null];
  } catch (error) {
    console.error("Error al eliminar publicación:", error);
    return [null, "Error interno al eliminar la publicación"];
  }
}

export async function getPublicacionesFiltradasService({ categoriaId, query }) {
  try {
    const publicacionRepository = AppDataSource.getRepository(Publicacion);

    let qb = publicacionRepository
      .createQueryBuilder("publicacion")
      .leftJoinAndSelect("publicacion.categoria", "categoria")
      .leftJoinAndSelect("publicacion.emprendimiento", "emprendimiento")
      .leftJoinAndSelect("publicacion.imagenes", "imagenes")
      .orderBy("publicacion.createdAt", "DESC");

    if (categoriaId) {
      qb = qb.andWhere("publicacion.categoria.id = :categoriaId", { categoriaId });
    }

    if (query) {
      const lowerQuery = `%${query.toLowerCase()}%`;
      qb = qb.andWhere(
        "(LOWER(publicacion.titulo) LIKE :query OR LOWER(publicacion.descripcion) LIKE :query)",
        { query: lowerQuery }
      );
    }

    const publicaciones = await qb.getMany();
    return [publicaciones, null];
  } catch (error) {
    console.error("Error al obtener publicaciones públicas:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getPublicacionByIdService(id) {
  try {
    const publicacionRepository = AppDataSource.getRepository(Publicacion);

    const publicacion = await publicacionRepository.findOne({
      where: { id },
      relations: ["usuario", "categoria", "emprendimiento", "imagenes"],
    });

    if (!publicacion) {
      return [null, "Publicación no encontrada"];
    }

    return [publicacion, null];
  } catch (error) {
    console.error("Error al obtener publicación por ID:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getMisPublicacionesService(userId) {
  try {
    const publicacionRepository = AppDataSource.getRepository(Publicacion);

    const publicaciones = await publicacionRepository.find({
      where: {
        usuario: { id: userId }
      },
      relations: ["categoria", "emprendimiento", "imagenes"],
      order: { createdAt: "DESC" }
    });

    return [publicaciones, null];
  } catch (error) {
    console.error("Error al obtener publicaciones del usuario:", error);
    return [null, "Error interno del servidor"];
  }
}
