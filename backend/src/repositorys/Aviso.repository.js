import prisma from '../prisma.js';
import { USUARIO_PUBLICO } from './_includes.js';

const include = { usuario: USUARIO_PUBLICO };

const AvisoRepository = {
  obtenerTodos() {
    return prisma.aviso.findMany({ include, orderBy: { creadoEn: 'desc' } });
  },

  obtenerPorId(id) {
    return prisma.aviso.findUnique({ where: { id }, include });
  },

  obtenerUltimo() {
    return prisma.aviso.findFirst({ include, orderBy: { creadoEn: 'desc' } });
  },

  crear(data) {
    return prisma.aviso.create({ data, include });
  },

  actualizar(id, data) {
    return prisma.aviso.update({ where: { id }, data, include });
  },

  eliminar(id) {
    return prisma.aviso.delete({ where: { id }, include });
  }
};

export default AvisoRepository;
