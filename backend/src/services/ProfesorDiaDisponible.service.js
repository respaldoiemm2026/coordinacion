import Repo from '../repositorys/ProfesorDiaDisponible.repository.js';
import ProfesorRepo from '../repositorys/Profesor.repository.js';
import { DIAS, notFound, assertId, assertEnum, requireFields, withErrors } from './_utils.js';

const fetchAllProfesoresDias = withErrors(() => Repo.obtenerTodos());

const fetchProfesorDiaByClave = withErrors(async (profesorId, diaSemana) => {
  const registro = await Repo.obtenerPorClave(
    assertId(profesorId, 'profesorId'),
    assertEnum(diaSemana, DIAS, 'diaSemana')
  );
  if (!registro) throw notFound('El profesor no tiene disponible ese día');
  return registro;
});

const createProfesorDiaDisponible = withErrors(async (data) => {
  requireFields(data, ['profesorId', 'diaSemana']);
  const profesorId = assertId(data.profesorId, 'profesorId');
  const diaSemana = assertEnum(data.diaSemana, DIAS, 'diaSemana');

  if (!(await ProfesorRepo.obtenerPorId(profesorId))) throw notFound('El profesor no existe');

  return Repo.crear({ profesorId, diaSemana });
});

const deleteProfesorDiaDisponible = withErrors((profesorId, diaSemana) =>
  Repo.eliminar(assertId(profesorId, 'profesorId'), assertEnum(diaSemana, DIAS, 'diaSemana'))
);

export {
  fetchAllProfesoresDias, fetchProfesorDiaByClave,
  createProfesorDiaDisponible, deleteProfesorDiaDisponible
};
