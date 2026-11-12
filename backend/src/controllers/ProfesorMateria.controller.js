import * as Service from "../services/ProfesorMateria.service.js";
import { sendSuccess, asyncController } from "./_utils.js";

const obtenerTodos = asyncController(async (req, res) =>
  sendSuccess(res, await Service.fetchAllProfesoresMaterias())
);

const obtenerPorClave = asyncController(async (req, res) =>
  sendSuccess(
    res,
    await Service.fetchProfesorMateriaByClave(
      req.params.profesorId,
      req.params.materiaId
    )
  )
);

const crear = asyncController(async (req, res) =>
  sendSuccess(res, await Service.createProfesorMateria(req.body), 201)
);

const eliminar = asyncController(async (req, res) =>
  sendSuccess(
    res,
    await Service.deleteProfesorMateria(
      req.params.profesorId,
      req.params.materiaId
    )
  )
);

export { obtenerTodos, obtenerPorClave, crear, eliminar };
