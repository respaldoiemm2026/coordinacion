import express from 'express';
import * as ProfesorDiaDisponibleController from '../controllers/ProfesorDiaDisponible.controller.js';

const router = express.Router();

router.get('/', ProfesorDiaDisponibleController.obtenerTodos);
router.get('/:profesorId/:diaSemana', ProfesorDiaDisponibleController.obtenerPorClave);
router.post('/', ProfesorDiaDisponibleController.crear);
router.delete('/:profesorId/:diaSemana', ProfesorDiaDisponibleController.eliminar);

export default router;
