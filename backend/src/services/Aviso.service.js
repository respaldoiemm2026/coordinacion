import Repo from '../repositorys/Aviso.repository.js';
import { notFound, assertId, requireFields, assertNonEmptyString, withErrors } from './_utils.js';

const fetchAllAvisos = withErrors(() => Repo.obtenerTodos());

const fetchAvisoById = withErrors(async (id) => {
  const registro = await Repo.obtenerPorId(assertId(id));
  if (!registro) throw notFound('Aviso no encontrado');
  return registro;
});

const fetchUltimoAviso = withErrors(() => Repo.obtenerUltimo());

/** creadoPor sale siempre del usuario autenticado, nunca del body. */
const createAviso = withErrors((data, usuarioId) => {
  requireFields(data, ['contenido']);
  return Repo.crear({
    contenido: assertNonEmptyString(data.contenido, 'contenido'),
    creadoPor: assertId(usuarioId, 'creadoPor')
  });
});

const updateAviso = withErrors((id, data) => {
  const idN = assertId(id);
  requireFields(data, ['contenido']);
  return Repo.actualizar(idN, { contenido: assertNonEmptyString(data.contenido, 'contenido') });
});

const deleteAviso = withErrors((id) => Repo.eliminar(assertId(id)));

export { fetchAllAvisos, fetchAvisoById, fetchUltimoAviso, createAviso, updateAviso, deleteAviso };
