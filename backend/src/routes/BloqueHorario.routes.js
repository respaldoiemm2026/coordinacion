import express from 'express';
import * as BloqueHorarioController from '../controllers/BloqueHorario.controller.js';

const router = express.Router();

router.get('/', BloqueHorarioController.obtenerTodos);
router.get('/:id', BloqueHorarioController.obtenerPorId);
router.post('/', BloqueHorarioController.crear);
router.put('/:id', BloqueHorarioController.actualizar);
router.delete('/:id', BloqueHorarioController.eliminar);

export default router;
