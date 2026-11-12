import * as Service from "../services/Profesor.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllProfesores())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchProfesorById(req.params.id))
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createProfesor(req.body), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateProfesor(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteProfesor(req.params.id))
);

export { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
