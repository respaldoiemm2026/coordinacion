import prisma from '../prisma.js';
import { USUARIO_PUBLICO } from './_includes.js';

const { omit } = USUARIO_PUBLICO;

const UsuarioRepository = {
  obtenerTodos() {
    return prisma.usuario.findMany({ omit, orderBy: { id: 'asc' } });
  },

  obtenerPorId(id) {
    return prisma.usuario.findUnique({ where: { id }, omit });
  },

  obtenerPorNombreUsuario(nombreUsuario) {
    return prisma.usuario.findUnique({ where: { nombreUsuario }, omit });
  },

  /** Solo para login: incluye contrasenaHash. */
  obtenerCredenciales(nombreUsuario) {
    return prisma.usuario.findUnique({ where: { nombreUsuario } });
  },

  crear(data) {
    return prisma.usuario.create({ data, omit });
  },

  actualizar(id, data) {
    return prisma.usuario.update({ where: { id }, data, omit });
  },

  eliminar(id) {
    return prisma.usuario.delete({ where: { id }, omit });
  }
};

export default UsuarioRepository;
