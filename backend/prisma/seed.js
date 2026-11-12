// Carga los catálogos iniciales del sistema.
// Se puede ejecutar varias veces sin duplicar registros.
// npm run seed

import prisma from '../src/prisma.js';

// ==========================================================
// GRUPOS
// ==========================================================

const GRUPOS = [
  // Jornada tarde
  { nombre: '6°1', jornada: 'tarde' },
  { nombre: '6°2', jornada: 'tarde' },
  { nombre: '6°3', jornada: 'tarde' },

  { nombre: '7°1', jornada: 'tarde' },
  { nombre: '7°2', jornada: 'tarde' },
  { nombre: '7°3', jornada: 'tarde' },

  { nombre: '8°1', jornada: 'tarde' },
  { nombre: '8°2', jornada: 'tarde' },

  // Jornada mañana
  { nombre: '9°1', jornada: 'manana' },
  { nombre: '9°2', jornada: 'manana' },
  { nombre: '9°3', jornada: 'manana' },

  { nombre: '10°1', jornada: 'manana' },
  { nombre: '10°2', jornada: 'manana' },

  { nombre: '11°1', jornada: 'manana' },
  { nombre: '11°2', jornada: 'manana' },
  { nombre: '11°3', jornada: 'manana' }
];

// ==========================================================
// BLOQUES DE HORARIO
// ==========================================================

const BLOQUES = {
  manana: [
    ['06:00', '06:56'],
    ['06:56', '07:44'],
    ['07:44', '08:04', true],
    ['08:04', '09:00'],
    ['09:00', '09:50'],
    ['09:50', '10:10', true],
    ['10:10', '11:00'],
    ['11:00', '11:50']
  ],

  tarde: [
    ['12:00', '12:56'],
    ['12:56', '13:44'],
    ['13:44', '14:04', true],
    ['14:04', '15:00'],
    ['15:00', '15:50'],
    ['15:50', '16:10', true],
    ['16:10', '17:00'],
    ['17:00', '17:50']
  ]
};
// ==========================================================
// PROFESORES
// ==========================================================

const PROFESORES = [
  { nombre: 'Arley', jornada: 'manana' },
  { nombre: 'Pedro', jornada: 'manana' },
  { nombre: 'Juan David', jornada: 'manana' },
  { nombre: 'Eliud', jornada: 'manana' },
  { nombre: 'Giovana', jornada: 'manana' },
  { nombre: 'Adriana', jornada: 'manana' },
  { nombre: 'Diana', jornada: 'manana' },
  { nombre: 'Alex', jornada: 'manana' },
  { nombre: 'Ana', jornada: 'manana' },
  { nombre: 'David', jornada: 'manana' },
  { nombre: 'Isabela', jornada: 'manana' },
  { nombre: 'Ricardo', jornada: 'manana' },
  { nombre: 'Juan Carlos', jornada: 'manana' },
  { nombre: 'Luz', jornada: 'manana' },
  { nombre: 'Enrique', jornada: 'manana' },
  { nombre: 'William Asprilla', jornada: 'manana' },
  { nombre: 'Ada', jornada: 'manana' },
  { nombre: 'Mauro', jornada: 'manana' },

  { nombre: 'Adriana', jornada: 'tarde' },
  { nombre: 'David', jornada: 'tarde' },
  { nombre: 'Ricardo', jornada: 'tarde' },
  { nombre: 'Luis', jornada: 'tarde' },
  { nombre: 'Gloria', jornada: 'tarde' },
  { nombre: 'Ruth', jornada: 'tarde' },
  { nombre: 'Juan Carlos', jornada: 'tarde' },
  { nombre: 'Tirzon', jornada: 'tarde' },
  { nombre: 'Luz', jornada: 'tarde' },
  { nombre: 'Enrique', jornada: 'tarde' },
  { nombre: 'William Asprilla', jornada: 'tarde' },
  { nombre: 'William Martinez', jornada: 'tarde' },
  { nombre: 'Mauro', jornada: 'tarde' }
];

// ==========================================================
// MATERIAS
// ==========================================================

const MATERIAS = [
  'Matemáticas',
  'Lengua Castellana',
  'Inglés',
  'Biologia',
  'Ciencias Sociales',
  'Educación Física',
  'Informática',
  'Artística',
  'Ética',
  'Religión',
  'Filosofia',
  'Fisica',
  'Estadistica',
  'Logica',
  'Media Tecnica',
  'Quimica',
  'Economia',
  'Emprendimiento'
];

// ==========================================================
// CONVERSIÓN DE HORA
// ==========================================================

const hora = (texto) => {
  const [h, m] = texto.split(':').map(Number);

  return new Date(Date.UTC(1970, 0, 1, h, m));
};

// ==========================================================
// SEED GRUPOS
// ==========================================================

