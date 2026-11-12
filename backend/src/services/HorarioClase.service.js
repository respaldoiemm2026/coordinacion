import Repo from '../repositorys/HorarioClase.repository.js';
import ProfesorRepo from '../repositorys/Profesor.repository.js';
import MateriaRepo from '../repositorys/Materia.repository.js';
import GrupoRepo from '../repositorys/Grupo.repository.js';
import BloqueRepo from '../repositorys/BloqueHorario.repository.js';
import {
  DIAS, error, notFound, assertId, assertBody, requireFields, assertEnum,
  cleanData, withErrors
} from './_utils.js';

const FIELDS = ['profesorId', 'materiaId', 'grupoId', 'bloqueHorarioId', 'diaSemana'];

const jornadaCompatible = (a, b) => a === b || a === 'ambas' || b === 'ambas';

/** Valida tipos, existencia de relaciones, jornadas, disponibilidad y cruces de horario. */
async function validar(data, excluirId = null) {
  data.profesorId = assertId(data.profesorId, 'profesorId');
  data.materiaId = assertId(data.materiaId, 'materiaId');
  data.grupoId = assertId(data.grupoId, 'grupoId');
  data.bloqueHorarioId = assertId(data.bloqueHorarioId, 'bloqueHorarioId');
  assertEnum(data.diaSemana, DIAS, 'diaSemana');

  const [profesor, materia, grupo, bloque] = await Promise.all([
    ProfesorRepo.obtenerPorId(data.profesorId),
    MateriaRepo.obtenerPorId(data.materiaId),
    GrupoRepo.obtenerPorId(data.grupoId),
    BloqueRepo.obtenerPorId(data.bloqueHorarioId)
  ]);
  if (!profesor) throw notFound('El profesor no existe');
  if (!materia) throw notFound('La materia no existe');
  if (!grupo) throw notFound('El grupo no existe');
  if (!bloque) throw notFound('El bloque de horario no existe');

  if (bloque.esDescanso) throw error('No se puede asignar una clase en un bloque de descanso');
  if (!jornadaCompatible(profesor.jornada, bloque.jornada)) {
    throw error('La jornada del profesor no coincide con la jornada del bloque');
  }
  if (!jornadaCompatible(grupo.jornada, bloque.jornada)) {
    throw error('La jornada del grupo no coincide con la jornada del bloque');
  }

  // Si el profesor tiene días configurados, solo puede dictar esos días
  const dias = profesor.diasDisponibles ?? [];
  if (dias.length && !dias.some((d) => d.diaSemana === data.diaSemana)) {
    throw error('El profesor no está disponible ese día');
  }

  const conflicto = await Repo.buscarConflicto(data, excluirId);
  if (conflicto) {
    throw error(
      conflicto.profesorId === data.profesorId
        ? 'El profesor ya tiene una clase en ese bloque'
        : 'El grupo ya tiene una clase en ese bloque',
      409
    );
  }
  return data;
}

const fetchAllHorarios = withErrors(() => Repo.obtenerTodos());

const fetchHorarioById = withErrors(async (id) => {
  const horario = await Repo.obtenerPorId(assertId(id));
  if (!horario) throw notFound('Horario de clase no encontrado');
  return horario;
});

const fetchHorariosByProfesor = withErrors((profesorId) =>
  Repo.obtenerPorProfesor(assertId(profesorId, 'profesorId'))
);

const fetchHorariosByGrupo = withErrors((grupoId) =>
  Repo.obtenerPorGrupo(assertId(grupoId, 'grupoId'))
);

const fetchHorariosByDia = withErrors((diaSemana) =>
  Repo.obtenerPorDia(assertEnum(diaSemana, DIAS, 'diaSemana'))
);

const createHorario = withErrors(async (data) => {
  requireFields(data, FIELDS);
  return Repo.crear(await validar(cleanData(data, FIELDS)));
});

const updateHorario = withErrors(async (id, data) => {
  const idN = assertId(id);
  assertBody(data);

  const actual = await Repo.obtenerPorId(idN);
  if (!actual) throw notFound('Horario de clase no encontrado');

  // Validar sobre el registro final (actual + cambios)
  const final = { ...cleanData(actual, FIELDS), ...cleanData(data, FIELDS) };
  return Repo.actualizar(idN, await validar(final, idN));
});

const deleteHorario = withErrors((id) => Repo.eliminar(assertId(id)));

export {
  fetchAllHorarios, fetchHorarioById, fetchHorariosByProfesor, fetchHorariosByGrupo,
  fetchHorariosByDia, createHorario, updateHorario, deleteHorario
};
