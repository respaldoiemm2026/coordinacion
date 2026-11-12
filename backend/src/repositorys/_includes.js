// Nunca exponer el hash de la contraseña al incluir la relación con Usuario
export const USUARIO_PUBLICO = { omit: { contrasenaHash: true } };

export const HORARIO_INCLUDE = {
  profesor: true,
  materia: true,
  grupo: true,
  bloqueHorario: true
};
