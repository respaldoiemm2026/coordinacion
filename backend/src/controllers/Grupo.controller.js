import * as Service from "../services/Grupo.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllGrupos())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchGrupoById(req.params.id))
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createGrupo(req.body), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateGrupo(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteGrupo(req.params.id))
);

export { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
