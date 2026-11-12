import prisma from '../prisma.js';

const include = { profesor: true };

const ProfesorDiaDisponibleRepository = {
  obtenerTodos() {
    return prisma.profesorDiaDisponible.findMany({ include });
  },

  obtenerPorClave(profesorId, diaSemana) {
    return prisma.profesorDiaDisponible.findUnique({
      where: { profesorId_diaSemana: { profesorId, diaSemana } },
      include
    });
  },

  crear(data) {
    return prisma.profesorDiaDisponible.create({ data, include });
  },

  eliminar(profesorId, diaSemana) {
    return prisma.profesorDiaDisponible.delete({
      where: { profesorId_diaSemana: { profesorId, diaSemana } }
    });
  }
};

export default ProfesorDiaDisponibleRepository;
