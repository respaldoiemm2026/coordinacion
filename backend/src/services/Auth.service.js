import bcrypt from 'bcryptjs';
import Repo from '../repositorys/Usuario.repository.js';
import { signToken } from '../utils/jwt.js';
import { error, requireFields, assertNonEmptyString, withErrors } from './_utils.js';

// El registro público siempre crea coordinadores; otros roles los asigna un admin desde /usuarios
const registerUsuario = withErrors(async (data) => {
  requireFields(data, ['nombreUsuario', 'contrasena']);
  const nombreUsuario = assertNonEmptyString(data.nombreUsuario, 'nombreUsuario');

  if (await Repo.obtenerPorNombreUsuario(nombreUsuario)) {
    throw error('El nombre de usuario ya está registrado', 409);
  }

  const contrasenaHash = await bcrypt.hash(String(data.contrasena), 10);
  return Repo.crear({ nombreUsuario, contrasenaHash, rol: 'coordinador' });
});

const loginUsuario = withErrors(async (nombreUsuario, contrasena) => {
  if (!nombreUsuario || !contrasena) throw error('nombreUsuario y contrasena son obligatorios');

  const usuario = await Repo.obtenerCredenciales(String(nombreUsuario).trim());
  if (!usuario) throw error('Credenciales inválidas', 401);

  const valida = await bcrypt.compare(String(contrasena), usuario.contrasenaHash);
  if (!valida) throw error('Credenciales inválidas', 401);

  const token = signToken({ id: usuario.id, nombreUsuario: usuario.nombreUsuario, rol: usuario.rol });
  const { contrasenaHash: _, ...usuarioSinHash } = usuario;
  return { token, usuario: usuarioSinHash };
});

const fetchUsuarioActual = withErrors(async (id) => {
  const usuario = await Repo.obtenerPorId(id);
  if (!usuario) throw error('Usuario no encontrado', 404);
  return usuario;
});

export { registerUsuario, loginUsuario, fetchUsuarioActual };
