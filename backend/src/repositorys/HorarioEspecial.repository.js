import prisma from '../prisma.js';
import { HORARIO_INCLUDE as include } from './_includes.js';

const HorarioEspecialRepository = {
  obtenerTodos() {
    return prisma.horarioEspecial.findMany({
      include,
      orderBy: [{ fecha: 'asc' }, { bloqueHorario: { orden: 'asc' } }]
    });
  },

  obtenerPorId(id) {
    return prisma.horarioEspecial.findUnique({ where: { id }, include });
  },

  /** fecha: Date ya validada por el servicio. */
  obtenerPorFecha(fecha) {
    return prisma.horarioEspecial.findMany({
      where: { fecha },
      include,
      orderBy: { bloqueHorario: { orden: 'asc' } }
    });
  },

  crear(data) {
    return prisma.horarioEspecial.create({ data, include });
  },

  actualizar(id, data) {
    return prisma.horarioEspecial.update({ where: { id }, data, include });
  },

  eliminar(id) {
    return prisma.horarioEspecial.delete({ where: { id } });
  }
};

export default HorarioEspecialRepository;
