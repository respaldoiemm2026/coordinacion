import Repo from '../repositorys/HorarioEspecial.repository.js';
import ProfesorRepo from '../repositorys/Profesor.repository.js';
import MateriaRepo from '../repositorys/Materia.repository.js';
import GrupoRepo from '../repositorys/Grupo.repository.js';
import BloqueRepo from '../repositorys/BloqueHorario.repository.js';
import {
  error, notFound, assertId, assertIdOrNull, assertBody, requireFields, assertFecha,
  cleanData, assertHayCampos, withErrors
} from './_utils.js';

const FIELDS = ['fecha', 'profesorId', 'materiaId', 'grupoId', 'bloqueHorarioId', 'descripcion'];

/** profesorId y materiaId son opcionales en el schema (null = hora libre). */
async function normalizar(clean) {
  if (clean.fecha !== undefined) clean.fecha = assertFecha(clean.fecha);
  // descripcion es opcional: vacío o null la deja sin texto
  if (clean.descripcion !== undefined) {
    clean.descripcion = clean.descripcion === null || !String(clean.descripcion).trim() ? null : String(clean.descripcion).trim();
    if (clean.descripcion && clean.descripcion.length > 255) throw error('descripcion no puede superar 255 caracteres');
  }

  if (clean.profesorId !== undefined) {
    clean.profesorId = assertIdOrNull(clean.profesorId, 'profesorId');
    if (clean.profesorId !== null && !(await ProfesorRepo.obtenerPorId(clean.profesorId))) {
      throw notFound('El profesor no existe');
    }
  }
  if (clean.materiaId !== undefined) {
    clean.materiaId = assertIdOrNull(clean.materiaId, 'materiaId');
    if (clean.materiaId !== null && !(await MateriaRepo.obtenerPorId(clean.materiaId))) {
      throw notFound('La materia no existe');
    }
  }
  if (clean.grupoId !== undefined) {
    clean.grupoId = assertId(clean.grupoId, 'grupoId');
    if (!(await GrupoRepo.obtenerPorId(clean.grupoId))) throw notFound('El grupo no existe');
  }
  if (clean.bloqueHorarioId !== undefined) {
    clean.bloqueHorarioId = assertId(clean.bloqueHorarioId, 'bloqueHorarioId');
    if (!(await BloqueRepo.obtenerPorId(clean.bloqueHorarioId))) throw notFound('El bloque de horario no existe');
  }
  return clean;
}

const fetchAllHorariosEspeciales = withErrors(() => Repo.obtenerTodos());

const fetchHorarioEspecialById = withErrors(async (id) => {
  const horario = await Repo.obtenerPorId(assertId(id));
  if (!horario) throw notFound('Horario especial no encontrado');
  return horario;
});

const fetchHorariosEspecialesByFecha = withErrors((fecha) =>
  Repo.obtenerPorFecha(assertFecha(fecha))
);

const createHorarioEspecial = withErrors(async (data) => {
  requireFields(data, ['fecha', 'grupoId', 'bloqueHorarioId']);
  return Repo.crear(await normalizar(cleanData(data, FIELDS)));
});

const updateHorarioEspecial = withErrors(async (id, data) => {
  const idN = assertId(id);
  assertBody(data);
  const clean = await normalizar(cleanData(data, FIELDS));
  assertHayCampos(clean);
  return Repo.actualizar(idN, clean);
});

const deleteHorarioEspecial = withErrors((id) => Repo.eliminar(assertId(id)));

export {
  fetchAllHorariosEspeciales, fetchHorarioEspecialById, fetchHorariosEspecialesByFecha,
  createHorarioEspecial, updateHorarioEspecial, deleteHorarioEspecial
};
