import * as Service from "../services/HorarioEspecial.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllHorariosEspeciales())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchHorarioEspecialById(req.params.id))
);

const obtenerPorFecha = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchHorariosEspecialesByFecha(req.params.fecha))
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createHorarioEspecial(req.body), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateHorarioEspecial(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteHorarioEspecial(req.params.id))
);

export { obtenerTodos, obtenerPorId, obtenerPorFecha, crear, actualizar, eliminar };
