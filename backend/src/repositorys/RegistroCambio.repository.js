import prisma from '../prisma.js';
import { USUARIO_PUBLICO } from './_includes.js';

const include = { materia: true, profesor: true, usuario: USUARIO_PUBLICO };

const RegistroCambioRepository = {
  obtenerTodos() {
    return prisma.registroCambio.findMany({ include, orderBy: [{ fecha: 'desc' }, { creadoEn: 'desc' }] });
  },

  obtenerPorId(id) {
    return prisma.registroCambio.findUnique({ where: { id }, include });
  },

  crear(data) {
    return prisma.registroCambio.create({ data, include });
  },

  actualizar(id, data) {
    return prisma.registroCambio.update({ where: { id }, data, include });
  },

  eliminar(id) {
    return prisma.registroCambio.delete({ where: { id } });
  }
};

export default RegistroCambioRepository;
