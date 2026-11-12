import prisma from '../prisma.js';
import { USUARIO_PUBLICO } from './_includes.js';

const include = { usuario: USUARIO_PUBLICO };

const EventoRepository = {
  obtenerTodos() {
    return prisma.evento.findMany({ include, orderBy: { creadoEn: 'desc' } });
  },

  obtenerPorId(id) {
    return prisma.evento.findUnique({ where: { id }, include });
  },

  obtenerUltimo() {
    return prisma.evento.findFirst({ include, orderBy: { creadoEn: 'desc' } });
  },

  crear(data) {
    return prisma.evento.create({ data, include });
  },

  actualizar(id, data) {
    return prisma.evento.update({ where: { id }, data, include });
  },

  eliminar(id) {
    return prisma.evento.delete({ where: { id }, include });
  }
};

export default EventoRepository;