async function seedGrupos() {
  let creados = 0;
  let eliminados = 0;
  let protegidos = 0;

  const gruposActuales = await prisma.grupo.findMany();

  // Eliminar grupos que ya no deberían existir
  for (const grupo of gruposActuales) {
    const debeExistir = GRUPOS.some(
      (g) =>
        g.nombre === grupo.nombre &&
        g.jornada === grupo.jornada
    );

    if (!debeExistir) {
      const horariosNormales = await prisma.horarioClase.count({
        where: { grupoId: grupo.id }
      });

      const horariosEspeciales = await prisma.horarioEspecial.count({
        where: { grupoId: grupo.id }
      });

      if (horariosNormales === 0 && horariosEspeciales === 0) {
        await prisma.grupo.delete({
          where: { id: grupo.id }
        });

        console.log(
          `🗑️ Grupo eliminado: ${grupo.nombre} (${grupo.jornada}) ID ${grupo.id}`
        );

        eliminados++;
      } else {
        console.log(
          `⚠️ Grupo protegido: ${grupo.nombre} (${grupo.jornada}) ID ${grupo.id}`
        );

        protegidos++;
      }
    }
  }

  // Crear los grupos que hagan falta
  for (const grupo of GRUPOS) {
    const existe = await prisma.grupo.findFirst({
      where: {
        nombre: grupo.nombre,
        jornada: grupo.jornada
      }
    });

    if (!existe) {
      await prisma.grupo.create({
        data: grupo
      });

      console.log(
        `✅ Grupo creado: ${grupo.nombre} (${grupo.jornada})`
      );

      creados++;
    }
  }

  console.log(
    `Grupos: ${creados} creados, ${eliminados} eliminados, ${protegidos} protegidos por tener horarios`
  );
}

// ==========================================================
// SEED BLOQUES
// ==========================================================

async function seedBloques() {
  let creados = 0;
  let actualizados = 0;

  for (const [jornada, bloques] of Object.entries(BLOQUES)) {
    for (
      const [i, [inicio, fin, esDescanso = false]]
      of bloques.entries()
    ) {
      const orden = i + 1;

      const data = {
        jornada,
        orden,
        horaInicio: hora(inicio),
        horaFin: hora(fin),
        esDescanso
      };

      const existe = await prisma.bloqueHorario.findFirst({
        where: {
          jornada,
          orden
        }
      });

      if (!existe) {
        await prisma.bloqueHorario.create({
          data
        });

        creados++;
      } else if (
        existe.horaInicio.getTime() !== data.horaInicio.getTime() ||
        existe.horaFin.getTime() !== data.horaFin.getTime() ||
        existe.esDescanso !== esDescanso
      ) {
        await prisma.bloqueHorario.update({
          where: { id: existe.id },
          data
        });

        actualizados++;
      }
    }
  }

  console.log(
    `Bloques de horario: ${creados} creados, ${actualizados} actualizados`
  );
}

// ==========================================================
// SEED PROFESORES
// ==========================================================

async function seedProfesores() {
  let creados = 0;

  for (const profesor of PROFESORES) {
    const existe = await prisma.profesor.findFirst({
      where: {
        nombre: profesor.nombre,
        jornada: profesor.jornada
      }
    });

    if (!existe) {
      await prisma.profesor.create({
        data: profesor
      });

      creados++;
    }
  }

  console.log(
    `Profesores: ${creados} creados, ${PROFESORES.length - creados} ya existían`
  );
}

// ==========================================================
// SEED MATERIAS
// ==========================================================

async function seedMaterias() {
  let creadas = 0;

  for (const nombre of MATERIAS) {
    const existe = await prisma.materia.findFirst({
      where: { nombre }
    });

    if (!existe) {
      await prisma.materia.create({
        data: { nombre }
      });

      creadas++;
    }
  }

  console.log(
    `Materias: ${creadas} creadas, ${MATERIAS.length - creadas} ya existían`
  );
}

// ==========================================================
// RELACIONAR PROFESORES CON MATERIAS
// ==========================================================

async function seedProfesorMaterias() {
  const profesores = await prisma.profesor.findMany();
  const materias = await prisma.materia.findMany();

  let relacionesCreadas = 0;

  for (const profesor of profesores) {
    for (const materia of materias) {
      const existe = await prisma.profesorMateria.findUnique({
        where: {
          profesorId_materiaId: {
            profesorId: profesor.id,
            materiaId: materia.id
          }
        }
      });

      if (!existe) {
        await prisma.profesorMateria.create({
          data: {
            profesorId: profesor.id,
            materiaId: materia.id
          }
        });

        relacionesCreadas++;
      }
    }
  }

  console.log(
    `Relaciones profesor-materia: ${relacionesCreadas} creadas`
  );
}

// ==========================================================
// ELIMINAR DUPLICADO ESPECÍFICO 9°3 ID 19
// ==========================================================

async function eliminarDuplicado9_3() {
  const grupo = await prisma.grupo.findUnique({
    where: { id: 19 }
  });

  if (!grupo) {
    return;
  }

  const horariosNormales = await prisma.horarioClase.count({
    where: { grupoId: 19 }
  });

  const horariosEspeciales = await prisma.horarioEspecial.count({
    where: { grupoId: 19 }
  });

  // Solo eliminar si NO tiene horarios
  if (horariosNormales === 0 && horariosEspeciales === 0) {
    await prisma.grupo.delete({
      where: { id: 19 }
    });

    console.log('🗑️ 9°3 duplicado eliminado: ID 19');
  } else {
    console.log(
      '⚠️ El 9°3 ID 19 tiene horarios y no será eliminado.'
    );
  }
}

// ==========================================================
// EJECUTAR SEED
// ==========================================================

try {
  await eliminarDuplicado9_3();
  await seedGrupos();
  await seedBloques();
  await seedProfesores();
  await seedMaterias();
  await seedProfesorMaterias();
} finally {
  await prisma.$disconnect();
}