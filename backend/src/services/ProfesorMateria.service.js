import Repo from '../repositorys/ProfesorMateria.repository.js';
import ProfesorRepo from '../repositorys/Profesor.repository.js';
import MateriaRepo from '../repositorys/Materia.repository.js';
import { notFound, assertId, requireFields, withErrors } from './_utils.js';

const fetchAllProfesoresMaterias = withErrors(() => Repo.obtenerTodos());

const fetchProfesorMateriaByClave = withErrors(async (profesorId, materiaId) => {
  const registro = await Repo.obtenerPorClave(assertId(profesorId, 'profesorId'), assertId(materiaId, 'materiaId'));
  if (!registro) throw notFound('El profesor no tiene asignada esa materia');
  return registro;
});

const createProfesorMateria = withErrors(async (data) => {
  requireFields(data, ['profesorId', 'materiaId']);
  const profesorId = assertId(data.profesorId, 'profesorId');
  const materiaId = assertId(data.materiaId, 'materiaId');

  const [profesor, materia] = await Promise.all([
    ProfesorRepo.obtenerPorId(profesorId),
    MateriaRepo.obtenerPorId(materiaId)
  ]);
  if (!profesor) throw notFound('El profesor no existe');
  if (!materia) throw notFound('La materia no existe');

  return Repo.crear({ profesorId, materiaId });
});

const deleteProfesorMateria = withErrors((profesorId, materiaId) =>
  Repo.eliminar(assertId(profesorId, 'profesorId'), assertId(materiaId, 'materiaId'))
);

export {
  fetchAllProfesoresMaterias, fetchProfesorMateriaByClave,
  createProfesorMateria, deleteProfesorMateria
};
