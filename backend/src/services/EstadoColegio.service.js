import Repo from '../repositorys/EstadoColegio.repository.js';
import { notFound, assertId, requireFields, assertNonEmptyString, withErrors } from './_utils.js';

const fetchAllEstados = withErrors(() => Repo.obtenerTodos());

const fetchEstadoById = withErrors(async (id) => {
  const registro = await Repo.obtenerPorId(assertId(id));
  if (!registro) throw notFound('Estado del colegio no encontrado');
  return registro;
});

const fetchUltimoEstado = withErrors(() => Repo.obtenerUltimo());

/** creadoPor sale siempre del usuario autenticado, nunca del body. */
const createEstado = withErrors((data, usuarioId) => {
  requireFields(data, ['contenido']);
  return Repo.crear({
    contenido: assertNonEmptyString(data.contenido, 'contenido'),
    creadoPor: assertId(usuarioId, 'creadoPor')
  });
});

const updateEstado = withErrors((id, data) => {
  const idN = assertId(id);
  requireFields(data, ['contenido']);
  return Repo.actualizar(idN, { contenido: assertNonEmptyString(data.contenido, 'contenido') });
});

const deleteEstado = withErrors((id) => Repo.eliminar(assertId(id)));

export { fetchAllEstados, fetchEstadoById, fetchUltimoEstado, createEstado, updateEstado, deleteEstado };
