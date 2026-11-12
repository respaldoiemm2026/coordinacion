import * as Service from "../services/Aviso.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllAvisos())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAvisoById(req.params.id))
);

const obtenerUltimo = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchUltimoAviso())
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createAviso(req.body, req.user.id), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateAviso(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteAviso(req.params.id))
);

export { obtenerTodos, obtenerPorId, obtenerUltimo, crear, actualizar, eliminar };
