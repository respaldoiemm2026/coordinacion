import prisma from '../prisma.js';
import { USUARIO_PUBLICO } from './_includes.js';

const include = { usuario: USUARIO_PUBLICO };

const EstadoColegioRepository = {
  obtenerTodos() {
    return prisma.estadoColegio.findMany({ include, orderBy: { creadoEn: 'desc' } });
  },

  obtenerPorId(id) {
    return prisma.estadoColegio.findUnique({ where: { id }, include });
  },

  obtenerUltimo() {
    return prisma.estadoColegio.findFirst({ include, orderBy: { creadoEn: 'desc' } });
  },

  crear(data) {
    return prisma.estadoColegio.create({ data, include });
  },

  actualizar(id, data) {
    return prisma.estadoColegio.update({ where: { id }, data, include });
  },

  eliminar(id) {
    return prisma.estadoColegio.delete({ where: { id }, include });
  }
};

export default EstadoColegioRepository;
