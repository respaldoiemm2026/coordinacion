import bcrypt from 'bcryptjs';
import Repo from '../repositorys/Usuario.repository.js';
import {
  ROLES, error, notFound, assertId, assertBody, requireFields, assertEnum,
  assertNonEmptyString, assertHayCampos, withErrors
} from './_utils.js';

const fetchAllUsuarios = withErrors(() => Repo.obtenerTodos());

const fetchUsuarioById = withErrors(async (id) => {
  const usuario = await Repo.obtenerPorId(assertId(id));
  if (!usuario) throw notFound('Usuario no encontrado');
  return usuario;
});

const fetchUsuarioByNombreUsuario = withErrors(async (nombreUsuario) => {
  const usuario = await Repo.obtenerPorNombreUsuario(assertNonEmptyString(nombreUsuario, 'nombreUsuario'));
  if (!usuario) throw notFound('Usuario no encontrado');
  return usuario;
});

const createUsuario = withErrors(async (data) => {
  requireFields(data, ['nombreUsuario', 'contrasena']);
  return Repo.crear({
    nombreUsuario: assertNonEmptyString(data.nombreUsuario, 'nombreUsuario'),
    contrasenaHash: await bcrypt.hash(String(data.contrasena), 10),
    rol: assertEnum(data.rol ?? 'coordinador', ROLES, 'rol')
  });
});

const updateUsuario = withErrors(async (id, data) => {
  const idN = assertId(id);
  assertBody(data);

  const clean = {};
  if (data.nombreUsuario !== undefined) clean.nombreUsuario = assertNonEmptyString(data.nombreUsuario, 'nombreUsuario');
  if (data.rol !== undefined) clean.rol = assertEnum(data.rol, ROLES, 'rol');
  if (data.contrasena !== undefined) {
    if (!String(data.contrasena).trim()) throw error('La contraseña no puede estar vacía');
    clean.contrasenaHash = await bcrypt.hash(String(data.contrasena), 10);
  }
  assertHayCampos(clean);

  return Repo.actualizar(idN, clean);
});

const deleteUsuario = withErrors((id) => Repo.eliminar(assertId(id)));

export {
  fetchAllUsuarios, fetchUsuarioById, fetchUsuarioByNombreUsuario,
  createUsuario, updateUsuario, deleteUsuario
};
