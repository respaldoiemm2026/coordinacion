import Repo from '../repositorys/Materia.repository.js';
import {
  notFound, assertId, assertBody, requireFields, assertNonEmptyString,
  cleanData, assertHayCampos, withErrors
} from './_utils.js';

const FIELDS = ['nombre', 'aula'];

function normalizar(clean) {
  if (clean.nombre !== undefined) clean.nombre = assertNonEmptyString(clean.nombre, 'nombre');
  // aula es opcional en el schema: vacío o null la deja sin asignar
  if (clean.aula !== undefined) clean.aula = clean.aula === null || !String(clean.aula).trim() ? null : String(clean.aula).trim();
  return clean;
}

const fetchAllMaterias = withErrors(() => Repo.obtenerTodos());

const fetchMateriaById = withErrors(async (id) => {
  const materia = await Repo.obtenerPorId(assertId(id));
  if (!materia) throw notFound('Materia no encontrada');
  return materia;
});

const createMateria = withErrors((data) => {
  requireFields(data, ['nombre']);
  return Repo.crear(normalizar(cleanData(data, FIELDS)));
});

const updateMateria = withErrors((id, data) => {
  const idN = assertId(id);
  assertBody(data);
  const clean = normalizar(cleanData(data, FIELDS));
  assertHayCampos(clean);
  return Repo.actualizar(idN, clean);
});

const deleteMateria = withErrors((id) => Repo.eliminar(assertId(id)));

export { fetchAllMaterias, fetchMateriaById, createMateria, updateMateria, deleteMateria };
