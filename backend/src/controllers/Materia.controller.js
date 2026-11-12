import * as Service from "../services/Materia.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllMaterias())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchMateriaById(req.params.id))
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createMateria(req.body), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateMateria(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteMateria(req.params.id))
);

export { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
