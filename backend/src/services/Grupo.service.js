import Repo from '../repositorys/Grupo.repository.js';
import {
  JORNADAS, error, notFound, assertId, assertBody, requireFields, assertEnum,
  assertNonEmptyString, cleanData, assertHayCampos, withErrors
} from './_utils.js';

const FIELDS = ['nombre', 'jornada'];

function normalizar(clean) {
  if (clean.nombre !== undefined) {
    clean.nombre = assertNonEmptyString(clean.nombre, 'nombre');
    if (clean.nombre.length > 10) throw error('nombre no puede superar 10 caracteres');
  }
  if (clean.jornada !== undefined) assertEnum(clean.jornada, JORNADAS, 'jornada');
  return clean;
}

const fetchAllGrupos = withErrors(() => Repo.obtenerTodos());

const fetchGrupoById = withErrors(async (id) => {
  const grupo = await Repo.obtenerPorId(assertId(id));
  if (!grupo) throw notFound('Grupo no encontrado');
  return grupo;
});

const createGrupo = withErrors((data) => {
  requireFields(data, ['nombre', 'jornada']);
  return Repo.crear(normalizar(cleanData(data, FIELDS)));
});

const updateGrupo = withErrors((id, data) => {
  const idN = assertId(id);
  assertBody(data);
  const clean = normalizar(cleanData(data, FIELDS));
  assertHayCampos(clean);
  return Repo.actualizar(idN, clean);
});

const deleteGrupo = withErrors((id) => Repo.eliminar(assertId(id)));

export { fetchAllGrupos, fetchGrupoById, createGrupo, updateGrupo, deleteGrupo };
