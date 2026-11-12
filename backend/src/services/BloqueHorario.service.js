import Repo from '../repositorys/BloqueHorario.repository.js';
import {
  JORNADAS, error, notFound, assertId, assertBody, requireFields, assertEnum, assertHora,
  assertBoolean, assertEnteroNoNegativo, cleanData, assertHayCampos, withErrors
} from './_utils.js';

const FIELDS = ['jornada', 'horaInicio', 'horaFin', 'orden', 'esDescanso'];

function normalizar(clean) {
  if (clean.jornada !== undefined) assertEnum(clean.jornada, JORNADAS, 'jornada');
  if (clean.horaInicio !== undefined) clean.horaInicio = assertHora(clean.horaInicio, 'horaInicio');
  if (clean.horaFin !== undefined) clean.horaFin = assertHora(clean.horaFin, 'horaFin');
  if (clean.orden !== undefined) clean.orden = assertEnteroNoNegativo(clean.orden, 'orden');
  if (clean.esDescanso !== undefined) clean.esDescanso = assertBoolean(clean.esDescanso, 'esDescanso');
  return clean;
}

function validarRango(horaInicio, horaFin) {
  if (horaInicio >= horaFin) throw error('horaInicio debe ser menor que horaFin');
}

const fetchAllBloques = withErrors(() => Repo.obtenerTodos());

const fetchBloqueById = withErrors(async (id) => {
  const bloque = await Repo.obtenerPorId(assertId(id));
  if (!bloque) throw notFound('Bloque de horario no encontrado');
  return bloque;
});

const createBloque = withErrors((data) => {
  requireFields(data, ['jornada', 'horaInicio', 'horaFin', 'orden']);
  const clean = normalizar(cleanData(data, FIELDS));
  validarRango(clean.horaInicio, clean.horaFin);
  return Repo.crear(clean);
});

const updateBloque = withErrors(async (id, data) => {
  const idN = assertId(id);
  assertBody(data);
  const clean = normalizar(cleanData(data, FIELDS));
  assertHayCampos(clean);

  const actual = await Repo.obtenerPorId(idN);
  if (!actual) throw notFound('Bloque de horario no encontrado');
  // Validar el rango con los valores finales, aunque solo llegue una de las dos horas
  validarRango(clean.horaInicio ?? actual.horaInicio, clean.horaFin ?? actual.horaFin);

  return Repo.actualizar(idN, clean);
});

const deleteBloque = withErrors((id) => Repo.eliminar(assertId(id)));

export { fetchAllBloques, fetchBloqueById, createBloque, updateBloque, deleteBloque };
