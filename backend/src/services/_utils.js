// Valores válidos de los enums del schema de Prisma
export const ROLES = ['coordinador', 'profesor', 'admin'];
export const JORNADAS = ['manana', 'tarde', 'ambas'];
export const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

export function error(message, statusCode = 400) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

export function notFound(message) {
  return error(message, 404);
}

export function assertId(id, campo = 'id') {
  const n = Number(id);
  if (!Number.isInteger(n) || n <= 0) throw error(`${campo} debe ser un entero positivo`);
  return n;
}

/** Igual que assertId pero permite null (relaciones opcionales del schema). */
export function assertIdOrNull(id, campo = 'id') {
  if (id === null) return null;
  return assertId(id, campo);
}

export function assertBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length === 0) {
    throw error('El cuerpo de la solicitud es obligatorio');
  }
}

export function requireFields(body, fields) {
  assertBody(body);
  const missing = fields.filter(
    (field) => body[field] === undefined || body[field] === null || String(body[field]).trim() === ''
  );
  if (missing.length) throw error(`Campos obligatorios: ${missing.join(', ')}`);
}

export function assertEnum(value, allowed, campo) {
  if (!allowed.includes(value)) throw error(`${campo} debe ser uno de: ${allowed.join(', ')}`);
  return value;
}

export function assertNonEmptyString(value, campo) {
  if (typeof value !== 'string' || !value.trim()) throw error(`${campo} debe ser un texto no vacío`);
  return value.trim();
}

/** Convierte 'YYYY-MM-DD' a Date (UTC) para columnas @db.Date. */
export function assertFecha(value, campo = 'fecha') {
  if (value instanceof Date) return value;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw error(`${campo} debe tener formato YYYY-MM-DD`);
  }
  const [y, m, d] = value.split('-').map(Number);
  const fecha = new Date(Date.UTC(y, m - 1, d));
  if (fecha.getUTCFullYear() !== y || fecha.getUTCMonth() !== m - 1 || fecha.getUTCDate() !== d) {
    throw error(`${campo} no es una fecha válida`);
  }
  return fecha;
}

/** Convierte 'HH:mm' o 'HH:mm:ss' a Date (1970-01-01 UTC) para columnas @db.Time. */
export function assertHora(value, campo) {
  if (value instanceof Date) return value;
  if (typeof value !== 'string' || !/^\d{2}:\d{2}(:\d{2})?$/.test(value)) {
    throw error(`${campo} debe tener formato HH:mm o HH:mm:ss`);
  }
  const [h, m, s = 0] = value.split(':').map(Number);
  if (h > 23 || m > 59 || s > 59) throw error(`${campo} no es una hora válida`);
  return new Date(Date.UTC(1970, 0, 1, h, m, s));
}

export function assertBoolean(value, campo) {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  throw error(`${campo} debe ser true o false`);
}

export function assertEnteroNoNegativo(value, campo) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0) throw error(`${campo} debe ser un entero no negativo`);
  return n;
}

/** Copia del body solo los campos permitidos (ignora el resto). */
export function cleanData(body, allowedFields) {
  const data = {};
  for (const field of allowedFields) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  return data;
}

export function assertHayCampos(data) {
  if (!Object.keys(data).length) throw error('No hay campos válidos para actualizar');
}

/** Traduce errores conocidos de Prisma a errores HTTP. */
export function handleRepositoryError(err) {
  if (err?.statusCode) throw err;
  if (err?.code === 'P2002') throw error('Ya existe un registro con esos datos', 409);
  if (err?.code === 'P2025') throw error('Registro no encontrado', 404);
  if (err?.code === 'P2003') {
    throw error('Operación no permitida: el registro relacionado no existe o tiene registros que dependen de él', 409);
  }
  throw err;
}

/** Envuelve una función de servicio para traducir siempre los errores de Prisma. */
export function withErrors(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (e) {
      handleRepositoryError(e);
    }
  };
}
