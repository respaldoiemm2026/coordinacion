import * as Service from "../services/RegistroCambio.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllRegistrosCambio())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchRegistroCambioById(req.params.id))
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createRegistroCambio(req.body, req.user.id), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateRegistroCambio(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteRegistroCambio(req.params.id))
);

export { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
