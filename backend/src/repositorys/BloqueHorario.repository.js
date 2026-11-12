import prisma from '../prisma.js';

const BloqueHorarioRepository = {
  obtenerTodos() {
    return prisma.bloqueHorario.findMany({ orderBy: [{ jornada: 'asc' }, { orden: 'asc' }] });
  },

  obtenerPorId(id) {
    return prisma.bloqueHorario.findUnique({ where: { id } });
  },

  crear(data) {
    return prisma.bloqueHorario.create({ data });
  },

  actualizar(id, data) {
    return prisma.bloqueHorario.update({ where: { id }, data });
  },

  eliminar(id) {
    return prisma.bloqueHorario.delete({ where: { id } });
  }
};

export default BloqueHorarioRepository;
