import Repo from '../repositorys/RegistroCambio.repository.js';
import MateriaRepo from '../repositorys/Materia.repository.js';
import ProfesorRepo from '../repositorys/Profesor.repository.js';
import {
  notFound, assertId, assertIdOrNull, assertBody, requireFields, assertFecha,
  assertNonEmptyString, cleanData, assertHayCampos, withErrors
} from './_utils.js';

// creadoPor no se acepta del body: lo pone el controlador con el usuario autenticado
const FIELDS = ['fecha', 'materiaId', 'profesorId', 'motivo'];

async function normalizar(clean) {
  if (clean.fecha !== undefined) clean.fecha = assertFecha(clean.fecha);
  if (clean.motivo !== undefined) clean.motivo = assertNonEmptyString(clean.motivo, 'motivo');

  if (clean.materiaId !== undefined) {
    clean.materiaId = assertIdOrNull(clean.materiaId, 'materiaId');
    if (clean.materiaId !== null && !(await MateriaRepo.obtenerPorId(clean.materiaId))) {
      throw notFound('La materia no existe');
    }
  }
  if (clean.profesorId !== undefined) {
    clean.profesorId = assertIdOrNull(clean.profesorId, 'profesorId');
    if (clean.profesorId !== null && !(await ProfesorRepo.obtenerPorId(clean.profesorId))) {
      throw notFound('El profesor no existe');
    }
  }
  return clean;
}

const fetchAllRegistrosCambio = withErrors(() => Repo.obtenerTodos());

const fetchRegistroCambioById = withErrors(async (id) => {
  const registro = await Repo.obtenerPorId(assertId(id));
  if (!registro) throw notFound('Registro de cambio no encontrado');
  return registro;
});

const createRegistroCambio = withErrors(async (data, usuarioId) => {
  requireFields(data, ['fecha', 'motivo']);
  const clean = await normalizar(cleanData(data, FIELDS));
  clean.creadoPor = assertId(usuarioId, 'creadoPor');
  return Repo.crear(clean);
});

const updateRegistroCambio = withErrors(async (id, data) => {
  const idN = assertId(id);
  assertBody(data);
  const clean = await normalizar(cleanData(data, FIELDS));
  assertHayCampos(clean);
  return Repo.actualizar(idN, clean);
});

const deleteRegistroCambio = withErrors((id) => Repo.eliminar(assertId(id)));

export {
  fetchAllRegistrosCambio, fetchRegistroCambioById, createRegistroCambio,
  updateRegistroCambio, deleteRegistroCambio
};
