import * as Service from "../services/Usuario.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllUsuarios())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchUsuarioById(req.params.id))
);

const obtenerPorNombreUsuario = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchUsuarioByNombreUsuario(req.params.nombreUsuario))
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createUsuario(req.body), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateUsuario(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteUsuario(req.params.id))
);

export {
  obtenerTodos,
  obtenerPorId,
  obtenerPorNombreUsuario,
  crear,
  actualizar,
  eliminar
};
