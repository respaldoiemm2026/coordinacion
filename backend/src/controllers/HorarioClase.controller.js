import * as Service from "../services/HorarioClase.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllHorarios())
);

const obtenerPorId = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchHorarioById(req.params.id))
);

const obtenerPorProfesor = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchHorariosByProfesor(req.params.profesorId))
);

const obtenerPorGrupo = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchHorariosByGrupo(req.params.grupoId))
);

const obtenerPorDia = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchHorariosByDia(req.params.diaSemana))
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createHorario(req.body), 201)
);

const actualizar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.updateHorario(req.params.id, req.body))
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(res, await Service.deleteHorario(req.params.id))
);

export {
  obtenerTodos, obtenerPorId, obtenerPorProfesor, obtenerPorGrupo,
  obtenerPorDia, crear, actualizar, eliminar
};
