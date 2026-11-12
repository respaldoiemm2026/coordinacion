import express from 'express';
import * as HorarioEspecialController from '../controllers/HorarioEspecial.controller.js';

const router = express.Router();

router.get('/', HorarioEspecialController.obtenerTodos);
router.get('/:id', HorarioEspecialController.obtenerPorId);
router.get('/fecha/:fecha', HorarioEspecialController.obtenerPorFecha);
router.post('/', HorarioEspecialController.crear);
router.put('/:id', HorarioEspecialController.actualizar);
router.delete('/:id', HorarioEspecialController.eliminar);

export default router;
