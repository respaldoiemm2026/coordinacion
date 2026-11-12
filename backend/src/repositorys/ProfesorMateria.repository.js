import prisma from '../prisma.js';

const include = { profesor: true, materia: true };

const ProfesorMateriaRepository = {
  obtenerTodos() {
    return prisma.profesorMateria.findMany({ include });
  },

  obtenerPorClave(profesorId, materiaId) {
    return prisma.profesorMateria.findUnique({
      where: { profesorId_materiaId: { profesorId, materiaId } },
      include
    });
  },

  crear(data) {
    return prisma.profesorMateria.create({ data, include });
  },

  eliminar(profesorId, materiaId) {
    return prisma.profesorMateria.delete({
      where: { profesorId_materiaId: { profesorId, materiaId } }
    });
  }
};

export default ProfesorMateriaRepository;
