import * as Service from "../services/ProfesorDiaDisponible.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllProfesoresDias())
);

const obtenerPorClave = asyncController(async (req, res) =>
  sendSuccess(
    res,
    await Service.fetchProfesorDiaByClave(
      req.params.profesorId,
      req.params.diaSemana
    )
  )
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createProfesorDiaDisponible(req.body), 201)
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(
    res,
    await Service.deleteProfesorDiaDisponible(
      req.params.profesorId,
      req.params.diaSemana
    )
  )
);

export { obtenerTodos, obtenerPorClave, crear, eliminar };
