import prisma from '../prisma.js';

const GrupoRepository = {
  obtenerTodos() {
    return prisma.grupo.findMany({ orderBy: { nombre: 'asc' } });
  },

  obtenerPorId(id) {
    return prisma.grupo.findUnique({ where: { id } });
  },

  crear(data) {
    return prisma.grupo.create({ data });
  },

  actualizar(id, data) {
    return prisma.grupo.update({ where: { id }, data });
  },

  eliminar(id) {
    return prisma.grupo.delete({ where: { id } });
  }
};

export default GrupoRepository;
