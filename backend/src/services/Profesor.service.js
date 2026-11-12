import Repo from '../repositorys/Profesor.repository.js';
import UsuarioRepo from '../repositorys/Usuario.repository.js';
import {
  JORNADAS, notFound, assertId, assertIdOrNull, assertBody, requireFields, assertEnum,
  assertNonEmptyString, cleanData, assertHayCampos, withErrors
} from './_utils.js';

const FIELDS = ['nombre', 'jornada', 'usuarioId'];

async function normalizar(clean) {
  if (clean.nombre !== undefined) clean.nombre = assertNonEmptyString(clean.nombre, 'nombre');
  if (clean.jornada !== undefined) assertEnum(clean.jornada, JORNADAS, 'jornada');
  if (clean.usuarioId !== undefined) {
    // usuarioId es opcional en el schema: null desvincula el usuario
    clean.usuarioId = assertIdOrNull(clean.usuarioId, 'usuarioId');
    if (clean.usuarioId !== null && !(await UsuarioRepo.obtenerPorId(clean.usuarioId))) {
      throw notFound('El usuario asociado no existe');
    }
  }
  return clean;
}

const fetchAllProfesores = withErrors(() => Repo.obtenerTodos());

const fetchProfesorById = withErrors(async (id) => {
  const profesor = await Repo.obtenerPorId(assertId(id));
  if (!profesor) throw notFound('Profesor no encontrado');
  return profesor;
});

const createProfesor = withErrors(async (data) => {
  requireFields(data, ['nombre', 'jornada']);
  return Repo.crear(await normalizar(cleanData(data, FIELDS)));
});

const updateProfesor = withErrors(async (id, data) => {
  const idN = assertId(id);
  assertBody(data);
  const clean = await normalizar(cleanData(data, FIELDS));
  assertHayCampos(clean);
  return Repo.actualizar(idN, clean);
});

const deleteProfesor = withErrors((id) => Repo.eliminar(assertId(id)));

export { fetchAllProfesores, fetchProfesorById, createProfesor, updateProfesor, deleteProfesor };
