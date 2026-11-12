export function sendSuccess(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    ok: true,
    data
  });
}

export function sendError(res, error) {
  const statusCode = error.statusCode || 500;

  // Los errores inesperados se registran y no se exponen al cliente
  if (statusCode >= 500) console.error(error);

  return res.status(statusCode).json({
    ok: false,
    mensaje: statusCode >= 500 ? "Error interno del servidor" : error.message
  });
}

export function asyncController(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      sendError(res, error);
    }
  };
}
