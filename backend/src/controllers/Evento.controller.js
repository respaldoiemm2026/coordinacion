import * as Service from "../services/Evento.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllEventos())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchEventoById(req.params.id))
);

const obtenerUltimo = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchUltimoEvento())
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createEvento(req.body, req.user.id), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateEvento(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteEvento(req.params.id))
);

export { obtenerTodos, obtenerPorId, obtenerUltimo, crear, actualizar, eliminar };
