import Repo from '../repositorys/Evento.repository.js';
import { notFound, assertId, requireFields, assertNonEmptyString, withErrors } from './_utils.js';

const fetchAllEventos = withErrors(() => Repo.obtenerTodos());

const fetchEventoById = withErrors(async (id) => {
  const registro = await Repo.obtenerPorId(assertId(id));
  if (!registro) throw notFound('Evento no encontrado');
  return registro;
});

const fetchUltimoEvento = withErrors(() => Repo.obtenerUltimo());

/** creadoPor sale siempre del usuario autenticado, nunca del body. */
const createEvento = withErrors((data, usuarioId) => {
  requireFields(data, ['contenido']);
  return Repo.crear({
    contenido: assertNonEmptyString(data.contenido, 'contenido'),
    creadoPor: assertId(usuarioId, 'creadoPor')
  });
});

const updateEvento = withErrors((id, data) => {
  const idN = assertId(id);
  requireFields(data, ['contenido']);
  return Repo.actualizar(idN, { contenido: assertNonEmptyString(data.contenido, 'contenido') });
});

const deleteEvento = withErrors((id) => Repo.eliminar(assertId(id)));

export { fetchAllEventos, fetchEventoById, fetchUltimoEvento, createEvento, updateEvento, deleteEvento };
