import prisma from '../prisma.js';
import { HORARIO_INCLUDE as include } from './_includes.js';

const orderBy = [{ diaSemana: 'asc' }, { bloqueHorario: { orden: 'asc' } }];

const HorarioClaseRepository = {
  obtenerTodos() {
    return prisma.horarioClase.findMany({ include, orderBy });
  },

  obtenerPorId(id) {
    return prisma.horarioClase.findUnique({ where: { id }, include });
  },

  obtenerPorProfesor(profesorId) {
    return prisma.horarioClase.findMany({ where: { profesorId }, include, orderBy });
  },

  obtenerPorGrupo(grupoId) {
    return prisma.horarioClase.findMany({ where: { grupoId }, include, orderBy });
  },

  obtenerPorDia(diaSemana) {
    return prisma.horarioClase.findMany({
      where: { diaSemana },
      include,
      orderBy: { bloqueHorario: { orden: 'asc' } }
    });
  },

  /** Clase que ya ocupa ese profesor o grupo en el mismo día y bloque (excluyendo un id). */
  buscarConflicto({ profesorId, grupoId, diaSemana, bloqueHorarioId }, excluirId = null) {
    return prisma.horarioClase.findFirst({
      where: {
        diaSemana,
        bloqueHorarioId,
        OR: [{ profesorId }, { grupoId }],
        ...(excluirId ? { NOT: { id: excluirId } } : {})
      }
    });
  },

  crear(data) {
    return prisma.horarioClase.create({ data, include });
  },

  actualizar(id, data) {
    return prisma.horarioClase.update({ where: { id }, data, include });
  },

  eliminar(id) {
    return prisma.horarioClase.delete({ where: { id } });
  }
};

export default HorarioClaseRepository;
