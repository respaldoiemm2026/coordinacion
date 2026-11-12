import * as Service from "../services/EstadoColegio.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllEstados())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchEstadoById(req.params.id))
);

const obtenerUltimo = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchUltimoEstado())
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createEstado(req.body, req.user.id), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateEstado(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteEstado(req.params.id))
);

export { obtenerTodos, obtenerPorId, obtenerUltimo, crear, actualizar, eliminar };
