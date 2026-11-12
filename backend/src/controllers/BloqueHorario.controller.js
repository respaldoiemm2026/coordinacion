import * as Service from "../services/BloqueHorario.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllBloques())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchBloqueById(req.params.id))
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createBloque(req.body), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateBloque(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteBloque(req.params.id))
);

export { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
