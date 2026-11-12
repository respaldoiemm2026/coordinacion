import prisma from '../prisma.js';

const include = { profesores: { include: { profesor: true } } };

const MateriaRepository = {
  obtenerTodos() {
    return prisma.materia.findMany({ include, orderBy: { nombre: 'asc' } });
  },

  obtenerPorId(id) {
    return prisma.materia.findUnique({ where: { id }, include });
  },

  crear(data) {
    return prisma.materia.create({ data, include });
  },

  actualizar(id, data) {
    return prisma.materia.update({ where: { id }, data, include });
  },

  eliminar(id) {
    return prisma.materia.delete({ where: { id } });
  }
};

export default MateriaRepository;
