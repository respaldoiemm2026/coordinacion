import prisma from '../prisma.js';
import { USUARIO_PUBLICO } from './_includes.js';

const include = {
  usuario: USUARIO_PUBLICO,
  materias: { include: { materia: true } },
  diasDisponibles: true
};

const ProfesorRepository = {
  obtenerTodos() {
    return prisma.profesor.findMany({ include, orderBy: { nombre: 'asc' } });
  },

  obtenerPorId(id) {
    return prisma.profesor.findUnique({ where: { id }, include });
  },

  crear(data) {
    return prisma.profesor.create({ data, include });
  },

  actualizar(id, data) {
    return prisma.profesor.update({ where: { id }, data, include });
  },

  eliminar(id) {
    return prisma.profesor.delete({ where: { id } });
  }
};

export default ProfesorRepository;
